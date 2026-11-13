import React, { useState } from 'react';
import ShowPosterArtwork from './ShowPosterArtwork';
import { NETFLIX_SHOWS } from '../data/netflixData';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import {
  Play,
  Plus,
  ThumbsUp,
  Info,
  Check,
  Headphones,
  Volume2,
  ChevronRight
} from 'lucide-react';

export default function NetflixHero({ activeTab, searchQuery, onSelectShow }) {
  const { setIsChatOpen } = useNetflixSupport();
  const [selectedFeaturedId, setSelectedFeaturedId] = useState('black-mirror');
  const [myList, setMyList] = useState(['black-mirror', 'cobra-kai']);

  const onlyOnNetflix = NETFLIX_SHOWS.onlyOnNetflix;
  const moodBoosters = NETFLIX_SHOWS.moodBoosters;
  const trendingNow = NETFLIX_SHOWS.trendingNow;

  const currentFeatured =
    onlyOnNetflix.find((s) => s.id === selectedFeaturedId) || onlyOnNetflix[0];

  const toggleMyList = (showId) => {
    setMyList((prev) =>
      prev.includes(showId) ? prev.filter((id) => id !== showId) : [...prev, showId]
    );
  };

  // Filter shows if search query is present
  const filterList = (list) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.synopsis && item.synopsis.toLowerCase().includes(q))
    );
  };

  const filteredOnlyOnNetflix = filterList(onlyOnNetflix);
  const filteredMoodBoosters = filterList(moodBoosters);
  const filteredTrending = filterList(trendingNow);

  return (
    <div className="w-full pb-20 space-y-8 select-none">
      {/* SECTION 1: ONLY ON NETFLIX (Matching user's photo) */}
      <section className="px-4 sm:px-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Only on Netflix
        </h2>

        {/* Carousel / Cards Row */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {filteredOnlyOnNetflix.map((show) => {
            const isSelected = show.id === selectedFeaturedId;

            return (
              <div
                key={show.id}
                onClick={() => setSelectedFeaturedId(show.id)}
                className={`relative shrink-0 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden group ${
                  isSelected
                    ? 'w-[280px] sm:w-[380px] h-[190px] sm:h-[230px] ring-2 ring-white shadow-2xl scale-[1.01]'
                    : 'w-[180px] sm:w-[220px] h-[190px] sm:h-[230px] ring-1 ring-white/10 hover:ring-white/40 opacity-80 hover:opacity-100 hover:scale-[1.02]'
                }`}
              >
                <ShowPosterArtwork
                  style={show.posterStyle}
                  title={show.title}
                  className="w-full h-full"
                />

                {/* Subtle Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                  <span className="text-xs font-semibold text-white drop-shadow">
                    {show.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Details Directly Underneath Featured Card (Exactly as in user's photo!) */}
        {currentFeatured && (
          <div className="max-w-3xl space-y-2.5 pt-1 animate-fadeIn">
            {/* Metadata line: Drama • 2011 • 7 Seasons • TV-MA */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-medium">
              <span className="text-white font-semibold">{currentFeatured.category}</span>
              <span className="text-neutral-500">•</span>
              <span>{currentFeatured.year}</span>
              <span className="text-neutral-500">•</span>
              <span>{currentFeatured.seasons}</span>
              <span className="text-neutral-500">•</span>
              <span className="border border-neutral-600 px-1.5 py-0.2 rounded text-[11px] text-neutral-300">
                {currentFeatured.rating}
              </span>
              {currentFeatured.award && (
                <>
                  <span className="text-neutral-500">•</span>
                  <span className="text-amber-400 font-semibold text-xs flex items-center gap-1">
                    🏆 {currentFeatured.award}
                  </span>
                </>
              )}
            </div>

            {/* Synopsis line */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {currentFeatured.synopsis}
            </p>

            {/* Interactive Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onSelectShow(currentFeatured)}
                className="px-5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Play</span>
              </button>

              <button
                onClick={() => toggleMyList(currentFeatured.id)}
                className="px-4 py-2 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 border border-white/10 transition"
              >
                {myList.includes(currentFeatured.id) ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>In My List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>My List</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onSelectShow(currentFeatured)}
                className="p-2 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 transition"
                title="More Details"
              >
                <Info className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition ml-auto"
              >
                <Headphones className="w-3.5 h-3.5 text-red-400" />
                <span>Need Streaming Help?</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: AUTOMATIC MOOD BOOSTERS (Matching photo at bottom) */}
      <section className="px-4 sm:px-8 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Automatic Mood Boosters
          </h2>
          <span className="text-xs text-neutral-400 hover:text-white cursor-pointer flex items-center gap-1">
            Explore All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {filteredMoodBoosters.map((show) => (
            <div
              key={show.id}
              onClick={() => onSelectShow(show)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.03] shadow-lg flex flex-col"
            >
              <div
                className={`h-28 sm:h-32 bg-gradient-to-br ${show.bgColor} flex items-center justify-center p-3 text-center relative overflow-hidden`}
              >
                <span className="text-sm sm:text-base font-extrabold text-white drop-shadow-md">
                  {show.title}
                </span>
                <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 px-1.5 py-0.2 rounded text-neutral-300 font-mono">
                  {show.rating}
                </span>
              </div>

              <div className="p-2.5 space-y-1 bg-neutral-950 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-xs text-white truncate">{show.title}</div>
                  <div className="text-[10px] text-neutral-400">{show.category} • {show.seasons}</div>
                </div>
                <div className="text-[10px] text-emerald-400 font-medium pt-1">
                  {show.matchRate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TOP 10 IN INDIA TODAY */}
      <section className="px-4 sm:px-8 space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Trending Now in India
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredTrending.map((show) => (
            <div
              key={show.id}
              onClick={() => onSelectShow(show)}
              className="group cursor-pointer p-3 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-red-600/50 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3"
            >
              <span className="text-3xl sm:text-4xl font-black font-sans text-neutral-600 group-hover:text-red-500 transition">
                #{show.rank}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-white truncate">{show.title}</div>
                <div className="text-[11px] text-neutral-400">{show.category} • {show.seasons}</div>
                <div className="text-[10px] text-emerald-400 font-medium mt-1">{show.matchRate}</div>
              </div>
              <Play className="w-4 h-4 text-neutral-400 group-hover:text-white shrink-0 transition" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

