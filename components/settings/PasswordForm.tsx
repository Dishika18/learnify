'use client';

import React, { useState, useTransition } from 'react';
import { Eye, EyeOff, Lock, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PasswordStrengthMeter } from '../auth/PasswordStrengthMeter';
import { updatePassword } from '@/app/settings/actions';

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const validationErrors: typeof errors = {};

    if (!currentPassword) {
      validationErrors.currentPassword = 'Current password is required.';
    }

    if (!newPassword) {
      validationErrors.newPassword = 'New password is required.';
    } else if (newPassword === currentPassword) {
      validationErrors.newPassword = 'New password must be different from current password.';
    } else if (getStrength(newPassword) < 2) {
      validationErrors.newPassword = 'Password is too weak. Must be at least Fair.';
    }

    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('current_password', currentPassword);
      formData.append('new_password', newPassword);

      const result = await updatePassword(formData);
      if (result.success) {
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setErrors({ general: result.error || 'Failed to update password.' });
      }
    });
  };

  return (
    <Card className="w-full text-left">
      <h2 className="text-base font-semibold text-text-primary mb-6">Change Password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {errors.general && (
          <div className="p-3 rounded-[10px] bg-accent-red-dim border border-accent-red/20 text-accent-red text-[13px] font-medium">
            {errors.general}
          </div>
        )}

        <Input
          id="current_password"
          name="current_password"
          label="Current Password"
          type={showCurrent ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="hover:text-text-primary transition-colors focus-visible:outline-none cursor-pointer"
              aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          required
        />

        <Input
          id="new_password"
          name="new_password"
          label="New Password"
          type={showNew ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="hover:text-text-primary transition-colors focus-visible:outline-none cursor-pointer"
              aria-label={showNew ? 'Hide new password' : 'Show new password'}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          required
        />

        <div className="py-1">
          <PasswordStrengthMeter password={newPassword} />
        </div>

        <Input
          id="confirm_password"
          name="confirm_password"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          leftIcon={<Lock size={16} />}
          required
          aria-label="Confirm New Password"
        />

        <div className="flex flex-col items-end gap-3 mt-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            className="self-end"
            aria-label="Update Password"
          >
            Update Password
          </Button>

          {success && (
            <div className="flex items-center gap-1.5 text-success-green font-medium text-xs animate-pulse">
              <Check size={14} className="stroke-[3]" />
              <span>Password updated successfully</span>
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
