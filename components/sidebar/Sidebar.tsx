'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Profile } from '@/types';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';
import { LearnifyLogo } from '../ui/LearnifyLogo';
import { signOut } from '@/app/auth/actions';

interface SidebarProps {
  profile: Profile;
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Courses', icon: BookOpen, href: '/coming-soon?page=courses' },
  { label: 'Analytics', icon: BarChart2, href: '/coming-soon?page=analytics' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

function SidebarContent({ profile }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getIsActive = (href: string) => {
    if (href.includes('?')) {
      const [path, query] = href.split('?');
      const hrefPage = new URLSearchParams(query).get('page');
      return pathname === path && pageParam === hrefPage;
    }
    if (href === '/settings') {
      return pathname.startsWith('/settings');
    }
    return pathname === href;
  };

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 64 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen bg-background-sidebar border-r border-border-default shrink-0 select-none relative z-30"
      >
        {/* Top Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border-default shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <LearnifyLogo size={32} />
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[18px] font-bold text-text-primary tracking-tight whitespace-nowrap"
                >
                  Learnify
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-white/5 border border-transparent hover:border-border-hover text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = getIsActive(item.href);
            const Icon = item.icon;

            const content = (
              <Link
                href={item.href}
                className={`relative flex items-center h-11 px-3 rounded-[10px] text-[15px] transition-colors gap-3 cursor-pointer group ${isActive
                    ? 'text-accent-purple font-semibold bg-accent-purple-dim'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/3'
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-accent-purple rounded-r-md" />
                )}

                <Icon size={20} className="shrink-0" />

                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.label} content={item.label} side="right">
                  <div className="w-full">{content}</div>
                </Tooltip>
              );
            }

            return <div key={item.label}>{content}</div>;
          })}
        </nav>

        {/* Bottom Profile and Sign Out */}
        <div className="p-3 border-t border-border-default flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-3 px-1 py-2 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-[14px] font-semibold shrink-0">
              {getInitials(profile.display_name)}
            </div>

            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col text-left overflow-hidden whitespace-nowrap"
                >
                  <span className="text-sm font-semibold text-text-primary truncate">
                    {profile.display_name}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    CS Student
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<LogOut size={16} />}
              aria-label="Sign out"
              className="text-text-secondary hover:text-accent-red hover:bg-accent-red-dim hover:border-accent-red"
            >
              {!isCollapsed && <span>Sign Out</span>}
            </Button>
          </form>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background-sidebar border-t border-border-default z-40 flex items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-[10px] gap-1 cursor-pointer ${isActive ? 'text-accent-purple' : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
        {/* Mobile Sign Out Button */}
        <form action={signOut} className="flex items-center justify-center">
          <button
            type="submit"
            className="flex flex-col items-center justify-center w-12 h-12 text-text-secondary hover:text-accent-red cursor-pointer"
            aria-label="Sign out"
          >
            <LogOut size={20} />
            <span className="text-[10px] font-medium leading-none">Exit</span>
          </button>
        </form>
      </nav>
    </>
  );
}

export default function Sidebar({ profile }: SidebarProps) {
  return (
    <Suspense fallback={<div className="w-16 md:w-[220px] bg-background-sidebar border-r border-border-default h-screen" />}>
      <SidebarContent profile={profile} />
    </Suspense>
  );
}
