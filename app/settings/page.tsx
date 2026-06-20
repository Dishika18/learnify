import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Sidebar from '@/components/sidebar/Sidebar';
import { PageTransition } from '@/components/ui/PageTransition';
import ProfileForm from '@/components/settings/ProfileForm';
import PasswordForm from '@/components/settings/PasswordForm';
import PreferencesForm from '@/components/settings/PreferencesForm';
import DangerZone from '@/components/settings/DangerZone';

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch profiles table row
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

  return (
    <PageTransition>
      <div className="flex h-screen w-full overflow-hidden bg-background-primary">
        <Sidebar profile={activeProfile} />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-6 text-left">
          <div className="max-w-[720px] mx-auto p-6 lg:p-8 flex flex-col gap-8">
            {/* Page Header */}
            <header className="flex flex-col gap-1.5 border-b border-border-default pb-6 select-none">
              <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Settings</h1>
              <p className="text-sm text-text-secondary">Manage your account and preferences</p>
            </header>

            {/* Profile Section */}
            <section className="border-b border-border-default pb-8">
              <ProfileForm profile={activeProfile} email={user.email || ''} />
            </section>

            {/* Password Section */}
            <section className="border-b border-border-default pb-8">
              <PasswordForm />
            </section>

            {/* Preferences Section */}
            <section className="border-b border-border-default pb-8">
              <PreferencesForm profile={activeProfile} />
            </section>

            {/* Danger Zone Section */}
            <section className="pb-8">
              <DangerZone />
            </section>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
