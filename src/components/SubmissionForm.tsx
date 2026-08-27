import React, { useState, useMemo } from 'react';
import {
  Zap,
  Globe,
  Upload,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  CheckSquare,
  Square,
  FileText
} from 'lucide-react';
import { DripSpeed } from '../types';

interface SubmissionFormProps {
  onSubmit: (data: {
    name: string;
    targetDomain: string;
    urls: string[];
    dripSpeed: DripSpeed;
    activeProtocols: string[];
    notes?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  onSuccess?: () => void;
}

const SAMPLE_URLS = [
  'https://techcrunch-digest.co/cloud-monitoring-trends-2026',
  'https://medium.com/@devops_pro/top-saas-metrics-tools-review',
  'https://dev.to/cloudarchitects/optimizing-realtime-telemetry',
  'https://venturebeat-network.org/insights/modern-data-pipelines',
  'https://hashnode.com/@techpulse/infrastructure-monitoring-benchmark',
  'https://github.com/awesome-cloud-tools/curated-analytics-list',
  'https://producthunt.com/posts/cloudflow-v2-launch-discussion',
  'https://reddit.com/r/devops/comments/cloud_cost_optimization_guide',
];

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onSubmit,
  isSubmitting,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [targetDomain, setTargetDomain] = useState('https://mywebsite.com');
  const [rawUrls, setRawUrls] = useState('');
  const [dripSpeed, setDripSpeed] = useState<DripSpeed>('drip_3d');
  const [activeProtocols, setActiveProtocols] = useState<string[]>([
    'google_api',
    'index_now',
    'sitemap_ping',
    'ping_o_matic',
    'rss_syndicate',
  ]);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Real-time URL validation analysis
  const validation = useMemo(() => {
    const lines = rawUrls.split('\n').map((l) => l.trim()).filter(Boolean);
    const validUrls: string[] = [];
    const invalidLines: string[] = [];
    const duplicates: string[] = [];
    const seen = new Set<string>();

    for (const line of lines) {
      const isValid = line.startsWith('http://') || line.startsWith('https://');
      if (!isValid) {
        invalidLines.push(line);
      } else if (seen.has(line)) {
        duplicates.push(line);
      } else {
        seen.add(line);
        validUrls.push(line);
      }
    }

    return {
      totalLines: lines.length,
      validUrls,
      invalidLines,
      duplicates,
      isValidBatch: validUrls.length > 0 && invalidLines.length === 0,
    };
  }, [rawUrls]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setRawUrls(text);
        if (!name) {
          setName(file.name.replace(/\.[^/.]+$/, '') + ' Batch');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setName('High DA SaaS Backlinks Indexing Blast');
    setTargetDomain('https://cloudflow-analytics.io');
    setRawUrls(SAMPLE_URLS.join('\n'));
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleToggleProtocol = (proto: string) => {
    if (activeProtocols.includes(proto)) {
      if (activeProtocols.length === 1) return;
      setActiveProtocols(activeProtocols.filter((p) => p !== proto));
    } else {
      setActiveProtocols([...activeProtocols, proto]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please specify a Campaign Name.');
      return;
    }

    if (!targetDomain.trim() || (!targetDomain.startsWith('http://') && !targetDomain.startsWith('https://'))) {
      setErrorMsg('Target website domain must start with http:// or https://');
      return;
    }

    if (validation.validUrls.length === 0) {
      setErrorMsg('Please input at least one valid URL starting with http:// or https://');
      return;
    }

    if (validation.invalidLines.length > 0) {
      setErrorMsg(`Please fix or remove the ${validation.invalidLines.length} invalid URL format(s).`);
      return;
    }

    try {
      await onSubmit({
        name,
        targetDomain,
        urls: validation.validUrls,
        dripSpeed,
        activeProtocols,
        notes,
      });

      setSuccessMsg(`Successfully submitted ${validation.validUrls.length} backlinks to active indexing pipelines!`);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed');
    }
  };

  return (
    <div id="backlink-submission-form-container" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-4xl mx-auto text-slate-200">
      
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Submit Backlink URLs for Google Indexing</h2>
            <p className="text-xs text-slate-400">
              Validated multi-tier submission with automated Google Indexing API &amp; IndexNow protocol dispatch
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load Sample Backlinks</span>
        </button>
      </div>

      {/* Alert Notices */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        
        {/* Campaign Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Campaign Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="submission-campaign-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., DA 50+ Guest Posts April Batch"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Target Money Site URL <span className="text-rose-400">*</span>
            </label>
            <input
              id="submission-target-domain"
              type="url"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              placeholder="https://cloudflow-analytics.io"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs font-mono"
              required
            />
          </div>
        </div>

        {/* Backlinks Input & Validation Display */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-semibold text-slate-300 flex items-center gap-2">
              <span>Backlink URLs (One per line)</span>
              <span className="text-rose-400">*</span>
            </label>

            {/* Validation Badges */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {validation.validUrls.length} Valid
              </span>
              {validation.invalidLines.length > 0 && (
                <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  {validation.invalidLines.length} Invalid
                </span>
              )}
              {validation.duplicates.length > 0 && (
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {validation.duplicates.length} Duplicates Deduplicated
                </span>
              )}
            </div>
          </div>

          <textarea
            id="submission-raw-urls"
            rows={7}
            value={rawUrls}
            onChange={(e) => setRawUrls(e.target.value)}
            placeholder="https://techcrunch.com/article-1&#10;https://medium.com/@user/post-2&#10;https://dev.to/author/article-3"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-600 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
            required
          />

          {/* Drag & Drop / File Upload option */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Supports bulk paste from Ahrefs, Semrush, Moz, GSA, or CSV exports.</span>
            <label className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Import .txt or .csv</span>
              <input
                type="file"
                accept=".txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Invalid lines warning box */}
          {validation.invalidLines.length > 0 && (
            <div className="mt-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300">
              <strong>Invalid format detected on lines:</strong> {validation.invalidLines.slice(0, 3).join(', ')}
              {validation.invalidLines.length > 3 ? ` and ${validation.invalidLines.length - 3} more` : ''} (URLs must begin with http:// or https://)
            </div>
          )}
        </div>

        {/* Drip Velocity Controls */}
        <div>
          <label className="block font-semibold text-slate-300 mb-1.5">
            Indexing Velocity &amp; Natural Googlebot Drip Feed
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'instant', label: 'Instant Blast', desc: 'Push immediately to all APIs' },
              { id: 'drip_3d', label: '3-Day Smooth', desc: 'Optimal organic rate for 10-50 links' },
              { id: 'drip_7d', label: '7-Day Organic', desc: 'Best for 50-200 links velocity' },
              { id: 'drip_14d', label: '14-Day Safe', desc: 'Safe for heavy PBN / Web 2.0' },
            ].map((speed) => (
              <div
                key={speed.id}
                onClick={() => setDripSpeed(speed.id as DripSpeed)}
                className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  dripSpeed === speed.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs text-slate-200">{speed.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-snug">{speed.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Vector Protocols */}
        <div>
          <label className="block font-semibold text-slate-300 mb-1.5">
            Active Indexing Protocol Endpoints
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            <div
              onClick={() => handleToggleProtocol('google_api')}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                activeProtocols.includes('google_api')
                  ? 'bg-slate-800/90 border-emerald-500/50'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {activeProtocols.includes('google_api') ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <div className="font-bold text-slate-200">Google Indexing API</div>
                  <div className="text-[10px] text-slate-400">Direct Search Console URL_UPDATED broadcast</div>
                </div>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Googlebot
              </span>
            </div>

            <div
              onClick={() => handleToggleProtocol('index_now')}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                activeProtocols.includes('index_now')
                  ? 'bg-slate-800/90 border-blue-500/50'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {activeProtocols.includes('index_now') ? (
                  <CheckSquare className="w-4 h-4 text-blue-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <div className="font-bold text-slate-200">IndexNow Multi-Engine</div>
                  <div className="text-[10px] text-slate-400">Bing, Yandex, Seznam, Naver &amp; IndexNow</div>
                </div>
              </div>
              <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                Instant
              </span>
            </div>

            <div
              onClick={() => handleToggleProtocol('rss_syndicate')}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                activeProtocols.includes('rss_syndicate')
                  ? 'bg-slate-800/90 border-amber-500/50'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {activeProtocols.includes('rss_syndicate') ? (
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <div className="font-bold text-slate-200">RSS Syndication Feed</div>
                  <div className="text-[10px] text-slate-400">Generates live XML crawler discovery feed</div>
                </div>
              </div>
              <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Feed XML
              </span>
            </div>

            <div
              onClick={() => handleToggleProtocol('sitemap_ping')}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                activeProtocols.includes('sitemap_ping')
                  ? 'bg-slate-800/90 border-indigo-500/50'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {activeProtocols.includes('sitemap_ping') ? (
                  <CheckSquare className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <div className="font-bold text-slate-200">Search Engine Sitemaps Auto-Ping</div>
                  <div className="text-[10px] text-slate-400">Pings official search engine crawlers</div>
                </div>
              </div>
              <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                Ping
              </span>
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
          <button
            id="btn-submit-form-launch"
            type="submit"
            disabled={isSubmitting || validation.validUrls.length === 0 || validation.invalidLines.length > 0}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2 text-xs"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Indexing Protocols...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Start Indexing ({validation.validUrls.length} Valid Links)</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
