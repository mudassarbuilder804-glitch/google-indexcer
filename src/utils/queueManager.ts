import { QueueTask, IndexingProtocol } from '../types';

export class IndexingQueueManager {
  private queue: QueueTask[] = [];
  private isProcessing = false;
  private interRequestDelayMs = 900; // Throttling delay between API calls to prevent rate-limit blocks
  private dailyQuotaMax = 200; // Google Indexing API daily limit
  private dailyQuotaUsed = 68;
  private lastResetTime: Date = new Date();

  constructor() {
    // Check quota reset daily
    this.checkQuotaReset();
  }

  private checkQuotaReset() {
    const now = new Date();
    if (now.getUTCDate() !== this.lastResetTime.getUTCDate()) {
      this.dailyQuotaUsed = 0;
      this.lastResetTime = now;
    }
  }

  public getDailyQuota() {
    this.checkQuotaReset();
    return {
      dailyQuotaUsed: this.dailyQuotaUsed,
      dailyQuotaMax: this.dailyQuotaMax,
      remaining: Math.max(0, this.dailyQuotaMax - this.dailyQuotaUsed),
      lastResetTime: this.lastResetTime.toISOString(),
    };
  }

  public consumeGoogleQuota(count = 1): boolean {
    this.checkQuotaReset();
    if (this.dailyQuotaUsed + count > this.dailyQuotaMax) {
      return false; // Quota exceeded
    }
    this.dailyQuotaUsed += count;
    return true;
  }

  public enqueue(
    jobId: string,
    url: string,
    itemRefId: string,
    protocols: IndexingProtocol[],
    delayMs = 0
  ): QueueTask {
    const task: QueueTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      jobId,
      url,
      itemRefId,
      status: 'pending',
      protocols,
      scheduledAt: new Date(Date.now() + delayMs).toISOString(),
      attempts: 0,
      maxAttempts: 3,
      delayMs,
    };

    this.queue.push(task);
    return task;
  }

  public getQueueStats() {
    return {
      total: this.queue.length,
      pending: this.queue.filter((t) => t.status === 'pending').length,
      processing: this.queue.filter((t) => t.status === 'processing').length,
      completed: this.queue.filter((t) => t.status === 'completed').length,
      failed: this.queue.filter((t) => t.status === 'failed').length,
      tasks: this.queue.slice(-20), // return last 20 tasks
    };
  }

  /**
   * Process next tasks with throttling delay and exponential backoff
   */
  public async processQueue(
    workerFn: (task: QueueTask) => Promise<{ success: boolean; error?: string }>
  ) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      while (true) {
        const now = new Date().toISOString();
        const pendingTask = this.queue.find(
          (t) => t.status === 'pending' && t.scheduledAt <= now
        );

        if (!pendingTask) {
          break; // Queue idle
        }

        pendingTask.status = 'processing';
        pendingTask.attempts += 1;

        try {
          const result = await workerFn(pendingTask);
          if (result.success) {
            pendingTask.status = 'completed';
            pendingTask.executedAt = new Date().toISOString();
          } else {
            throw new Error(result.error || 'Execution failed');
          }
        } catch (err: any) {
          if (pendingTask.attempts < pendingTask.maxAttempts) {
            // Exponential backoff: 2s, 8s, 24s
            const backoffDelay = Math.pow(pendingTask.attempts, 2) * 2000;
            pendingTask.status = 'pending';
            pendingTask.scheduledAt = new Date(Date.now() + backoffDelay).toISOString();
            pendingTask.lastError = `Attempt ${pendingTask.attempts} failed: ${err.message}. Retrying in ${backoffDelay / 1000}s...`;
          } else {
            pendingTask.status = 'failed';
            pendingTask.lastError = `Failed after ${pendingTask.maxAttempts} attempts: ${err.message}`;
            pendingTask.executedAt = new Date().toISOString();
          }
        }

        // Throttling delay between API calls to avoid rate-limiting
        await new Promise((r) => setTimeout(r, this.interRequestDelayMs));
      }
    } finally {
      this.isProcessing = false;
    }
  }
}

export const queueManager = new IndexingQueueManager();
