import {
  IndexingJob,
  GoogleServiceAccountConfig,
  IndexNowConfig,
  SEOReport,
  ApiKeyItem,
  BacklinkItem,
  DripSpeed,
  LinkTier
} from '../types';

export const seedJobs: IndexingJob[] = [
  {
    id: 'job-alpha-01',
    name: 'TechSaaS DA 60+ Backlinks Push',
    targetDomain: 'https://cloudflow-analytics.io',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    dripSpeed: 'drip_3d',
    speedModeLabel: '3-Day Natural Velocity',
    totalLinks: 12,
    indexedCount: 10,
    crawledCount: 11,
    submittedCount: 12,
    failedCount: 1,
    status: 'active',
    activeProtocols: ['google_api', 'index_now', 'sitemap_ping', 'ping_o_matic', 'rss_syndicate'],
    feedUrl: 'https://cloudflow-analytics.io/rss-feed.xml',
    sitemapUrl: 'https://cloudflow-analytics.io/sitemap.xml',
    items: [
      {
        id: 'lnk-101',
        url: 'https://techcrunch-digest.co/cloud-monitoring-trends-2026',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'enterprise cloud analytics dashboard',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Top Cloud Monitoring Trends in 2026 | Tech Digest',
        canonicalUrl: 'https://techcrunch-digest.co/cloud-monitoring-trends-2026',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 98,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), responseCode: 200 },
          indexNow: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), engine: 'Bing & Yandex', responseCode: 200 },
          sitemapPing: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), pingUrl: 'https://www.google.com/ping' },
          pingOMatic: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
          rssSyndicated: { success: true, feedUrl: 'https://cloudflow-analytics.io/rss-feed.xml', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
        },
        diagnostics: 'Verified in Google SERP with cache timestamp. Strong contextual link placement.',
      },
      {
        id: 'lnk-102',
        url: 'https://venturebeat-network.org/insights/modern-data-pipelines',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'scalable data pipelines',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Scaling Modern Data Pipelines for AI Workloads',
        canonicalUrl: 'https://venturebeat-network.org/insights/modern-data-pipelines',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 95,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), responseCode: 200 },
          indexNow: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), engine: 'Bing & Yandex', responseCode: 200 },
        },
        diagnostics: 'Live Google cache verified. Indexed in top SERP clusters.',
      },
      {
        id: 'lnk-103',
        url: 'https://medium.com/@devops_pro/top-saas-metrics-tools-review',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloudflow platform',
        tier: 'Tier 2 (Web 2.0 / PBN / Contextual)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Hands-on Review of 2026 SaaS Metrics Platforms',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 92,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
          indexNow: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), engine: 'IndexNow Org' },
        },
      },
      {
        id: 'lnk-104',
        url: 'https://dev.to/cloudarchitects/optimizing-realtime-telemetry',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'realtime telemetry architecture',
        tier: 'Tier 2 (Web 2.0 / PBN / Contextual)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Optimizing Real-Time Telemetry at Scale',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 3600000 * 16).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 91,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
          indexNow: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), engine: 'Bing & Yandex' },
        },
      },
      {
        id: 'lnk-105',
        url: 'https://github.com/awesome-cloud-ops/distributed-traces-curated',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloud analytics tool',
        tier: 'Tier 3 (Social / Profile / Forum)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Awesome Distributed Traces & Metrics Curated List',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000 * 1.2).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 94,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
        },
      },
      {
        id: 'lnk-106',
        url: 'https://stackshare.io/cloudflow-analytics/alternatives',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'visit cloudflow website',
        tier: 'Tier 3 (Social / Profile / Forum)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Cloudflow Analytics Profile & Tech Stack Alternatives',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 89,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
          indexNow: { success: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), engine: 'IndexNow' },
        },
      },
      {
        id: 'lnk-107',
        url: 'https://hackernoon.com/stories/building-observability-stacks-in-2026',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'observability performance suite',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Building Resilient Observability Stacks in 2026',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 96,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'Bing & Yandex' },
        },
      },
      {
        id: 'lnk-108',
        url: 'https://dzone.com/articles/apm-and-metrics-deep-dive',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloudflow telemetry',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'APM and Metrics Deep Dive: 2026 Standards',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 94,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
        },
      },
      {
        id: 'lnk-109',
        url: 'https://hashnode.dev/@analyticsguru/modern-kpi-trackers',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloud analytics software',
        tier: 'Tier 2 (Web 2.0 / PBN / Contextual)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Modern KPI Trackers and Microservice Dashboards',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000 * 0.8).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 90,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'Bing' },
        },
      },
      {
        id: 'lnk-110',
        url: 'https://subdomain-forum.discourse.group/t/monitoring-tools-comparison/4891',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'source analytics engine',
        tier: 'Tier 3 (Social / Profile / Forum)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Monitoring Tools Comparison - Community Thread',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        indexedAt: new Date(Date.now() - 3600000).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 88,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
        },
      },
      {
        id: 'lnk-111',
        url: 'https://blog-author-archive.ghost.io/posts/ai-driven-dashboards',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloudflow ai engine',
        tier: 'Tier 2 (Web 2.0 / PBN / Contextual)',
        status: 'crawling',
        httpStatus: 200,
        pageTitle: 'AI-Driven Dashboards for SaaS Leaders',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 78,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'IndexNow' },
        },
        diagnostics: 'Googlebot fetch recorded. Expected in main index SERP within 12-24 hours.',
      },
      {
        id: 'lnk-112',
        url: 'https://outdated-staging-site.com/press-release-2026',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloudflow pr news',
        tier: 'Tier 2 (Web 2.0 / PBN / Contextual)',
        status: 'noindex_error',
        httpStatus: 200,
        pageTitle: 'Press Release Archive',
        hasNoindexTag: true,
        isBlockedByRobotsTxt: false,
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 10,
        pingResults: {
          googleApi: { success: false, status: 'Page has meta robots noindex directive', timestamp: new Date().toISOString() },
        },
        diagnostics: 'Critical Warning: Host page contains <meta name="robots" content="noindex, follow"> header.',
      },
    ],
  },
  {
    id: 'job-fintech-02',
    name: 'Fintech Authority Tier 1 Boost',
    targetDomain: 'https://novapay-solutions.com',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    dripSpeed: 'drip_7d',
    speedModeLabel: '7-Day Organic Drip',
    totalLinks: 8,
    indexedCount: 7,
    crawledCount: 8,
    submittedCount: 8,
    failedCount: 0,
    status: 'dripping',
    activeProtocols: ['google_api', 'index_now', 'sitemap_ping', 'rss_syndicate'],
    feedUrl: 'https://novapay-solutions.com/feeds/index.xml',
    sitemapUrl: 'https://novapay-solutions.com/sitemaps.xml',
    items: [
      {
        id: 'lnk-201',
        url: 'https://forbes-contributors.com/cross-border-payment-trends',
        targetDomain: 'https://novapay-solutions.com',
        anchorText: 'cross border b2b payments',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'The Future of Cross-Border B2B Payments in 2026',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        indexedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 99,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'IndexNow' },
        },
      },
      {
        id: 'lnk-202',
        url: 'https://thefintechtimes-feed.com/modern-checkout-infrastructure',
        targetDomain: 'https://novapay-solutions.com',
        anchorText: 'merchant payment gateways',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Modern Checkout Infrastructure & Global Settlement',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        indexedAt: new Date(Date.now() - 86400000).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 97,
        pingResults: {
          googleApi: { success: true, status: 'URL_UPDATED published', timestamp: new Date().toISOString() },
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'Bing & Yandex' },
        },
      },
    ],
  },
];

export const seedGoogleConfig: GoogleServiceAccountConfig = {
  clientEmail: 'indexer-service@seo-boost-prod-2026.iam.gserviceaccount.com',
  projectId: 'seo-boost-prod-2026',
  privateKeyConfigured: true,
  isVerified: true,
  dailyQuotaUsed: 68,
  dailyQuotaMax: 200,
  lastResetTime: new Date().toISOString(),
};

export const seedIndexNowConfig: IndexNowConfig = {
  key: '84f109de2b4742a0b4e068ff21a8d11e',
  keyLocationUrl: 'https://yourdomain.com/84f109de2b4742a0b4e068ff21a8d11e.txt',
  host: 'cloudflow-analytics.io',
  enabledEngines: ['Bing', 'Yandex', 'Seznam', 'Naver'],
  lastPingTime: new Date(Date.now() - 3600000 * 3).toISOString(),
};

export const seedReports: SEOReport[] = [
  {
    id: 'rep-901',
    jobId: 'job-alpha-01',
    campaignName: 'TechSaaS DA 60+ Backlinks Push',
    clientName: 'Cloudflow Analytics Corp',
    targetDomain: 'https://cloudflow-analytics.io',
    generatedAt: new Date(Date.now() - 86400000).toISOString(),
    totalSubmitted: 12,
    totalIndexed: 10,
    indexRate: 83,
    tierBreakdown: [
      { tier: 'Tier 1 (High DA / Guest Post)', total: 4, indexed: 4, rate: 100 },
      { tier: 'Tier 2 (Web 2.0 / PBN / Contextual)', total: 5, indexed: 4, rate: 80 },
      { tier: 'Tier 3 (Social / Profile / Forum)', total: 3, indexed: 2, rate: 67 },
    ],
    domainDistribution: [
      { domain: 'techcrunch-digest.co', count: 1, indexed: 1 },
      { domain: 'venturebeat-network.org', count: 1, indexed: 1 },
      { domain: 'medium.com', count: 1, indexed: 1 },
      { domain: 'dev.to', count: 1, indexed: 1 },
      { domain: 'github.com', count: 1, indexed: 1 },
      { domain: 'hackernoon.com', count: 1, indexed: 1 },
      { domain: 'dzone.com', count: 1, indexed: 1 },
      { domain: 'hashnode.dev', count: 1, indexed: 1 },
      { domain: 'stackshare.io', count: 1, indexed: 1 },
      { domain: 'ghost.io', count: 1, indexed: 0 },
    ],
    statusDistribution: [
      { status: 'Indexed in Google SERP', count: 10 },
      { status: 'Crawled / Propagating', count: 1 },
      { status: 'Meta Noindex Detected', count: 1 },
    ],
    aiExecutiveSummary:
      'The indexing campaign has achieved an exceptional 83.3% indexation velocity within 48 hours. Tier 1 guest posts showed 100% crawl and cache retention across Google and Bing IndexNow endpoints. The overall anchor distribution is natural with low risk of algorithmic over-optimization.',
    recommendations: [
      'Resolve the <meta name="robots" content="noindex"> tag detected on the staging domain backlink to recover lost link juice.',
      'Maintain drip feed velocity below 25 URLs/day to align with Googlebot organic crawl budget expectations.',
      'Continue utilizing RSS syndication and XML sitemap pings alongside the Google Indexing API for maximum crawl frequency.',
    ],
  },
];

export const seedApiKeys: ApiKeyItem[] = [
  {
    id: 'key-prod-01',
    name: 'Production Webhooks Integration',
    key: 'idx_live_4f92bc31a89d419b8829ef10c79e8211',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    lastUsedAt: new Date(Date.now() - 1800000).toISOString(),
    requestsCount: 248,
  },
  {
    id: 'key-dev-02',
    name: 'Staging / QA Pipeline',
    key: 'idx_test_7a18df92019bc298d330fa42c9018e47',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    lastUsedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    requestsCount: 42,
  },
];

// ---------------------------------------------------------------------------
// Client-Side Simulation Helpers (Used on static deployments like GitHub Pages)
// ---------------------------------------------------------------------------

export function simulateLiveInspect(url: string) {
  let domain = 'example.com';
  try {
    domain = new URL(url).hostname;
  } catch {}

  const isNoindexDomain = url.includes('noindex') || url.includes('staging') || url.includes('draft');
  const httpStatus = isNoindexDomain ? 200 : 200;
  const isIndexed = !isNoindexDomain;
  const confidence = isNoindexDomain ? 12 : Math.floor(Math.random() * 10) + 90;

  return {
    url,
    domain,
    httpStatus,
    pageTitle: `${domain.split('.')[0].toUpperCase()} - Verified Web Content & Link Placement`,
    canonicalUrl: url,
    hasNoindex: isNoindexDomain,
    isBlockedByRobotsTxt: false,
    googlebotCrawled: true,
    isIndexed,
    indexConfidenceScore: confidence,
    googleSearchConsoleReady: !isNoindexDomain,
    inspectionTimestamp: new Date().toISOString(),
    diagnostics: isNoindexDomain
      ? 'Warning: Host page or header returned a meta robots noindex tag. Googlebot cannot index this URL.'
      : 'URL is live, crawlable with 200 OK status, proper canonical tags, and is actively indexed in Google search clusters.',
    headers: {
      'server': 'cloudflare',
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': isNoindexDomain ? 'noindex, follow' : 'index, follow',
      'cache-control': 'public, max-age=3600',
    },
  };
}

export function simulateSubmitCampaign(campaignData: {
  name: string;
  targetDomain: string;
  urls: string[];
  dripSpeed: DripSpeed;
  activeProtocols: string[];
  notes?: string;
}): IndexingJob {
  const speedLabels: Record<DripSpeed, string> = {
    instant: 'Instant Direct Blast',
    drip_3d: '3-Day Natural Velocity',
    drip_7d: '7-Day Organic Drip',
    drip_14d: '14-Day Safe Velocity',
    drip_30d: '30-Day Enterprise Drip',
  };

  const jobId = `job-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;
  const cleanTarget = campaignData.targetDomain.startsWith('http')
    ? campaignData.targetDomain
    : `https://${campaignData.targetDomain}`;

  const items: BacklinkItem[] = campaignData.urls.map((u, idx) => {
    let hostname = 'backlink-source.com';
    try {
      hostname = new URL(u).hostname;
    } catch {}

    const tiers: LinkTier[] = [
      'Tier 1 (High DA / Guest Post)',
      'Tier 2 (Web 2.0 / PBN / Contextual)',
      'Tier 3 (Social / Profile / Forum)',
    ];
    const tier = tiers[idx % 3];
    const isIndexed = idx % 5 !== 4; // 80% initial indexed simulation

    return {
      id: `lnk-${Date.now().toString(36)}-${idx}`,
      url: u,
      targetDomain: cleanTarget,
      anchorText: `anchor keyword #${idx + 1}`,
      tier,
      status: isIndexed ? 'indexed' : 'crawling',
      httpStatus: 200,
      pageTitle: `${hostname} - Feature Article #${idx + 1}`,
      canonicalUrl: u,
      hasNoindexTag: false,
      isBlockedByRobotsTxt: false,
      googlebotCrawledAt: new Date().toISOString(),
      indexedAt: isIndexed ? new Date().toISOString() : undefined,
      lastCheckedAt: new Date().toISOString(),
      indexConfidenceScore: isIndexed ? 92 + (idx % 8) : 75,
      pingResults: {
        googleApi: {
          success: true,
          status: 'URL_UPDATED published to Google Indexing API',
          timestamp: new Date().toISOString(),
          responseCode: 200,
        },
        indexNow: {
          success: true,
          timestamp: new Date().toISOString(),
          engine: 'Bing & Yandex',
          responseCode: 200,
        },
        sitemapPing: {
          success: true,
          timestamp: new Date().toISOString(),
          pingUrl: 'https://www.google.com/ping',
        },
      },
      diagnostics: 'Signal dispatched across Google Indexing API and IndexNow protocols.',
    };
  });

  const indexedCount = items.filter((i) => i.status === 'indexed').length;

  return {
    id: jobId,
    name: campaignData.name,
    targetDomain: cleanTarget,
    createdAt: new Date().toISOString(),
    dripSpeed: campaignData.dripSpeed,
    speedModeLabel: speedLabels[campaignData.dripSpeed] || '3-Day Velocity',
    totalLinks: items.length,
    indexedCount,
    crawledCount: items.length,
    submittedCount: items.length,
    failedCount: 0,
    status: 'active',
    activeProtocols: campaignData.activeProtocols as any,
    items,
    notes: campaignData.notes,
    feedUrl: `${cleanTarget}/feed-index-${jobId}.xml`,
    sitemapUrl: `${cleanTarget}/sitemap-index-${jobId}.xml`,
  };
}

export function simulateGenerateReport(job: IndexingJob, clientName: string): SEOReport {
  const total = job.totalLinks;
  const indexed = job.indexedCount;
  const rate = total > 0 ? Math.round((indexed / total) * 100) : 100;

  const tierMap: Record<string, { total: number; indexed: number }> = {};
  const domainMap: Record<string, { total: number; indexed: number }> = {};

  job.items.forEach((item) => {
    if (!tierMap[item.tier]) tierMap[item.tier] = { total: 0, indexed: 0 };
    tierMap[item.tier].total++;
    if (item.status === 'indexed') tierMap[item.tier].indexed++;

    let domain = 'external-source.com';
    try {
      domain = new URL(item.url).hostname;
    } catch {}
    if (!domainMap[domain]) domainMap[domain] = { total: 0, indexed: 0 };
    domainMap[domain].total++;
    if (item.status === 'indexed') domainMap[domain].indexed++;
  });

  const tierBreakdown = Object.entries(tierMap).map(([tier, val]) => ({
    tier,
    total: val.total,
    indexed: val.indexed,
    rate: val.total > 0 ? Math.round((val.indexed / val.total) * 100) : 0,
  }));

  const domainDistribution = Object.entries(domainMap).map(([domain, val]) => ({
    domain,
    count: val.total,
    indexed: val.indexed,
  }));

  return {
    id: `rep-${Date.now().toString(36)}`,
    jobId: job.id,
    campaignName: job.name,
    clientName,
    targetDomain: job.targetDomain,
    generatedAt: new Date().toISOString(),
    totalSubmitted: total,
    totalIndexed: indexed,
    indexRate: rate,
    tierBreakdown,
    domainDistribution,
    statusDistribution: [
      { status: 'Indexed in Google Search', count: indexed },
      { status: 'Crawled / Propagating', count: Math.max(0, total - indexed - job.failedCount) },
      { status: 'Issues / Blocked', count: job.failedCount },
    ],
    aiExecutiveSummary: `The "${job.name}" campaign has achieved a ${rate}% indexation rate across submitted backlink tiers. Direct Google Indexing API signals and IndexNow pings accelerated crawler discovery, resulting in verified cache retention for target domain ${job.targetDomain}.`,
    recommendations: [
      'Maintain organic link drip scheduling to avoid triggering algorithmic velocity anomalies.',
      'Regularly audit backlink canonical headers to prevent dilution of link equity.',
      'Re-ping any stalled Tier 2 or Tier 3 URLs through the XML Sitemap and RSS endpoints every 72 hours.',
    ],
  };
}
