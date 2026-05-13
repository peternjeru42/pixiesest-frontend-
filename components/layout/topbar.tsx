'use client';
import * as React from 'react';
import Link from 'next/link';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';

export function Topbar({ crumbs }: { crumbs: { label: string; href?: string }[] }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 lg:gap-4 px-4 lg:px-8 py-3.5 border-b border-line bg-bg/95 backdrop-blur">
      <MobileNav/>
      <nav className="hidden md:flex items-center gap-2 mono text-[11px] uppercase tracking-wider text-muted">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="opacity-50">/</span>}
            {c.href ? <Link href={c.href} className="hover:text-ink">{c.label}</Link>
              : <span className={i === crumbs.length - 1 ? 'text-ink font-medium' : ''}>{c.label}</span>}
          </React.Fragment>
        ))}
      </nav>
      <div className="flex-1"/>
      <div className="hidden md:flex items-center gap-2 border border-line bg-surface rounded-lg px-3 py-1.5 text-sm min-w-[260px]">
        <Search size={14} className="text-muted"/>
        <input className="flex-1 bg-transparent outline-none placeholder:text-muted" placeholder="Search collections, photos, clients…"/>
        <span className="mono text-[10.5px] text-muted border border-line rounded px-1.5">⌘K</span>
      </div>
      <Button size="icon" variant="outline" className="relative">
        <Bell size={15}/>
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent"/>
      </Button>
    </header>
  );
}
