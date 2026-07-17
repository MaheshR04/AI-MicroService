import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Brain, 
  ArrowUpRight, 
  AlertTriangle,
  Play,
  Cpu,
  Users,
  Ticket,
  Smile
} from 'lucide-react';

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('Tickets');

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

  const navigate = useNavigate();

  useEffect(() => {
    const actions = [
      { id: 'CX-4916', customer: 'Tesla Corp', agent: 'Setup Specialist', action: 'MFA Deactivated', status: 'Success', time: 'Just now', sentiment: 'Positive' },
      { id: 'CX-4915', customer: 'Airbnb Support', agent: 'Refund Specialist', action: 'Escalated: Suspicious Activity', status: 'Escalated', time: 'Just now', sentiment: 'Negative' },
      { id: 'CX-4914', customer: 'GitHub Enterprise', agent: 'Billing Specialist', action: 'Subscription Upgraded', status: 'Success', time: 'Just now', sentiment: 'Positive' },
    ];
    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setLiveTickets(prev => [
        { ...randomAction, id: `CX-${Math.floor(Math.random() * 1000) + 5000}`, time: 'Just now' },
        ...prev.slice(0, 3)
      ]);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Customers', value: '14,291', change: 'Microsoft, Stripe, Zoom +', icon: Users, color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/20' },
    { label: 'Open Tickets', value: '1,924', change: 'Escalated to human backup', icon: Ticket, color: 'text-accentred bg-red-50 dark:bg-red-950/20' },
    { label: 'Resolved Tickets', value: '12,366', change: 'Auto-closed this cycle', icon: CheckCircle2, color: 'text-accentemerald bg-emerald-50 dark:bg-emerald-950/20' },
    { label: 'Customer Satisfaction', value: '4.8 / 5.0', change: '96.8% approval CSAT', icon: Smile, color: 'text-primary bg-indigo-50 dark:bg-indigo-950/20' },
    { label: 'AI Resolution Rate', value: '84.6%', change: '+3.2% vs yesterday', icon: Cpu, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/20' },
    { label: 'Average Response Time', value: '11.8s', change: 'Human average: 14.5m', icon: Clock, color: 'text-primary bg-blue-50 dark:bg-blue-950/20' },
    { label: 'Churn Risk', value: '1.2%', change: 'Lowest sector churn rate', icon: AlertTriangle, color: 'text-accentorange bg-amber-50 dark:bg-amber-950/20' },
    { label: 'Customer Health Score', value: '98.9%', change: 'All systems operational', icon: Activity, color: 'text-accentemerald bg-emerald-50 dark:bg-emerald-950/20' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3.5 flex items-center gap-1">
                <span className="text-xs font-medium text-slate-500">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DASHBOARD GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TABBED CONSOLE TABLES */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* Tab header selector */}
            <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Support Operations Center</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Explore tickets, customer listings, decisions, and system logs</p>
              </div>
              <div className="flex gap-1 bg-slate-200/60 p-1 rounded-lg">
                {['Tickets', 'Customers', 'Decisions', 'Activities'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      activeTab === tab 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-550 hover:bg-white/40'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB TABLE 1: TICKETS */}
            {activeTab === 'Tickets' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Agent Node</th>
                      <th className="px-6 py-3">Resolution Action</th>
                      <th className="px-6 py-3">Sentiment</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {liveTickets.map((t, idx) => (
                      <tr 
                        key={idx} 
                        onClick={() => navigate('/tickets')}
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-3.5 font-bold text-slate-900">{t.id}</td>
                        <td className="px-6 py-3.5 font-bold text-slate-800">{t.customer}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-semibold">{t.agent}</td>
                        <td className="px-6 py-3.5 text-slate-500 truncate max-w-xs">{t.action}</td>
                        <td className="px-6 py-3.5">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            t.sentiment === 'Positive' ? 'bg-emerald-50 text-accentemerald border-emerald-100' :
                            t.sentiment === 'Neutral' ? 'bg-slate-50 text-slate-500 border-slate-100' :
                            'bg-red-50 text-accentred border-red-100'
                          }`}>{t.sentiment}</span>
                        </td>
                        <td className="px-6 py-3.5 text-right font-bold text-slate-700">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            t.status === 'Success' ? 'bg-emerald-50 text-accentemerald border-emerald-100' : 'bg-red-50 text-accentred border-red-100'
                          }`}>{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB TABLE 2: CUSTOMERS */}
            {activeTab === 'Customers' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Customer Name</th>
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">Segment Tier</th>
                      <th className="px-6 py-3">Health status</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {recentCustomers.map((c, idx) => (
                      <tr 
                        key={idx} 
                        onClick={() => navigate('/customer360')}
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-3.5 font-bold text-slate-900">{c.name}</td>
                        <td className="px-6 py-3.5 font-semibold text-slate-650">{c.company}</td>
                        <td className="px-6 py-3.5 text-slate-500">{c.tier}</td>
                        <td className="px-6 py-3.5">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            c.health === 'Healthy' ? 'bg-emerald-50 text-accentemerald border-emerald-100' : 'bg-red-50 text-accentred border-red-100'
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
                    <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Decision ID</th>
                      <th className="px-6 py-3">Action Description</th>
                      <th className="px-6 py-3">Decision Node</th>
                      <th className="px-6 py-3">Confidence Rating</th>
                      <th className="px-6 py-3 text-right">Gatekeeper status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {aiDecisions.map((d, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-3.5 font-bold text-slate-900">{d.decisionId}</td>
                        <td className="px-6 py-3.5 text-slate-600 font-medium truncate max-w-xs">{d.action}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-semibold">{d.agent}</td>
                        <td className="px-6 py-3.5 text-primary font-bold">{d.confidence}</td>
                        <td className="px-6 py-3.5 text-right">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            d.status === 'Synced' ? 'bg-emerald-50 text-accentemerald border-emerald-100' : 'bg-red-50 text-accentred border-red-100'
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
                    <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Activity Description</th>
                      <th className="px-6 py-3">Integration Node</th>
                      <th className="px-6 py-3">Time elapsed</th>
                      <th className="px-6 py-3 text-right">Sync status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {recentActivities.map((a, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-3.5 text-slate-700 font-semibold">{a.description}</td>
                        <td className="px-6 py-3.5 text-slate-500">{a.component}</td>
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

          <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center">
            <span className="text-xs text-slate-450 font-medium">Monitoring active streams</span>
          </div>
        </div>

        {/* SENTIMENT & CRITICAL PIPELINE INDEX */}
        <div className="space-y-6">
          
          {/* CRITICAL SENTIMENT ALERTS */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Critical Sentiment Alerts</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">High-priority ticket escalations requiring human backup</p>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accentred shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-accentred">Incident #CX-4910</span>
                    <span className="text-[10px] text-slate-400 font-medium">5m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Zoom Inc. requested refund above standard AI limit ($1500). Customer expressed anger.
                  </p>
                  <button 
                    onClick={() => navigate('/tickets')}
                    className="text-[10px] text-primary hover:underline font-bold mt-2 cursor-pointer"
                  >
                    Takeover Ticket
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accentorange shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-accentorange">Incident #CX-4892</span>
                    <span className="text-[10px] text-slate-400 font-medium">1h ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Snowflake API key rotating agent loop detected. Autopilot paused agent.
                  </p>
                  <button 
                    onClick={() => navigate('/reasoning')}
                    className="text-[10px] text-primary hover:underline font-bold mt-2 cursor-pointer"
                  >
                    Inspect Reasoning
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SYSTEM PERFORMANCE & DISPATCH */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Autopilot Integrity</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Autonomous core system health status</p>
            </div>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Autonomous API Engine</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full animate-pulse"></span> Operational
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Reasoning Vector Database</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full"></span> Active (4.2ms query latency)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Twilio Alert Gateway</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full"></span> Standby
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Auto-Escalation Engine</span>
                <span className="font-semibold text-accentemerald flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accentemerald rounded-full"></span> Armed
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
