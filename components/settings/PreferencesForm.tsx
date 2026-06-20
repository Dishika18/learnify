'use client';

import React, { useState, useTransition } from 'react';
import { Moon, Check } from 'lucide-react';
import { Profile } from '@/types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { updateXPGoal } from '@/app/settings/actions';

interface PreferencesFormProps {
  profile: Profile;
}

export default function PreferencesForm({ profile }: PreferencesFormProps) {
  const [xpGoal, setXpGoal] = useState(profile.xp_goal || 500);
  const [notifications, setNotifications] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('xp_goal', xpGoal.toString());

      const result = await updateXPGoal(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <Card className="w-full text-left">
      <h2 className="text-base font-semibold text-text-primary mb-6">Preferences</h2>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Daily XP Goal */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-secondary">Daily XP Goal</span>
            <span className="text-accent-purple font-bold">{xpGoal} XP</span>
          </div>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={xpGoal}
            onChange={(e) => setXpGoal(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent-purple"
            aria-label="Daily XP Goal slider"
          />
          <span className="text-xs text-text-muted">Adjust your target learning score for each day.</span>
        </div>

        {/* Theme Settings */}
        <div className="flex items-center justify-between border-t border-white/5 pt-5">
          <div className="flex flex-col gap-0.5 text-left select-none">
            <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
              <Moon size={16} className="text-text-secondary" />
              Theme
            </span>
            <span className="text-xs text-text-muted">Dark Mode is active</span>
          </div>
          
          <Tooltip content="More themes coming soon" side="top">
            <button
              type="button"
              disabled
              className="relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-accent-purple/35 transition-colors duration-200 focus:outline-none"
              aria-label="Theme toggle (disabled)"
            >
              <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
            </button>
          </Tooltip>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between border-t border-white/5 pt-5">
          <div className="flex flex-col gap-0.5 text-left select-none">
            <span className="text-sm font-semibold text-text-primary">Email notifications</span>
            <span className="text-xs text-text-muted">Receive weekly progress reports</span>
          </div>

          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              notifications ? 'bg-accent-purple' : 'bg-white/5'
            }`}
            aria-label="Toggle email notifications"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                notifications ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Action Button & Success State */}
        <div className="flex flex-col items-end gap-3 mt-2 border-t border-white/5 pt-5">
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            className="self-end"
            aria-label="Save preferences changes"
          >
            Save Preferences
          </Button>

          {success && (
            <div className="flex items-center gap-1.5 text-success-green font-medium text-xs animate-pulse">
              <Check size={14} className="stroke-[3]" />
              <span>Preferences updated successfully</span>
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
