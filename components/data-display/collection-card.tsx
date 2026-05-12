'use client';
import * as React from 'react';
import Link from 'next/link';
import { Heart, Download, Eye, MoreHorizontal, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Collection } from '@/lib/types';

export function CollectionCard({ c }: { c: Collection }) {
  return (
    <article className="group bg-surface border border-line rounded-md overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5 hover:shadow-lift">
      <Link href={`/collections/${c.id}`} className="relative block aspect-[4/3] bg-panel overflow-hidden">
        <img src={c.cover} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"/>
        {c.password && (
          <span className="absolute top-2.5 left-2.5 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1.5 border border-line">
            <Lock size={9}/>Password
          </span>
        )}
        <span className="absolute top-2 right-2 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full border border-line opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={11}/>
        </span>
        <span className="absolute bottom-2.5 left-2.5">
          <Badge tone={c.status as any}>{c.status}</Badge>
        </span>
      </Link>
      <div className="p-4">
        <Link href={`/collections/${c.id}`} className="serif text-[21px] leading-tight hover:underline">{c.title}</Link>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2 flex-wrap">
          <span>{c.date}</span>
          <span className="text-line-2">·</span>
          <span>{c.counts.photos} photos</span>
          {c.counts.videos > 0 && (<><span className="text-line-2">·</span><span>{c.counts.videos} video</span></>)}
          <span className="text-line-2">·</span>
          <span>{c.folderName}</span>
        </div>
        <div className="flex gap-4 mt-3 text-[11.5px] text-muted">
          <span className="inline-flex items-center gap-1"><Heart size={11}/>{c.counts.favorites}</span>
          <span className="inline-flex items-center gap-1"><Download size={11}/>{c.counts.downloads}</span>
          <span className="inline-flex items-center gap-1"><Eye size={11}/>{c.counts.views.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}
