'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface Ctx { value: string; setValue: (v: string) => void }
const TabsCtx = React.createContext<Ctx | null>(null);

export function Tabs({ value, onValueChange, children, className }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return (
    <TabsCtx.Provider value={{ value, setValue: onValueChange }}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}
export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex gap-1 border-b border-line overflow-x-auto', className)}>{children}</div>;
}
export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsCtx)!;
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={cn(
        'px-3.5 py-2.5 text-[13px] whitespace-nowrap border-b-[1.5px] -mb-px transition-colors',
        active ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
        className,
      )}
    >{children}</button>
  );
}
export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsCtx)!;
  if (ctx.value !== value) return null;
  return <div className={cn('pt-6', className)}>{children}</div>;
}
