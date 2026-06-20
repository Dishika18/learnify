'use client';

import React, { useState, useTransition } from 'react';
import { Camera, Lock, Check } from 'lucide-react';
import { Profile } from '@/types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { updateProfile } from '@/app/settings/actions';

interface ProfileFormProps {
  profile: Profile;
  email: string;
}

export default function ProfileForm({ profile, email }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (displayName.trim().length < 2) {
      setError('Display name must be at least 2 characters.');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('display_name', displayName);

      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to update profile.');
      }
    });
  };

  return (
    <Card className="w-full text-left">
      <h2 className="text-base font-semibold text-text-primary mb-6">Profile Information</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-[20px] font-bold group select-none shadow-md">
            <span>{getInitials(displayName)}</span>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 cursor-pointer transition-opacity duration-200">
              <Camera size={16} className="text-white" />
              <span className="text-[10px] text-white font-medium uppercase tracking-wider">Edit</span>
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-text-primary">Your Avatar</span>
            <span className="text-xs text-text-secondary">Hover and click to change (simulated)</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-[10px] bg-accent-red-dim border border-accent-red/20 text-accent-red text-[13px] font-medium">
            {error}
          </div>
        )}

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="display_name"
            name="display_name"
            label="Display Name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            aria-label="Display Name"
          />

          <Input
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={email}
            disabled
            rightIcon={<Lock size={16} />}
            hint="Email cannot be changed"
            aria-label="Email Address (Locked)"
          />
        </div>

        {/* Action Button & Success State */}
        <div className="flex flex-col items-end gap-3 mt-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            className="self-end"
            aria-label="Save profile changes"
          >
            Save Changes
          </Button>

          {success && (
            <div className="flex items-center gap-1.5 text-success-green font-medium text-xs animate-pulse">
              <Check size={14} className="stroke-[3]" />
              <span>Profile updated successfully</span>
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
