import {
  IndexingJob,
  GoogleServiceAccountConfig,
  IndexNowConfig,
  BingWebmasterConfig,
  SEOReport,
  ApiKeyItem,
  BacklinkItem,
  StructuredDataAnalysis,
  GscInspectionVerdict,
} from '../types';

export const seedBingConfig: BingWebmasterConfig = {
  apiKey: '8a9f4c3b2e1d0f5a7b9c1d3e5f7a9b1c',
  siteUrl: 'https://cloudflow-analytics.io',
  isVerified: true,
  dailyQuotaUsed: 42,
  dailyQuotaMax: 10000,
  lastSubmissionTime: new Date(Date.now() - 7200000).toISOString(),
};

export const seedGoogleConfig: GoogleServiceAccountConfig = {
  clientEmail: 'indexing-bot@seo-accelerator-project.iam.gserviceaccount.com',
  projectId: 'seo-accelerator-project',
  privateKeyConfigured: true,
  isVerified: true,
  dailyQuotaUsed: 68,
  dailyQuotaMax: 200,
  lastResetTime: new Date().toISOString(),
  gscPropertyUrl: 'sc-domain:cloudflow-analytics.io',
};

export const seedIndexNowConfig: IndexNowConfig = {
  key: '8f7d92a10b4e45c7931f28b7e3e9d841',
  keyLocationUrl: 'https://cloudflow-analytics.io/8f7d92a10b4e45c7931f28b7e3e9d841.txt',
  host: 'cloudflow-analytics.io',
  enabledEngines: ['Bing', 'Yandex', 'Seznam', 'Naver'],
  lastPingTime: new Date(Date.now() - 3600000).toISOString(),
  dailySubmissions: 120,
};

export const seedApiKeys: ApiKeyItem[] = [
  {
    id: 'key_1',
    name: 'Production Link Builder API',
    key: 'gidx_live_99f3a8b2c41e410a97b4c6e9314',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    lastUsedAt: new Date(Date.now() - 1800000).toISOString(),
    requestsCount: 342,
    rateLimitPerMinute: 60,
  },
  {
    id: 'key_2',
    name: 'Zapier / Make.com Webhook Key',
    key: 'gidx_live_41a87b92cd3411e89b21f00a289',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastUsedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    requestsCount: 89,
    rateLimitPerMinute: 60,
  },
];

export const seedJobs: IndexingJob[] = [
  {
    id: 'job-alpha-01',
    name: 'TechSaaS DA 60+ Backlinks Push',
    clientName: 'Cloudflow Analytics Corp',
    projectName: 'Enterprise SEO Growth',
    targetDomain: 'https://cloudflow-analytics.io',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    dripSpeed: 'drip_3d',
    speedModeLabel: '3-Day Natural Velocity',
    totalLinks: 6,
    indexedCount: 5,
    crawledCount: 6,
    submittedCount: 6,
    failedCount: 1,
    status: 'active',
    activeProtocols: ['google_api', 'index_now', 'bing_webmaster', 'sitemap_ping', 'gsc_inspection'],
    feedUrl: 'https://cloudflow-analytics.io/rss-feed.xml',
    sitemapUrl: 'https://cloudflow-analytics.io/sitemap.xml',
    eligibleGoogleApiCount: 1,
    ineligibleGoogleApiCount: 5,
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
        structuredData: {
          hasJsonLd: true,
          hasMicrodata: false,
          detectedTypes: ['Article', 'Organization'],
          isGoogleIndexingApiEligible: false,
          eligibilityNotice:
            '⚠️ Yeh URL Google Indexing API ke eligible criteria pe fit nahi baitha (Detected: Article, Organization). Google Indexing API sirf JobPosting aur BroadcastEvent pages ke liye hai. IndexNow (Bing/Yandex) aur XML Sitemap method use hoga.',
          hasNoindexTag: false,
          scannedAt: new Date().toISOString(),
        },
        gscVerdict: {
          verdict: 'PASS',
          coverageState: 'Submitted and indexed',
          indexingState: 'INDEXING_ALLOWED',
          robotsTxtState: 'ALLOWED',
          lastCrawlTime: new Date(Date.now() - 3600000 * 18).toISOString(),
          crawledAs: 'GOOGLEBOT_MOBILE',
          inspectedAt: new Date().toISOString(),
        },
        pingResults: {
          googleApi: {
            success: true,
            status: 'URL_UPDATED (Fallback: Policy Notice Logged)',
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            responseCode: 200,
            isEligibleSchema: false,
            complianceNote: 'Warning: Page lacks JobPosting/BroadcastEvent schema.',
          },
          indexNow: {
            success: true,
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            engine: 'Bing, Yandex, Seznam, Naver',
            responseCode: 200,
          },
          bingWebmaster: {
            success: true,
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            responseCode: 200,
            batchId: 'bing_batch_tc912',
          },
          sitemapPing: {
            success: true,
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            pingUrl: 'https://cloudflow-analytics.io/sitemap.xml',
          },
        },
        diagnostics: 'Verified in Official GSC URL Inspection. Coverage: Submitted and indexed.',
      },
      {
        id: 'lnk-102',
        url: 'https://careers.cloudflow-analytics.io/jobs/lead-devops-engineer',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'DevOps careers at Cloudflow',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Lead DevOps Engineer - Careers at Cloudflow',
        canonicalUrl: 'https://careers.cloudflow-analytics.io/jobs/lead-devops-engineer',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 100,
        structuredData: {
          hasJsonLd: true,
          hasMicrodata: false,
          detectedTypes: ['JobPosting', 'Organization'],
          isGoogleIndexingApiEligible: true,
          eligibilityNotice: '✅ Eligible for Google Indexing API (JobPosting schema detected).',
          hasNoindexTag: false,
          scannedAt: new Date().toISOString(),
        },
        gscVerdict: {
          verdict: 'PASS',
          coverageState: 'Submitted and indexed',
          indexingState: 'INDEXING_ALLOWED',
          robotsTxtState: 'ALLOWED',
          lastCrawlTime: new Date(Date.now() - 3600000 * 24).toISOString(),
          crawledAs: 'GOOGLEBOT_MOBILE',
          inspectedAt: new Date().toISOString(),
        },
        pingResults: {
          googleApi: {
            success: true,
            status: 'URL_UPDATED published via Google Indexing API',
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            responseCode: 200,
            isEligibleSchema: true,
            complianceNote: 'JobPosting structured data parsed and verified by Googlebot.',
          },
          indexNow: {
            success: true,
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            engine: 'Bing, Yandex, Seznam, Naver',
            responseCode: 200,
          },
        },
        diagnostics: '100% Google Indexing API Schema compliant.',
      },
      {
        id: 'lnk-103',
        url: 'https://software-directory-hub.biz/listings/cloudflow',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'Cloudflow Analytics Software',
        tier: 'Tier 3 (Social / Profile / Forum)',
        status: 'noindex_error',
        httpStatus: 200,
        pageTitle: 'Cloudflow - Software Directory Hub',
        hasNoindexTag: true,
        isBlockedByRobotsTxt: false,
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 10,
        structuredData: {
          hasJsonLd: false,
          hasMicrodata: false,
          detectedTypes: [],
          isGoogleIndexingApiEligible: false,
          eligibilityNotice: '⚠️ Structured Data missing & <meta name="robots" content="noindex"> tag detected.',
          hasNoindexTag: true,
          scannedAt: new Date().toISOString(),
        },
        gscVerdict: {
          verdict: 'FAIL',
          coverageState: 'Excluded by noindex tag',
          indexingState: 'BLOCKED_BY_META_TAG',
          robotsTxtState: 'ALLOWED',
          lastCrawlTime: new Date(Date.now() - 86400000).toISOString(),
          crawledAs: 'GOOGLEBOT_MOBILE',
          inspectedAt: new Date().toISOString(),
        },
        pingResults: {
          indexNow: {
            success: true,
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            engine: 'Bing & Yandex',
            responseCode: 200,
          },
        },
        diagnostics: 'CRITICAL: The page has a "noindex" robots tag preventing Google and Bing indexing.',
      },
      {
        id: 'lnk-104',
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
        structuredData: {
          hasJsonLd: true,
          hasMicrodata: false,
          detectedTypes: ['NewsArticle', 'Organization'],
          isGoogleIndexingApiEligible: false,
          eligibilityNotice: '⚠️ NewsArticle schema detected. Routed through Bing/Yandex IndexNow & XML Sitemap ping.',
          hasNoindexTag: false,
          scannedAt: new Date().toISOString(),
        },
        gscVerdict: {
          verdict: 'PASS',
          coverageState: 'Submitted and indexed',
          indexingState: 'INDEXING_ALLOWED',
          robotsTxtState: 'ALLOWED',
          inspectedAt: new Date().toISOString(),
        },
        pingResults: {
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'Bing, Yandex, Seznam, Naver' },
          bingWebmaster: { success: true, timestamp: new Date().toISOString(), batchId: 'b_91a03' },
        },
        diagnostics: 'Live Google cache verified. Indexed in search cluster.',
      },
      {
        id: 'lnk-105',
        url: 'https://medium.com/@devops_pro/top-saas-metrics-tools-review',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloud analytics tool',
        tier: 'Tier 2 (Web 2.0 / PBN / Contextual)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Top SaaS Metrics Tools Review - Medium',
        canonicalUrl: 'https://medium.com/@devops_pro/top-saas-metrics-tools-review',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 92,
        structuredData: {
          hasJsonLd: true,
          hasMicrodata: false,
          detectedTypes: ['BlogPosting'],
          isGoogleIndexingApiEligible: false,
          eligibilityNotice: '⚠️ BlogPosting schema detected. IndexNow & Sitemap method used.',
          hasNoindexTag: false,
          scannedAt: new Date().toISOString(),
        },
        gscVerdict: {
          verdict: 'PASS',
          coverageState: 'Submitted and indexed',
          indexingState: 'INDEXING_ALLOWED',
          robotsTxtState: 'ALLOWED',
          inspectedAt: new Date().toISOString(),
        },
        pingResults: {
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'Bing, Yandex, Seznam, Naver' },
        },
        diagnostics: 'Indexed with Medium canonical link preservation.',
      },
      {
        id: 'lnk-106',
        url: 'https://github.com/awesome-cloud-tools/curated-analytics-list',
        targetDomain: 'https://cloudflow-analytics.io',
        anchorText: 'cloudflow-analytics repository',
        tier: 'Tier 1 (High DA / Guest Post)',
        status: 'indexed',
        httpStatus: 200,
        pageTitle: 'Awesome Curated Cloud Analytics List - GitHub',
        hasNoindexTag: false,
        isBlockedByRobotsTxt: false,
        googlebotCrawledAt: new Date(Date.now() - 86400000).toISOString(),
        indexedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        lastCheckedAt: new Date().toISOString(),
        indexConfidenceScore: 99,
        structuredData: {
          hasJsonLd: false,
          hasMicrodata: false,
          detectedTypes: [],
          isGoogleIndexingApiEligible: false,
          eligibilityNotice: '⚠️ GitHub markdown list. Dispatched to Bing IndexNow & Sitemap pings.',
          hasNoindexTag: false,
          scannedAt: new Date().toISOString(),
        },
        gscVerdict: {
          verdict: 'PASS',
          coverageState: 'Submitted and indexed',
          indexingState: 'INDEXING_ALLOWED',
          robotsTxtState: 'ALLOWED',
          inspectedAt: new Date().toISOString(),
        },
        pingResults: {
          indexNow: { success: true, timestamp: new Date().toISOString(), engine: 'Bing, Yandex, Seznam, Naver' },
        },
        diagnostics: 'GitHub Page authority ensures rapid Googlebot discovery.',
      },
    ],
  },
];

export const seedReports: SEOReport[] = [
  {
    id: 'rep-001',
    jobId: 'job-alpha-01',
    campaignName: 'TechSaaS DA 60+ Backlinks Push',
    clientName: 'Cloudflow Analytics Corp',
    projectName: 'Enterprise SEO Growth',
    targetDomain: 'https://cloudflow-analytics.io',
    generatedAt: new Date(Date.now() - 86400000).toISOString(),
    totalSubmitted: 6,
    totalIndexed: 5,
    indexRate: 83.3,
    tierBreakdown: [
      { tier: 'Tier 1 (High DA / Guest Post)', total: 3, indexed: 3, rate: 100 },
      { tier: 'Tier 2 (Web 2.0 / PBN / Contextual)', total: 1, indexed: 1, rate: 100 },
      { tier: 'Tier 3 (Social / Profile / Forum)', total: 2, indexed: 1, rate: 50 },
    ],
    domainDistribution: [
      { domain: 'techcrunch-digest.co', count: 1, indexed: 1 },
      { domain: 'venturebeat-network.org', count: 1, indexed: 1 },
      { domain: 'medium.com', count: 1, indexed: 1 },
      { domain: 'github.com', count: 1, indexed: 1 },
      { domain: 'careers.cloudflow-analytics.io', count: 1, indexed: 1 },
      { domain: 'software-directory-hub.biz', count: 1, indexed: 0 },
    ],
    statusDistribution: [
      { status: 'Indexed (Google SERP / GSC)', count: 5 },
      { status: 'Robots Noindex Error', count: 1 },
    ],
    schemaBreakdown: {
      eligibleGoogleApi: 1,
      ineligibleGoogleApi: 5,
      schemaTypesFound: {
        JobPosting: 1,
        Article: 1,
        NewsArticle: 1,
        BlogPosting: 1,
        None: 2,
      },
    },
    aiExecutiveSummary:
      'Campaign achieved an 83.3% indexation rate within 48 hours. The official Google Search Console URL Inspection API confirmed indexing for 5 out of 6 URLs. One directory submission was flagged with a noindex directive. Multi-channel indexing via Bing/Yandex IndexNow and XML Sitemap Ping secured immediate crawler hits.',
    recommendations: [
      'Contact software-directory-hub.biz webmaster to replace "noindex" meta directive with indexable headers.',
      'Remember: Indexing != Ranking. While links are indexed, ensure high topical relevance for primary target keywords.',
      'For URLs lacking JobPosting or BroadcastEvent schema, utilize Bing/Yandex IndexNow and XML Sitemap pings rather than Google Indexing API to adhere to Google webmaster guidelines.',
    ],
  },
];

/**
 * Client-side simulation of URL validation and submission
 */
export function simulateSubmitCampaign(data: {
  name: string;
  targetDomain: string;
  clientName?: string;
  projectName?: string;
  urls: string | string[];
  dripSpeed?: any;
  activeProtocols?: any[];
  tierMap?: Record<string, any>;
  anchorMap?: Record<string, any>;
}): IndexingJob {
  const rawSegments = !data.urls
    ? []
    : Array.isArray(data.urls)
    ? data.urls.map((u) => (typeof u === 'string' ? u : String(u ?? '')))
    : typeof data.urls === 'string'
    ? data.urls.split(/[\r\n,;]+/)
    : [String(data.urls)];

  const seen = new Set<string>();
  const cleanUrls: string[] = [];

  for (const raw of rawSegments) {
    const splitParts = (typeof raw === 'string' ? raw : String(raw || '')).split(/[\r\n,;]+/);
    for (const u of splitParts) {
      const trimmed = typeof u === 'string' ? u.trim() : String(u || '').trim();
      if (trimmed && (trimmed.startsWith('http://') || trimmed.startsWith('https://'))) {
        const lower = trimmed.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          cleanUrls.push(trimmed);
        }
      }
    }
  }

  const jobId = `job-${Date.now().toString(36)}`;
  let eligibleCount = 0;
  let ineligibleCount = 0;

  const items: BacklinkItem[] = cleanUrls.map((url, idx) => {
    const isJobPosting = url.includes('job') || url.includes('career') || url.includes('hiring');
    const isNoIndex = url.includes('noindex') || url.includes('error');

    if (isJobPosting) eligibleCount++;
    else ineligibleCount++;

    const schemaInfo: StructuredDataAnalysis = {
      hasJsonLd: true,
      hasMicrodata: false,
      detectedTypes: isJobPosting ? ['JobPosting', 'Organization'] : ['Article', 'WebPage'],
      isGoogleIndexingApiEligible: isJobPosting,
      eligibilityNotice: isJobPosting
        ? '✅ Eligible for Google Indexing API (JobPosting schema detected).'
        : '⚠️ Yeh URL Google Indexing API ke eligible criteria pe fit nahi baitha (Detected: Article). IndexNow (Bing/Yandex) aur Sitemap methods use kiye jayenge.',
      hasNoindexTag: isNoIndex,
      canonicalUrl: url,
      httpStatus: isNoIndex ? 403 : 200,
      scannedAt: new Date().toISOString(),
    };

    const gsc: GscInspectionVerdict = {
      verdict: isNoIndex ? 'FAIL' : 'PASS',
      coverageState: isNoIndex ? 'Excluded by noindex tag' : 'Submitted and indexed',
      indexingState: isNoIndex ? 'BLOCKED_BY_META_TAG' : 'INDEXING_ALLOWED',
      robotsTxtState: 'ALLOWED',
      lastCrawlTime: new Date().toISOString(),
      crawledAs: 'GOOGLEBOT_MOBILE',
      inspectedAt: new Date().toISOString(),
    };

    return {
      id: `lnk-${Date.now().toString(36)}-${idx}`,
      url,
      targetDomain: data.targetDomain,
      anchorText: data.anchorMap?.[url] || 'Visit Official Site',
      tier: data.tierMap?.[url] || (idx % 2 === 0 ? 'Tier 1 (High DA / Guest Post)' : 'Tier 2 (Web 2.0 / PBN / Contextual)'),
      status: isNoIndex ? 'noindex_error' : 'indexed',
      httpStatus: isNoIndex ? 403 : 200,
      canonicalUrl: url,
      hasNoindexTag: isNoIndex,
      isBlockedByRobotsTxt: false,
      googlebotCrawledAt: new Date().toISOString(),
      indexedAt: isNoIndex ? undefined : new Date().toISOString(),
      lastCheckedAt: new Date().toISOString(),
      indexConfidenceScore: isNoIndex ? 15 : 97,
      structuredData: schemaInfo,
      gscVerdict: gsc,
      pingResults: {
        googleApi: {
          success: true,
          status: isJobPosting ? 'URL_UPDATED (JobPosting Schema Compliant)' : 'URL_UPDATED (Bypassed with notice)',
          timestamp: new Date().toISOString(),
          responseCode: 200,
          isEligibleSchema: isJobPosting,
          complianceNote: isJobPosting
            ? 'Schema matches Google Indexing API rules.'
            : 'Notice: Non-job URL. Recommended to use Bing/Yandex IndexNow & XML Sitemap pings.',
        },
        indexNow: {
          success: true,
          timestamp: new Date().toISOString(),
          engine: 'Bing, Yandex, Seznam, Naver',
          responseCode: 200,
        },
        bingWebmaster: {
          success: true,
          timestamp: new Date().toISOString(),
          responseCode: 200,
          batchId: `bing_${Date.now().toString(36)}`,
        },
        sitemapPing: {
          success: true,
          timestamp: new Date().toISOString(),
          pingUrl: `${data.targetDomain}/sitemap.xml`,
        },
      },
      diagnostics: isNoIndex ? 'Noindex tag detected on page.' : 'Verified via Official GSC URL Inspection.',
    };
  });

  const indexedCount = items.filter((i) => i.status === 'indexed').length;
  const failedCount = items.filter((i) => i.status === 'noindex_error' || i.status === 'failed').length;

  return {
    id: jobId,
    name: data.name,
    clientName: data.clientName || 'General Client',
    projectName: data.projectName || 'Default Project',
    targetDomain: data.targetDomain,
    createdAt: new Date().toISOString(),
    dripSpeed: data.dripSpeed || 'drip_3d',
    speedModeLabel: '3-Day Drip Velocity',
    totalLinks: items.length,
    indexedCount,
    crawledCount: items.length,
    submittedCount: items.length,
    failedCount,
    status: 'active',
    activeProtocols: data.activeProtocols || ['google_api', 'index_now', 'bing_webmaster', 'sitemap_ping', 'gsc_inspection'],
    feedUrl: `${data.targetDomain}/rss-feed.xml`,
    sitemapUrl: `${data.targetDomain}/sitemap.xml`,
    eligibleGoogleApiCount: eligibleCount,
    ineligibleGoogleApiCount: ineligibleCount,
    items,
  };
}

/**
 * Client-side simulation of live inspect
 */
export function simulateLiveInspect(url: string) {
  const isNoindex = url.includes('noindex') || url.includes('private');
  const isJob = url.includes('job') || url.includes('career');

  return {
    url,
    httpStatus: isNoindex ? 403 : 200,
    hasNoindex: isNoindex,
    isBlockedByRobots: false,
    pageTitle: `${url.split('/')[2] || 'Web'} - Page Audit`,
    canonicalUrl: url,
    isIndexed: !isNoindex,
    confidenceScore: isNoindex ? 10 : 96,
    diagnostics: isNoindex
      ? 'Noindex tag detected in page headers.'
      : 'Official GSC Inspection indicates URL is indexed and served in search.',
    structuredData: {
      hasJsonLd: true,
      hasMicrodata: false,
      detectedTypes: isJob ? ['JobPosting', 'Organization'] : ['Article', 'WebPage'],
      isGoogleIndexingApiEligible: isJob,
      eligibilityNotice: isJob
        ? '✅ Eligible for Google Indexing API (JobPosting schema detected).'
        : '⚠️ Yeh URL Google Indexing API ke eligible criteria pe fit nahi baitha (Detected: Article). IndexNow (Bing/Yandex) aur Sitemap method use hoga.',
      hasNoindexTag: isNoindex,
      scannedAt: new Date().toISOString(),
    },
    gscVerdict: {
      verdict: isNoindex ? 'FAIL' : 'PASS',
      coverageState: isNoindex ? 'Excluded by noindex tag' : 'Submitted and indexed',
      indexingState: isNoindex ? 'BLOCKED_BY_META_TAG' : 'INDEXING_ALLOWED',
      robotsTxtState: 'ALLOWED',
      lastCrawlTime: new Date(Date.now() - 3600000 * 5).toISOString(),
      crawledAs: 'GOOGLEBOT_MOBILE',
      inspectedAt: new Date().toISOString(),
    },
  };
}

/**
 * Client-side simulation of report generation
 */
export function simulateGenerateReport(job: IndexingJob, clientName: string): SEOReport {
  const total = job.totalLinks;
  const indexed = job.indexedCount;
  const rate = total > 0 ? Math.round((indexed / total) * 1000) / 10 : 0;

  return {
    id: `rep-${Date.now().toString(36)}`,
    jobId: job.id,
    campaignName: job.name,
    clientName,
    projectName: job.projectName || 'SEO Campaign',
    targetDomain: job.targetDomain,
    generatedAt: new Date().toISOString(),
    totalSubmitted: total,
    totalIndexed: indexed,
    indexRate: rate,
    tierBreakdown: [
      { tier: 'Tier 1 (High DA / Guest Post)', total: Math.ceil(total * 0.5), indexed: Math.ceil(indexed * 0.6), rate: 95 },
      { tier: 'Tier 2 (Web 2.0 / PBN / Contextual)', total: Math.floor(total * 0.3), indexed: Math.floor(indexed * 0.3), rate: 80 },
      { tier: 'Tier 3 (Social / Profile / Forum)', total: Math.floor(total * 0.2), indexed: Math.floor(indexed * 0.1), rate: 60 },
    ],
    domainDistribution: [
      { domain: 'techcrunch-digest.co', count: 1, indexed: 1 },
      { domain: 'venturebeat-network.org', count: 1, indexed: 1 },
      { domain: 'medium.com', count: 1, indexed: 1 },
    ],
    statusDistribution: [
      { status: 'Indexed (Google SERP / GSC)', count: indexed },
      { status: 'Errors / Excluded', count: total - indexed },
    ],
    schemaBreakdown: {
      eligibleGoogleApi: job.eligibleGoogleApiCount || 1,
      ineligibleGoogleApi: job.ineligibleGoogleApiCount || Math.max(0, total - 1),
      schemaTypesFound: {
        JobPosting: job.eligibleGoogleApiCount || 1,
        Article: Math.max(0, total - 1),
      },
    },
    aiExecutiveSummary: `Executive Indexation Audit for ${clientName}: Campaign achieved a ${rate}% indexation velocity across search networks. Google Search Console URL inspection confirms coverage for indexable assets, with IndexNow protocol delivering immediate discovery on Bing and Yandex.`,
    recommendations: [
      'Remember: Indexing != Ranking. Focus high-value contextual anchors towards priority landing pages.',
      'Ensure pages with schema JobPosting or BroadcastEvent use Google Indexing API; route all other content via IndexNow and XML Sitemap feeds.',
      'Regularly audit backlink targets to verify noindex tags have not been unintentionally injected.',
    ],
  };
}
