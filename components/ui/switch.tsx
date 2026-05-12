'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  className?: string;
  id?: string;
}
export function Switch({ checked, onCheckedChange, className, id }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative h-5 w-9 rounded-full border transition-colors',
        checked ? 'bg-ink border-ink' : 'bg-line-2 border-line-2',
        className,
      )}
    >
      <span className={cn(
        'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-surface shadow transition-transform',
        checked && 'translate-x-4',
      )}/>
    </button>
  );
}
