'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-secondary select-none">
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted flex items-center pointer-events-none z-10 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          suppressHydrationWarning
          className={`
            w-full bg-background-input border rounded-[10px] py-3 text-base text-text-primary placeholder:text-text-placeholder 
            transition-[border-color,box-shadow] duration-150 outline-none
            ${leftIcon ? 'pl-11' : 'px-4'}
            ${rightIcon ? 'pr-11' : 'pr-4'}
            ${error 
              ? 'border-accent-red focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' 
              : 'border-border-input focus:border-accent-purple focus:shadow-[0_0_0_3px_rgba(124,111,224,0.15)]'
            }
            ${className}
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted flex items-center z-10 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error ? (
        <p className="text-xs text-accent-red font-medium leading-tight select-none mt-0.5 animate-pulse">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-text-muted leading-tight select-none mt-0.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export { Input };
