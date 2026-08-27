import React from 'react';
import {
  Globe,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Key,
  ShieldCheck,
  Search,
  Plus,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { GoogleServiceAccountConfig, IndexNowConfig } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'campaigns' | 'serp-checker' | 'reports' | 'protocols' | 'api-docs';
  setActiveTab: (tab: 'dashboard' | 'campaigns' | 'serp-checker' | 'reports' | 'protocols' | 'api-docs') => void;
  onOpenNewCampaign: () => void;
  googleConfig: GoogleServiceAccountConfig | null;
  indexNowConfig: IndexNowConfig | null;
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewCampaign,
  googleConfig,
  indexNowConfig,
  onRefreshAll,
  isRefreshing,
}) => {
  const quotaUsed = googleConfig?.dailyQuotaUsed || 0;
  const quotaMax = googleConfig?.dailyQuotaMax || 200;
  const quotaPercent = Math.min(100, Math.round((quotaUsed / quotaMax) * 100));

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  IndexFast<span className="text-emerald-400">SEO</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Google API Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Multi-Vector Backlink Indexer & SEO Analytics
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-tab-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              id="nav-tab-serp-checker"
              onClick={() => setActiveTab('serp-checker')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'serp-checker'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Live SERP Inspector
            </button>

            <button
              id="nav-tab-reports"
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'reports'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              SEO Reports
            </button>

            <button
              id="nav-tab-protocols"
              onClick={() => setActiveTab('protocols')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'protocols'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Google & IndexNow Setup
            </button>

            <button
              id="nav-tab-api-docs"
              onClick={() => setActiveTab('api-docs')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === 'api-docs'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              API & Webhooks
            </button>
          </nav>

          {/* Right Action Bar (Quota + Refresh + Quick Submit) */}
          <div className="flex items-center space-x-3">
            
            {/* Google Quota Meter */}
            <div
              onClick={() => setActiveTab('protocols')}
              className="hidden lg:flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg px-2.5 py-1.5 cursor-pointer transition-colors"
              title="Google Indexing API Daily Quota"
            >
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Google Quota</span>
                <span className="text-xs font-bold text-slate-200">
                  {quotaUsed} <span className="text-slate-500 font-normal">/ {quotaMax}</span>
                </span>
              </div>
              <div className="w-10 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    quotaPercent > 80 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${quotaPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              id="btn-refresh-telemetry"
              onClick={onRefreshAll}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors disabled:opacity-50"
              title="Refresh Indexing Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            {/* Quick Submit CTA */}
            <button
              id="btn-submit-backlinks"
              onClick={onOpenNewCampaign}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-150 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Index Backlinks</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-950/80 border-t border-slate-800/80 py-2 px-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`text-[11px] font-medium px-2 py-1 rounded ${activeTab === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('serp-checker')}
          className={`text-[11px] font-medium px-2 py-1 rounded ${activeTab === 'serp-checker' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          SERP Checker
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`text-[11px] font-medium px-2 py-1 rounded ${activeTab === 'reports' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab('protocols')}
          className={`text-[11px] font-medium px-2 py-1 rounded ${activeTab === 'protocols' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Setup
        </button>
        <button
          onClick={() => setActiveTab('api-docs')}
          className={`text-[11px] font-medium px-2 py-1 rounded ${activeTab === 'api-docs' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          API
        </button>
      </div>
    </header>
  );
};
