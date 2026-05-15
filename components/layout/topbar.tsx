'use client';
import * as React from 'react';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';

type TopbarSearch = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Topbar({ crumbs, search }: { crumbs: { label: string; href?: string }[]; search?: TopbarSearch }) {
  const currentCrumb = crumbs[crumbs.length - 1]?.label ?? 'Lumen';

  return (
    <header className="sticky top-0 z-50 flex min-h-[64px] items-center gap-3 border-b border-line bg-bg/95 px-4 py-3.5 backdrop-blur lg:gap-4 lg:px-8">
      <MobileNav/>
      <div className="min-w-0 lg:hidden">
        <div className="mono text-[9.5px] uppercase tracking-[0.14em] text-muted">Lumen</div>
        <div className="truncate text-[15px] font-medium leading-5">{currentCrumb}</div>
      </div>
      <nav className="hidden items-center gap-2 mono text-[11px] uppercase tracking-wider text-muted md:flex">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="opacity-50">/</span>}
            {c.href ? (
              <Link href={c.href} className="hover:text-ink">{c.label}</Link>
            ) : (
              <span className={i === crumbs.length - 1 ? 'text-ink font-medium' : ''}>{c.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
      <div className="flex-1"/>
      <div className="hidden min-w-[260px] items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm md:flex">
        <Search size={14} className="text-muted"/>
        <input
          className="flex-1 bg-transparent outline-none placeholder:text-muted"
          placeholder={search?.placeholder ?? 'Search collections, photos, clients...'}
          value={search?.value ?? ''}
          onChange={(event) => search?.onChange(event.target.value)}
          readOnly={!search}
        />
      </div>
      <Button size="icon" variant="outline" className="relative h-10 w-10 shrink-0 rounded-md bg-surface">
        <Bell size={15}/>
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent"/>
      </Button>
    </header>
  );
}
