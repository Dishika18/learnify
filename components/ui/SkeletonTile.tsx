'use client';

import React from 'react';

interface SkeletonTileProps {
  className?: string;
}

export default function SkeletonTile({ className = '' }: SkeletonTileProps) {
  return (
    <div
      className={`relative overflow-hidden bg-background-card border border-border-default rounded-[16px] p-6 flex flex-col justify-between min-h-[180px] ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon placeholder */}
        <div className="w-10 h-10 rounded-[10px] shimmer shrink-0" />
        
        {/* Title line placeholder */}
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-2/3 rounded shimmer" />
          <div className="h-3 w-1/3 rounded shimmer" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {/* Progress bar placeholder */}
        <div className="h-2 w-full rounded-full shimmer" />
        
        {/* Bottom link placeholder */}
        <div className="h-3.5 w-1/4 rounded shimmer self-end" />
      </div>
    </div>
  );
}

export { SkeletonTile };
