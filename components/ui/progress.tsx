import * as React from 'react';
import { cn } from '@/lib/utils';
export function Progress({ value = 0, className, barClassName }: { value?: number; className?: string; barClassName?: string }) {
  return (
    <div className={cn('h-1.5 w-full bg-line rounded-full overflow-hidden', className)}>
      <div className={cn('h-full bg-ink transition-all', barClassName)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }}/>
    </div>
  );
}
