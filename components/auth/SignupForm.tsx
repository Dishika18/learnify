'use client';

import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LearnifyLogo } from '../ui/LearnifyLogo';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { signUp } from '@/app/auth/actions';

export default function SignupForm() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [errors, setErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [isPending, startTransition] = useTransition();

  const validateDisplayName = (val: string) => {
    if (!val) return 'Display name is required.';
    if (val.length < 2) return 'Name must be at least 2 characters.';
    return '';
  };

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(val)) return 'Please enter a valid email address.';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 8) return 'Password must be at least 8 characters.';
    return '';
  };

  const validateConfirmPassword = (val: string) => {
    if (!val) return 'Please confirm your password.';
    if (val !== password) return 'Passwords do not match.';
    return '';
  };

  const handleBlurDisplayName = () => {
    const err = validateDisplayName(displayName);
    setErrors((prev) => ({ ...prev, displayName: err }));
  };

  const handleBlurEmail = () => {
    const err = validateEmail(email);
    setErrors((prev) => ({ ...prev, email: err }));
  };

  const handleBlurPassword = () => {
    const err = validatePassword(password);
    setErrors((prev) => ({ ...prev, password: err }));
    if (confirmPassword) {
      const confirmErr = password === confirmPassword ? '' : 'Passwords do not match.';
      setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  const handleBlurConfirmPassword = () => {
    const err = validateConfirmPassword(confirmPassword);
    setErrors((prev) => ({ ...prev, confirmPassword: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameErr = validateDisplayName(displayName);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword);

    if (nameErr || emailErr || passErr || confirmErr) {
      setErrors({
        displayName: nameErr,
        email: emailErr,
        password: passErr,
        confirmPassword: confirmErr,
      });
      setShakeTrigger((prev) => prev + 1);
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('display_name', displayName);
      formData.append('email', email);
      formData.append('password', password);

      const result = await signUp(formData);
      if (result?.error) {
        setErrors({ general: result.error });
        setShakeTrigger((prev) => prev + 1);
      } else if (result?.success) {
        setIsSuccess(true);
      }
    });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col items-center text-center p-4 gap-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 15 }}
          className="text-success-green bg-success-green/10 p-3 rounded-full shrink-0"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
        <h2 className="text-xl font-bold text-text-primary mt-2">Account created!</h2>
        <p className="text-sm text-text-secondary max-w-[280px]">
          Check your email to confirm your account and start learning.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={shakeTrigger}
      animate={shakeTrigger > 0 ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5"
    >
      <div className="text-center md:text-left flex flex-col gap-1.5">
        <div className="flex md:hidden justify-center mb-4">
          <LearnifyLogo size={32} />
        </div>
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Create your account</h2>
        <p className="text-sm text-text-secondary">Join thousands of learners today</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {errors.general && (
          <div className="p-3 rounded-[10px] bg-accent-red-dim border border-accent-red/20 text-accent-red text-[13px] font-medium leading-relaxed">
            {errors.general}
          </div>
        )}

        <Input
          id="displayName"
          name="display_name"
          label="Display Name"
          type="text"
          placeholder="Priya S."
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={handleBlurDisplayName}
          error={errors.displayName}
          leftIcon={<User />}
          autoComplete="name"
          tabIndex={1}
          required
        />

        <Input
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          error={errors.email}
          leftIcon={<Mail />}
          autoComplete="email"
          tabIndex={2}
          required
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlurPassword}
          error={errors.password}
          leftIcon={<Lock />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-text-primary transition-colors focus-visible:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          autoComplete="new-password"
          tabIndex={3}
          required
        />

        <Input
          id="confirmPassword"
          name="confirm_password"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleBlurConfirmPassword}
          error={errors.confirmPassword}
          leftIcon={<Lock />}
          autoComplete="new-password"
          tabIndex={4}
          required
        />

        <div className="py-1">
          <PasswordStrengthMeter password={password} />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isPending}
          tabIndex={5}
          className="mt-1"
        >
          Sign Up
        </Button>
      </form>
    </motion.div>
  );
}

export { SignupForm };
