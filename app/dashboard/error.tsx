'use client';

import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Dashboard Error boundary captured:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center p-6 bg-background-primary overflow-hidden">
      <div className="w-full max-w-[420px] relative z-10 animate-fade-in">
        <Card className="flex flex-col items-center justify-center p-8 text-center shadow-2xl border border-border-default select-none">
          <div className="text-accent-red bg-accent-red-dim p-4 rounded-full mb-4 shrink-0">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <h2 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
            Something went wrong
          </h2>
          
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            {error.message || 'An unexpected error occurred while loading the dashboard.'}
          </p>
          
          <Button
            onClick={() => reset()}
            variant="primary"
            fullWidth
          >
            Try again
          </Button>
        </Card>
      </div>
    </div>
  );
}
