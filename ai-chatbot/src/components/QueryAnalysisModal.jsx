import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  Tag, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  FileText,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useChat } from '../context/ChatContext.jsx';

export default function QueryAnalysisModal() {
  const { selectedAnalysis, isAnalysisModalOpen, closeAnalysisModal } = useChat();
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isAnalysisModalOpen || !selectedAnalysis) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedAnalysis, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Frustrated':
      case 'Negative':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'High':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Medium':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Query Understanding & Intelligence
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  AI Evaluated
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Cognitive semantic breakdown, intent classification, and entity telemetry
              </p>
            </div>
          </div>

          <button
            onClick={closeAnalysisModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* 1. Analyzed User Query Box */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Raw Input Query
            </span>
            <p className="text-sm font-medium text-slate-200 italic bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
              "{selectedAnalysis.rawQuery || 'Welcome Greeting'}"
            </p>
          </div>

          {/* 2. Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Intent */}
            <div className="bg-slate-950/40 border border-slate-800/90 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Detected Intent
              </span>
              <span className="text-xs font-bold text-blue-400 block truncate">
                {selectedAnalysis.intent}
              </span>
              <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                {selectedAnalysis.category}
              </span>
            </div>

            {/* Sentiment */}
            <div className="bg-slate-950/40 border border-slate-800/90 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sentiment Tone
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border inline-block ${getSentimentColor(selectedAnalysis.sentiment)}`}>
                {selectedAnalysis.sentiment}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Score: {selectedAnalysis.sentimentScore > 0 ? `+${selectedAnalysis.sentimentScore.toFixed(2)}` : selectedAnalysis.sentimentScore?.toFixed(2) || '0.00'}
              </span>
            </div>

            {/* Urgency */}
            <div className="bg-slate-950/40 border border-slate-800/90 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Urgency & SLA
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border inline-block ${getUrgencyColor(selectedAnalysis.urgency)}`}>
                {selectedAnalysis.urgency}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Target: {selectedAnalysis.slaMinutes || 30}m SLA
              </span>
            </div>

            {/* Confidence */}
            <div className="bg-slate-950/40 border border-slate-800/90 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                AI Confidence
              </span>
              <span className="text-xs font-bold text-emerald-400 block">
                {selectedAnalysis.confidence}%
              </span>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${selectedAnalysis.confidence}%` }}
                />
              </div>
            </div>

          </div>

          {/* 3. Extracted Business Entities */}
          <div className="bg-slate-950/40 border border-slate-800/90 rounded-xl p-4 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Extracted Entities & Metadata
            </span>

            {selectedAnalysis.entities && selectedAnalysis.entities.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedAnalysis.entities.map((ent, i) => (
                  <div 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-700/50 text-indigo-200 text-xs flex items-center space-x-1.5"
                  >
                    <span className="font-semibold text-slate-400 text-[10px]">{ent.type}:</span>
                    <span className="font-mono font-bold text-white">{ent.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-1">
                No explicit transactional entities (like invoice codes or seat counts) detected in this message.
              </p>
            )}
          </div>

          {/* 4. Reasoning Chain & Thought Process */}
          <div className="bg-slate-950/40 border border-slate-800/90 rounded-xl p-4 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Reasoning Chain & Decision Graph
            </span>

            <div className="space-y-2">
              {selectedAnalysis.reasoningSteps && selectedAnalysis.reasoningSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Recommended Action & Escalation Flag */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
            selectedAnalysis.requiresHumanEscalation
              ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
              : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
          }`}>
            {selectedAnalysis.requiresHumanEscalation ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {selectedAnalysis.requiresHumanEscalation ? 'Action: Escalate to Support Queue' : 'Action: Autonomous Resolution'}
              </h4>
              <p className="text-xs opacity-90 leading-relaxed">
                {selectedAnalysis.recommendedAction}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={handleCopyJson}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJson ? 'Copied JSON!' : 'Copy Telemetry JSON'}</span>
          </button>

          <button
            onClick={closeAnalysisModal}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
