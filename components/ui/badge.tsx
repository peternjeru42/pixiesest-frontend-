import * as React from 'react';
import { cn } from '@/lib/utils';

const tones = {
  default: 'bg-surface text-ink border-line',
  solid: 'bg-ink text-bg border-ink',
  draft: 'bg-surface text-muted border-line',
  published: 'bg-surface text-ok border-line',
  archived: 'bg-panel text-muted border-line',
  active: 'bg-surface text-ok border-line',
  submitted: 'bg-surface text-accent border-line',
  locked: 'bg-panel text-muted border-line',
  complete: 'bg-surface text-ok border-line',
  preparing: 'bg-surface text-ink-2 border-line',
  failed: 'bg-surface text-danger border-line',
} as const;

export function Badge({ tone = 'default', className, children }: { tone?: keyof typeof tones; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border mono text-[10px] uppercase tracking-wider',
      tones[tone], className,
    )}>
      {(tone === 'published' || tone === 'active' || tone === 'complete') && <span className="w-1.5 h-1.5 rounded-full bg-current"/>}
      {children}
    </span>
  );
}
