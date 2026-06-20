'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, BarChart2 } from 'lucide-react';
import { Card } from '../ui/Card';

export default function StatsRibbon() {
  const stats = [
    {
      label: 'Study Time',
      value: '14.8 hrs',
      icon: Clock,
      trend: '↑ 12%',
      isPositive: true,
      hex: '#7c6fe0',
      bgDim: 'rgba(124, 111, 224, 0.12)',
    },
    {
      label: 'Enrolled',
      value: '3 / 4',
      icon: BookOpen,
      trend: '↑ 25%',
      isPositive: true,
      hex: '#2dd4bf',
      bgDim: 'rgba(45, 212, 191, 0.12)',
    },
    {
      label: 'Avg Score',
      value: '92%',
      icon: BarChart2,
      trend: '↑ 4%',
      isPositive: true,
      hex: '#4f9ef8',
      bgDim: 'rgba(79, 158, 248, 0.12)',
    },
  ];

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-4 lg:gap-[24px]">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="cursor-default select-none w-full lg:h-auto"
          >
            <Card className="!p-4 flex items-center justify-between gap-4 h-full lg:h-auto">
              <div className="flex items-center gap-3 text-left">
                <div
                  style={{ backgroundColor: stat.bgDim }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                >
                  <IconComponent size={20} style={{ color: stat.hex }} />
                </div>

                {/* Text Values */}
                <div className="flex flex-col">
                  <span className="text-[11px] text-text-muted font-medium uppercase tracking-widest leading-none mb-1">
                    {stat.label}
                  </span>
                  <span className="text-xl font-bold text-text-primary leading-none">
                    {stat.value}
                  </span>
                </div>
              </div>

              <div
                className={`text-[11px] font-bold px-2 py-0.5 rounded-[12px] shrink-0 ${stat.isPositive
                    ? 'text-success-green bg-success-green/10'
                    : 'text-accent-red bg-accent-red/10'
                  }`}
              >
                {stat.trend}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

export { StatsRibbon };
