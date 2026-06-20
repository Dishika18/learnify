'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent-purple/35 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-br from-[#7c6fe0] to-[#6057c8] text-white border border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_0_0_1px_rgba(124,111,224,0.3)] hover:shadow-[0_4px_16px_rgba(124,111,224,0.4)] hover:opacity-92 active:opacity-85',
    ghost: 'bg-transparent border border-border-default text-text-secondary hover:border-border-hover hover:text-text-primary hover:bg-white/3',
    danger: 'bg-transparent border border-border-default text-text-secondary hover:border-accent-red hover:text-accent-red hover:bg-accent-red-dim',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-[13px] rounded-[10px] h-9 gap-1.5',
    md: 'px-6 py-3 text-[15px] rounded-[10px] h-11 gap-2',
    lg: 'px-8 py-4 text-[18px] rounded-[10px] h-[52px] gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full flex' : '';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  // Framer Motion spring physics for hover
  const motionProps = isButtonDisabled
    ? {}
    : {
        whileHover: { 
          scale: 1.01, 
          y: variant === 'primary' ? -1 : 0 
        },
        whileTap: { 
          scale: 0.99, 
          y: 0 
        },
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 20 
        } as const
      };

  return (
    <motion.button
      className={buttonClasses}
      disabled={isButtonDisabled}
      {...motionProps}
      {...(props as unknown as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      
      <span>{children}</span>
      
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
}

export { Button };
