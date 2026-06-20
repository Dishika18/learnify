'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Tooltip } from '../ui/Tooltip';

export default function ActivityTile() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = container.scrollWidth;
    }
  }, []);

  const { gridData, monthLabels, totalContributions, totalXP, dailyAverage } = useMemo(() => {
    const data = [];
    const baseDate = new Date();
    const startDay = baseDate.getDay();
    baseDate.setDate(baseDate.getDate() - (52 * 7) - startDay);

    const months: { label: string; index: number }[] = [];
    let lastMonth = '';
    let nonZeroCellsCount = 0;
    let xpSum = 0;

    for (let w = 0; w < 52; w++) {
      const week = [];

      const SundayOfWeek = new Date(baseDate.getTime() + w * 7 * 24 * 60 * 60 * 1000);
      const monthName = SundayOfWeek.toLocaleDateString('en-US', { month: 'short' });
      if (monthName !== lastMonth) {
        months.push({ label: monthName, index: w });
        lastMonth = monthName;
      }

      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(baseDate.getTime() + (w * 7 + d) * 24 * 60 * 60 * 1000);

        const seed = Math.sin(w * 17 + d * 31) * 10000;
        const rand = seed - Math.floor(seed);

        let level = 0;
        if (rand < 0.40) {
          level = 0;
        } else if (rand < 0.70) {
          level = 1;
        } else if (rand < 0.90) {
          level = 2;
        } else if (rand < 0.98) {
          level = 3;
        } else {
          level = 4;
        }

        const count = level === 0 ? 0 : level * 25;

        if (level > 0) {
          nonZeroCellsCount++;
          xpSum += count;
        }

        week.push({
          dateStr: currentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }),
          count,
          level,
        });
      }
      data.push(week);
    }

    const avg = (xpSum / 364).toFixed(1);

    return {
      gridData: data,
      monthLabels: months,
      totalContributions: nonZeroCellsCount,
      totalXP: xpSum,
      dailyAverage: avg
    };
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-accent-purple/20 border border-accent-purple/10';
      case 2:
        return 'bg-accent-purple/40 border border-accent-purple/20';
      case 3:
        return 'bg-accent-purple/75 border border-accent-purple/30';
      case 4:
        return 'bg-accent-purple border border-accent-purple/40';
      default:
        return 'bg-white/5 border border-white/5 hover:border-white/10';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.005,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16, type: 'spring', stiffness: 260, damping: 22 }}
      className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-2 h-full cursor-default"
    >
      <Card className="h-full flex flex-col p-6 text-left">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0 select-none">
          <h3 className="text-base font-semibold text-text-primary">
            Activity
          </h3>
          <span className="text-xs text-text-muted font-medium">
            {totalContributions} contributions in the last year
          </span>
        </div>

        {/* Content Centered */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-start gap-2.5">
            <div className="flex flex-col justify-between text-[11px] text-text-muted font-medium h-[122px] py-1 shrink-0 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 custom-scrollbar"
            >
              <div className="min-w-[936px] flex flex-col select-none">
                <div className="relative h-5 w-full text-[11px] text-text-muted font-medium mb-1">
                  {monthLabels.map((month) => (
                    <span
                      key={`${month.label}-${month.index}`}
                      className="absolute"
                      style={{ left: `${month.index * 18}px` }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>

                {/* Contribution Cells */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-[4px]"
                >
                  {gridData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[4px] shrink-0">
                      {week.map((day, dIdx) => (
                        <div key={dIdx} className="relative">
                          <Tooltip
                            content={`${day.count} XP on ${day.dateStr}`}
                            side="top"
                          >
                            <motion.div
                              variants={cellVariants}
                              className={`w-[14px] h-[14px] rounded-[3px] transition-all cursor-pointer ${getCellColor(
                                day.level
                              )}`}
                            />
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 select-none shrink-0 text-[11px] text-text-muted font-medium">
          {/* Stats insights */}
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="text-text-secondary font-bold">{totalContributions}</span>
              <span>Active Days</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-text-secondary font-bold">{totalXP.toLocaleString()}</span>
              <span>Total XP</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-text-secondary font-bold">{dailyAverage} XP</span>
              <span>Daily Avg</span>
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-white/5 border border-white/5" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-accent-purple/20 border border-accent-purple/10" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-accent-purple/40 border border-accent-purple/20" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-accent-purple/75 border border-accent-purple/30" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-accent-purple border border-accent-purple/40" />
            <span>More</span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export { ActivityTile };
