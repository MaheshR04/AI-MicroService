import React, { useState } from 'react';
import {
  NetflixSupportProvider,
  useNetflixSupport
} from './context/NetflixSupportContext';
import NetflixNavbar from './components/NetflixNavbar';
import NetflixHero from './components/NetflixHero';
import SupportChatDrawer from './components/SupportChatDrawer';
import SupportCallingModal from './components/SupportCallingModal';
import UserRegisterModal from './components/UserRegisterModal';
import ShowDetailModal from './components/ShowDetailModal';
import FloatingSupportWidget from './components/FloatingSupportWidget';
import { ExternalLink, Users, LayoutDashboard, Cpu, MessageSquare } from 'lucide-react';

function NetflixDashboardContent() {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedShow, setSelectedShow } = useNetflixSupport();

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Navigation Bar matching user photo */}
      <NetflixNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Netflix Catalog / Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-4 sm:pt-6">
        <NetflixHero
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSelectShow={(show) => setSelectedShow(show)}
        />
      </main>

      {/* Cross-Microservice Platform Footer */}
      <footer className="mt-auto border-t border-white/10 bg-black/90 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="font-semibold text-neutral-200">
            Netflix Customer Portal & Support Hub
          </span>
          <span className="text-neutral-500">• Port 5176</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <a
            href="http://localhost:5175"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Chatbot Service (5175)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Support Desk (5174)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 transition flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Manager Dashboard (5173)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          <a
            href="http://localhost:5000/api/v1/health"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Backend Gateway (5000)</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      </footer>

      {/* Support Modals & Drawers */}
      <SupportChatDrawer />
      <SupportCallingModal />
      <UserRegisterModal />
      <FloatingSupportWidget />

      {/* Show Preview / Video Modal */}
      {selectedShow && (
        <ShowDetailModal
          show={selectedShow}
          onClose={() => setSelectedShow(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <NetflixSupportProvider>
      <NetflixDashboardContent />
    </NetflixSupportProvider>
  );
}

