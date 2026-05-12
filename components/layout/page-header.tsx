import * as React from 'react';
import { cn } from '@/lib/utils';

export function PageHeader({ eyebrow, title, sub, actions, className }: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7', className)}>
      <div>
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {sub && <div className="text-[13.5px] text-muted mt-1.5 max-w-prose">{sub}</div>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function SectionHeader({ title, sub, action, className }: { title: React.ReactNode; sub?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-end justify-between gap-3 mb-4', className)}>
      <div>
        <h2 className="serif text-[22px]">{title}</h2>
        {sub && <div className="text-xs text-muted mt-1">{sub}</div>}
      </div>
      {action}
    </div>
  );
}
