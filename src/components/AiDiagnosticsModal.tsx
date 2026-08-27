import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Code
} from 'lucide-react';
import { BacklinkItem } from '../types';

interface AiDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BacklinkItem | null;
  targetDomain: string;
}

export const AiDiagnosticsModal: React.FC<AiDiagnosticsModalProps> = ({
  isOpen,
  onClose,
  item,
  targetDomain,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && item) {
      runDiagnosis();
    } else {
      setAnalysis('');
      setError('');
    }
  }, [isOpen, item]);

  const runDiagnosis = async () => {
    if (!item) return;
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/indexer/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: item.url,
          anchorText: item.anchorText || 'Target Backlink',
          targetDomain,
          pageTitle: item.pageTitle || '',
          httpStatus: item.httpStatus || 200,
          hasNoindex: item.hasNoindexTag || false,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to run AI diagnosis');
      setAnalysis(data.analysis || 'Analysis complete.');
    } catch (err: any) {
      setError(err.message || 'AI diagnosis failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Gemini AI Technical Link Diagnoser</h2>
              <p className="text-xs text-slate-400">Deep SEO indexability analysis, crawler directives, and anchor equity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-slate-200">
          
          {/* Target URL Metadata */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans font-semibold">Backlink URL:</span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline truncate max-w-md flex items-center gap-1"
              >
                {item.url}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans font-semibold">Anchor Text:</span>
              <span className="text-slate-200 font-sans font-bold">{item.anchorText || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans font-semibold">Link Tier:</span>
              <span className="text-purple-400 font-sans font-bold">{item.tier}</span>
            </div>
          </div>

          {/* AI Result Card */}
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-slate-400 font-semibold">Gemini AI is auditing technical indexability signals...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
              <button
                onClick={runDiagnosis}
                className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded text-xs font-bold transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 text-slate-200 leading-relaxed whitespace-pre-line text-xs font-sans">
                {analysis}
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={runDiagnosis}
              disabled={isLoading}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Re-run AI Analysis</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition text-xs"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
