'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-ink text-bg border-ink hover:bg-ink-2',
  outline: 'bg-surface text-ink border-line-2 hover:bg-panel',
  ghost: 'bg-transparent text-ink border-transparent hover:bg-panel',
  danger: 'bg-surface text-danger border-line-2 hover:bg-panel',
} as const;
const sizes = {
  sm: 'h-7 px-2.5 text-xs rounded-md',
  md: 'h-9 px-3.5 text-[13px] rounded-lg',
  lg: 'h-11 px-5 text-sm rounded-lg',
  icon: 'h-9 w-9 rounded-lg',
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'outline', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium border transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
        variants[variant], sizes[size], className,
      )}
      {...props}
    />
  ),
);
Button.displayName = 'Button';
