export type LinkTier = 'Tier 1 (High DA / Guest Post)' | 'Tier 2 (Web 2.0 / PBN / Contextual)' | 'Tier 3 (Social / Profile / Forum)';

export type IndexStatus =
  | 'queued'
  | 'submitted'
  | 'crawling'
  | 'indexed'
  | 'noindex_error'
  | 'not_found'
  | 'failed';

export type DripSpeed = 'instant' | 'drip_3d' | 'drip_7d' | 'drip_14d' | 'drip_30d';

export interface PingResult {
  googleApi?: {
    success: boolean;
    status: string;
    timestamp: string;
    notificationType?: 'URL_UPDATED' | 'URL_DELETED';
    responseCode?: number;
    error?: string;
  };
  indexNow?: {
    success: boolean;
    timestamp: string;
    engine: string;
    responseCode?: number;
    error?: string;
  };
  sitemapPing?: {
    success: boolean;
    timestamp: string;
    pingUrl: string;
  };
  pingOMatic?: {
    success: boolean;
    timestamp: string;
  };
  rssSyndicated?: {
    success: boolean;
    feedUrl: string;
    timestamp: string;
  };
}

export interface BacklinkItem {
  id: string;
  url: string;
  targetDomain?: string;
  anchorText?: string;
  tier: LinkTier;
  status: IndexStatus;
  httpStatus?: number;
  canonicalUrl?: string;
  hasNoindexTag?: boolean;
  isBlockedByRobotsTxt?: boolean;
  googlebotCrawledAt?: string;
  indexedAt?: string;
  lastCheckedAt?: string;
  indexConfidenceScore?: number; // 0 - 100%
  pingResults: PingResult;
  diagnostics?: string;
  pageTitle?: string;
}

export interface IndexingJob {
  id: string;
  name: string;
  targetDomain: string;
  createdAt: string;
  dripSpeed: DripSpeed;
  speedModeLabel: string;
  totalLinks: number;
  indexedCount: number;
  crawledCount: number;
  submittedCount: number;
  failedCount: number;
  status: 'active' | 'completed' | 'paused' | 'dripping';
  activeProtocols: ('google_api' | 'index_now' | 'sitemap_ping' | 'ping_o_matic' | 'rss_syndicate')[];
  items: BacklinkItem[];
  notes?: string;
  feedUrl?: string;
  sitemapUrl?: string;
}

export interface GoogleServiceAccountConfig {
  clientEmail: string;
  projectId: string;
  privateKeyConfigured: boolean;
  isVerified: boolean;
  dailyQuotaUsed: number;
  dailyQuotaMax: number;
  lastResetTime: string;
}

export interface IndexNowConfig {
  key: string;
  keyLocationUrl: string;
  host: string;
  enabledEngines: string[];
  lastPingTime?: string;
}

export interface SEOReport {
  id: string;
  jobId: string;
  campaignName: string;
  clientName: string;
  targetDomain: string;
  generatedAt: string;
  totalSubmitted: number;
  totalIndexed: number;
  indexRate: number;
  tierBreakdown: { tier: string; total: number; indexed: number; rate: number }[];
  domainDistribution: { domain: string; count: number; indexed: number }[];
  statusDistribution: { status: string; count: number }[];
  aiExecutiveSummary: string;
  recommendations: string[];
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsedAt?: string;
  requestsCount: number;
}
