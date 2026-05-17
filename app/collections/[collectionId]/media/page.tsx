'use client';
import * as React from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import { ArrowDownUp, LayoutGrid, Upload, Folder, Heart, Lock, Download, Image as ImageIcon, Trash2, X } from 'lucide-react';
import type { Collection, Media } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function CollectionMediaPage({ params }: { params: { collectionId: string } }) {
  const router = useRouter();
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const current = await getCollection(params.collectionId);
      const items = current ? await listMedia({ collectionId: current.id }) : [];
      if (!mounted) return;
      setCollection(current);
      setMedia(items);
      setLoaded(true);
    };
    load();
    const unsubscribeCollections = subscribeToCollectionChanges(load);
    const unsubscribeMedia = subscribeToMediaChanges(load);
    return () => {
      mounted = false;
      unsubscribeCollections();
      unsubscribeMedia();
    };
  }, [params.collectionId]);

  if (!loaded) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Media' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading media...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  const toggleSel = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleFav = (id: string) => setMedia(arr => arr.map(m => m.id === id ? { ...m, faved: !m.faved } : m));

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Media' }]}>
      <CollectionDetailHeader c={collection} activeTab="media"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-end flex-wrap gap-3 mb-4">
          <div className="flex gap-2">
            <Button size="sm" variant="outline"><ArrowDownUp size={12}/>Date</Button>
            <Button size="sm" variant="outline"><LayoutGrid size={12}/>Grid</Button>
            <Button size="sm" variant="default" onClick={() => router.push(`/collections/${collection.id}/media/upload`)}><Upload size={12}/>Upload</Button>
          </div>
        </div>

        {media.length > 0 ? (
          <MediaGrid
            media={media}
            selectable
            selected={selected}
            onToggleSelect={toggleSel}
            onOpen={(i) => setLightbox({ items: media, index: i })}
            onToggleFavorite={toggleFav}
          />
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            No media in this collection yet.
          </div>
        )}

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
