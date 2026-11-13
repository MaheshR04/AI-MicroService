import React from 'react';

export default function ShowPosterArtwork({ style, title, className = '' }) {
  if (style === 'black-mirror') {
    return (
      <div className={`relative w-full h-full bg-[#0a110e] overflow-hidden select-none font-mono ${className}`}>
        {/* Matrix digital rain code background */}
        <div className="absolute inset-0 opacity-40 text-[9px] leading-[10px] text-emerald-400 font-mono tracking-tighter overflow-hidden break-all p-1">
          {"01001001 01101110 01110100 01100101 01101100 01101100 01101001 01100111 01100101 01101110 01100011 01100101 00100000 01010011 @#&%*()_+-=~^[]|:;<>?,./~^!0101010101010101010101010101010101 01000010 01001100 01000001 01000011 01001011 00100000 01001101 %&*()_+=!@#$*()-=+_!@#$&*()_+=-~010101010101010101010101010101 4b 65 79 77 6f 72 64 20 61 6e 61 6c 79 73 69 73 20 6c 6f 61 64 65 64 2e 20 53 79 73 74 65 6d 20 73 74 61 74 75 73 3a 20 4f 6e 6c 69 01100101 01110010 01110010 01101111 01110010 00100000 01110011 11010010 01011010 01010001 01100101 01111001 01110011 01101001"}
        </div>

        {/* Cyber smiley outline embedded in matrix code */}
        <div className="absolute inset-0 flex items-center justify-center opacity-85">
          <svg className="w-36 h-36 text-emerald-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.7)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* Round face */}
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            {/* Eyes */}
            <circle cx="36" cy="40" r="4" fill="currentColor" />
            <circle cx="64" cy="40" r="4" fill="currentColor" />
            {/* Smile */}
            <path d="M 33 58 Q 50 74 67 58" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-black/80 pointer-events-none" />

        {/* Bottom branding: Red Dot + BLACK MIRROR Logo */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#ef4444]" />
          <div className="font-extrabold tracking-widest text-white text-base sm:text-lg uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            BLACK MIRROR
          </div>
        </div>

        {/* Bottom right: Emmy Award Winner Laurel */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/30">
          <span className="text-amber-400 text-xs">🌿</span>
          <span className="text-[10px] font-semibold text-amber-300 tracking-wider">Emmy Award Winner</span>
          <span className="text-amber-400 text-xs">🌿</span>
        </div>
      </div>
    );
  }

  if (style === 'you') {
    return (
      <div className={`relative w-full h-full bg-[#1c1815] overflow-hidden select-none ${className}`}>
        {/* London street backdrop aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-stone-900/60 to-stone-800" />
        
        {/* Subtle London red bus in distance */}
        <div className="absolute top-1/4 right-3 w-16 h-10 bg-red-700/40 rounded-sm border border-red-500/20 blur-[1px]" />
        
        {/* Silhouette of Penn Badgley / Joe Goldberg in coat & tie */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end">
          <svg className="w-48 h-56 text-stone-300/90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" viewBox="0 0 100 120" fill="currentColor">
            {/* Head and hair */}
            <path d="M 50 18 C 42 18, 38 24, 38 32 C 38 42, 43 47, 50 47 C 57 47, 62 42, 62 32 C 62 24, 58 18, 50 18 Z" />
            {/* Shoulders, trench coat and tie */}
            <path d="M 28 58 C 35 48, 44 48, 50 49 C 56 48, 65 48, 72 58 L 84 110 L 16 110 Z" fill="#292524" />
            <path d="M 46 50 L 54 50 L 52 75 L 50 82 L 48 75 Z" fill="#78350f" />
            <circle cx="50" cy="33" r="2" fill="#d6d3d1" />
          </svg>
        </div>

        {/* Big Stylized "YOU" Title */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center items-center z-10 pointer-events-none">
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-widest text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            YOU
          </h2>
        </div>
      </div>
    );
  }

  if (style === 'cobra-kai') {
    return (
      <div className={`relative w-full h-full bg-[#1a120b] overflow-hidden select-none ${className}`}>
        {/* Sunset Beach gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-700/60 via-amber-900/40 to-neutral-950" />
        
        {/* Sun & Ocean Waves */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-amber-400/30 blur-md" />
        
        {/* Wooden balancing posts with fighters */}
        <div className="absolute inset-x-0 bottom-0 h-40 flex justify-around items-end px-6">
          {/* Post 1 */}
          <div className="flex flex-col items-center">
            {/* Karate silhouette */}
            <svg className="w-16 h-20 text-stone-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" viewBox="0 0 50 60" fill="currentColor">
              <circle cx="25" cy="10" r="4" />
              {/* Karate fighting stance */}
              <path d="M 25 15 L 25 35 L 15 48 M 25 35 L 35 48 M 20 25 L 10 20 M 30 25 L 42 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="w-4 h-16 bg-stone-700 rounded-t-sm" />
          </div>

          {/* Post 2 */}
          <div className="flex flex-col items-center">
            <svg className="w-16 h-20 text-stone-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" viewBox="0 0 50 60" fill="currentColor">
              <circle cx="25" cy="10" r="4" />
              {/* Crane stance */}
              <path d="M 25 15 L 25 35 L 25 50 M 20 30 L 32 38 M 25 22 L 12 12 M 25 22 L 38 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="w-4 h-14 bg-stone-800 rounded-t-sm" />
          </div>
        </div>

        {/* Cobra Kai stylized logo banner */}
        <div className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <span className="text-xl sm:text-2xl font-black italic tracking-wider text-amber-400 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] font-sans">
            COBRA KAI
          </span>
          <span className="text-[9px] tracking-widest text-amber-200/80 uppercase">Never Dies</span>
        </div>
      </div>
    );
  }

  if (style === 'stranger-things') {
    return (
      <div className={`relative w-full h-full bg-[#0d0714] overflow-hidden select-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-purple-950/40 to-slate-950" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-24 bg-red-600/20 blur-xl rounded-full" />
        
        {/* Silhouette kids on bicycles */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center items-center">
          <span className="text-2xl sm:text-3xl font-serif font-black tracking-widest text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,0.8)] border-y border-red-600/60 px-4 py-1">
            STRANGER THINGS
          </span>
        </div>
      </div>
    );
  }

  if (style === 'wednesday') {
    return (
      <div className={`relative w-full h-full bg-[#0a0a0c] overflow-hidden select-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 via-slate-950 to-black" />
        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center">
          <span className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            WEDNESDAY
          </span>
          <span className="text-[10px] tracking-widest text-violet-400 uppercase mt-0.5">Nevermore Academy</span>
        </div>
      </div>
    );
  }

  // Fallback card
  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center p-4 ${className}`}>
      <span className="text-lg font-bold text-white tracking-wider text-center drop-shadow">
        {title}
      </span>
    </div>
  );
}
