import React from 'react';
import { 
  Building, 
  User, 
  Coins, 
  Activity, 
  CheckCircle2, 
  Database, 
  ShieldCheck, 
  Clock, 
  TrendingUp,
  Compass,
  ArrowRight,
  Sliders,
  ExternalLink
} from 'lucide-react';

export default function Customer360() {
  const customer = {
    name: 'Sarah Jenkins',
    title: 'VP Operations',
    company: 'Microsoft Corp',
    segment: 'Enterprise Gold Tier',
    ltv: '$154,200.00',
    nps: '9 / 10',
    csat: '4.8 / 5.0',
    status: 'Healthy',
    churnProb: '1.2%',
    activeSeats: '40 / 45',
    lastActive: '3m ago'
  };

  const integrations = [
    { name: 'Salesforce CRM', scope: 'Accounts & Contacts sync', status: 'Connected', date: '3h ago' },
    { name: 'HubSpot Deals', scope: 'Adoption pipelines logs', status: 'Connected', date: '1d ago' },
    { name: 'Okta Identity', scope: 'Active Directory seat mapping', status: 'Connected', date: '1w ago' },
  ];

  const activities = [
    { type: 'Refund', title: 'Seat refund resolved autonomously (CX-4912)', desc: 'AI Billing Agent deallocated 5 seats, refunded $199 to Stripe card ref ch_1941a.', date: 'Oct 17, 2026' },
    { type: 'Domain Bind', title: 'Custom domain DNS configured (CX-4890)', desc: 'AI Onboarding Agent dig traced ALIAS record, re-issued Let\'s Encrypt SSL certificate.', date: 'Oct 15, 2026' },
    { type: 'MFA Reset', title: 'MFA key lockout resolved via SMS (CX-4712)', desc: 'Human agent override. Dispatched security codes via Twilio broker.', date: 'Oct 10, 2026' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* 360 BAR */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-sm font-bold text-slate-500 uppercase">
            SJ
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">{customer.name} ({customer.title})</h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Company: {customer.company}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold bg-blue-50 border border-blue-100 text-primary px-2.5 py-0.5 rounded-full">
            {customer.segment}
          </span>
          <span className="text-[9px] font-bold bg-emerald-50 border border-emerald-100 text-accentemerald px-2.5 py-0.5 rounded-full">
            ● {customer.status} Account
          </span>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-2">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Customer LTV</span>
          <h3 className="text-xl font-extrabold text-slate-800">{customer.ltv}</h3>
          <span className="text-[9px] text-slate-400 font-medium block">Contract worth ARR</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-2">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">NPS Index</span>
          <h3 className="text-xl font-extrabold text-slate-800">{customer.nps}</h3>
          <span className="text-[9px] text-accentemerald font-medium block">Promoter Score status</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-2">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">CSAT Rating</span>
          <h3 className="text-xl font-extrabold text-slate-800">{customer.csat}</h3>
          <span className="text-[9px] text-accentemerald font-medium block">Extremely satisfied customer</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-2">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Churn Probability</span>
          <h3 className="text-xl font-extrabold text-slate-800">{customer.churnProb}</h3>
          <span className="text-[9px] text-slate-400 font-medium block">Predictive model check</span>
        </div>
      </div>

      {/* 360 BLOCKS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TIMELINE LIST (LEFT) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Customer Interaction History</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Chronological timeline of tickets resolved autonomously vs manually</p>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 z-10">
                  {i + 1}
                </div>
                
                <div className="flex-1 bg-slate-50 border border-slate-200 hover:border-slate-350 p-4 rounded-xl space-y-1.5 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-800">{a.title}</h4>
                    <span className="text-[9px] text-slate-450 font-medium">{a.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CRM INTEGRATIONS & DETAILS (RIGHT) */}
        <div className="space-y-6">
          
          {/* CRM integration list */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Connected CRM Records</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Active data pipelines syncing customer context</p>
            </div>

            <div className="space-y-3">
              {integrations.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5 last:border-b-0 last:pb-0">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.scope}</span>
                  </div>
                  <span className="text-[9px] font-bold bg-emerald-50 text-accentemerald border border-emerald-100 px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Autopilot memory overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Agent Memory context</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Active variables compiled into agent system prompts</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Gold SLA compliance time</span>
                <span className="font-bold text-slate-800">Armed (2h limit)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Automatic Refund Threshold</span>
                <span className="font-bold text-slate-800">$500 max</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Active Directory sync groups</span>
                <span className="font-bold text-slate-800">Microsoft-Sync-Group</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
