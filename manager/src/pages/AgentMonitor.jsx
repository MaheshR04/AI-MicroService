import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Settings, 
  Pause, 
  Play, 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle,
  Clock,
  Coins,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';

export default function AgentMonitor() {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Billing Guardian', type: 'Fintech Specialist', status: 'active', activeSessions: 8, totalResolved: 1240, avgHandling: '8.2s', cost: 0.08, accuracy: 99.8, log: 'Monitoring Stripe webhook events for unpaid seat adjustments...' },
    { id: 2, name: 'Setup Specialist', type: 'Onboarding Specialist', status: 'active', activeSessions: 12, totalResolved: 2490, avgHandling: '11.5s', cost: 0.12, accuracy: 98.9, log: 'Validating custom DNS parameters for microsoft.com...' },
    { id: 3, name: 'Upgrade Specialist', type: 'Expansion Advisor', status: 'standby', activeSessions: 0, totalResolved: 450, avgHandling: '14.1s', cost: 0.00, accuracy: 97.4, log: 'Agent resting. Standby for enterprise expansion triggers.' },
    { id: 4, name: 'Escalation Guardian', type: 'Threat Detector', status: 'active', activeSessions: 2, totalResolved: 180, avgHandling: '5.2s', cost: 0.15, accuracy: 99.5, log: 'Anger flag matched in ticket #CX-4910. Alerting support manager.' }
  ]);

  const toggleAgentStatus = (id) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'active' ? 'paused' : 'active';
        return {
          ...a,
          status: nextStatus,
          activeSessions: nextStatus === 'active' ? 5 : 0,
          cost: nextStatus === 'active' ? 0.08 : 0.00,
          log: nextStatus === 'active' ? 'Initializing cognitive pipeline...' : 'Cognitive pipeline suspended.'
        };
      }
      return a;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* AGENT INTRO */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Autonomous AI Agent Monitor</h3>
            <span className="text-[10px] bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span> 4 Bots Armed
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Control and inspect individual cognitive autonomous agents in real-time</p>
        </div>
        
        {/* Collective metrics */}
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Average Accuracy</span>
            <span className="text-base font-extrabold text-accentemerald font-mono">98.9%</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Processing Cost</span>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-mono">$0.35/min</span>
          </div>
        </div>
      </div>

      {/* AGENT MONITOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agents.map(agent => (
          <div 
            key={agent.id} 
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-sm overflow-hidden card-hover flex flex-col justify-between"
          >
            
            {/* Header portion */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    agent.status === 'active' 
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-primary' :
                    agent.status === 'paused' 
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-accentred' :
                      'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{agent.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{agent.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                    agent.status === 'active' ? 'bg-emerald-50 text-accentemerald border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800' :
                    agent.status === 'paused' ? 'bg-red-50 text-accentred border-red-200 dark:bg-red-950/40 dark:border-red-800' :
                    'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                  }`}>
                    {agent.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                    {agent.status.toUpperCase()}
                  </span>
                  
                  <button 
                    onClick={() => toggleAgentStatus(agent.id)}
                    className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                      agent.status === 'active' 
                        ? 'text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800' 
                        : 'text-primary border-blue-200 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                    }`}
                    title={agent.status === 'active' ? 'Pause Agent' : 'Resume Agent'}
                  >
                    {agent.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Status parameters */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-3.5 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Active Chats</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">{agent.activeSessions}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Total Solved</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">{agent.totalResolved}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Avg Time</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">{agent.avgHandling}</span>
                </div>
              </div>

              {/* Performance trackers */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> LLM Confidence Rating</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{agent.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><Coins className="w-3.5 h-3.5 text-slate-400" /> Compute Run Cost</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">${agent.cost.toFixed(2)}/min</span>
                </div>
              </div>
            </div>

            {/* Bottom logs tick */}
            <div className="px-5 py-3 bg-slate-950 border-t border-slate-900 font-mono text-[10px] text-slate-400 flex items-center gap-2 truncate">
              <span className="text-emerald-400 font-bold shrink-0">&gt;_</span>
              <span className="truncate">{agent.log}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
