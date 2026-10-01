import React from 'react';
import { 
  Bot, 
  Settings, 
  Trash2, 
  Download, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useChat } from '../context/ChatContext.jsx';

export default function ChatHeader() {
  const { 
    apiConfig, 
    setIsApiSettingsModalOpen, 
    clearChat, 
    exportChat,
    voiceAutoPlay,
    setVoiceAutoPlay,
    isSpeaking
  } = useChat();

  const getProviderBadge = () => {
    switch (apiConfig.provider) {
      case 'groq':
        return { name: 'Groq LLaMA-3.3 70B', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'gemini':
        return { name: 'Google Gemini 2.0', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
      case 'openai':
        return { name: 'OpenAI GPT-4o-mini', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      default:
        return { name: 'Backend AI Microservice', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
    }
  };

  const badge = getProviderBadge();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Brand Identity */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              Enterprise CX Guardian
              <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                AI Copilot
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-2 mt-0.5">
            <span className={`text-[11px] font-medium px-2 py-0.2 rounded-md border flex items-center gap-1 ${badge.color}`}>
              <Sparkles className="w-3 h-3" />
              {badge.name}
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] text-slate-400 gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Query Understanding Active
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Voice Auto-read toggle */}
        <button
          onClick={() => setVoiceAutoPlay(!voiceAutoPlay)}
          title={voiceAutoPlay ? 'Auto-speak replies (Enabled)' : 'Auto-speak replies (Disabled)'}
          className={`p-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
            voiceAutoPlay
              ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm shadow-blue-500/10'
              : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          {voiceAutoPlay ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden md:inline text-[11px]">
            {voiceAutoPlay ? 'Voice On' : 'Voice Off'}
          </span>
        </button>

        {/* Export Chat */}
        <button
          onClick={exportChat}
          title="Export chat transcript"
          className="p-2 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Clear Chat */}
        <button
          onClick={clearChat}
          title="Clear current conversation"
          className="p-2 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700 hover:text-rose-400 hover:bg-slate-800 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* API Settings */}
        <button
          onClick={() => setIsApiSettingsModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all border border-blue-400/30"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI & Voice Settings</span>
        </button>
      </div>
    </header>
  );
}
