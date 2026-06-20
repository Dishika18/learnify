'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '@/types';
import { Card } from '../ui/Card';
import { StreakIndicator } from '../ui/StreakIndicator';
import { ProgressBar } from '../ui/ProgressBar';

interface HeroTileProps {
  profile: Profile;
}

export default function HeroTile({ profile }: HeroTileProps) {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return 'Good morning';
    if (hours >= 12 && hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const xpPercent = profile.xp_goal > 0
    ? Math.min(Math.round((profile.xp_today / profile.xp_goal) * 100), 100)
    : 0;

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="col-span-1 md:col-span-2 relative h-full cursor-default"
    >
      <Card className="h-full flex flex-col justify-between min-h-[190px] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[120px] h-[120px] rounded-full bg-[#7c6fe0] opacity-12 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[120px] h-[120px] rounded-full bg-[#4f9ef8] opacity-8 blur-[80px] pointer-events-none" />

        {/* Top Section: Greeting & Level */}
        <div className="flex items-start justify-between z-10 w-full">
          <div className="flex flex-col text-left">
            <span className="text-[13px] text-text-secondary uppercase tracking-widest font-semibold">
              Dashboard
            </span>
            <h2 className="text-2xl font-bold text-text-primary mt-1 tracking-tight">
              {getGreeting()}, {profile.display_name}!
            </h2>
          </div>

          <div
            style={{
              background: 'rgba(124, 111, 224, 0.15)',
              border: '1px solid rgba(124, 111, 224, 0.3)',
              color: '#7c6fe0',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
            }}
            className="shrink-0 select-none"
          >
            Level {profile.level}
          </div>
        </div>

        {/* Bottom Section: Streak & XP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 z-10 items-end">
          {/* Streak Indicator */}
          <div className="flex items-center text-left">
            <StreakIndicator streak={profile.streak} />
          </div>

          {/* XP Progress Section */}
          <div className="flex flex-col text-left gap-2 w-full">
            <div className="flex justify-between items-end text-xs">
              <span className="text-text-secondary font-medium">Daily XP Goal</span>
              <span className="text-text-primary font-semibold">
                {profile.xp_today} / {profile.xp_goal} XP
              </span>
            </div>
            <ProgressBar value={xpPercent} color="purple" height={6} showGlow={true} />
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export { HeroTile };
