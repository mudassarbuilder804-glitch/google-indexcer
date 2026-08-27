import React, { useState } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  FileText,
  Download,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Search,
  Sparkles,
  Rss,
  Layers,
  Copy,
  Check,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { IndexingJob, BacklinkItem } from '../types';

interface JobDetailViewProps {
  job: IndexingJob;
  onBack: () => void;
  onRecheckItem: (jobId: string, itemId: string) => Promise<void>;
  onReindexJob: (jobId: string) => Promise<void>;
  onGenerateReport: (job: IndexingJob) => void;
  onOpenAiDiagnose: (item: BacklinkItem, targetDomain: string) => void;
  onOpenSerpCheck: (url?: string) => void;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({
  job,
  onBack,
  onRecheckItem,
  onReindexJob,
  onGenerateReport,
  onOpenAiDiagnose,
  onOpenSerpCheck,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'indexed' | 'crawling' | 'issues' | 'tier1' | 'tier2' | 'tier3'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [recheckingId, setRecheckingId] = useState<string | null>(null);
  const [isReindexingBatch, setIsReindexingBatch] = useState(false);

  const rate = job.totalLinks > 0 ? Math.round((job.indexedCount / job.totalLinks) * 100) : 0;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleRecheck = async (itemId: string) => {
    setRecheckingId(itemId);
    try {
      await onRecheckItem(job.id, itemId);
    } finally {
      setRecheckingId(null);
    }
  };

  const handleBatchReindex = async () => {
    setIsReindexingBatch(true);
    try {
      await onReindexJob(job.id);
    } finally {
      setIsReindexingBatch(false);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['URL', 'Anchor Text', 'Target Domain', 'Tier', 'Status', 'HTTP Status', 'Confidence Score', 'Canonical URL', 'Has Noindex Tag', 'Googlebot Crawled At', 'Indexed At'];
    const rows = job.items.map((i) => [
      `"${i.url}"`,
      `"${i.anchorText || ''}"`,
      `"${i.targetDomain || job.targetDomain}"`,
      `"${i.tier}"`,
      `"${i.status}"`,
      i.httpStatus || 200,
      `${i.indexConfidenceScore || 0}%`,
      `"${i.canonicalUrl || ''}"`,
      i.hasNoindexTag ? 'YES' : 'NO',
      `"${i.googlebotCrawledAt || ''}"`,
      `"${i.indexedAt || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Backlink_Indexing_Report_${job.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter items
  const filteredItems = job.items.filter((item) => {
    const matchesSearch =
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.anchorText && item.anchorText.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.pageTitle && item.pageTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterTab === 'indexed') return item.status === 'indexed';
    if (filterTab === 'crawling') return item.status === 'crawling' || item.status === 'submitted';
    if (filterTab === 'issues') return item.status === 'noindex_error' || item.status === 'not_found' || item.status === 'failed';
    if (filterTab === 'tier1') return item.tier.includes('Tier 1');
    if (filterTab === 'tier2') return item.tier.includes('Tier 2');
    if (filterTab === 'tier3') return item.tier.includes('Tier 3');
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            id="btn-back-to-dashboard"
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {job.name}
            </h1>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Target Domain:</span>
              <a
                href={job.targetDomain}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline font-mono flex items-center gap-1"
              >
                {job.targetDomain}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-reindex-batch-top"
            onClick={handleBatchReindex}
            disabled={isReindexingBatch}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReindexingBatch ? 'animate-spin' : ''}`} />
            <span>Force Re-Index All</span>
          </button>

          <button
            id="btn-generate-report-detail"
            onClick={() => onGenerateReport(job)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Client SEO Report</span>
          </button>

          <button
            id="btn-export-csv"
            onClick={handleExportCsv}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>

          {job.feedUrl && (
            <a
              href={job.feedUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 transition"
              title="Open Dynamic RSS Feed XML for Googlebot & Crawlers"
            >
              <Rss className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Campaign Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Backlinks</span>
          <div className="text-2xl font-black text-white mt-1">{job.totalLinks}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{job.speedModeLabel}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Google Index Rate</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{rate}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${rate}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Indexed in Google</span>
          <div className="text-2xl font-black text-white mt-1">
            {job.indexedCount} <span className="text-xs text-slate-500 font-normal">/ {job.totalLinks}</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Active in Google SERP
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Robots / 404 Issues</span>
          <div className={`text-2xl font-black mt-1 ${job.failedCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
            {job.failedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {job.failedCount > 0 ? 'Requires attention' : 'Zero crawl blockers'}
          </div>
        </div>

      </div>

      {/* Filter Tabs & Search Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `All (${job.items.length})` },
              { id: 'indexed', label: `Indexed (${job.items.filter((i) => i.status === 'indexed').length})` },
              { id: 'crawling', label: `In Pipeline (${job.items.filter((i) => i.status === 'crawling' || i.status === 'submitted').length})` },
              { id: 'issues', label: `Issues (${job.items.filter((i) => i.status === 'noindex_error' || i.status === 'not_found').length})` },
              { id: 'tier1', label: 'Tier 1' },
              { id: 'tier2', label: 'Tier 2' },
              { id: 'tier3', label: 'Tier 3' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterTab === tab.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by URL, anchor, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-full sm:w-72"
            />
          </div>
        </div>

        {/* Backlinks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Backlink URL & Page Title</th>
                <th className="py-3 px-4">Anchor Text</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Index Status</th>
                <th className="py-3 px-4">Googlebot Signals</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No backlink URLs found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isIndexed = item.status === 'indexed';
                  const isNoindex = item.status === 'noindex_error';
                  const isCrawling = item.status === 'crawling' || item.status === 'submitted';

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      
                      {/* URL & Page Title */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex items-center space-x-1.5">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-slate-100 hover:text-indigo-400 truncate max-w-xs block font-mono text-[11px]"
                            title={item.url}
                          >
                            {item.url}
                          </a>
                          <button
                            onClick={() => handleCopy(item.url)}
                            className="text-slate-500 hover:text-slate-300 p-0.5"
                            title="Copy URL"
                          >
                            {copiedUrl === item.url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        {item.pageTitle && (
                          <div className="text-[11px] text-slate-400 truncate mt-0.5" title={item.pageTitle}>
                            {item.pageTitle}
                          </div>
                        )}
                        {item.diagnostics && (
                          <div className="text-[10px] text-slate-500 mt-1 line-clamp-1 italic">
                            {item.diagnostics}
                          </div>
                        )}
                      </td>

                      {/* Anchor Text */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          {item.anchorText || 'N/A'}
                        </span>
                      </td>

                      {/* Tier Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.tier.includes('Tier 1')
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : item.tier.includes('Tier 2')
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {item.tier.split(' ')[0]} {item.tier.split(' ')[1]}
                        </span>
                      </td>

                      {/* Index Status */}
                      <td className="py-3.5 px-4">
                        {isIndexed ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            Indexed ({item.indexConfidenceScore || 95}%)
                          </span>
                        ) : isNoindex ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1 w-fit">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            Noindex Meta Error
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3 text-amber-400" />
                            Googlebot Crawling
                          </span>
                        )}
                      </td>

                      {/* Googlebot Signals */}
                      <td className="py-3.5 px-4 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-emerald-400">HTTP {item.httpStatus || 200}</span>
                          <span>•</span>
                          <span>{item.hasNoindexTag ? 'Noindex Tag' : 'Indexable'}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {item.indexedAt
                            ? `Indexed ${new Date(item.indexedAt).toLocaleDateString()}`
                            : `Crawled ${new Date(item.googlebotCrawledAt || item.lastCheckedAt || Date.now()).toLocaleTimeString()}`}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          
                          {/* Live Inspect */}
                          <button
                            onClick={() => onOpenSerpCheck(item.url)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="Inspect in Live SERP Inspector"
                          >
                            <Search className="w-3.5 h-3.5 text-indigo-400" />
                          </button>

                          {/* AI Link Diagnoser */}
                          <button
                            onClick={() => onOpenAiDiagnose(item, job.targetDomain)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-indigo-900/50 text-indigo-300 hover:text-indigo-200 transition"
                            title="Gemini AI Indexability & Anchor Diagnosis"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          {/* Re-Check Probe */}
                          <button
                            onClick={() => handleRecheck(item.id)}
                            disabled={recheckingId === item.id}
                            className="p-1.5 rounded bg-slate-800 hover:bg-emerald-900/50 text-emerald-300 hover:text-emerald-200 transition disabled:opacity-50"
                            title="Live Re-probe URL headers"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${recheckingId === item.id ? 'animate-spin' : ''}`} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
