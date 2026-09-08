import * as cheerio from 'cheerio';
import { StructuredDataAnalysis } from '../types';

/**
 * Recursively extracts all `@type` values from JSON-LD entities
 */
function extractSchemaTypes(obj: any, collected: Set<string>): void {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      extractSchemaTypes(item, collected);
    }
    return;
  }

  // Check @type property
  if (obj['@type']) {
    if (typeof obj['@type'] === 'string') {
      collected.add(obj['@type']);
    } else if (Array.isArray(obj['@type'])) {
      for (const t of obj['@type']) {
        if (typeof t === 'string') collected.add(t);
      }
    }
  }

  // Recursively inspect all properties (e.g. @graph, mainEntity, offers, etc.)
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      extractSchemaTypes(obj[key], collected);
    }
  }
}

/**
 * Inspects HTML content for structured data (schema.org JSON-LD and Microdata),
 * meta robots directives, canonical tags, and page title.
 */
export function analyzeHtmlForSchema(html: string, pageUrl?: string): StructuredDataAnalysis {
  const detectedTypes = new Set<string>();
  let hasJsonLd = false;
  let hasMicrodata = false;
  let hasNoindexTag = false;
  let canonicalUrl: string | undefined;
  let pageTitle: string | undefined;

  try {
    const $ = cheerio.load(html);

    // 1. Page Title
    pageTitle = $('title').text().trim() || undefined;

    // 2. Canonical Tag
    canonicalUrl = $('link[rel="canonical"]').attr('href')?.trim() || undefined;

    // 3. Meta Robots Directive
    const robotsMeta = $('meta[name="robots" i], meta[name="googlebot" i]').attr('content') || '';
    if (/noindex/i.test(robotsMeta)) {
      hasNoindexTag = true;
    }

    // 4. JSON-LD scripts
    $('script[type="application/ld+json"]').each((_, elem) => {
      hasJsonLd = true;
      try {
        const rawJson = $(elem).html();
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          extractSchemaTypes(parsed, detectedTypes);
        }
      } catch {
        // Skip malformed JSON-LD scripts
      }
    });

    // 5. Microdata Attributes (itemtype="https://schema.org/...")
    $('[itemtype]').each((_, elem) => {
      hasMicrodata = true;
      const itemTypeAttr = $(elem).attr('itemtype') || '';
      const matched = itemTypeAttr.match(/schema\.org\/([a-zA-Z0-9]+)/i);
      if (matched && matched[1]) {
        detectedTypes.add(matched[1]);
      }
    });
  } catch {
    // Fallback regex if cheerio encountered unexpected token
    const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = scriptRegex.exec(html)) !== null) {
      hasJsonLd = true;
      try {
        const parsed = JSON.parse(match[1]);
        extractSchemaTypes(parsed, detectedTypes);
      } catch {}
    }
  }

  const typesArray = Array.from(detectedTypes);

  // Google Indexing API strictly accepts JobPosting and BroadcastEvent
  const isEligible = typesArray.some(
    (t) => t.toLowerCase() === 'jobposting' || t.toLowerCase() === 'broadcastevent'
  );

  let eligibilityNotice: string;
  if (isEligible) {
    const eligibleTypes = typesArray.filter(
      (t) => t.toLowerCase() === 'jobposting' || t.toLowerCase() === 'broadcastevent'
    );
    eligibilityNotice = `✅ Eligible for Google Indexing API (${eligibleTypes.join(', ')} schema detected).`;
  } else if (typesArray.length > 0) {
    eligibilityNotice = `⚠️ Yeh URL Google Indexing API ke eligible criteria pe fit nahi baitha (Detected: ${typesArray.join(', ')}). Google Indexing API sirf JobPosting aur BroadcastEvent pages ke liye hai. IndexNow (Bing/Yandex) aur XML Sitemap method use hoga.`;
  } else {
    eligibilityNotice = `⚠️ Structured Data (Schema.org) missing hai. Google Indexing API sirf JobPosting / BroadcastEvent pages accept karti hai. Is URL ke liye Bing/Yandex IndexNow aur Sitemap Ping protocol use kiya jayega.`;
  }

  return {
    hasJsonLd,
    hasMicrodata,
    detectedTypes: typesArray,
    isGoogleIndexingApiEligible: isEligible,
    eligibilityNotice,
    hasNoindexTag,
    canonicalUrl,
    pageTitle,
    scannedAt: new Date().toISOString(),
  };
}

/**
 * Remote schema inspection for a live URL
 */
export async function fetchAndAnalyzeSchema(url: string, timeoutMs = 8000): Promise<StructuredDataAnalysis> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const xRobots = response.headers.get('x-robots-tag') || '';
    const hasHeaderNoindex = /noindex/i.test(xRobots);

    const html = await response.text();
    const analysis = analyzeHtmlForSchema(html, url);

    if (hasHeaderNoindex) {
      analysis.hasNoindexTag = true;
    }
    analysis.httpStatus = response.status;

    return analysis;
  } catch (err: any) {
    // If blocked or timed out, simulate heuristic or report error
    return {
      hasJsonLd: false,
      hasMicrodata: false,
      detectedTypes: [],
      isGoogleIndexingApiEligible: false,
      eligibilityNotice: `⚠️ Server connection issue (${err.message || 'Timeout'}). Google Indexing API is strictly reserved for JobPosting/BroadcastEvent schemas. Routing via Bing/Yandex IndexNow & XML Sitemaps.`,
      hasNoindexTag: false,
      httpStatus: 0,
      scannedAt: new Date().toISOString(),
    };
  }
}
