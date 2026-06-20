'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, FileCode2, Server, BookOpen, Cpu } from 'lucide-react';
import { Course } from '@/types';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

interface CourseTileProps {
  course: Course;
  index: number;
}

const iconMap = {
  Layers,
  Network,
  FileCode2,
  Server,
  BookOpen,
  Cpu,
};

const colorMap = {
  purple: {
    hex: '#7c6fe0',
    bgDim: 'rgba(124, 111, 224, 0.15)',
    borderDim: 'rgba(124, 111, 224, 0.3)',
  },
  blue: {
    hex: '#4f9ef8',
    bgDim: 'rgba(79, 158, 248, 0.15)',
    borderDim: 'rgba(79, 158, 248, 0.3)',
  },
  teal: {
    hex: '#2dd4bf',
    bgDim: 'rgba(45, 212, 191, 0.15)',
    borderDim: 'rgba(45, 212, 191, 0.3)',
  },
  amber: {
    hex: '#fbbf24',
    bgDim: 'rgba(251, 191, 36, 0.15)',
    borderDim: 'rgba(251, 191, 36, 0.3)',
  },
};

export default function CourseTile({ course, index }: CourseTileProps) {
  const IconComponent = iconMap[course.icon_name as keyof typeof iconMap] || BookOpen;
  const scheme = colorMap[course.color] || colorMap.purple;

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
      className="col-span-1 h-full select-none cursor-pointer"
    >
      <Card glowColor={scheme.hex} className="h-full flex flex-col justify-between min-h-[180px] p-6 text-left">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3 min-w-0">
            {/* Icon Square */}
            <div
              style={{ backgroundColor: scheme.bgDim }}
              className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
            >
              <IconComponent size={20} style={{ color: scheme.hex }} />
            </div>

            {/* Title */}
            <h3 className="text-[15px] font-semibold text-text-primary truncate min-w-0">
              {course.title}
            </h3>
          </div>

          {/* Percentage badge */}
          <div
            style={{
              backgroundColor: scheme.bgDim,
              border: `1px solid ${scheme.borderDim}`,
              color: scheme.hex,
            }}
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-[12px] shrink-0"
          >
            {course.progress}%
          </div>
        </div>

        {/* Bottom Section: Progress & Link */}
        <div className="mt-8 flex flex-col gap-4">
          <ProgressBar value={course.progress} color={course.color} height={6} showGlow={false} />

          <div className="flex justify-end">
            <span
              style={{ color: scheme.hex }}
              className="text-[13px] font-semibold hover:underline flex items-center gap-1"
            >
              Continue &rarr;
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export { CourseTile };
