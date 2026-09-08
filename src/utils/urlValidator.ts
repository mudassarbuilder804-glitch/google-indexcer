import { UrlValidationSummary } from '../types';

/**
 * Validates a single URL format
 */
export function isValidUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Parses raw text, CSV, line-separated URLs, or array of URLs, removes duplicates, and validates format
 */
export function parseAndCleanUrls(rawInput: string | string[] | unknown): UrlValidationSummary {
  if (!rawInput) {
    return {
      totalInput: 0,
      validUrls: [],
      invalidUrls: [],
      duplicatesRemoved: 0,
    };
  }

  // Handle both array of strings and raw string input safely
  const rawSegments: string[] = [];
  if (Array.isArray(rawInput)) {
    for (const item of rawInput) {
      if (item !== null && item !== undefined) {
        rawSegments.push(typeof item === 'string' ? item : String(item));
      }
    }
  } else if (typeof rawInput === 'string') {
    rawSegments.push(rawInput);
  } else {
    rawSegments.push(String(rawInput));
  }

  // Split all segments by newlines, commas, or semicolons
  const lines: string[] = [];
  for (const segment of rawSegments) {
    if (typeof segment === 'string') {
      const splitItems = segment.split(/[\r\n,;]+/);
      for (const item of splitItems) {
        lines.push(item);
      }
    }
  }

  const seen = new Set<string>();
  const validUrls: string[] = [];
  const invalidUrls: { raw: string; reason: string }[] = [];
  let duplicates = 0;

  for (const line of lines) {
    const trimmed = typeof line === 'string' ? line.trim() : String(line || '').trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check if it's a valid URL
    if (!isValidUrl(trimmed)) {
      invalidUrls.push({ raw: trimmed, reason: 'Invalid URL syntax (must start with http:// or https://)' });
      continue;
    }

    try {
      const normalized = new URL(trimmed);
      // Remove trailing slash for uniformity unless root
      let cleanHref = normalized.origin + normalized.pathname.replace(/\/$/, '') + normalized.search + normalized.hash;
      if (normalized.pathname === '/' || normalized.pathname === '') {
        cleanHref = normalized.origin + '/';
      }

      const lowerKey = cleanHref.toLowerCase();
      if (seen.has(lowerKey)) {
        duplicates++;
      } else {
        seen.add(lowerKey);
        validUrls.push(cleanHref);
      }
    } catch {
      invalidUrls.push({ raw: trimmed, reason: 'Malformed URL structure' });
    }
  }

  return {
    totalInput: validUrls.length + invalidUrls.length + duplicates,
    validUrls,
    invalidUrls,
    duplicatesRemoved: duplicates,
  };
}

/**
 * Fast asynchronous HTTP reachability and header check
 */
export async function checkUrlReachability(
  url: string,
  timeoutMs = 6000
): Promise<{
  isReachable: boolean;
  httpStatus: number;
  hasNoindex: boolean;
  contentType: string;
  error?: string;
}> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const xRobots = response.headers.get('x-robots-tag') || '';
    const hasNoindexHeader = /noindex/i.test(xRobots);

    return {
      isReachable: response.status < 400,
      httpStatus: response.status,
      hasNoindex: hasNoindexHeader,
      contentType: response.headers.get('content-type') || 'text/html',
    };
  } catch (err: any) {
    return {
      isReachable: false,
      httpStatus: 0,
      hasNoindex: false,
      contentType: '',
      error: err.name === 'AbortError' ? 'Connection timed out' : err.message || 'Network unreachable',
    };
  }
}
