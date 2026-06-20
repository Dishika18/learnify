'use client';

import React from 'react';
import { SkeletonTile } from '@/components/ui/SkeletonTile';
import { BentoGrid } from '@/components/ui/BentoGrid';

export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-primary">
      {/* Sidebar Outline */}
      <aside className="hidden md:flex flex-col h-screen w-[220px] bg-background-sidebar border-r border-border-default shrink-0 p-4 gap-6 select-none">
        <div className="h-8 w-3/4 rounded bg-white/5 shimmer" />
        <div className="flex-1 flex flex-col gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 w-full rounded-[10px] bg-white/5 shimmer" />
          ))}
        </div>
        <div className="h-11 w-full rounded-[10px] bg-white/5 shimmer" />
      </aside>
      
      {/* Main Content Skeleton */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8 flex flex-col gap-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between pb-4">
            <div className="h-4 w-28 rounded bg-white/5 shimmer" />
            <div className="h-5 w-40 rounded bg-white/5 shimmer" />
          </div>
          
          <BentoGrid>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonTile key={i} />
            ))}
          </BentoGrid>
        </div>
      </main>
    </div>
  );
}
