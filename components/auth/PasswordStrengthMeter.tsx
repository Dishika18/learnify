'use client';

import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export default function PasswordStrengthMeter({ password = '' }: PasswordStrengthMeterProps) {
  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const score = getStrength(password);

  const getDetails = (s: number) => {
    switch (s) {
      case 1:
        return { label: 'Weak', colorClass: 'bg-accent-red', textClass: 'text-accent-red' };
      case 2:
        return { label: 'Fair', colorClass: 'bg-accent-amber', textClass: 'text-accent-amber' };
      case 3:
        return { label: 'Good', colorClass: 'bg-accent-blue', textClass: 'text-accent-blue' };
      case 4:
        return { label: 'Strong', colorClass: 'bg-success-green', textClass: 'text-success-green' };
      default:
        return { label: 'Weak', colorClass: 'bg-white/5', textClass: 'text-text-muted' };
    }
  };

  const { label, colorClass, textClass } = getDetails(score);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center text-[11px] uppercase tracking-widest font-semibold">
        <span className="text-text-secondary">Password Strength</span>
        {password && <span className={`${textClass} transition-colors duration-200`}>{label}</span>}
      </div>
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((index) => {
          const isFilled = index <= score;
          return (
            <div
              key={index}
              className={`h-full rounded-full transition-all duration-300 ${
                isFilled ? colorClass : 'bg-white/5'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export { PasswordStrengthMeter };
