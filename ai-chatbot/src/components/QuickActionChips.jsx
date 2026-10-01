import React from 'react';
import { 
  CreditCard, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  KeyRound, 
  Zap 
} from 'lucide-react';
import { useChat } from '../context/ChatContext.jsx';

export default function QuickActionChips() {
  const { sendMessage, isAnalyzing, isGenerating } = useChat();

  const prompts = [
    {
      label: 'Refund 5 accidental seats',
      text: 'Hi, I accidentally added 5 new seat slots on our subscription yesterday. Can you please revert this and refund the accidental seats?',
      icon: CreditCard,
      color: 'hover:border-blue-500/50 hover:bg-blue-500/10 text-blue-300'
    },
    {
      label: 'Fix API 500 Webhook Error',
      text: 'Our developer webhook endpoint is receiving HTTP 500 internal server errors on payload delivery. Can you troubleshoot this?',
      icon: AlertTriangle,
      color: 'hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-300'
    },
    {
      label: 'Check invoice #INV-9102',
      text: 'I noticed invoice #INV-9102 was charged twice on our corporate card for $199.00. Please investigate the double charge.',
      icon: FileText,
      color: 'hover:border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-300'
    },
    {
      label: 'Talk to Human Specialist',
      text: 'I would like to escalate this issue and speak with an active support specialist or supervisor immediately.',
      icon: UserCheck,
      color: 'hover:border-rose-500/50 hover:bg-rose-500/10 text-rose-300'
    },
    {
      label: 'Enterprise Pricing & SLA',
      text: 'What are the enterprise plan SLA response guarantees and volume discounts for 50+ agent seats?',
      icon: Zap,
      color: 'hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-300'
    }
  ];

  return (
    <div className="w-full overflow-x-auto py-2 px-1 flex items-center space-x-2 scrollbar-none shrink-0">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap pl-1 pr-1 flex items-center gap-1">
        <Zap className="w-3 h-3 text-blue-400" />
        Quick Queries:
      </span>
      {prompts.map((p, idx) => {
        const Icon = p.icon;
        return (
          <button
            key={idx}
            disabled={isAnalyzing || isGenerating}
            onClick={() => sendMessage(p.text)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border border-slate-700/60 bg-slate-800/40 text-slate-300 transition-all whitespace-nowrap flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${p.color}`}
          >
            <Icon className="w-3 h-3 shrink-0" />
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}
