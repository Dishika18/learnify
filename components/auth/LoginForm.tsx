'use client';

import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LearnifyLogo } from '../ui/LearnifyLogo';
import { signIn } from '@/app/auth/actions';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [isPending, startTransition] = useTransition();

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(val)) return 'Please enter a valid email address.';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleBlurEmail = () => {
    const err = validateEmail(email);
    setErrors((prev) => ({ ...prev, email: err }));
  };

  const handleBlurPassword = () => {
    const err = validatePassword(password);
    setErrors((prev) => ({ ...prev, password: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      setShakeTrigger((prev) => prev + 1);
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await signIn(formData);
      if (result?.error) {
        setErrors({ general: result.error });
        setShakeTrigger((prev) => prev + 1);
      }
    });
  };

  return (
    <motion.div
      key={shakeTrigger}
      animate={shakeTrigger > 0 ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center md:text-left flex flex-col gap-1.5">
        <div className="flex md:hidden justify-center mb-4">
          <LearnifyLogo size={32} />
        </div>
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Welcome back</h2>
        <p className="text-sm text-text-secondary">Sign in to continue your learning journey</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.general && (
          <div className="p-3 rounded-[10px] bg-accent-red-dim border border-accent-red/20 text-accent-red text-[13px] font-medium leading-relaxed">
            {errors.general}
          </div>
        )}

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
          tabIndex={1}
          required
        />

        <div className="flex flex-col gap-1 w-full">
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
            autoComplete="current-password"
            tabIndex={2}
            required
          />
          <div className="flex justify-end mt-1">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-accent-purple hover:underline"
              tabIndex={3}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isPending}
          tabIndex={4}
          className="mt-2"
        >
          Sign In
        </Button>
      </form>
    </motion.div>
  );
}

export { LoginForm };
