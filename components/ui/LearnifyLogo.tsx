'use client';

import React from 'react';

interface LearnifyLogoProps {
  size?: number;
  className?: string;
}

export default function LearnifyLogo({ size = 32, className = '' }: LearnifyLogoProps) {
  // Proportional scaling for border radius and padding based on size prop
  const borderRadius = Math.round(size * 10 / 32);

  return (
    <div
      className={`flex items-center justify-center shrink-0 bg-[#0c0a1b] border border-white/5 shadow-[0_0_12px_rgba(124,111,224,0.4)] ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${borderRadius}px`,
      }}
      aria-label="Learnify Logo"
    >
      <svg
        width="65%"
        height="65%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="book-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c6fe0" />
            <stop offset="100%" stopColor="#4f9ef8" />
          </linearGradient>
        </defs>

        {/* 3-point Spark above the book */}
        <path
          d="M12 2L12.6 5.5L15 8L12 6.5L9 8L11.4 5.5Z"
          fill="#ffd700"
        />

        {/* Book Silhouette fanning open (◣◢ shape) */}
        <path
          d="M3 9L11 13L11 20L3 16Z"
          fill="url(#book-grad)"
        />
        <path
          d="M21 9L13 13L13 20L21 16Z"
          fill="url(#book-grad)"
        />
      </svg>
    </div>
  );
}

export { LearnifyLogo };
