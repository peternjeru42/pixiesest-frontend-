'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}
export function Switch({ checked, onCheckedChange, className, id, disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      id={id}
      onClick={() => {
        if (!disabled) onCheckedChange(!checked);
      }}
      className={cn(
        'relative h-5 w-9 rounded-full border transition-colors',
        checked ? 'bg-ink border-ink' : 'bg-line-2 border-line-2',
        disabled && 'cursor-not-allowed opacity-70',
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
