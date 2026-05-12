import * as React from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EmptyState({ icon: Icon = ImageIcon, title, body, action, className }: {
  icon?: any; title: string; body?: string; action?: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center text-center gap-2.5 py-16 px-6 border border-dashed border-line-2 rounded-md bg-surface', className)}>
      <div className="w-11 h-11 rounded-full bg-panel text-muted grid place-items-center"><Icon size={20}/></div>
      <h3 className="serif text-[22px] mt-1">{title}</h3>
      {body && <p className="text-muted text-sm max-w-sm">{body}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
