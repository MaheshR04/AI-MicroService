import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Cpu, 
  Users, 
  Ticket, 
  Smile,
  ShieldAlert,
  Check,
  Flame,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';

export default function ManagerDashboard() {
  const { tickets, solveTicket } = useTickets();
  const [activeTab, setActiveTab] = useState('Tickets');
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  // Dynamically compute real-time metrics: strictly exclude Solved tickets from active escalations
  const openCount = tickets.filter(t => t.status !== 'Solved').length;
  const solvedCount = tickets.filter(t => t.status === 'Solved').length;
  const escalatedTickets = tickets.filter(t => (t.status === 'Escalated' || t.priority === 'Critical') && t.status !== 'Solved');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleApproveResolve = (ticketId) => {
    solveTicket(ticketId, 'Operations Manager');
    showToast(`Incident #${ticketId} approved and resolved successfully!`);
  };

  const stats = [
    { label: 'Total Enterprise Accounts', value: '14,291', change: 'Microsoft, Stripe, Zoom +', icon: Users, color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/20' },
    { label: 'Open In-Flight Tickets', value: `${openCount}`, change: `${escalatedTickets.length} active escalations`, icon: Ticket, color: 'text-accentred bg-red-50 dark:bg-red-950/20' },
    { label: 'Resolved Tickets', value: `${solvedCount + 12360}`, change: `${solvedCount} closed this session`, icon: CheckCircle2, color: 'text-accentemerald bg-emerald-50 dark:bg-emerald-950/20' },
    { label: 'Customer CSAT Score', value: '4.8 / 5.0', change: '96.8% approval rating', icon: Smile, color: 'text-primary bg-indigo-50 dark:bg-indigo-950/20' },
    { label: 'AI Resolution Rate', value: '84.6%', change: '+3.2% vs yesterday', icon: Cpu, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/20' },
    { label: 'Average Response Time', value: '11.8s', change: 'Human average: 14.5m', icon: Clock, color: 'text-primary bg-blue-50 dark:bg-blue-950/20' },
    { label: 'Churn Risk Index', value: '1.2%', change: 'Lowest sector churn rate', icon: AlertTriangle, color: 'text-accentorange bg-amber-50 dark:bg-amber-950/20' },
    { label: 'System Health Score', value: '98.9%', change: 'All systems operational', icon: Activity, color: 'text-accentemerald bg-emerald-50 dark:bg-emerald-950/20' },
  ];

  const recentCustomers = [
    { name: 'Sarah Jenkins', company: 'Microsoft Corp', tier: 'Gold SLA', health: 'Healthy', status: 'Active' },
    { name: 'David Miller', company: 'Stripe API', tier: 'Platinum SLA', health: 'Healthy', status: 'Active' },
    { name: 'Jessica Chen', company: 'Zoom Inc.', tier: 'Silver Tier', health: 'At Risk', status: 'Active' },
    { name: 'Andrew Larson', company: 'Vercel Sandbox', tier: 'Gold SLA', health: 'Healthy', status: 'Active' },
  ];

  const aiDecisions = [
    { decisionId: 'DEC-9102', action: 'Approved dispute seat refund ch_1941a', agent: 'Billing Specialist', confidence: '98.4%', status: 'Synced' },
    { decisionId: 'DEC-9101', action: 'DNS configuration trace validated', agent: 'DNS Specialist', confidence: '95.0%', status: 'Synced' },
    { decisionId: 'DEC-9100', action: 'Escalated refund request over $1000 limit', agent: 'Refund Gatekeeper', confidence: '45.0%', status: 'Manual Takeover' },
    { decisionId: 'DEC-9099', action: 'Deactivated temporary MFA token dispatch', agent: 'Security Agent', confidence: '99.1%', status: 'Synced' },
  ];

  const recentActivities = [
    { description: 'Synchronized contact structures with HubSpot deals', component: 'HubSpot pipeline', date: '5m ago', result: 'Success' },
    { description: 'Refreshed access credentials for Zendesk connector', component: 'Zendesk agent link', date: '35m ago', result: 'Success' },
    { description: 'Concluded DNS ALIAS diagnostic dig trace', component: 'Technical sandbox', date: '1h ago', result: 'Success' },
    { description: 'Initialized active directories user mapping sync', component: 'Active Directory link', date: '4h ago', result: 'Success' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* SUCCESS TOAST */}
      {toastMessage && (
        <div className="bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3.5 flex items-center gap-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DASHBOARD GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TABBED CONSOLE TABLES (2 COLS) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* Tab header selector */}
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/40">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Live Support Operations Center</h3>
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-primary border border-blue-100 dark:border-blue-800 font-bold px-2 py-0.5 rounded-full">
                    Synchronized
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Real-time tickets, human agent escalations, decisions, and system telemetry</p>
              </div>
              <div className="flex gap-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-lg">
                {['Tickets', 'Customers', 'Decisions', 'Activities'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      activeTab === tab 
                        ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm' 
                        : 'text-slate-500 hover:bg-white/40 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB TABLE 1: TICKETS (LIVE FROM SHARED CONTEXT) */}
            {activeTab === 'Tickets' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Assigned Staff</th>
                      <th className="px-6 py-3">Resolution Action / Subject</th>
                      <th className="px-6 py-3">Sentiment</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {tickets.map((t) => {
                      const isEscalated = t.status === 'Escalated';
                      const isSolved = t.status === 'Solved';

                      return (
                        <tr 
                          key={t.id} 
                          onClick={() => navigate('/tickets')}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-3.5 font-bold text-primary">{t.id}</td>
                          <td className="px-6 py-3.5 font-semibold text-slate-800 dark:text-slate-200">
                            {t.customer}
                            <span className="block text-[10px] font-normal text-slate-400">{t.company}</span>
                          </td>
                          <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400 font-medium">
                            {t.assignedTo || 'Unassigned'}
                          </td>
                          <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300 font-medium max-w-xs truncate">
                            {t.action || t.subject}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              t.sentiment === 'Positive' ? 'bg-emerald-50 text-accentemerald border-emerald-100 dark:bg-emerald-950/40' :
                              t.sentiment === 'Negative' ? 'bg-red-50 text-accentred border-red-100 dark:bg-red-950/40' :
                              'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800'
                            }`}>
                              {t.sentiment}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                              isSolved ? 'bg-emerald-50 text-accentemerald border-emerald-200 dark:bg-emerald-950/40' :
                              isEscalated ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 animate-pulse' :
                              'bg-blue-50 text-primary border-blue-200 dark:bg-blue-950/40'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB TABLE 2: CUSTOMERS */}
            {activeTab === 'Customers' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">SLA Tier</th>
                      <th className="px-6 py-3">Health Status</th>
                      <th className="px-6 py-3 text-right">Account state</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {recentCustomers.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-3.5 font-bold text-slate-800 dark:text-slate-100">{c.name}</td>
                        <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300 font-medium">{c.company}</td>
                        <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400 font-semibold">{c.tier}</td>
                        <td className="px-6 py-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            c.health === 'Healthy' ? 'bg-emerald-50 text-accentemerald border-emerald-100 dark:bg-emerald-950/40' : 'bg-red-50 text-accentred border-red-100 dark:bg-red-950/40'
                          }`}>{c.health}</span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <span className="text-[9px] bg-blue-50 border border-blue-100 text-primary font-bold px-2 py-0.5 rounded-full">{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB TABLE 3: DECISIONS */}
            {activeTab === 'Decisions' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Decision ID</th>
                      <th className="px-6 py-3">Action Description</th>
                      <th className="px-6 py-3">Decision Node</th>
                      <th className="px-6 py-3">Confidence Rating</th>
                      <th className="px-6 py-3 text-right">Gatekeeper status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {aiDecisions.map((d, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-slate-100">{d.decisionId}</td>
                        <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs">{d.action}</td>
                        <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400 font-semibold">{d.agent}</td>
                        <td className="px-6 py-3.5 text-primary font-bold">{d.confidence}</td>
                        <td className="px-6 py-3.5 text-right">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            d.status === 'Synced' ? 'bg-emerald-50 text-accentemerald border-emerald-100 dark:bg-emerald-950/40' : 'bg-red-50 text-accentred border-red-100 dark:bg-red-950/40'
                          }`}>{d.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB TABLE 4: ACTIVITIES */}
            {activeTab === 'Activities' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Activity Description</th>
                      <th className="px-6 py-3">Integration Node</th>
                      <th className="px-6 py-3">Time elapsed</th>
                      <th className="px-6 py-3 text-right">Sync status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {recentActivities.map((a, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-3.5 text-slate-700 dark:text-slate-200 font-semibold">{a.description}</td>
                        <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400">{a.component}</td>
                        <td className="px-6 py-3.5 text-slate-400">{a.date}</td>
                        <td className="px-6 py-3.5 text-right">
                          <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-accentemerald font-bold px-2 py-0.5 rounded-full">{a.result}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 text-center">
            <span className="text-xs text-slate-400 font-medium">Monitoring active live streams</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CRITICAL ESCALATION ALERTS & INFRASTRUCTURE (1 COL) */}
        <div className="space-y-6">
          
          {/* CRITICAL ESCALATION ALERTS (SYNCHRONIZED LIVE) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500" /> Critical Escalation Alerts
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Tickets escalated by Support Agents requiring supervisor takeover</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                escalatedTickets.length > 0
                  ? 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 animate-pulse'
                  : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
              }`}>
                {escalatedTickets.length} Active
              </span>
            </div>
            
            <div className="space-y-3 max-h-[380px] overflow-y-auto">
              {escalatedTickets.length === 0 ? (
                <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                  <span className="font-bold block">All critical escalations resolved!</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Queue is completely clear.</span>
                </div>
              ) : (
                escalatedTickets.map((incident) => (
                  <div key={incident.id} className="p-3.5 bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        <span className="text-xs font-bold text-red-700 dark:text-red-400">Incident #{incident.id}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{incident.time}</span>
                    </div>

                    <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{incident.customer} ({incident.company})</span>: {incident.subject}
                    </div>

                    {incident.internalNotes && incident.internalNotes.length > 0 && (
                      <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded border border-red-100 dark:border-red-900/40 text-[10px] text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-red-600 block">Agent Hand-off Note:</span>
                        {incident.internalNotes[incident.internalNotes.length - 1]}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-bold text-red-600 uppercase">
                        SLA: {incident.slaRemaining}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApproveResolve(incident.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Check className="w-3 h-3" /> Approve / Resolve
                        </button>
                        <button 
                          onClick={() => navigate('/tickets')}
                          className="text-[10px] text-primary hover:underline font-bold cursor-pointer"
                        >
                          Inspect Detail →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AUTOPILOT INTEGRITY */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Autopilot Infrastructure</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Autonomous core system health status</p>
            </div>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Groq LLaMA-3 Inference</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full animate-pulse"></span> 98.9ms Latency
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">MongoDB Atlas Cluster</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full"></span> Connected & Synced
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Auto-Escalation Engine</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full"></span> Active (Armed)
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
