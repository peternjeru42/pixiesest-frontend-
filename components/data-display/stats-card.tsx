import * as React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
export function StatsCard({ label, value, delta, up, progress, className }: {
  label: string; value: React.ReactNode; delta?: React.ReactNode; up?: boolean; progress?: number; className?: string;
}) {
  return (
    <div className={cn('relative bg-surface border border-line rounded-md p-5 flex flex-col gap-1.5 min-h-[100px]', className)}>
      <div className="mono text-[10.5px] uppercase tracking-wider text-muted">{label}</div>
      <div className="serif text-[32px] leading-none">{value}</div>
      {progress !== undefined && <Progress className="mt-2" value={progress * 100}/>}
      {delta && <div className={cn('mono text-[11.5px] mt-1', up ? 'text-ok' : 'text-muted')}>{up && '↑ '}{delta}</div>}
    </div>
  );
}
