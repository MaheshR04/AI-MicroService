import React, { useState } from 'react';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import {
  X,
  Play,
  Pause,
  Plus,
  Check,
  ThumbsUp,
  Volume2,
  VolumeX,
  Headphones,
  Maximize2,
  Sparkles,
  Zap
} from 'lucide-react';

export default function ShowDetailModal({ show, onClose }) {
  const { setIsChatOpen, handleSelectQuery } = useNetflixSupport();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInList, setIsInList] = useState(false);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Teaser Video / Banner Container */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center overflow-hidden">
          {/* Simulated Animated Video background */}
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
            {isPlaying ? (
              <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
                <span className="text-xs text-neutral-400">
                  Streaming {show.title} in 4K HDR via Jio True 5G...
                </span>
                <div className="text-[10px] text-emerald-400 font-mono">
                  Bitrate: 28.4 Mbps • Zero Buffering
                </div>
              </div>
            ) : (
              <div className="text-center p-6 space-y-2">
                <h3 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-lg">
                  {show.title}
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Watch official trailer & episodes in Dolby Vision
                </p>
              </div>
            )}
          </div>

          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gradient Overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none" />

          {/* Bottom Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => setIsInList(!isInList)}
                className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-white border border-white/10 transition"
              >
                {isInList ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Modal Content Info */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-neutral-300">
            <span className="text-emerald-400 font-bold">{show.matchRate || '98% Match'}</span>
            <span>•</span>
            <span>{show.year || '2024'}</span>
            <span>•</span>
            <span>{show.seasons || '1 Season'}</span>
            <span>•</span>
            <span className="border border-neutral-700 px-1.5 py-0.2 rounded text-[10px] text-neutral-300">
              {show.rating || 'TV-MA'}
            </span>
            <span className="border border-neutral-700 px-1.5 py-0.2 rounded text-[10px] text-neutral-300 font-bold">
              ULTRA HD 4K
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-sm text-neutral-200 leading-relaxed">
            {show.synopsis}
          </p>

          {/* Cast & Genres */}
          {show.cast && (
            <div className="text-neutral-400 space-y-1 pt-2 border-t border-white/5">
              <div>
                <span className="text-neutral-300 font-semibold">Starring: </span>
                {show.cast.join(', ')}
              </div>
              {show.tags && (
                <div>
                  <span className="text-neutral-300 font-semibold">Genres: </span>
                  {show.tags.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Support Callout Banner */}
          <div className="p-3.5 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-bold shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-xs">Streaming or Quality Issue?</div>
                <div className="text-[11px] text-neutral-400">
                  Run a Jio 5G speed test or connect with customer care
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setIsChatOpen(true);
                handleSelectQuery('jio_true_5g');
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition shrink-0"
            >
              Diagnose 5G
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

