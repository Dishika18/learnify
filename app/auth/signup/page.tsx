'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { LearnifyLogo } from '@/components/ui/LearnifyLogo';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen w-full bg-background-primary overflow-hidden"
    >
      <section className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden select-none bg-gradient-to-br from-[#0d0b1e] via-[#130f2a] to-[#0a1628] border-r border-border-default">
        <div className="glow-orb w-[220px] h-[220px] bg-accent-purple/15 left-[10%] top-[20%] animate-drift-purple" />
        <div className="glow-orb w-[200px] h-[200px] bg-accent-blue/10 right-[15%] top-[45%] animate-drift-blue" />
        <div className="glow-orb w-[180px] h-[180px] bg-accent-teal/8 left-[20%] bottom-[15%] animate-drift-teal" />

        <header className="relative z-10 flex items-center gap-3">
          <LearnifyLogo size={32} />
          <span className="text-[18px] font-bold text-text-primary tracking-tight">Learnify</span>
        </header>

        <div className="relative z-10 my-auto flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight max-w-[280px]">
            Learn without limits.
          </h1>
          <p className="text-base text-text-secondary max-w-[340px] leading-relaxed">
            Track your progress, crush your goals, and level up every day.
          </p>
        </div>

        <footer className="relative z-10 w-full max-w-[360px]">
          <Card className="!p-5 bg-background-card/50 backdrop-blur-md">
            <p className="text-base text-text-primary italic font-medium mb-4">
              &ldquo;This dashboard changed how I study.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-[13px] font-semibold">
                PS
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-text-primary">Priya S.</span>
                <span className="text-xs text-text-muted">CS Student</span>
              </div>
            </div>
          </Card>
        </footer>
      </section>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,111,224,0.03),transparent_60%)] pointer-events-none" />

        <div className="w-full max-w-[420px] flex flex-col gap-6">
          <Card className="w-full relative z-10 shadow-2xl">
            <SignupForm />
          </Card>

          <footer className="text-center relative z-10">
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-accent-purple hover:underline font-semibold">
                Sign in &rarr;
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </motion.div>
  );
}
