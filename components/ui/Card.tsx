'use client';

import React, { useState } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // hex code like #7c6fe0
}

export default function Card({ children, className = '', glowColor, ...props }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
    boxShadow: isHovered
      ? glowColor
        ? `0 0 24px ${glowColor}25, 0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.4)`
        : '0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.4)'
      : 'none',
  };

  return (
    <div
      className={`relative bg-background-card border border-border-default hover:border-border-hover rounded-[16px] p-6 overflow-hidden ${className}`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-[16px] opacity-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.03'/></svg>")`,
        }}
      />
      
      {/* Content wrapper to stay above noise overlay */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
export { Card };
