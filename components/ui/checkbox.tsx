'use client';
import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Checkbox({ checked, onCheckedChange, className, id }: { checked: boolean; onCheckedChange: (v: boolean) => void; className?: string; id?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'h-4 w-4 rounded border grid place-items-center transition-colors',
        checked ? 'bg-ink border-ink text-bg' : 'bg-surface border-line-2',
        className,
      )}
    >{checked && <Check size={11} strokeWidth={3}/>}</button>
  );
}
