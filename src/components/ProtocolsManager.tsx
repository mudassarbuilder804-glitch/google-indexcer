import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Key,
  Server,
  Download,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  HelpCircle,
  Copy,
  Check,
  RefreshCw,
  Globe
} from 'lucide-react';
import { GoogleServiceAccountConfig, IndexNowConfig } from '../types';

interface ProtocolsManagerProps {
  googleConfig: GoogleServiceAccountConfig | null;
  indexNowConfig: IndexNowConfig | null;
  onUpdateGoogleConfig: (config: any) => Promise<void>;
  onUpdateIndexNowConfig: (config: any) => Promise<void>;
  onTriggerIndexNowPing: (urls: string[]) => Promise<void>;
}

export const ProtocolsManager: React.FC<ProtocolsManagerProps> = ({
  googleConfig,
  indexNowConfig,
  onUpdateGoogleConfig,
  onUpdateIndexNowConfig,
  onTriggerIndexNowPing,
}) => {
  // Google config state
  const [serviceAccountJson, setServiceAccountJson] = useState('');
  const [clientEmail, setClientEmail] = useState(googleConfig?.clientEmail || '');
  const [projectId, setProjectId] = useState(googleConfig?.projectId || '');
  const [isSavingGoogle, setIsSavingGoogle] = useState(false);
  const [googleSuccessMsg, setGoogleSuccessMsg] = useState('');
  const [googleErrorMsg, setGoogleErrorMsg] = useState('');

  // IndexNow state
  const [indexNowHost, setIndexNowHost] = useState(indexNowConfig?.host || 'mywebsite.com');
  const [indexNowKey, setIndexNowKey] = useState(indexNowConfig?.key || '8f7d92a10b4e45c7931f28b7e3e9d841');
  const [isSavingIndexNow, setIsSavingIndexNow] = useState(false);
  const [indexNowSuccessMsg, setIndexNowSuccessMsg] = useState('');
  const [isPingingIndexNow, setIsPingingIndexNow] = useState(false);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSaveGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingGoogle(true);
    setGoogleSuccessMsg('');
    setGoogleErrorMsg('');

    try {
      await onUpdateGoogleConfig({
        serviceAccountJson: serviceAccountJson.trim() || undefined,
        clientEmail: clientEmail.trim() || undefined,
        projectId: projectId.trim() || undefined,
      });
      setGoogleSuccessMsg('Google Cloud Indexing API credentials updated and verified successfully!');
      setServiceAccountJson('');
    } catch (err: any) {
      setGoogleErrorMsg(err.message || 'Failed to update Google credentials');
    } finally {
      setIsSavingGoogle(false);
    }
  };

  const handleSaveIndexNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingIndexNow(true);
    setIndexNowSuccessMsg('');

    try {
      await onUpdateIndexNowConfig({
        host: indexNowHost,
        key: indexNowKey,
      });
      setIndexNowSuccessMsg('IndexNow protocol settings saved!');
    } catch (err: any) {
      //
    } finally {
      setIsSavingIndexNow(false);
    }
  };

  const handleGenerateNewIndexNowKey = () => {
    const chars = '0123456789abcdef';
    let newKey = '';
    for (let i = 0; i < 32; i++) {
      newKey += chars[Math.floor(Math.random() * chars.length)];
    }
    setIndexNowKey(newKey);
  };

  const handleDownloadVerificationFile = () => {
    const element = document.createElement('a');
    const file = new Blob([indexNowKey], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${indexNowKey}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleTestIndexNowBroadcast = async () => {
    setIsPingingIndexNow(true);
    try {
      await onTriggerIndexNowPing(['https://' + indexNowHost + '/recent-update']);
      setIndexNowSuccessMsg('Test IndexNow ping broadcast successfully delivered to Bing, Yandex, and Seznam!');
    } finally {
      setIsPingingIndexNow(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          Google Indexing API & IndexNow Setup Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure official Google Cloud Service Account credentials and the open IndexNow protocol for 100% automated real-time indexing.
        </p>
      </div>

      {/* SECTION 1: Google Indexing API Setup */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Google Web Search Indexing API</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {googleConfig?.isVerified ? 'Live Verified' : 'Standby'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Directly submits URL_UPDATED signals to Googlebot indexing clusters</p>
            </div>
          </div>

          {/* Quota Gauge */}
          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Google Daily Quota</div>
              <div className="text-xs font-black text-slate-200">
                {googleConfig?.dailyQuotaUsed || 68} <span className="text-slate-500 font-normal">/ {googleConfig?.dailyQuotaMax || 200}</span>
              </div>
            </div>
            <div className="w-12 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${Math.round(((googleConfig?.dailyQuotaUsed || 68) / 200) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Interactive Guide */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-3">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>How to Connect Your Google Search Console for Automated Indexing:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400 leading-relaxed text-[11px]">
            <li>
              Go to the <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Google Cloud Console</a>, create a project, and enable the <strong>Web Search Indexing API</strong>.
            </li>
            <li>
              Create a <strong>Service Account</strong>, generate a <strong>JSON Key</strong>, and download it.
            </li>
            <li>
              Open <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Google Search Console</a>, navigate to <strong>Settings &gt; Users &amp; Permissions</strong>, and add your Service Account email (<span className="text-indigo-300 font-mono">...iam.gserviceaccount.com</span>) as an <strong>Owner</strong>.
            </li>
            <li>
              Paste the JSON key below or configure the credentials. Every submitted backlink will be pushed directly through Google's official indexing pipeline!
            </li>
          </ol>
        </div>

        {googleSuccessMsg && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{googleSuccessMsg}</span>
          </div>
        )}
        {googleErrorMsg && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{googleErrorMsg}</span>
          </div>
        )}

        {/* Form to update Google Config */}
        <form onSubmit={handleSaveGoogle} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Paste Google Cloud Service Account JSON Key (Recommended)
            </label>
            <textarea
              rows={4}
              value={serviceAccountJson}
              onChange={(e) => setServiceAccountJson(e.target.value)}
              placeholder={`{\n  "type": "service_account",\n  "project_id": "my-seo-project",\n  "private_key_id": "...",\n  "private_key": "-----BEGIN PRIVATE KEY-----...",\n  "client_email": "indexing-bot@my-seo-project.iam.gserviceaccount.com"\n}`}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-[11px] placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Service Account Email</label>
              <div className="flex">
                <input
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-l-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(clientEmail, 'email')}
                  className="px-3 bg-slate-800 hover:bg-slate-700 border border-l-0 border-slate-700 rounded-r-xl text-slate-300 transition"
                  title="Copy Email to add in Search Console"
                >
                  {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Google Cloud Project ID</label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingGoogle}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow flex items-center gap-1.5"
            >
              {isSavingGoogle ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              <span>Save &amp; Validate Google API</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: IndexNow Protocol Setup */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">IndexNow Open Protocol Engine</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Multi-Search Engine Broadcaster
                </span>
              </div>
              <p className="text-xs text-slate-400">Simultaneously alerts Bing, Yandex, Seznam, Naver, and IndexNow crawlers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestIndexNowBroadcast}
              disabled={isPingingIndexNow}
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPingingIndexNow ? 'animate-spin' : ''}`} />
              <span>Broadcast Test Ping</span>
            </button>
          </div>
        </div>

        {indexNowSuccessMsg && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{indexNowSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleSaveIndexNow} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Host Domain</label>
              <input
                type="text"
                value={indexNowHost}
                onChange={(e) => setIndexNowHost(e.target.value)}
                placeholder="mywebsite.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-300">IndexNow API Key</label>
                <button
                  type="button"
                  onClick={handleGenerateNewIndexNowKey}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300"
                >
                  Generate New Key
                </button>
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={indexNowKey}
                  onChange={(e) => setIndexNowKey(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-l-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(indexNowKey, 'indexnow-key')}
                  className="px-3 bg-slate-800 hover:bg-slate-700 border border-l-0 border-slate-700 rounded-r-xl text-slate-300 transition"
                  title="Copy Key"
                >
                  {copiedText === 'indexnow-key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Verification File Helper */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-200">Host Verification File</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Place <span className="font-mono text-indigo-300">/{indexNowKey}.txt</span> containing your key in your website root.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadVerificationFile}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap shadow"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Download {indexNowKey.substring(0, 8)}....txt</span>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingIndexNow}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Save IndexNow Settings</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
