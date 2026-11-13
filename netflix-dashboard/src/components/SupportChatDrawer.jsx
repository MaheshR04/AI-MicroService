import React, { useState, useRef, useEffect } from 'react';
import { useNetflixSupport, SUPPORTED_LANGUAGES } from '../context/NetflixSupportContext';
import QueryResultCard from './QueryResultCard';
import {
  X,
  Send,
  MessageSquare,
  Globe,
  Tag,
  PieChart,
  Zap,
  Wifi,
  Smartphone,
  ShieldAlert,
  Router,
  MoreHorizontal,
  RotateCcw,
  Bot,
  User,
  Sparkles,
  Phone,
  HelpCircle,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

const ICON_MAP = {
  Tag: Tag,
  PieChart: PieChart,
  Zap: Zap,
  Wifi: Wifi,
  Smartphone: Smartphone,
  ShieldAlert: ShieldAlert,
  Router: Router,
  MoreHorizontal: MoreHorizontal,
  Globe: Globe,
};

export default function SupportChatDrawer() {
  const {
    isChatOpen,
    setIsChatOpen,
    setIsCallingOpen,
    user,
    messages,
    isTyping,
    sendMessage,
    chatLanguage,
    handleSelectLanguage,
    handleSelectQuery,
    initQuickMenu,
    initLanguagePrompt
  } = useNetflixSupport();

  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === chatLanguage);

  return (
    <div
      className={`fixed z-50 transition-all duration-300 flex flex-col shadow-2xl bg-neutral-950 border border-white/10 ${
        isMaximized
          ? 'inset-4 sm:inset-8 rounded-2xl'
          : 'bottom-4 right-4 sm:right-6 w-full max-w-[420px] sm:max-w-[460px] h-[640px] max-h-[92vh] rounded-2xl'
      }`}
    >
      {/* Top Header */}
      <div className="p-3.5 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border-b border-white/10 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-neutral-950" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white tracking-wide">Jio Care Assistant</h3>
              <span className="text-[10px] bg-red-600/80 text-white font-bold px-1.5 py-0.2 rounded uppercase">
                Netflix
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="text-emerald-400 font-medium">Online</span>
              <span>•</span>
              <span>+91 {user.phone}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Quick Call Switch */}
          <button
            onClick={() => {
              setIsChatOpen(false);
              setIsCallingOpen(true);
            }}
            title="Switch to Calling Method"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Language Switcher Badge */}
          <button
            onClick={() => {
              handleSelectQuery('change_language');
            }}
            title="Change Chat Language"
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentLangObj ? currentLangObj.native : 'Lang'}</span>
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-neutral-950/60 selection:bg-blue-600 selection:text-white">
        {messages.map((msg) => {
          // 1. Language Selection Prompt
          if (msg.type === 'language_prompt') {
            return (
              <div key={msg.id} className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 bg-neutral-900 border border-white/10 p-3.5 rounded-2xl rounded-tl-sm text-xs text-neutral-200 shadow-md">
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                </div>

                {/* Language Selection Buttons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-9">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`p-2 rounded-xl text-left border transition flex flex-col justify-between ${
                        chatLanguage === lang.code
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                          : 'bg-neutral-900/80 hover:bg-neutral-800 border-white/10 hover:border-white/20 text-neutral-300'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-bold text-xs mt-1 text-white">{lang.native}</span>
                      <span className="text-[10px] text-neutral-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 2. Quick Menu Prompt & Buttons
          if (msg.type === 'quick_menu') {
            return (
              <div key={msg.id} className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 bg-neutral-900 border border-white/10 p-3.5 rounded-2xl rounded-tl-sm text-xs text-neutral-200 shadow-md">
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                </div>

                {/* 9 Quick Menu Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                  {msg.items.map((item) => {
                    const IconComponent = ICON_MAP[item.icon] || Tag;
                    const isLangChange = item.id === 'change_language';

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectQuery(item.id)}
                        className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 group ${
                          isLangChange
                            ? 'bg-amber-950/20 hover:bg-amber-900/30 border-amber-500/30 text-amber-300'
                            : 'bg-neutral-900 hover:bg-neutral-800/90 border-white/10 hover:border-blue-500/50 text-neutral-200'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                            isLangChange
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-white truncate">{item.label}</div>
                          <div className="text-[10px] text-neutral-400 truncate">{item.desc}</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          // 3. User Message
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end items-end gap-2">
                <div className="max-w-[85%] bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm text-xs shadow-md">
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[9px] text-blue-200 mt-1 block text-right">{msg.time}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
            );
          }

          // 4. Query Result Card
          if (msg.type === 'query_result') {
            return (
              <div key={msg.id} className="space-y-1 pl-9">
                <QueryResultCard queryId={msg.queryId} queryTitle={msg.queryTitle} />
                <span className="text-[9px] text-neutral-500 block">{msg.time}</span>
              </div>
            );
          }

          // 5. Normal AI Text Message
          return (
            <div key={msg.id} className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-neutral-900 border border-white/10 p-3.5 rounded-2xl rounded-tl-sm text-xs text-neutral-200 shadow-md space-y-2">
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                {msg.showMenuAction && (
                  <button
                    onClick={() => initQuickMenu(chatLanguage || 'en')}
                    className="mt-1 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-semibold transition flex items-center gap-1.5"
                  >
                    <span>📋 Open Quick Menu</span>
                  </button>
                )}
                <span className="text-[9px] text-neutral-500 block pt-1">{msg.time}</span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 pl-9 text-xs text-neutral-400">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] ml-1">Jio Care Assistant is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Menu Shortcut Strip */}
      <div className="px-3 py-1.5 bg-neutral-900/90 border-t border-white/5 flex items-center justify-between text-[11px]">
        <button
          onClick={() => initQuickMenu(chatLanguage || 'en')}
          className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 transition"
        >
          <span>📋 Show Quick Menu</span>
        </button>

        <button
          onClick={() => handleSelectQuery('change_language')}
          className="text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition"
        >
          <Globe className="w-3 h-3 text-neutral-400" />
          <span>Language: {currentLangObj ? currentLangObj.name : 'Select'}</span>
        </button>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 bg-neutral-900 border-t border-white/10 rounded-b-2xl flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            chatLanguage === 'hi'
              ? 'अपना सवाल यहाँ टाइप करें...'
              : chatLanguage === 'mr'
              ? 'तुमचा प्रश्न येथे टाइप करा...'
              : 'Ask a query or type custom question...'
          }
          className="flex-1 bg-neutral-950 border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none transition"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

