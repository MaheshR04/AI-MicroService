import React, { useState } from 'react';
import NetflixAvatar from './NetflixAvatar';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import {
  Search,
  ChevronDown,
  Headphones,
  MessageSquare,
  PhoneCall,
  User,
  ExternalLink,
  ShieldCheck,
  X,
  Bell
} from 'lucide-react';

export default function NetflixNavbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) {
  const {
    user,
    setIsChatOpen,
    setIsCallingOpen,
    setIsRegisterOpen,
    tickets
  } = useNetflixSupport();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);

  const navLinks = [
    { id: 'Home', label: 'Home' },
    { id: 'Shows', label: 'Shows' },
    { id: 'Movies', label: 'Movies' },
    { id: 'Games', label: 'Games' },
    { id: 'My Netflix', label: 'My Netflix' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-neutral-950/95 via-neutral-950/80 to-transparent backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/5 transition">
      {/* LEFT SECTION: Profile Icon + Search + Nav Pills */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Profile Avatar with dropdown (Classic Red Smile from User Image) */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-1.5 group focus:outline-none"
            title="Profile Menu"
          >
            <NetflixAvatar size="md" className="group-hover:ring-2 ring-white/50 transition" />
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition" />
          </button>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-neutral-950 border border-white/10 rounded-xl shadow-2xl p-2.5 z-50 text-xs space-y-2">
              <div className="flex items-center gap-2.5 p-2 bg-neutral-900 rounded-lg">
                <NetflixAvatar size="sm" />
                <div className="min-w-0">
                  <div className="font-bold text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-neutral-400 truncate">+91 {user.phone}</div>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setIsRegisterOpen(true);
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    Manage Jio & User Profile
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">Connected</span>
                </button>

                <button
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center gap-2 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Jio Care Chat Support
                </button>

                <button
                  onClick={() => {
                    setIsCallingOpen(true);
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center gap-2 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  Jio Voice & Calling Helpline
                </button>
              </div>

              <div className="pt-1.5 border-t border-white/10 flex justify-between items-center text-[10px] text-neutral-500 px-1">
                <span>Account: {user.accountNumber}</span>
                <span className="text-red-500 font-semibold cursor-pointer hover:underline">Sign Out</span>
              </div>
            </div>
          )}
        </div>

        {/* Search Icon & Input */}
        <div className="flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center bg-neutral-900/90 border border-white/20 rounded-full px-3 py-1 text-xs">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titles, people, genres..."
                className="bg-transparent text-white placeholder-neutral-500 outline-none w-32 sm:w-48 text-xs"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-neutral-400 hover:text-white ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-neutral-300 hover:text-white transition"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-4 sm:h-4 text-neutral-300 hover:text-white" />
            </button>
          )}
        </div>

        {/* Navigation Tabs (Home with pill, Shows, Movies, Games, My Netflix) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium">
          {navLinks.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-all duration-200 px-3 sm:px-4 py-1.5 rounded-full ${
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold shadow-inner'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* RIGHT SECTION: Support Menu (Chat & Calling Method) + User Register */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Support Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setIsSupportMenuOpen(!isSupportMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/30"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Support</span>
            <ChevronDown className="w-3 h-3 text-red-200" />
          </button>

          {/* Support Dropdown with Chat & Calling methods */}
          {isSupportMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 text-xs space-y-2">
              <div className="px-2 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Jio Support Options
              </div>

              {/* Option 1: Chat Method */}
              <button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsSupportMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-neutral-900 hover:bg-blue-950/40 border border-white/5 hover:border-blue-500/30 text-white flex items-start gap-3 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Chat Support</span>
                    <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">24x7</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Select language, browse Quick Menu for recharge, 5G, SIM & fiber.
                  </div>
                </div>
              </button>

              {/* Option 2: Calling Method */}
              <button
                onClick={() => {
                  setIsCallingOpen(true);
                  setIsSupportMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-neutral-900 hover:bg-emerald-950/40 border border-white/5 hover:border-emerald-500/30 text-white flex items-start gap-3 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Calling Method</span>
                    <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">LIVE</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Instant browser web-call, 198 toll-free hotline & callback.
                  </div>
                </div>
              </button>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400 px-1">
                <span>Account: +91 {user.phone}</span>
                <button
                  onClick={() => {
                    setIsRegisterOpen(true);
                    setIsSupportMenuOpen(false);
                  }}
                  className="text-red-400 hover:underline"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick User Identity Button */}
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/10 text-xs transition"
          title="Account Information & Registration"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-medium truncate max-w-[100px]">{user.name}</span>
        </button>
      </div>
    </header>
  );
}

