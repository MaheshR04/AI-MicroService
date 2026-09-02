import React, { useState } from 'react';
import { 
  Smile, 
  Ticket, 
  TrendingUp, 
  FolderOpen,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  Radio,
  BarChart3,
  Layers,
  Sparkles,
  Building2,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';

export default function AnalyticsDashboard() {
  const { tickets } = useTickets();

  // REAL COMPUTED PRESENT DATA
  const totalTickets = tickets.length;
  
  // Status counts from present tickets
  const solvedTickets = tickets.filter(t => t.status === 'Solved');
  const solvedCount = solvedTickets.length;
  const escalatedTickets = tickets.filter(t => t.status === 'Escalated');
  const escalatedCount = escalatedTickets.length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress');
  const inProgressCount = inProgressTickets.length;
  const pendingTickets = tickets.filter(t => t.status === 'Pending');
  const pendingCount = pendingTickets.length;
  const openCount = totalTickets - solvedCount;
  
  const resolutionRate = totalTickets > 0 ? ((solvedCount / totalTickets) * 100).toFixed(1) : '0.0';

  // Sentiment counts from present tickets
  const positiveCount = tickets.filter(t => t.sentiment === 'Positive').length;
  const neutralCount = tickets.filter(t => t.sentiment === 'Neutral').length;
  const negativeCount = tickets.filter(t => t.sentiment === 'Negative').length;

  const positivePct = totalTickets > 0 ? Math.round((positiveCount / totalTickets) * 100) : 0;
  const neutralPct = totalTickets > 0 ? Math.round((neutralCount / totalTickets) * 100) : 0;
  const negativePct = totalTickets > 0 ? Math.round((negativeCount / totalTickets) * 100) : 0;

  // Real CSAT Score based on actual present sentiment:
  // Positive = 5/5, Neutral = 3/5, Negative = 1/5
  const rawScore = totalTickets > 0
    ? ((positiveCount * 5 + neutralCount * 3 + negativeCount * 1) / (totalTickets * 5)) * 5
    : 5.0;
  const csatScore = rawScore.toFixed(1);
  const csatPct = totalTickets > 0
    ? Math.round(((positiveCount + neutralCount * 0.5) / totalTickets) * 100)
    : 100;

  // Real Categories from present tickets
  const categoryMap = {};
  tickets.forEach(t => {
    const cat = t.category || 'General';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const categories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
    pct: totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  // Real Channels from present tickets
  const channelMap = {};
  tickets.forEach(t => {
    const ch = t.channel || 'Chat';
    channelMap[ch] = (channelMap[ch] || 0) + 1;
  });

  // Real Priorities from present tickets
  const criticalCount = tickets.filter(t => (t.priority === 'Critical' || t.priority === 'High') && t.status !== 'Solved').length;
  const normalCount = tickets.filter(t => t.priority === 'Normal').length;

  // Real SLA Compliance from present tickets
  const slaMetCount = tickets.filter(t => t.slaRemaining === 'Met' || t.status === 'Solved' || t.slaStatus === 'good').length;
  const slaCompliancePct = totalTickets > 0 ? Math.round((slaMetCount / totalTickets) * 100) : 100;

  // Real unique enterprise clients represented in current dataset
  const uniqueCompanies = Array.from(new Set(tickets.map(t => t.company).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Live CX Performance Analytics</h3>
            <span className="text-[10px] bg-blue-50 dark:bg-blue-950/50 text-primary border border-blue-200 dark:border-blue-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Present Data Stream
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Real-time analytics dynamically calculated from all active system tickets, resolutions, and sentiment states
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Active Dataset</span>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-mono">
              {totalTickets} Live Tickets
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Resolution Rate</span>
            <span className="text-base font-extrabold text-accentemerald font-mono">
              {resolutionRate}%
            </span>
          </div>
        </div>
      </div>

      {/* TOP REAL-TIME KPI STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TOTAL TICKETS IN SYSTEM */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 shadow-sm card-hover">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Workload</span>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 font-mono">{totalTickets}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-primary">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Open: <strong className="text-slate-700 dark:text-slate-300 font-mono">{openCount}</strong></span>
            <span>Solved: <strong className="text-emerald-600 font-mono">{solvedCount}</strong></span>
          </div>
        </div>

        {/* CSAT SCORE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 shadow-sm card-hover">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current CSAT</span>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 font-mono">{csatScore} <span className="text-sm font-normal text-slate-400">/ 5.0</span></h3>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-accentemerald">
              <Smile className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-emerald-600 font-semibold">{positiveCount} of {totalTickets} Positive</span>
            <span className="font-mono">{csatPct}% Positive Index</span>
          </div>
        </div>

        {/* CRITICAL ESCALATIONS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 shadow-sm card-hover">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">Critical / Escalated</span>
              <h3 className="text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1 font-mono">{escalatedCount + criticalCount}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Escalated: <strong className="text-red-600 font-mono">{escalatedCount}</strong></span>
            <span>Critical Priority: <strong className="text-red-500 font-mono">{criticalCount}</strong></span>
          </div>
        </div>

        {/* SLA COMPLIANCE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 shadow-sm card-hover">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SLA Compliance</span>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 font-mono">{slaCompliancePct}%</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-purple-600 font-semibold">{slaMetCount} Tickets Met SLA</span>
            <span className="font-mono">{totalTickets - slaMetCount} at Risk</span>
          </div>
        </div>

      </div>

      {/* CHARTS & DEEP BREAKDOWN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: LIVE SENTIMENT BREAKDOWN */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-primary" /> Live Sentiment Distribution
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Calculated from sentiment tags across all current tickets</p>
            </div>
            <span className="text-[10px] text-accentemerald bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-bold">
              {positiveCount} Satisfied
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {/* Positive */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <span>Positive Sentiment</span>
                <span className="text-accentemerald font-mono">{positivePct}% ({positiveCount} of {totalTickets})</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accentemerald rounded-full transition-all duration-500" 
                  style={{ width: `${positivePct}%` }}
                ></div>
              </div>
            </div>

            {/* Neutral */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <span>Neutral Sentiment</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">{neutralPct}% ({neutralCount} of {totalTickets})</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500" 
                  style={{ width: `${neutralPct}%` }}
                ></div>
              </div>
            </div>

            {/* Negative */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <span>Critical / High Frustration</span>
                <span className="text-red-500 font-mono">{negativePct}% ({negativeCount} of {totalTickets})</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-500" 
                  style={{ width: `${negativePct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: TICKET STATUS BREAKDOWN */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Present Ticket Status Mappings
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Real-time breakdown of current ticket pipeline states</p>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
              {totalTickets} Records
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Solved</span>
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1 font-mono">{solvedCount}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{totalTickets > 0 ? Math.round((solvedCount / totalTickets) * 100) : 0}% share</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Escalated</span>
              <span className="text-lg font-extrabold text-red-600 dark:text-red-400 block mt-1 font-mono">{escalatedCount}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{totalTickets > 0 ? Math.round((escalatedCount / totalTickets) * 100) : 0}% share</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">In Progress</span>
              <span className="text-lg font-extrabold text-primary block mt-1 font-mono">{inProgressCount}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{totalTickets > 0 ? Math.round((inProgressCount / totalTickets) * 100) : 0}% share</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Pending</span>
              <span className="text-lg font-extrabold text-accentorange block mt-1 font-mono">{pendingCount}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{totalTickets > 0 ? Math.round((pendingCount / totalTickets) * 100) : 0}% share</span>
            </div>
          </div>
        </div>

        {/* CHART 3: DYNAMIC ISSUE CATEGORIES (REAL DATA) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Current Issue Categories
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Aggregated strictly from present ticket classifications</p>
          </div>

          <div className="space-y-3 pt-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  <span>{cat.name} Operations</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">{cat.pct}% ({cat.count} {cat.count === 1 ? 'Ticket' : 'Tickets'})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 0 ? 'bg-primary' :
                      idx === 1 ? 'bg-purple-500' :
                      idx === 2 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${cat.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 4: INCOMING CHANNELS & CLIENT PROFILE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-500" /> Channel Ingestion & Active Clients
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Communication channels and companies in current dataset</p>
          </div>

          {/* Channels Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['Chat', 'Voice', 'Email'].map(ch => {
              const count = channelMap[ch] || 0;
              const pct = totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 0;
              return (
                <div key={ch} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{ch}</span>
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-0.5 block font-mono">{count}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* Present Companies Tag List */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Active Client Accounts in Current Pipeline:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {uniqueCompanies.map((company, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-primary font-semibold px-2.5 py-0.5 rounded-lg flex items-center gap-1"
                >
                  <Building2 className="w-3 h-3" /> {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FULL-WIDTH SECTION: LIVE TICKETS UNDERLYING METRICS */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-primary" /> Active Ticket Data Records
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">The exact real-time rows calculating all metrics above</p>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-bold">
              ● Live Synced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Ticket ID</th>
                  <th className="py-2.5 px-3">Customer & Company</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Sentiment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tickets.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-primary">{t.id}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{t.customer}</span>
                      <span className="text-[10px] text-slate-400">{t.company}</span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-600 dark:text-slate-400">{t.category}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        t.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300' :
                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold ${
                        t.sentiment === 'Positive' ? 'text-emerald-600' :
                        t.sentiment === 'Negative' ? 'text-red-500' : 'text-slate-500'
                      }`}>
                        {t.sentiment}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'Solved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        t.status === 'Escalated' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                        'bg-blue-100 text-primary dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {t.slaRemaining}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
