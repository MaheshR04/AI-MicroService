import React from 'react';

/**
 * Authentic Netflix Profile Avatar (Red square with smiling face as seen in user's photo)
 */
export default function NetflixAvatar({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-sm',
    md: 'w-8 h-8 rounded',
    lg: 'w-10 h-10 rounded-md',
    xl: 'w-12 h-12 rounded-lg'
  };

  return (
    <div
      className={`relative bg-gradient-to-b from-[#e50914] to-[#b81d24] flex items-center justify-center shadow-md select-none overflow-hidden ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title="Netflix Profile"
    >
      <svg
        viewBox="0 0 36 36"
        className="w-full h-full p-1 text-white"
        fill="currentColor"
      >
        {/* Left eye dot */}
        <circle cx="12" cy="14" r="2.2" />
        {/* Right eye dot */}
        <circle cx="24" cy="14" r="2.2" />
        {/* Classic wide happy curved smile */}
        <path
          d="M 10 20 Q 18 29 26 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

