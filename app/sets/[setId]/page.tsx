'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Image as ImageIcon, Trash2, Upload } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { getSet } from '@/lib/api/sets';
import { listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import type { Media, Set as CollectionSet } from '@/lib/types';

export default function SetDetailPage({ params }: { params: { setId: string } }) {
  const router = useRouter();
  const [set, setSet] = React.useState<CollectionSet | null>(null);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const [currentSet, items] = await Promise.all([
        getSet(params.setId),
        listMedia({ setId: params.setId }),
      ]);
      if (!mounted) return;
      setSet(currentSet);
      setMedia(items);
      setLoaded(true);
    };
    load();
    const unsubscribe = subscribeToMediaChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [params.setId]);

  if (!loaded) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Sets' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading set...</div>
      </AdminLayout>
    );
  }

  if (!set) return notFound();

  const collectionHref = set.collectionId ? `/collections/${set.collectionId}` : '/collections';
  const toggleFav = (id: string) => setMedia(items => items.map(item => item.id === id ? { ...item, faved: !item.faved } : item));

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: set.title }]}>
      <div className="relative h-60 overflow-hidden bg-panel">
        {set.cover ? (
          <img src={set.cover} alt="" className="w-full h-full object-cover"/>
        ) : (
          <div className="grid h-full place-items-center bg-ink text-bg/60">
            <ImageIcon size={34} strokeWidth={1.4}/>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55"/>
        <Button asChild size="sm" className="absolute top-5 left-6 lg:left-10 bg-bg/95 hover:bg-bg">
          <Link href={collectionHref}><ArrowLeft size={12}/>Collection</Link>
        </Button>
        <div className="absolute left-6 lg:left-10 right-6 lg:right-10 bottom-5 text-bg">
          <Badge tone={set.visibility === 'public' ? 'published' : 'archived'}>{set.visibility}</Badge>
          <h1 className="serif text-4xl font-medium tracking-tight mt-2.5">{set.title}</h1>
          <div className="mono text-[11px] tracking-wider mt-1.5 opacity-85">
            {set.photoCount} PHOTOS{set.videoCount > 0 && ` / ${set.videoCount} VIDEO / ${Math.floor(set.videoDurationSec / 60)}:${String(set.videoDurationSec % 60).padStart(2, '0')}`}
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-10 py-6 pb-20">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-muted">{media.length} items</div>
          <div className="flex gap-2">
            <Button variant="outline"><Edit size={14}/>Edit set</Button>
            <Button variant="outline"><ImageIcon size={14}/>Set cover</Button>
            <Button variant="outline" onClick={() => router.push(`/sets/${params.setId}/upload`)}><Upload size={14}/>Upload</Button>
            <Button variant="danger"><Trash2 size={14}/>Delete</Button>
          </div>
        </div>
        {media.length > 0 ? (
          <MediaGrid media={media} onOpen={(index) => setLightbox({ items: media, index })} onToggleFavorite={toggleFav}/>
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            No media in this set yet.
          </div>
        )}
        {lightbox && (
          <MediaLightbox
            items={lightbox.items}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onIndex={(index) => setLightbox(current => current && { ...current, index })}
            onToggleFavorite={toggleFav}
          />
        )}
      </div>
    </AdminLayout>
  );
}
