import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  Building,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { SEOReport, IndexingJob } from '../types';

interface ReportsManagerProps {
  reports: SEOReport[];
  jobs: IndexingJob[];
  onGenerateReport: (jobId: string, clientName: string) => Promise<void>;
  isGenerating: boolean;
}

export const ReportsManager: React.FC<ReportsManagerProps> = ({
  reports,
  jobs,
  onGenerateReport,
  isGenerating,
}) => {
  const [selectedReport, setSelectedReport] = useState<SEOReport | null>(reports[0] || null);
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [clientName, setClientName] = useState('Enterprise Growth Client');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobId) return;
    await onGenerateReport(selectedJobId, clientName);
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-400" />
            Automated SEO Client Reports
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            White-label indexation audit reports with Gemini AI executive summaries, domain breakdowns, and proof logs.
          </p>
        </div>

        <button
          id="btn-open-new-report-modal"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New SEO Report</span>
        </button>
      </div>

      {/* Main Grid: Reports List (left) + Detailed Report Viewer (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Reports Archive */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white">Generated Reports ({reports.length})</h2>
            <span className="text-[10px] text-slate-400 font-semibold bg-slate-800 px-2 py-0.5 rounded">
              PDF Ready
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {reports.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No reports generated yet. Click "Generate New SEO Report" above.
              </div>
            ) : (
              reports.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedReport?.id === rep.id
                      ? 'bg-indigo-600/20 border-indigo-500/80 text-white shadow'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white truncate max-w-[180px]">{rep.campaignName}</span>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {rep.indexRate}% Rate
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-slate-500" />
                    <span>{rep.clientName}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{new Date(rep.generatedAt).toLocaleDateString()}</span>
                    <span>{rep.totalIndexed} / {rep.totalSubmitted} Indexed</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Selected Report Preview */}
        <div className="lg:col-span-2 space-y-4">
          {selectedReport ? (
            <div id="printable-seo-report" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200">
              
              {/* Report Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3 h-3" />
                    Official SEO Indexation Audit
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{selectedReport.campaignName}</h2>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                    <span>Client: <strong className="text-slate-200">{selectedReport.clientName}</strong></span>
                    <span>•</span>
                    <span>Target: <strong className="text-indigo-400 font-mono">{selectedReport.targetDomain}</strong></span>
                    <span>•</span>
                    <span>Date: <strong className="text-slate-200">{new Date(selectedReport.generatedAt).toLocaleDateString()}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 shadow"
                  >
                    <Printer className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* KPI Highlights in Report */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Submitted</div>
                  <div className="text-xl font-black text-white mt-1">{selectedReport.totalSubmitted}</div>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Googlebot Indexed</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">{selectedReport.totalIndexed}</div>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Indexation Rate</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">{selectedReport.indexRate}%</div>
                </div>
              </div>

              {/* Gemini AI Executive Summary Box */}
              <div className="bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 rounded-xl p-5 shadow-sm space-y-2.5">
                <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini AI Executive Summary</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedReport.aiExecutiveSummary}
                </p>
              </div>

              {/* Recommendations */}
              {selectedReport.recommendations && selectedReport.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Strategic Recommendations
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedReport.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tier Performance Breakdown Table */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tier Breakdown &amp; Velocity
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Link Tier</th>
                        <th className="py-2.5 px-3">Submitted</th>
                        <th className="py-2.5 px-3">Indexed</th>
                        <th className="py-2.5 px-3 text-right">Success Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {selectedReport.tierBreakdown.map((t, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="py-2 px-3 font-semibold text-slate-200">{t.tier}</td>
                          <td className="py-2 px-3 text-slate-400">{t.total}</td>
                          <td className="py-2 px-3 text-emerald-400 font-bold">{t.indexed}</td>
                          <td className="py-2 px-3 text-right">
                            <span className="font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                              {t.rate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Referring Domains Distribution */}
              {selectedReport.domainDistribution && selectedReport.domainDistribution.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Referring Domains Indexation Proof
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedReport.domainDistribution.map((d, i) => (
                      <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-slate-300 truncate max-w-[180px]">{d.domain}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {d.indexed} / {d.count} Indexed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
              Select a report from the list to preview or generate a new one.
            </div>
          )}
        </div>

      </div>

      {/* Modal: Generate New Report */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Generate Branded Client SEO Report
            </h2>

            <form onSubmit={handleCreateReport} className="space-y-4 text-xs text-slate-300">
              <div>
                <label className="block font-semibold mb-1">Select Campaign *</label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-xs"
                  required
                >
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.name} ({job.indexedCount}/{job.totalLinks} links)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Client or Brand Name *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Acme SaaS Corp"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-xs"
                  required
                />
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-[11px] flex items-center gap-2">
                <Sparkles className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                <span>Gemini AI will automatically craft the executive overview and recommendations!</span>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow"
                >
                  {isGenerating ? 'Generating with AI...' : 'Generate Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
