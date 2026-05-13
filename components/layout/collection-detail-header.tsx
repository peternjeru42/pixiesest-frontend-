'use client';
import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/data-display/stats-card';
import { cn } from '@/lib/utils';
import type { Collection } from '@/lib/types';

const TABS = [
  { id: 'sets',      label: 'Sets' },
  { id: 'media',     label: 'Media' },
  { id: 'activity',  label: 'Activity' },
  { id: 'settings',  label: 'Settings' },
];

export function CollectionDetailHeader({ c, activeTab }: { c: Collection; activeTab: string }) {
  return (
    <>
      <div className="relative h-72 overflow-hidden bg-panel">
        <img src={c.cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55"/>
        <Button asChild size="sm" className="absolute top-5 left-6 lg:left-10 bg-bg/95 hover:bg-bg">
          <Link href="/collections"><ArrowLeft size={12}/>Collections</Link>
        </Button>
        <div className="absolute left-6 lg:left-10 right-6 lg:right-10 bottom-6 text-bg">
          <div className="mono text-[10.5px] tracking-wider text-bg/85 mb-2.5">{c.folderName.toUpperCase()}</div>
          <h1 className="serif text-5xl font-medium tracking-tight">{c.title}</h1>
          <div className="mono text-[11px] tracking-wider mt-1.5 opacity-85">{c.date.toUpperCase()}</div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <StatsCard label="Photos" value={c.counts.photos}/>
          <StatsCard label="Favorites" value={c.counts.favorites}/>
          <StatsCard label="Downloads" value={c.counts.downloads}/>
          <StatsCard label="Views" value={c.counts.views.toLocaleString()}/>
        </div>

        <div className="flex gap-1 border-b border-line overflow-x-auto -mx-6 lg:-mx-10 px-6 lg:px-10">
          {TABS.map(t => (
            <Link
              key={t.id}
              href={t.id === 'sets' ? `/collections/${c.id}` : `/collections/${c.id}/${t.id}`}
              className={cn(
                'px-3.5 py-2.5 text-[13px] whitespace-nowrap border-b-[1.5px] -mb-px transition-colors',
                activeTab === t.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
