'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LearnifyLogo } from '@/components/ui/LearnifyLogo';

interface ComingSoonProps {
  searchParams: Promise<{ page?: string }>;
}

export default function ComingSoonPage({ searchParams }: ComingSoonProps) {
  const resolvedSearchParams = React.use(searchParams);
  const pageParam = resolvedSearchParams.page || '';

  // Format page name
  let pageTitle = 'This Page';
  if (pageParam) {
    pageTitle = pageParam.charAt(0).toUpperCase() + pageParam.slice(1);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 220, damping: 22 },
    },
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center bg-background-primary overflow-hidden p-6 text-center select-none">
      <div
        className="glow-orb w-[320px] h-[320px] bg-accent-purple/6 -left-12 -top-12 animate-drift-purple"
        style={{ filter: 'blur(100px)', opacity: 0.06 }}
      />
      <div
        className="glow-orb w-[350px] h-[350px] bg-accent-blue/6 -right-16 -bottom-16 animate-drift-blue"
        style={{ filter: 'blur(100px)', opacity: 0.06 }}
      />
      <div
        className="glow-orb w-[260px] h-[260px] bg-accent-teal/6 left-1/3 top-1/3 animate-drift-teal"
        style={{ filter: 'blur(100px)', opacity: 0.06 }}
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center z-10 max-w-xl"
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <LearnifyLogo size={48} />
        </motion.div>

        {/* Small Muted Label */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted"
        >
          Coming Soon
        </motion.div>

        {/* Page Name */}
        <motion.h1
          variants={itemVariants}
          className="mt-4 text-[56px] font-bold text-text-primary tracking-tight leading-none"
        >
          {pageTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-3 text-[16px] text-text-secondary font-medium"
        >
          This feature is on its way.
        </motion.p>

        {/* Ghost button "Back to Dashboard" */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" className="px-6 py-2 h-10 text-sm" aria-label="Go back to dashboard">
              ← Back to Dashboard
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
