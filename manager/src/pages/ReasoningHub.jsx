import React, { useState } from 'react';
import { 
  Search, 
  Brain, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  HelpCircle,
  Database,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';

export default function ReasoningHub() {
  const logs = [
    {
      id: 'CX-4912',
      customer: 'Microsoft Corp (Enterprise)',
      time: 'Just now',
      handlingTime: '8.4s',
      confidence: 98,
      issue: 'Customer requesting subscription refund due to accidental seat purchase',
      action: 'Refund processed via Stripe, 5 accidental seats deallocated in Okta',
      reasoningChain: [
        { step: '1. Intent Recognition', detail: 'Parsing ticket transcript... Identified core intent as "Refund Request" with entity "Seat Allocation Dispute".' },
        { step: '2. Database Context Gathering', detail: 'Fetched user billing record ref usr_8192a. User tier: Enterprise, Billing Cycle: Monthly, Seats: 45. Last charge: 3 days ago ($1,250).' },
        { step: '3. Fraud Risk Assessment', detail: 'Evaluated billing history and anomaly metrics. Risk score: 0.04 (highly benign). No prior disputes found.' },
        { step: '4. Rule Evaluation', detail: 'Checking active recipes... Matches rule "Billing Dispute Auto-Resolution". Conditions met: Seats added < 10 days ago, total dispute < $500.' },
        { step: '5. Action Dispatch', detail: 'Invoking Stripe API (ref: ch_1941a_ref). Result: Success. Invoked Okta Sync to deallocate 5 accidental seats.' }
      ]
    },
    {
      id: 'CX-4911',
      customer: 'Stripe API Partner',
      time: '2m ago',
      handlingTime: '12.1s',
      confidence: 94,
      issue: 'API keys reset failed, customer locked out of dev environment',
      action: 'API key rotated, backup recovery envelope dispatched via Twilio',
      reasoningChain: [
        { step: '1. Intent Recognition', detail: 'Identified core intent as "Credential Reset Request" and "Access Lockout". Critical tag applied.' },
        { step: '2. Identity Verification', detail: 'Validated requesting email domains against workspace configurations. Domain validation: Passed.' },
        { step: '3. Security Logs Scan', detail: 'Scanned past 24h auth logs. No suspicious IPs or brute-force attempts recorded.' },
        { step: '4. Action Dispatch', detail: 'Rotated active developer API key. Dispatched secure login envelope using configured Twilio SMS gateway.' }
      ]
    },
    {
      id: 'CX-4909',
      customer: 'Vercel Sandbox Customer',
      time: '11m ago',
      handlingTime: '9.2s',
      confidence: 97,
      issue: 'Custom domain binding failing with SSL negotiation issue',
      action: 'DNS parameters verified, Let\'s Encrypt SSL certificate re-issued',
      reasoningChain: [
        { step: '1. Intent Recognition', detail: 'Identified intent: "DNS Configuration Inquiry" and "SSL Handshake Failure".' },
        { step: '2. Network Dig Tool execution', detail: 'Initiated dig trace for domain test.vercel.app. ALIAS records matching, A records resolving.' },
        { step: '3. SSL Renewal Dispatch', detail: 'Triggered SSL renewal request via Vercel Edge API gateway. Renewal successful.' }
      ]
    }
  ];

  const [activeLog, setActiveLog] = useState(logs[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* EXPLAINABILITY SUB-HEADER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Reasoning Explainability Dashboard</h3>
            <span className="text-[10px] bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Audit Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Audit Chain-of-Thought logs and model decision confidence metrics in real-time</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Database className="w-4 h-4 text-primary" />
          <span>Post-Inference Trace v1.8</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LOGS LIST (LEFT) */}
        <div className="space-y-3">
          
          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by ticket ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-9 pr-4 py-2 rounded-xl text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-slate-800 dark:text-slate-100 transition-colors shadow-sm"
            />
          </div>

          {/* LIST */}
          <div className="space-y-2.5">
            {filteredLogs.map(log => (
              <div
                key={log.id}
                onClick={() => setActiveLog(log)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all card-hover ${
                  activeLog.id === log.id 
                    ? 'bg-white dark:bg-slate-900 border-primary shadow-sm ring-2 ring-primary/20' 
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-primary bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 px-2 py-0.5 rounded-lg">
                    {log.id}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-2 truncate">{log.customer}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{log.issue}</p>
                
                <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1 font-mono"><Clock className="w-3 h-3" /> {log.handlingTime}</span>
                  <span className="text-accentemerald font-mono font-bold">{log.confidence}% AI Confidence</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* LOG INSPECTOR DETAIL (RIGHT) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-[500px]">
          
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold text-primary bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-lg">
                    {activeLog.id}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{activeLog.customer}</h3>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Executed Autonomous Action Audit</span>
              </div>
              
              {/* Confidence Meter */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl px-4 py-2 shrink-0">
                <Brain className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">Confidence Level</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-accentemerald rounded-full" style={{ width: `${activeLog.confidence}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">{activeLog.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Incident Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Customer Inquiry</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{activeLog.issue}</p>
              </div>
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Autonomous Resolution Action</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{activeLog.action}</p>
              </div>
            </div>

            {/* CHAIN-OF-THOUGHT TIMELINE */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-primary" />
                Chain-of-Thought (Explainability Logs)
              </h4>
              
              <div className="space-y-3.5">
                {activeLog.reasoningChain.map((chain, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[10px] font-bold text-primary">
                        {i + 1}
                      </div>
                      {i < activeLog.reasoningChain.length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 dark:bg-slate-800 my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 rounded-xl p-3 transition-colors">
                      <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">{chain.step}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{chain.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5 text-slate-400" /> Immutable audit record stored in MongoDB</span>
            <button className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export Audit JSON
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
