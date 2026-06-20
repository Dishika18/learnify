'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'right' | 'top' | 'bottom' | 'left';
}

export default function Tooltip({ children, content, side = 'right' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (side) {
      case 'top':
        return 'bottom-full mb-2 left-1/2 z-50';
      case 'bottom':
        return 'top-full mt-2 left-1/2 z-50';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2 z-50';
      case 'right':
      default:
        return 'left-full ml-2 top-1/2 -translate-y-1/2 z-50';
    }
  };

  const getAnimationProps = () => {
    switch (side) {
      case 'top':
        return {
          initial: { opacity: 0, y: 4, x: '-50%' },
          animate: { opacity: 1, y: 0, x: '-50%' },
          exit: { opacity: 0, y: 4, x: '-50%' },
        };
      case 'bottom':
        return {
          initial: { opacity: 0, y: -4, x: '-50%' },
          animate: { opacity: 1, y: 0, x: '-50%' },
          exit: { opacity: 0, y: -4, x: '-50%' },
        };
      case 'left':
        return {
          initial: { opacity: 0, x: 4, y: '-50%' },
          animate: { opacity: 1, x: 0, y: '-50%' },
          exit: { opacity: 0, x: 4, y: '-50%' },
        };
      case 'right':
      default:
        return {
          initial: { opacity: 0, x: -4, y: '-50%' },
          animate: { opacity: 1, x: 0, y: '-50%' },
          exit: { opacity: 0, x: -4, y: '-50%' },
        };
    }
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            {...getAnimationProps()}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={`absolute bg-[#12121f] border border-border-hover px-2.5 py-1.5 rounded-[8px] text-[12px] font-medium text-text-primary whitespace-nowrap shadow-xl pointer-events-none ${getPositionClasses()}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Tooltip };
