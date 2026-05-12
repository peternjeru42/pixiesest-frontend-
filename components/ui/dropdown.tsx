'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Dropdown({ trigger, children, align = 'end' }: { trigger: React.ReactNode; children: React.ReactNode; align?: 'start' | 'end' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div className={cn(
          'absolute top-[calc(100%+4px)] z-20 min-w-[180px] bg-surface border border-line rounded-lg shadow-lift py-1',
          align === 'end' ? 'right-0' : 'left-0',
        )}>
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
}
export function DropdownItem({ children, onClick, danger, icon }: { children: React.ReactNode; onClick?: () => void; danger?: boolean; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] hover:bg-panel text-left',
        danger ? 'text-danger' : 'text-ink-2',
      )}
    >{icon}{children}</button>
  );
}
export const DropdownSeparator = () => <div className="h-px bg-line my-1"/>;
