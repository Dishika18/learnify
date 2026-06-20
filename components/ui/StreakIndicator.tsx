'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakIndicatorProps {
  streak: number;
  className?: string;
}

export default function StreakIndicator({ streak, className = '' }: StreakIndicatorProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-accent-amber shrink-0"
      >
        <Flame className="w-8 h-8 fill-accent-amber/20" />
      </motion.div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-xl font-bold text-text-primary">
          {streak}
        </span>
        <span className="text-[11px] text-text-muted font-medium uppercase tracking-widest mt-0.5">
          {streak > 0 ? 'day streak' : 'Start your streak today'}
        </span>
      </div>
    </div>
  );
}

export { StreakIndicator };
