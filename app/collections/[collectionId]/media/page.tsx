'use client';
import * as React from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { COLLECTIONS, ALL_MEDIA } from '@/lib/mock-data';
import { ArrowDownUp, LayoutGrid, Upload, Folder, Heart, Lock, Download, Image as ImageIcon, Trash2, X } from 'lucide-react';
import type { Media } from '@/lib/types';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'favorites' | 'private' | 'videos';

export default function CollectionMediaPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  const router = useRouter();
  const [media, setMedia] = React.useState<Media[]>(ALL_MEDIA);
  const [filter, setFilter] = React.useState<Filter>('all');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);

  if (!c) return notFound();

  const visible = media.filter(m =>
    filter === 'all' ? true :
    filter === 'favorites' ? m.faved :
    filter === 'private' ? m.private :
    filter === 'videos' ? m.type === 'video' : true);

  const toggleSel = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleFav = (id: string) => setMedia(arr => arr.map(m => m.id === id ? { ...m, faved: !m.faved } : m));

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Media' }]}>
      <CollectionDetailHeader c={c} activeTab="media"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="inline-flex bg-surface border border-line rounded-lg p-0.5">
            {(['all','favorites','private','videos'] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={cn(
                'px-2.5 py-1 text-xs rounded-md capitalize transition-colors',
                filter === f ? 'bg-panel text-ink font-medium' : 'text-muted hover:text-ink',
              )}>{f} <span className="opacity-50 ml-1">{
                f === 'all' ? media.length :
                f === 'favorites' ? media.filter(m=>m.faved).length :
                f === 'private' ? media.filter(m=>m.private).length :
                media.filter(m=>m.type==='video').length
              }</span></button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline"><ArrowDownUp size={12}/>Date</Button>
            <Button size="sm" variant="outline"><LayoutGrid size={12}/>Grid</Button>
            <Button size="sm" variant="default" onClick={() => router.push(`/collections/${c.id}/media/upload`)}><Upload size={12}/>Upload</Button>
          </div>
        </div>

        <MediaGrid
          media={visible}
          selectable
          selected={selected}
          onToggleSelect={toggleSel}
          onOpen={(i) => setLightbox({ items: visible, index: i })}
          onToggleFavorite={toggleFav}
        />

        {selected.size > 0 && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 bg-ink text-bg rounded-full shadow-deep flex items-center gap-3 px-4 py-2.5 text-sm">
            <span className="mono text-[11px] tracking-wider">{selected.size} SELECTED</span>
            <span className="w-px h-4 bg-bg/20"/>
            <BulkBtn icon={<Folder size={13}/>}>Move</BulkBtn>
            <BulkBtn icon={<Heart size={13}/>}>Favorite</BulkBtn>
            <BulkBtn icon={<Lock size={13}/>}>Private</BulkBtn>
            <BulkBtn icon={<Download size={13}/>}>Download</BulkBtn>
            <BulkBtn icon={<ImageIcon size={13}/>}>Set cover</BulkBtn>
            <span className="w-px h-4 bg-bg/20"/>
            <BulkBtn icon={<Trash2 size={13}/>} danger>Delete</BulkBtn>
            <button onClick={() => setSelected(new Set())} className="px-1.5 py-1 rounded-full hover:bg-bg/10"><X size={13}/></button>
          </div>
        )}

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
    </AdminLayout>
  );
}

function BulkBtn({ icon, children, danger }: { icon: React.ReactNode; children: React.ReactNode; danger?: boolean }) {
  return <button className={cn('px-2.5 py-1 rounded-full hover:bg-bg/10 inline-flex items-center gap-1.5 text-[12.5px]', danger && 'text-rose-300')}>{icon}{children}</button>;
}
