export type LinkTier = 'Tier 1 (High DA / Guest Post)' | 'Tier 2 (Web 2.0 / PBN / Contextual)' | 'Tier 3 (Social / Profile / Forum)';

export type IndexStatus =
  | 'queued'
  | 'processing'
  | 'submitted'
  | 'crawling'
  | 'indexed'
  | 'discovered_not_indexed'
  | 'crawled_not_indexed'
  | 'noindex_error'
  | 'not_found'
  | 'schema_warning'
  | 'failed';

export type DripSpeed = 'instant' | 'drip_3d' | 'drip_7d' | 'drip_14d' | 'drip_30d';

export type IndexingProtocol =
  | 'google_api'
  | 'index_now'
  | 'bing_webmaster'
  | 'sitemap_ping'
  | 'ping_o_matic'
  | 'rss_syndicate'
  | 'gsc_inspection';

export interface StructuredDataAnalysis {
  hasJsonLd: boolean;
  hasMicrodata: boolean;
  detectedTypes: string[]; // e.g. ['JobPosting', 'Article', 'Organization']
  isGoogleIndexingApiEligible: boolean; // true ONLY if includes JobPosting or BroadcastEvent
  eligibilityNotice: string;
  hasNoindexTag: boolean;
  canonicalUrl?: string;
  pageTitle?: string;
  httpStatus?: number;
  scannedAt: string;
}

export interface GscInspectionVerdict {
  verdict: 'PASS' | 'NEUTRAL' | 'FAIL' | 'UNKNOWN';
  coverageState: string; // e.g. 'Submitted and indexed', 'Crawled - currently not indexed', 'Discovered - currently not indexed'
  indexingState: 'INDEXING_ALLOWED' | 'BLOCKED_BY_META_TAG' | 'BLOCKED_BY_HTTP_HEADER' | 'BLOCKED_BY_ROBOTS_TXT';
  robotsTxtState: 'ALLOWED' | 'DISALLOWED';
  lastCrawlTime?: string;
  crawledAs?: 'GOOGLEBOT_DESKTOP' | 'GOOGLEBOT_MOBILE';
  userCanonical?: string;
  googleCanonical?: string;
  referringUrls?: string[];
  inspectedAt: string;
}

export interface PingResult {
  googleApi?: {
    success: boolean;
    status: string;
    timestamp: string;
    notificationType?: 'URL_UPDATED' | 'URL_DELETED';
    responseCode?: number;
    error?: string;
    isEligibleSchema?: boolean;
    complianceNote?: string;
  };
  indexNow?: {
    success: boolean;
    timestamp: string;
    engine: string; // 'Bing, Yandex, Seznam, Naver'
    responseCode?: number;
    error?: string;
  };
  bingWebmaster?: {
    success: boolean;
    timestamp: string;
    responseCode?: number;
    batchId?: string;
    error?: string;
  };
  sitemapPing?: {
    success: boolean;
    timestamp: string;
    pingUrl: string;
    engines?: string[];
  };
  pingOMatic?: {
    success: boolean;
    timestamp: string;
    responseCode?: number;
  };
  rssSyndicated?: {
    success: boolean;
    feedUrl: string;
    timestamp: string;
  };
  gscInspection?: GscInspectionVerdict;
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
  structuredData?: StructuredDataAnalysis;
  gscVerdict?: GscInspectionVerdict;
  diagnostics?: string;
  pageTitle?: string;
  retryAttempts?: number;
  lastError?: string;
}

export interface QueueTask {
  id: string;
  jobId: string;
  url: string;
  itemRefId: string;
  status: 'pending' | 'throttling' | 'processing' | 'completed' | 'failed';
  protocols: IndexingProtocol[];
  scheduledAt: string;
  executedAt?: string;
  attempts: number;
  maxAttempts: number;
  lastError?: string;
  delayMs: number;
}

export interface IndexingJob {
  id: string;
  name: string;
  clientName?: string;
  projectName?: string;
  targetDomain: string;
  createdAt: string;
  dripSpeed: DripSpeed;
  speedModeLabel: string;
  totalLinks: number;
  indexedCount: number;
  crawledCount: number;
  submittedCount: number;
  failedCount: number;
  status: 'active' | 'completed' | 'paused' | 'dripping' | 'queued';
  activeProtocols: IndexingProtocol[];
  items: BacklinkItem[];
  notes?: string;
  feedUrl?: string;
  sitemapUrl?: string;
  // Eligibility summary
  eligibleGoogleApiCount?: number;
  ineligibleGoogleApiCount?: number;
}

export interface GoogleServiceAccountConfig {
  clientEmail: string;
  projectId: string;
  privateKeyConfigured: boolean;
  isVerified: boolean;
  dailyQuotaUsed: number;
  dailyQuotaMax: number;
  lastResetTime: string;
  gscPropertyUrl?: string;
}

export interface IndexNowConfig {
  key: string;
  keyLocationUrl: string;
  host: string;
  enabledEngines: string[]; // Bing, Yandex, Seznam, Naver
  lastPingTime?: string;
  dailySubmissions?: number;
}

export interface BingWebmasterConfig {
  apiKey: string;
  siteUrl: string;
  isVerified: boolean;
  dailyQuotaUsed: number;
  dailyQuotaMax: number;
  lastSubmissionTime?: string;
}

export interface SEOReport {
  id: string;
  jobId: string;
  campaignName: string;
  clientName: string;
  projectName?: string;
  targetDomain: string;
  generatedAt: string;
  totalSubmitted: number;
  totalIndexed: number;
  indexRate: number;
  tierBreakdown: { tier: string; total: number; indexed: number; rate: number }[];
  domainDistribution: { domain: string; count: number; indexed: number }[];
  statusDistribution: { status: string; count: number }[];
  schemaBreakdown?: {
    eligibleGoogleApi: number;
    ineligibleGoogleApi: number;
    schemaTypesFound: Record<string, number>;
  };
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
  rateLimitPerMinute?: number;
}

export interface UrlValidationSummary {
  totalInput: number;
  validUrls: string[];
  invalidUrls: { raw: string; reason: string }[];
  duplicatesRemoved: number;
}
