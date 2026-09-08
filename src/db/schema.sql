-- ========================================================
-- Google Backlink Indexer & SEO Reporter - PostgreSQL / MySQL Schema
-- Production-Ready Relational Database Structure
-- ========================================================

-- 1. Users Table (Authentication & Multi-Tenant Access)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120),
    role VARCHAR(32) DEFAULT 'client', -- 'admin', 'client', 'agency'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects & Clients Table (Grouping for Agency Reporting)
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    target_domain VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexing Campaigns / Jobs Table
CREATE TABLE IF NOT EXISTS indexing_jobs (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) REFERENCES projects(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255),
    target_domain VARCHAR(255) NOT NULL,
    drip_speed VARCHAR(32) DEFAULT 'drip_3d', -- 'instant', 'drip_3d', 'drip_7d', 'drip_14d', 'drip_30d'
    status VARCHAR(32) DEFAULT 'active', -- 'active', 'completed', 'paused', 'dripping'
    total_links INTEGER DEFAULT 0,
    indexed_count INTEGER DEFAULT 0,
    crawled_count INTEGER DEFAULT 0,
    submitted_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    active_protocols TEXT[] DEFAULT ARRAY['index_now', 'bing_webmaster', 'sitemap_ping', 'gsc_inspection'],
    feed_url TEXT,
    sitemap_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Backlink URLs Table (with Schema & Inspection State)
CREATE TABLE IF NOT EXISTS job_urls (
    id VARCHAR(64) PRIMARY KEY,
    job_id VARCHAR(64) REFERENCES indexing_jobs(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    target_domain VARCHAR(255),
    anchor_text VARCHAR(255),
    tier VARCHAR(64) DEFAULT 'Tier 1 (High DA / Guest Post)',
    status VARCHAR(32) DEFAULT 'queued', -- 'queued', 'processing', 'submitted', 'crawling', 'indexed', 'discovered_not_indexed', 'noindex_error', 'failed'
    http_status INTEGER DEFAULT 200,
    canonical_url TEXT,
    page_title TEXT,
    has_noindex BOOLEAN DEFAULT FALSE,
    is_blocked_by_robots BOOLEAN DEFAULT FALSE,
    
    -- Structured Data Audit
    has_json_ld BOOLEAN DEFAULT FALSE,
    has_microdata BOOLEAN DEFAULT FALSE,
    detected_schema_types JSONB DEFAULT '[]'::jsonb,
    is_google_api_eligible BOOLEAN DEFAULT FALSE, -- strictly JobPosting or BroadcastEvent
    schema_eligibility_notice TEXT,

    -- Search Console / SERP Verdict
    gsc_verdict VARCHAR(32) DEFAULT 'UNKNOWN', -- 'PASS', 'NEUTRAL', 'FAIL', 'UNKNOWN'
    gsc_coverage_state VARCHAR(120),
    gsc_last_crawl_time TIMESTAMP WITH TIME ZONE,
    index_confidence_score INTEGER DEFAULT 0,

    -- Multi-Channel Ping & Broadcast
    google_api_sent BOOLEAN DEFAULT FALSE,
    google_api_timestamp TIMESTAMP WITH TIME ZONE,
    indexnow_sent BOOLEAN DEFAULT FALSE,
    indexnow_timestamp TIMESTAMP WITH TIME ZONE,
    bing_webmaster_sent BOOLEAN DEFAULT FALSE,
    bing_webmaster_timestamp TIMESTAMP WITH TIME ZONE,
    sitemap_pinged BOOLEAN DEFAULT FALSE,
    
    retry_attempts INTEGER DEFAULT 0,
    last_error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Rate-Limited Throttling Queue
CREATE TABLE IF NOT EXISTS indexing_queue (
    id VARCHAR(64) PRIMARY KEY,
    job_url_id VARCHAR(64) REFERENCES job_urls(id) ON DELETE CASCADE,
    protocol VARCHAR(32) NOT NULL, -- 'google_api', 'index_now', 'bing_webmaster', 'sitemap_ping', 'gsc_inspection'
    status VARCHAR(32) DEFAULT 'pending', -- 'pending', 'throttling', 'processing', 'completed', 'failed'
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    delay_ms INTEGER DEFAULT 1000,
    scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP WITH TIME ZONE,
    last_error TEXT
);

-- 6. Historical Inspection & Audit Logs (Official GSC Audit Records)
CREATE TABLE IF NOT EXISTS inspection_logs (
    id VARCHAR(64) PRIMARY KEY,
    job_url_id VARCHAR(64) REFERENCES job_urls(id) ON DELETE CASCADE,
    inspection_source VARCHAR(64) NOT NULL, -- 'GSC_URL_INSPECTION_API', 'INDEXNOW_VERIFY', 'BING_API'
    verdict VARCHAR(32) NOT NULL,
    coverage_state VARCHAR(120),
    indexing_state VARCHAR(64),
    robots_txt_state VARCHAR(32),
    raw_response JSONB,
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Developer API Keys Table (Rate-Limited Keys)
CREATE TABLE IF NOT EXISTS api_keys (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    key_prefix VARCHAR(16) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    rate_limit_per_minute INTEGER DEFAULT 60,
    requests_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Client SEO Reports Table
CREATE TABLE IF NOT EXISTS seo_reports (
    id VARCHAR(64) PRIMARY KEY,
    job_id VARCHAR(64) REFERENCES indexing_jobs(id) ON DELETE CASCADE,
    campaign_name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    target_domain VARCHAR(255) NOT NULL,
    total_submitted INTEGER DEFAULT 0,
    total_indexed INTEGER DEFAULT 0,
    index_rate NUMERIC(5,2) DEFAULT 0.00,
    ai_executive_summary TEXT,
    recommendations JSONB DEFAULT '[]'::jsonb,
    full_report_data JSONB,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for ultra-fast query performance
CREATE INDEX IF NOT EXISTS idx_job_urls_job_id ON job_urls(job_id);
CREATE INDEX IF NOT EXISTS idx_job_urls_status ON job_urls(status);
CREATE INDEX IF NOT EXISTS idx_job_urls_is_eligible ON job_urls(is_google_api_eligible);
CREATE INDEX IF NOT EXISTS idx_queue_scheduled ON indexing_queue(scheduled_at, status);
CREATE INDEX IF NOT EXISTS idx_inspection_logs_url_id ON inspection_logs(job_url_id);
