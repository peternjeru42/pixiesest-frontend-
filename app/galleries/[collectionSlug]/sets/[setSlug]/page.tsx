'use client';
import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PublicGalleryNav, PublicGalleryFooter } from '@/components/layout/public-gallery-layout';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { Button } from '@/components/ui/button';
import { COLLECTIONS, SETS, SET_MEDIA } from '@/lib/mock-data';
import type { Media } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function PublicSetPage({ params }: { params: { collectionSlug: string; setSlug: string } }) {
  const c = COLLECTIONS.find(x => x.slug === params.collectionSlug);
  const s = SETS[params.setSlug];
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const items = (SET_MEDIA[params.setSlug] ?? []).map(m => ({ ...m, faved: favorites.has(m.id) }));
  const toggleFav = (id: string) => setFavorites(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  if (!c || !s) return notFound();
  return (
    <div className="bg-bg min-h-screen text-ink">
      <PublicGalleryNav favCount={favorites.size} onOpenFavorites={()=>{}} onOpenDownload={()=>{}} adminHref={`/collections/${c.id}`}/>
      <div className="px-6 md:px-9 py-10 pb-20">
        <Button asChild size="sm" variant="ghost" className="mb-5">
          <Link href={`/galleries/${c.slug}`}><ArrowLeft size={12}/>Back to {c.title}</Link>
        </Button>
        <h1 className="serif text-5xl md:text-6xl font-medium tracking-tight">{s.title}</h1>
        <div className="mono text-[11px] tracking-wider text-muted mt-2 uppercase">{items.length} photos</div>
        <div className="grid gap-1.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-9">
          {items.map((m, i) => (
            <div key={m.id} onClick={() => setLightbox({ items, index: i })} className={cn('relative overflow-hidden bg-panel cursor-pointer', i % 4 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]')}>
              <img src={m.thumb} alt="" loading="lazy" className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
        <PublicGalleryFooter coupleName={c.couple ?? c.title}/>
      </div>
      {lightbox && (
        <MediaLightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(i) => setLightbox(lb => lb && { ...lb, index: i })}
          onToggleFavorite={toggleFav}
        />
      )}
    </div>
  );
}
