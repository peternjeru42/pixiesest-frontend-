'use client';
import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
}
export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onOpenChange]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-6 bg-ink/40 animate-in fade-in-0" onClick={() => onOpenChange(false)}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
export function DialogContent({ className, children, size = 'md', onClose }: { className?: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg'; onClose?: () => void }) {
  const widths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };
  return (
    <div className={cn('relative bg-surface rounded-lg border border-line shadow-deep w-[90vw]', widths[size], className)}>
      {onClose && (
        <button className="absolute top-3 right-3 h-7 w-7 grid place-items-center rounded-md hover:bg-panel text-muted" onClick={onClose}>
          <X size={15}/>
        </button>
      )}
      {children}
    </div>
  );
}
export const DialogHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('px-5 pt-5 pb-2', className)} {...p}/>;
export const DialogTitle = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('serif text-2xl', className)} {...p}/>;
export const DialogDescription = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('text-sm text-muted mt-1', className)} {...p}/>;
export const DialogBody = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('px-5 py-3 flex flex-col gap-3', className)} {...p}/>;
export const DialogFooter = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('px-5 pb-5 pt-3 flex justify-end gap-2', className)} {...p}/>;
