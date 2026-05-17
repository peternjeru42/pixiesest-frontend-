'use client';
import * as React from 'react';
import { Filter, Upload } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import type { Media } from '@/lib/types';

export default function MediaPage() {
  const [media, setMedia] = React.useState<Media[]>([]);
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const items = await listMedia();
      if (mounted) setMedia(items);
    };
    load();
    const unsubscribe = subscribeToMediaChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const toggleFav = (id: string) => setMedia(arr => arr.map(m => m.id === id ? { ...m, faved: !m.faved } : m));
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Media' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1700px] mx-auto">
        <PageHeader
          eyebrow={`Studio · ${media.length} items`}
          title="Media library"
          sub="Every photo and video across your collections, in one place."
          actions={<>
            <Button variant="outline"><Filter size={14}/>Filter</Button>
            <Button variant="default"><Upload size={14}/>Upload</Button>
          </>}
        />
        <MediaGrid
          media={media}
          onOpen={(i) => setLightbox({ items: media, index: i })}
          onToggleFavorite={toggleFav}
        />
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
