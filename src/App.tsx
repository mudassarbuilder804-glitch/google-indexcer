import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { SubmissionForm } from './components/SubmissionForm';
import { NewCampaignModal } from './components/NewCampaignModal';
import { JobDetailView } from './components/JobDetailView';
import { LiveSerpChecker } from './components/LiveSerpChecker';
import { ProtocolsManager } from './components/ProtocolsManager';
import { ReportsManager } from './components/ReportsManager';
import { ApiDocumentation } from './components/ApiDocumentation';
import { AiDiagnosticsModal } from './components/AiDiagnosticsModal';
import {
  IndexingJob,
  GoogleServiceAccountConfig,
  IndexNowConfig,
  SEOReport,
  ApiKeyItem,
  BacklinkItem,
  DripSpeed
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'serp-checker' | 'reports' | 'protocols' | 'api-docs'>('dashboard');
  
  // Data state
  const [jobs, setJobs] = useState<IndexingJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IndexingJob | null>(null);
  const [reports, setReports] = useState<SEOReport[]>([]);
  const [googleConfig, setGoogleConfig] = useState<GoogleServiceAccountConfig | null>(null);
  const [indexNowConfig, setIndexNowConfig] = useState<IndexNowConfig | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);

  // UI state
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // AI Diagnostics state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiDiagnoseItem, setAiDiagnoseItem] = useState<BacklinkItem | null>(null);
  const [aiDiagnoseDomain, setAiDiagnoseDomain] = useState<string>('');
  
  // SERP Checker initial URL
  const [serpInspectUrl, setSerpInspectUrl] = useState<string>('');

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch jobs
      const jobsRes = await fetch('/api/indexer/jobs');
      if (jobsRes.ok) {
        const data = await jobsRes.json();
        setJobs(data.jobs || []);
        if (data.googleConfig) setGoogleConfig(data.googleConfig);
        if (data.indexNowConfig) setIndexNowConfig(data.indexNowConfig);
      }

      // 2. Fetch reports
      const reportsRes = await fetch('/api/reports');
      if (reportsRes.ok) {
        const data = await reportsRes.json();
        setReports(data || []);
      }

      // 3. Fetch API Keys
      const keysRes = await fetch('/api/keys');
      if (keysRes.ok) {
        const data = await keysRes.json();
        setApiKeys(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch telemetry data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Submit new campaign
  const handleSubmitCampaign = async (campaignData: {
    name: string;
    targetDomain: string;
    urls: string[];
    dripSpeed: DripSpeed;
    activeProtocols: string[];
    notes?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/indexer/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit campaign');

      await fetchDashboardData();
      if (data.job) {
        setSelectedJob(data.job);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Re-check single backlink item
  const handleRecheckItem = async (jobId: string, itemId: string) => {
    try {
      const res = await fetch('/api/indexer/recheck-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, itemId }),
      });
      const data = await res.json();
      if (data.job) {
        setJobs((prev) => prev.map((j) => (j.id === data.job.id ? data.job : j)));
        if (selectedJob?.id === data.job.id) {
          setSelectedJob(data.job);
        }
      }
    } catch (err) {
      console.error('Error rechecking item:', err);
    }
  };

  // Force re-index entire job
  const handleReindexJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/indexer/reindex-job/${jobId}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.job) {
        setJobs((prev) => prev.map((j) => (j.id === data.job.id ? data.job : j)));
        if (selectedJob?.id === data.job.id) {
          setSelectedJob(data.job);
        }
      }
    } catch (err) {
      console.error('Error reindexing job:', err);
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await fetch(`/api/indexer/jobs/${jobId}`, { method: 'DELETE' });
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      if (selectedJob?.id === jobId) setSelectedJob(null);
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  // Generate SEO Report
  const handleGenerateReport = async (jobOrId: IndexingJob | string, customClientName?: string) => {
    const jobId = typeof jobOrId === 'string' ? jobOrId : jobOrId.id;
    const client = customClientName || 'VIP Growth Client';
    setIsGeneratingReport(true);
    try {
      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, clientName: client }),
      });
      const data = await res.json();
      if (data.report) {
        setReports((prev) => [data.report, ...prev]);
        setActiveTab('reports');
      }
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Google Config
  const handleUpdateGoogleConfig = async (configData: any) => {
    const res = await fetch('/api/google-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update Google Config');
    if (data.googleConfig) setGoogleConfig(data.googleConfig);
  };

  // IndexNow Config
  const handleUpdateIndexNowConfig = async (configData: any) => {
    const res = await fetch('/api/indexnow-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configData),
    });
    const data = await res.json();
    if (data.indexNowConfig) setIndexNowConfig(data.indexNowConfig);
  };

  const handleTriggerIndexNowPing = async (urls: string[]) => {
    await fetch('/api/indexnow-ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    });
  };

  // API Key management
  const handleCreateKey = async (name: string) => {
    const res = await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (data.key) setApiKeys((prev) => [...prev, data.key]);
  };

  const handleDeleteKey = async (id: string) => {
    await fetch(`/api/keys/${id}`, { method: 'DELETE' });
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  };

  // AI Diagnose trigger
  const handleOpenAiDiagnose = (item: BacklinkItem, targetDomain: string) => {
    setAiDiagnoseItem(item);
    setAiDiagnoseDomain(targetDomain);
    setAiModalOpen(true);
  };

  // SERP Inspector trigger
  const handleOpenSerpInspector = (url?: string) => {
    if (url) setSerpInspectUrl(url);
    setActiveTab('serp-checker');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'dashboard') setSelectedJob(null);
        }}
        onOpenNewCampaign={() => setIsNewCampaignModalOpen(true)}
        googleConfig={googleConfig}
        indexNowConfig={indexNowConfig}
        onRefreshAll={fetchDashboardData}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: Active Selected Campaign Detail */}
        {selectedJob && activeTab === 'dashboard' ? (
          <JobDetailView
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
            onRecheckItem={handleRecheckItem}
            onReindexJob={handleReindexJob}
            onGenerateReport={handleGenerateReport}
            onOpenAiDiagnose={handleOpenAiDiagnose}
            onOpenSerpCheck={handleOpenSerpInspector}
          />
        ) : null}

        {/* VIEW 2: Dashboard Overview (when no specific job is open) */}
        {!selectedJob && activeTab === 'dashboard' ? (
          <DashboardOverview
            jobs={jobs}
            googleConfig={googleConfig}
            indexNowConfig={indexNowConfig}
            onSelectJob={(job) => setSelectedJob(job)}
            onOpenNewCampaign={() => setIsNewCampaignModalOpen(true)}
            onReindexJob={handleReindexJob}
            onDeleteJob={handleDeleteJob}
            onGenerateReport={handleGenerateReport}
            onOpenSerpCheck={() => handleOpenSerpInspector()}
          />
        ) : null}

        {/* VIEW 3: Dedicated Submission View */}
        {activeTab === 'campaigns' ? (
          <div className="space-y-6">
            <SubmissionForm
              onSubmit={handleSubmitCampaign}
              isSubmitting={isSubmitting}
              onSuccess={() => setActiveTab('dashboard')}
            />
          </div>
        ) : null}

        {/* VIEW 4: Live SERP Inspector */}
        {activeTab === 'serp-checker' ? (
          <LiveSerpChecker
            initialUrl={serpInspectUrl}
            onOpenAiDiagnose={handleOpenAiDiagnose}
          />
        ) : null}

        {/* VIEW 5: Automated SEO Reports */}
        {activeTab === 'reports' ? (
          <ReportsManager
            reports={reports}
            jobs={jobs}
            onGenerateReport={handleGenerateReport}
            isGenerating={isGeneratingReport}
          />
        ) : null}

        {/* VIEW 6: Google & IndexNow Setup Center */}
        {activeTab === 'protocols' ? (
          <ProtocolsManager
            googleConfig={googleConfig}
            indexNowConfig={indexNowConfig}
            onUpdateGoogleConfig={handleUpdateGoogleConfig}
            onUpdateIndexNowConfig={handleUpdateIndexNowConfig}
            onTriggerIndexNowPing={handleTriggerIndexNowPing}
          />
        ) : null}

        {/* VIEW 7: Developer REST API & Webhooks */}
        {activeTab === 'api-docs' ? (
          <ApiDocumentation
            apiKeys={apiKeys}
            onCreateKey={handleCreateKey}
            onDeleteKey={handleDeleteKey}
          />
        ) : null}

      </main>

      {/* Modal: New Campaign Submission */}
      <NewCampaignModal
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
        onSubmit={handleSubmitCampaign}
        isSubmitting={isSubmitting}
      />

      {/* Modal: Gemini AI Link Diagnoser */}
      <AiDiagnosticsModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        item={aiDiagnoseItem}
        targetDomain={aiDiagnoseDomain}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>IndexFast SEO Pro &bull; Real Google Indexing API &amp; IndexNow Protocols Engine</span>
          <div className="flex items-center space-x-4 text-slate-400">
            <button onClick={() => setActiveTab('protocols')} className="hover:text-indigo-400">
              Search Console Setup
            </button>
            <button onClick={() => setActiveTab('api-docs')} className="hover:text-indigo-400">
              REST API
            </button>
            <button onClick={() => setActiveTab('reports')} className="hover:text-indigo-400">
              Client Reports
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
