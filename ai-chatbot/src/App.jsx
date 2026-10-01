import React from 'react';
import { ChatProvider } from './context/ChatContext.jsx';
import ChatHeader from './components/ChatHeader.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import QueryAnalysisModal from './components/QueryAnalysisModal.jsx';
import ApiSettingsModal from './components/ApiSettingsModal.jsx';
import { ExternalLink, ShieldCheck, Users, LayoutDashboard, Cpu } from 'lucide-react';

function AppContent() {
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <ChatHeader />

      {/* Main Chat Interface */}
      <main className="flex-1 flex overflow-hidden relative">
        <ChatInterface />
      </main>

      {/* Microservices Navigation Footer */}
      <footer className="h-9 border-t border-slate-800/80 bg-slate-950 px-4 sm:px-6 flex items-center justify-between text-[11px] text-slate-400 shrink-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">Phase 2: AI Query Intelligence & Conversational Reply Active</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition flex items-center gap-1"
          >
            <Users className="w-3 h-3 text-blue-400" />
            <span>Support Agent Portal (5174)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 transition flex items-center gap-1"
          >
            <LayoutDashboard className="w-3 h-3 text-indigo-400" />
            <span>Manager Dashboard (5173)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          <a
            href="http://localhost:5000/api/v1/health"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition flex items-center gap-1"
          >
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>API Gateway (5000)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      </footer>

      {/* Interactive Modals */}
      <QueryAnalysisModal />
      <ApiSettingsModal />

    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}
