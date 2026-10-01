import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Loader2, 
  Radio, 
  Cpu, 
  ShieldCheck 
} from 'lucide-react';
import { useChat } from '../context/ChatContext.jsx';

export default function ChatInput() {
  const { 
    sendMessage, 
    isAnalyzing, 
    isGenerating, 
    currentStep,
    isListening, 
    toggleListening 
  } = useChat();

  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isAnalyzing || isGenerating) return;

    const query = input;
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    sendMessage(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Voice transcript listener
  const handleMicClick = () => {
    toggleListening((transcript, isFinal) => {
      setInput(transcript);
      if (isFinal) {
        // Automatically submit or allow review
      }
    });
  };

  const isBusy = isAnalyzing || isGenerating;

  return (
    <div className="w-full bg-slate-900/90 border-t border-slate-800 p-3 sm:p-4 backdrop-blur-lg shrink-0">
      
      {/* Dynamic Processing Status Bar */}
      {isBusy && (
        <div className="mb-2.5 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-between text-xs animate-in fade-in duration-150">
          <div className="flex items-center space-x-2 text-blue-300">
            {isAnalyzing ? (
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            ) : (
              <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            )}
            <span className="font-medium">{currentStep}</span>
          </div>
          <span className="text-[10px] text-blue-400 font-mono">
            {isAnalyzing ? 'Stage 1/2' : 'Stage 2/2'}
          </span>
        </div>
      )}

      {/* Voice Listening Active Banner */}
      {isListening && (
        <div className="mb-2.5 px-3 py-2 rounded-lg bg-rose-950/60 border border-rose-800/60 flex items-center justify-between text-xs animate-pulse">
          <div className="flex items-center space-x-2 text-rose-300">
            <Radio className="w-4 h-4 text-rose-400 animate-ping" />
            <span className="font-medium">Listening to your voice... Speak your inquiry clearly.</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="sound-bar bg-rose-400" />
            <span className="sound-bar bg-rose-400" />
            <span className="sound-bar bg-rose-400" />
            <span className="sound-bar bg-rose-400" />
          </div>
        </div>
      )}

      {/* Input Form Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-inner">
        
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleMicClick}
          title={isListening ? 'Stop listening' : 'Start voice input (Speech to Text)'}
          className={`p-2.5 rounded-xl transition-all shrink-0 ${
            isListening
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your issue, ask a billing query, or troubleshoot an error..."
          rows={1}
          disabled={isBusy}
          className="flex-1 bg-transparent border-0 text-slate-100 text-sm placeholder-slate-500 focus:ring-0 focus:outline-none resize-none py-2 px-1 max-h-36 leading-relaxed disabled:opacity-50"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isBusy}
          title="Send inquiry"
          className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
        >
          {isBusy ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>

      {/* Helper Footer */}
      <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-slate-600" />
          Natural Query Understanding & Intent Classifier Enabled
        </span>
        <span className="hidden sm:inline">
          Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono text-[10px] border border-slate-700">Enter ↵</kbd> to send, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono text-[10px] border border-slate-700">Shift + Enter</kbd> for new line
        </span>
      </div>

    </div>
  );
}
