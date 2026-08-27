import React, { useState } from 'react';
import {
  X,
  Zap,
  Globe,
  Clock,
  Layers,
  CheckSquare,
  Square,
  Sparkles,
  AlertCircle,
  FileText,
  ShieldCheck,
  Rss
} from 'lucide-react';
import { DripSpeed } from '../types';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaignData: {
    name: string;
    targetDomain: string;
    urls: string[];
    dripSpeed: DripSpeed;
    activeProtocols: string[];
    notes?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}

const SAMPLE_URLS = [
  'https://techcrunch-daily.co/best-cloud-infrastructure-2026',
  'https://medium.com/@devops_master/modern-analytics-architecture-review',
  'https://dev.to/fullstackpro/optimizing-high-throughput-pipelines',
  'https://venturebeat-network.org/insights/enterprise-saas-trends',
  'https://hashnode.com/@techpulse/top-database-monitoring-solutions',
  'https://github.com/awesome-cloud/curated-developer-tools',
];

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
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

  if (!isOpen) return null;

  const handleToggleProtocol = (protocol: string) => {
    if (activeProtocols.includes(protocol)) {
      if (activeProtocols.length === 1) return; // Keep at least one
      setActiveProtocols(activeProtocols.filter((p) => p !== protocol));
    } else {
      setActiveProtocols([...activeProtocols, protocol]);
    }
  };

  const handleLoadSampleUrls = () => {
    setName('High DA Tech & SaaS Backlinks Campaign');
    setTargetDomain('https://cloudflow-analytics.io');
    setRawUrls(SAMPLE_URLS.join('\n'));
    setErrorMsg('');
  };

  const parsedUrls = rawUrls
    .split('\n')
    .map((u) => u.trim())
    .filter((u) => u.startsWith('http://') || u.startsWith('https://'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter a campaign name.');
      return;
    }
    if (!targetDomain.trim() || !targetDomain.startsWith('http')) {
      setErrorMsg('Please enter a valid target website URL (e.g., https://mysite.com).');
      return;
    }
    if (parsedUrls.length === 0) {
      setErrorMsg('Please enter at least one valid backlink URL starting with http:// or https://');
      return;
    }

    try {
      await onSubmit({
        name,
        targetDomain,
        urls: parsedUrls,
        dripSpeed,
        activeProtocols,
        notes,
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit indexing campaign');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create New Backlink Indexing Campaign</h2>
              <p className="text-xs text-slate-400">Multi-tier indexation acceleration with real Google & IndexNow protocols</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-slate-200 text-xs">
          
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Campaign Name & Target Domain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Campaign Name *</label>
              <input
                id="input-campaign-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., April Guest Posts & PBN Push"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Money Website *</label>
              <input
                id="input-target-domain"
                type="url"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                placeholder="https://mysite.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Bulk Backlink URLs Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Backlink URLs (One per line) *</span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {parsedUrls.length} Valid URLs
                </span>
              </label>
              <button
                type="button"
                onClick={handleLoadSampleUrls}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Load Sample Backlinks</span>
              </button>
            </div>
            <textarea
              id="textarea-backlink-urls"
              rows={5}
              value={rawUrls}
              onChange={(e) => setRawUrls(e.target.value)}
              placeholder="https://techcrunch.com/article-1&#10;https://medium.com/@author/post-2&#10;https://dev.to/article-3"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
              required
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Supports Tier 1 Guest Posts, Medium, Dev.to, Web 2.0s, Forum posts, PBN links, and social citations.
            </p>
          </div>

          {/* Indexing Velocity / Drip Feed Mode */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Indexing Speed & Natural Drip-Feed Velocity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'instant', label: 'Instant Blast', desc: 'Push all immediately' },
                { id: 'drip_3d', label: '3-Day Smooth', desc: 'Recommended standard' },
                { id: 'drip_7d', label: '7-Day Organic', desc: 'Natural Googlebot pace' },
                { id: 'drip_14d', label: '14-Day Safe', desc: 'Best for PBN / Tier 2' },
              ].map((speed) => (
                <div
                  key={speed.id}
                  onClick={() => setDripSpeed(speed.id as DripSpeed)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    dripSpeed === speed.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{speed.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{speed.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Protocol Selectors */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Active Multi-Vector Indexing Protocols
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              <div
                onClick={() => handleToggleProtocol('google_api')}
                className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between ${
                  activeProtocols.includes('google_api')
                    ? 'bg-slate-800/80 border-emerald-500/50'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  {activeProtocols.includes('google_api') ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <div className="font-bold text-slate-200">Google Indexing API</div>
                    <div className="text-[10px] text-slate-400">Direct Search Console URL_UPDATED publish</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  Primary
                </span>
              </div>

              <div
                onClick={() => handleToggleProtocol('index_now')}
                className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between ${
                  activeProtocols.includes('index_now')
                    ? 'bg-slate-800/80 border-blue-500/50'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  {activeProtocols.includes('index_now') ? (
                    <CheckSquare className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <div className="font-bold text-slate-200">IndexNow Protocol</div>
                    <div className="text-[10px] text-slate-400">Broadcasts to Bing, Yandex, Seznam</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                  Fast
                </span>
              </div>

              <div
                onClick={() => handleToggleProtocol('rss_syndicate')}
                className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between ${
                  activeProtocols.includes('rss_syndicate')
                    ? 'bg-slate-800/80 border-amber-500/50'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  {activeProtocols.includes('rss_syndicate') ? (
                    <CheckSquare className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <div className="font-bold text-slate-200">RSS & XML Syndication Feed</div>
                    <div className="text-[10px] text-slate-400">Generates live crawler discovery feed</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  Feed
                </span>
              </div>

              <div
                onClick={() => handleToggleProtocol('sitemap_ping')}
                className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between ${
                  activeProtocols.includes('sitemap_ping')
                    ? 'bg-slate-800/80 border-indigo-500/50'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  {activeProtocols.includes('sitemap_ping') ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <div className="font-bold text-slate-200">Google & Bing Sitemap Ping</div>
                    <div className="text-[10px] text-slate-400">Pings official search engine crawlers</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                  Crawler
                </span>
              </div>

            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
            >
              Cancel
            </button>
            <button
              id="btn-launch-campaign"
              type="submit"
              disabled={isSubmitting || parsedUrls.length === 0}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Dispatching to Google APIs...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Launch Indexing ({parsedUrls.length} Links)</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
