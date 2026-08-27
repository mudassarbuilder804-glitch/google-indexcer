import React, { useState } from 'react';
import {
  Key,
  Code,
  Copy,
  Check,
  Zap,
  Terminal,
  Server,
  Plus,
  Trash2,
  Play
} from 'lucide-react';
import { ApiKeyItem } from '../types';

interface ApiDocumentationProps {
  apiKeys: ApiKeyItem[];
  onCreateKey: (name: string) => Promise<void>;
  onDeleteKey: (id: string) => Promise<void>;
}

export const ApiDocumentation: React.FC<ApiDocumentationProps> = ({
  apiKeys,
  onCreateKey,
  onDeleteKey,
}) => {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python'>('curl');
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isCreatingKey, setIsCreatingKey] = useState(false);

  // Playground state
  const [testUrls, setTestUrls] = useState('https://example-blog.com/seo-article\nhttps://medium.com/@author/tech-post');
  const [testTarget, setTestTarget] = useState('https://mysite.com');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const selectedKey = apiKeys[0]?.key || 'gidx_live_99f3a8b2c41e410a97b4c6e9314';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateNewKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    setIsCreatingKey(true);
    try {
      await onCreateKey(newKeyName.trim());
      setNewKeyName('');
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleTestApi = async () => {
    setIsTesting(true);
    setTestResponse(null);
    try {
      const urlsArray = testUrls.split('\n').map((u) => u.trim()).filter((u) => u.startsWith('http'));
      const res = await fetch('/api/v1/indexer/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${selectedKey}`,
        },
        body: JSON.stringify({
          name: 'Playground Batch Submission',
          targetDomain: testTarget,
          urls: urlsArray,
          dripSpeed: 'instant',
        }),
      });
      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setTestResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const codeSnippets = {
    curl: `curl -X POST "https://your-domain.com/api/v1/indexer/submit" \\
  -H "Authorization: Bearer ${selectedKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production Tier 1 Backlinks",
    "targetDomain": "https://mysite.com",
    "dripSpeed": "drip_3d",
    "urls": [
      "https://techcrunch.com/article-1",
      "https://medium.com/@author/post-2"
    ]
  }'`,
    node: `import axios from 'axios';

const response = await axios.post(
  'https://your-domain.com/api/v1/indexer/submit',
  {
    name: 'Production Tier 1 Backlinks',
    targetDomain: 'https://mysite.com',
    dripSpeed: 'instant',
    urls: [
      'https://techcrunch.com/article-1',
      'https://medium.com/@author/post-2'
    ]
  },
  {
    headers: {
      Authorization: 'Bearer ${selectedKey}',
      'Content-Type': 'application/json'
    }
  }
);

console.log('Indexing Job Created:', response.data);`,
    python: `import requests

url = "https://your-domain.com/api/v1/indexer/submit"
headers = {
    "Authorization": "Bearer ${selectedKey}",
    "Content-Type": "application/json"
}
payload = {
    "name": "Production Tier 1 Backlinks",
    "targetDomain": "https://mysite.com",
    "dripSpeed": "drip_3d",
    "urls": [
        "https://techcrunch.com/article-1",
        "https://medium.com/@author/post-2"
    ]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <Key className="w-6 h-6 text-indigo-400" />
          Developer REST API &amp; Webhooks Integration Hub
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Seamlessly trigger automated Google Indexing API &amp; IndexNow broadcasts from your CMS, link builders, GSA, or ScrapeBox scripts.
        </p>
      </div>

      {/* API Keys Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">API Authentication Keys</h2>
            <p className="text-xs text-slate-400">Authenticate requests via header: <code className="text-indigo-300">Authorization: Bearer &lt;KEY&gt;</code></p>
          </div>

          <form onSubmit={handleCreateNewKey} className="flex gap-2">
            <input
              type="text"
              placeholder="Key Name (e.g. ScrapeBox Bot)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isCreatingKey || !newKeyName.trim()}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Key</span>
            </button>
          </form>
        </div>

        <div className="space-y-2.5">
          {apiKeys.map((k) => (
            <div
              key={k.id}
              className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="font-bold text-slate-200">{k.name}</div>
                <div className="font-mono text-[11px] text-indigo-400 mt-0.5">{k.key}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{k.requestsCount} requests</span>
                <button
                  onClick={() => handleCopy(k.key, k.id)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                >
                  {copiedKey === k.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === k.id ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => onDeleteKey(k.id)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                  title="Revoke Key"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippets & API Docs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Endpoint: POST /api/v1/indexer/submit</h2>
          </div>

          {/* Lang Tabs */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['curl', 'node', 'python'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                  activeLang === lang
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px] overflow-x-auto">
            {codeSnippets[activeLang]}
          </pre>
          <button
            onClick={() => handleCopy(codeSnippets[activeLang], 'snippet')}
            className="absolute right-3 top-3 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-[10px] font-semibold flex items-center gap-1 border border-slate-700"
          >
            {copiedKey === 'snippet' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey === 'snippet' ? 'Copied' : 'Copy Snippet'}</span>
          </button>
        </div>
      </div>

      {/* Interactive API Tester Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Live API Testing Playground</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Website URL</label>
            <input
              type="text"
              value={testTarget}
              onChange={(e) => setTestTarget(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
            />

            <label className="block font-semibold text-slate-300 mt-3 mb-1">Test Backlink URLs</label>
            <textarea
              rows={4}
              value={testUrls}
              onChange={(e) => setTestUrls(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleTestApi}
              disabled={isTesting}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-2 shadow text-xs disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isTesting ? 'Sending Request...' : 'Send Live POST Request'}</span>
            </button>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Server JSON Response</label>
            <pre className="h-44 p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-emerald-400 overflow-y-auto">
              {testResponse || '// Click "Send Live POST Request" to inspect the JSON response...'}
            </pre>
          </div>
        </div>
      </div>

    </div>
  );
};
