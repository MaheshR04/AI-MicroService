import React, { useState } from 'react';
import { 
  Bot, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Tag
} from 'lucide-react';
import { useChat } from '../context/ChatContext.jsx';

export default function MessageBubble({ message }) {
  const { openAnalysisModal, speakMessage, isSpeaking, activeSpeechMsgId } = useChat();
  const [copied, setCopied] = useState(false);

  const isUser = message.sender === 'user';
  const isAudioPlaying = isSpeaking && activeSpeechMsgId === message.id;
  const analysis = message.queryAnalysis;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format basic markdown (bold, bullets, code blocks)
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const content = line.replace(/^[•-]\s*/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 my-1 leading-relaxed">
            {formatInlineText(content)}
          </li>
        );
      }

      // Numbered points
      if (/^\d+\.\s/.test(line.trim())) {
        const content = line.replace(/^\d+\.\s*/, '');
        return (
          <div key={idx} className="ml-4 flex items-start space-x-2 my-1.5 text-slate-200 leading-relaxed">
            <span className="font-semibold text-blue-400 shrink-0">{line.match(/^\d+\./)[0]}</span>
            <span>{formatInlineText(content)}</span>
          </div>
        );
      }

      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 text-slate-200 leading-relaxed">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  // Inline formatting helper (bold, code, links)
  const formatInlineText = (str) => {
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 font-mono text-xs border border-slate-700/60">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-3.5 group`}>
      <div className={`flex max-w-2xl sm:max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-1 ring-white/20">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/10">
              <Bot className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Message Content Container */}
        <div className="flex flex-col space-y-1.5 max-w-[85vw] sm:max-w-xl md:max-w-2xl">
          
          {/* Header Metadata (Sender & Time) */}
          <div className={`flex items-center space-x-2 text-[11px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="font-medium text-slate-300">
              {isUser ? 'You' : 'CX Guardian AI'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {message.time}
            </span>

            {/* Model & Latency badge for AI */}
            {!isUser && message.model && (
              <>
                <span>•</span>
                <span className="text-[10px] text-blue-400/90 font-mono bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
                  {message.model}
                </span>
                {message.latencyMs > 0 && (
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                    ⚡ {message.latencyMs}ms
                  </span>
                )}
              </>
            )}
          </div>

          {/* Bubble Box */}
          <div
            className={`p-4 rounded-2xl text-sm transition-all relative ${
              isUser
                ? 'glass-bubble-user text-white rounded-tr-sm'
                : 'glass-bubble-ai rounded-tl-sm text-slate-100'
            }`}
          >
            {/* Message Body */}
            <div className="text-[13.5px] font-normal leading-relaxed">
              {renderFormattedText(message.text)}
            </div>

            {/* AI Action Strip: Analysis button, TTS, Copy */}
            {!isUser && (
              <div className="mt-3 pt-3 border-t border-slate-700/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                
                {/* Query Analysis Trigger Button */}
                {analysis && (
                  <button
                    onClick={() => openAnalysisModal(analysis)}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-700/40 text-[11px] font-medium transition shadow-sm"
                  >
                    <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                    <span>Query Analysis:</span>
                    <span className="font-bold text-white">{analysis.intent}</span>
                    <ArrowUpRight className="w-3 h-3 text-blue-400" />
                  </button>
                )}

                {/* Right controls: Voice & Copy */}
                <div className="flex items-center space-x-1 text-slate-400">
                  {/* Speaker Read-Aloud */}
                  <button
                    onClick={() => speakMessage(message.id, message.text)}
                    title={isAudioPlaying ? 'Stop playback' : 'Read message aloud'}
                    className={`p-1.5 rounded-md hover:text-white transition flex items-center gap-1 ${
                      isAudioPlaying ? 'bg-blue-600/30 text-blue-400' : 'hover:bg-slate-800'
                    }`}
                  >
                    {isAudioPlaying ? (
                      <>
                        <span className="sound-bar" />
                        <span className="sound-bar" />
                        <span className="sound-bar" />
                        <Volume2 className="w-3.5 h-3.5 text-blue-400 ml-1" />
                      </>
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    title="Copy response"
                    className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick analysis badge under AI response */}
          {!isUser && analysis && (
            <div className="flex items-center space-x-2 px-1 text-[11px] text-slate-400">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                analysis.sentiment === 'Positive'
                  ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/40'
                  : analysis.sentiment === 'Frustrated' || analysis.sentiment === 'Negative'
                  ? 'bg-rose-950/70 text-rose-400 border-rose-800/40'
                  : 'bg-slate-800/70 text-slate-300 border-slate-700/40'
              }`}>
                {analysis.sentiment} ({Math.round(Math.abs(analysis.sentimentScore || 0) * 100)}%)
              </span>

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                analysis.urgency === 'Critical' || analysis.urgency === 'High'
                  ? 'bg-amber-950/70 text-amber-400 border-amber-800/40'
                  : 'bg-slate-800/70 text-slate-400 border-slate-700/40'
              }`}>
                Urgency: {analysis.urgency}
              </span>

              {analysis.requiresHumanEscalation && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/50 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-rose-400" />
                  Escalated to Support Queue
                </span>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
