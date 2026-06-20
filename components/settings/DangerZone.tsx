'use client';

import React, { useState } from 'react';
import { LogOut, Trash2, X, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { signOut } from '@/app/auth/actions';

export default function DangerZone() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setToastMessage('This feature is coming soon');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <>
      <Card className="w-full text-left border border-accent-red/20 hover:border-accent-red/35">
        <h2 className="text-base font-semibold text-accent-red mb-6 select-none">Danger Zone</h2>

        <div className="flex flex-col gap-6">
          {/* Sign Out All */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 text-left select-none">
              <span className="text-sm font-semibold text-text-primary">Sign Out</span>
              <span className="text-xs text-text-muted">Sign out of all active devices</span>
            </div>
            
            <form action={signOut}>
              <Button
                type="submit"
                variant="danger"
                size="sm"
                leftIcon={<LogOut size={16} />}
                aria-label="Sign out of all devices"
              >
                Sign Out
              </Button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between border-t border-white/5 pt-5">
            <div className="flex flex-col gap-0.5 text-left select-none">
              <span className="text-sm font-semibold text-text-primary">Delete Account</span>
              <span className="text-xs text-text-muted">Permanently delete your account and all data</span>
            </div>
            
            <Button
              type="button"
              variant="danger"
              size="sm"
              leftIcon={<Trash2 size={16} />}
              onClick={() => setShowDeleteModal(true)}
              aria-label="Open delete account confirmation modal"
            >
              Delete Account
            </Button>
          </div>
        </div>

        {/* Temporary Toast message */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-[12px] bg-background-card border border-accent-purple/20 text-accent-purple shadow-xl text-sm font-medium animate-pulse flex items-center gap-2 select-none">
            <AlertTriangle size={18} />
            <span>{toastMessage}</span>
          </div>
        )}
      </Card>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-background-card border border-border-default max-w-md w-full rounded-[16px] overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/5 flex items-center justify-between text-left select-none">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <AlertTriangle className="text-accent-red" size={20} />
                Are you sure?
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close delete modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-left">
              <p className="text-sm text-text-secondary leading-relaxed">
                This action is irreversible. All your course tracking, achievements, earned XP, and account details will be permanently removed.
              </p>
            </div>

            {/* Actions */}
            <div className="p-6 bg-white/3 border-t border-white/5 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Cancel deletion"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                className="bg-accent-red border-accent-red/20 text-white hover:bg-accent-red/80"
                onClick={handleDeleteConfirm}
                aria-label="Permanently delete account"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
