import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Bell } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import Sidebar from '@/components/sidebar/Sidebar';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { HeroTile } from '@/components/tiles/HeroTile';
import { ActivityTile } from '@/components/tiles/ActivityTile';
import { StatsRibbon } from '@/components/tiles/StatsRibbon';
import { SkeletonTile } from '@/components/ui/SkeletonTile';
import { CourseList } from '@/components/CourseList';
import { PageTransition } from '@/components/ui/PageTransition';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const activeProfile = profile || {
    id: user.id,
    display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student',
    avatar_url: null,
    streak: 0,
    xp_today: 0,
    xp_goal: 500,
    level: 1,
    created_at: new Date().toISOString(),
  };

  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const day = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const dateString = `${weekday}, ${day} ${month}`;

  return (
    <PageTransition>
      <div className="flex h-screen w-full overflow-hidden bg-background-primary">
        <Sidebar profile={activeProfile} />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            {/* Page Header */}
            <header className="flex items-center justify-between mb-8 z-10">
              <div className="flex flex-col text-left">
                <nav className="text-xs font-semibold uppercase tracking-widest text-text-muted select-none">
                  Home / Dashboard
                </nav>
              </div>

              <div className="flex items-center gap-4 text-text-secondary select-none">
                <span className="text-sm font-medium">{dateString}</span>

                <div className="relative shrink-0 cursor-pointer p-1.5 hover:bg-white/5 border border-transparent hover:border-border-hover rounded-md transition-colors">
                  <Bell className="w-5 h-5 text-text-secondary" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-purple" />
                </div>
              </div>
            </header>

            {/* Bento Grid */}
            <BentoGrid>
              <HeroTile profile={activeProfile} />

              <Suspense
                fallback={
                  <>
                    <SkeletonTile />
                    <SkeletonTile />
                    <SkeletonTile />
                    <SkeletonTile />
                  </>
                }
              >
                <CourseList />
              </Suspense>

              <ActivityTile />

              <StatsRibbon />
            </BentoGrid>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
