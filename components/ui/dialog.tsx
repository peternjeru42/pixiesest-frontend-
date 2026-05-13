'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
}
export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onOpenChange]);
  if (!open || !mounted) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/45 p-2 backdrop-blur-[2px] animate-in fade-in-0 sm:grid sm:place-items-center sm:p-6"
      onClick={() => onOpenChange(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
}
export function DialogContent({ className, children, size = 'md', onClose }: { className?: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg'; onClose?: () => void }) {
  const widths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn('relative max-h-[calc(100dvh-1rem)] w-full overflow-hidden rounded-lg border border-line bg-surface shadow-deep sm:w-[90vw]', widths[size], className)}
    >
      {onClose && (
        <button className="absolute top-3 right-3 z-10 h-8 w-8 grid place-items-center rounded-md bg-surface/80 text-muted backdrop-blur hover:bg-panel hover:text-ink" onClick={onClose}>
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
