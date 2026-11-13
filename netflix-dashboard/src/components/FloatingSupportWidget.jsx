import React, { useState } from 'react';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import { Headphones, MessageSquare, PhoneCall, X, ChevronUp } from 'lucide-react';

export default function FloatingSupportWidget() {
  const { isChatOpen, setIsChatOpen, setIsCallingOpen } = useNetflixSupport();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // If chat drawer is already open, hide the floating pill
  if (isChatOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2">
      {/* Expanded Quick Choices */}
      {isOpenMenu && (
        <div className="bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl p-2.5 w-56 space-y-1.5 animate-fadeIn text-xs">
          <div className="px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Need Help?
          </div>

          <button
            onClick={() => {
              setIsChatOpen(true);
              setIsOpenMenu(false);
            }}
            className="w-full p-2 rounded-xl bg-neutral-900 hover:bg-blue-600/20 text-neutral-200 hover:text-white border border-white/5 hover:border-blue-500/30 flex items-center gap-2.5 transition"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-xs">Chat Support</div>
              <div className="text-[10px] text-neutral-400">Language & Quick Menu</div>
            </div>
          </button>

          <button
            onClick={() => {
              setIsCallingOpen(true);
              setIsOpenMenu(false);
            }}
            className="w-full p-2 rounded-xl bg-neutral-900 hover:bg-emerald-600/20 text-neutral-200 hover:text-white border border-white/5 hover:border-emerald-500/30 flex items-center gap-2.5 transition"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-xs">Calling Method</div>
              <div className="text-[10px] text-neutral-400">Web call & 198 hotline</div>
            </div>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <button
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="px-4 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-2xl shadow-red-600/50 hover:scale-105 transition"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <Headphones className="w-4 h-4" />
        <span>Jio Support</span>
        {isOpenMenu ? <X className="w-3.5 h-3.5 ml-1" /> : <ChevronUp className="w-3.5 h-3.5 ml-1" />}
      </button>
    </div>
  );
}

