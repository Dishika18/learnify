'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AccentColor } from '@/types';

interface ProgressBarProps {
  value: number; // 0-100
  color: AccentColor;
  height?: number; // default 6
  showGlow?: boolean; // default true
}

const colorMap: Record<AccentColor, string> = {
  purple: '#7c6fe0',
  blue: '#4f9ef8',
  teal: '#2dd4bf',
  amber: '#fbbf24',
};

export default function ProgressBar({
  value,
  color,
  height = 6,
  showGlow = true,
}: ProgressBarProps) {
  const hexColor = colorMap[color] || '#7c6fe0';
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className="w-full bg-white/5 rounded-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <motion.div
        className="h-full rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          backgroundColor: hexColor,
          boxShadow: showGlow ? `0 0 8px ${hexColor}99` : 'none',
        }}
      />
    </div>
  );
}

export { ProgressBar };
