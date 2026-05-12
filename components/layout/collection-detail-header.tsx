'use client';
import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Upload, Link2, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/data-display/stats-card';
import { cn } from '@/lib/utils';
import type { Collection } from '@/lib/types';

const TABS = [
  { id: 'sets',      label: 'Sets' },
  { id: 'media',     label: 'Media' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'downloads', label: 'Downloads' },
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
          <div className="flex items-center gap-2 mb-2.5">
            <Badge tone={c.status as any}>{c.status}</Badge>
            <span className="mono text-[10.5px] tracking-wider text-bg/85">{c.folderName.toUpperCase()}</span>
          </div>
          <h1 className="serif text-5xl font-medium tracking-tight">{c.title}</h1>
          <div className="mono text-[11px] tracking-wider mt-1.5 opacity-85">{c.date.toUpperCase()}{c.venue && ' · ' + c.venue.toUpperCase()}</div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-5">
        <div className="flex flex-col xl:flex-row gap-6 mb-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            <StatsCard label="Photos" value={c.counts.photos}/>
            <StatsCard label="Favorites" value={c.counts.favorites}/>
            <StatsCard label="Downloads" value={c.counts.downloads}/>
            <StatsCard label="Views" value={c.counts.views.toLocaleString()}/>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-wrap gap-2 justify-end">
              <Button asChild variant="outline"><Link href={`/galleries/${c.slug}`}><Eye size={14}/>Preview</Link></Button>
              <Button variant="outline"><Upload size={14}/>Upload</Button>
              <Button variant="outline"><Link2 size={14}/>Share link</Button>
              <Button variant="default"><Check size={14}/>Published</Button>
            </div>
            <div className="mono text-[10.5px] text-muted">
              lumen.studio/{c.slug} · password: {c.password ?? '—'}
            </div>
          </div>
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
              {t.id === 'favorites' && <span className="ml-1.5 text-accent">· {c.counts.favorites}</span>}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
