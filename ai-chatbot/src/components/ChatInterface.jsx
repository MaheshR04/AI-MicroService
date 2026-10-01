import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble.jsx';
import QuickActionChips from './QuickActionChips.jsx';
import ChatInput from './ChatInput.jsx';
import { useChat } from '../context/ChatContext.jsx';
import { ShieldCheck, Bot, Sparkles } from 'lucide-react';

export default function ChatInterface() {
  const { messages, isAnalyzing, isGenerating } = useChat();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing, isGenerating]);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] max-w-5xl w-full mx-auto overflow-hidden bg-slate-900/40 relative">
      
      {/* Messages Feed Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Scroll anchor */}
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* Quick Action Chips Bar */}
      <div className="px-3 sm:px-6 pb-1">
        <QuickActionChips />
      </div>

      {/* Input Bar */}
      <ChatInput />

    </div>
  );
}
