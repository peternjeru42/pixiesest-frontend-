'use client';
import * as React from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Edit, Image as ImageIcon, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { SETS } from '@/lib/mock-data';
import { listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import type { Media } from '@/lib/types';

export default function SetDetailPage({ params }: { params: { setId: string } }) {
  const s = SETS[params.setId];
  const router = useRouter();
  const [media, setMedia] = React.useState<Media[]>([]);
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const toggleFav = (id: string) => setMedia(arr => arr.map(m => m.id === id ? { ...m, faved: !m.faved } : m));

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const items = await listMedia({ setId: params.setId });
      if (mounted) setMedia(items);
    };
    load();
    const unsubscribe = subscribeToMediaChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [params.setId]);

  if (!s) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Sets' }, { label: s.title }]}>
      <div className="relative h-60 overflow-hidden bg-panel">
        <img src={s.cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55"/>
        <Button asChild size="sm" className="absolute top-5 left-6 lg:left-10 bg-bg/95 hover:bg-bg">
          <Link href="/collections/c1"><ArrowLeft size={12}/>Collection</Link>
        </Button>
        <div className="absolute left-6 lg:left-10 right-6 lg:right-10 bottom-5 text-bg">
          <Badge tone={s.visibility === 'public' ? 'published' : 'archived'}>{s.visibility}</Badge>
          <h1 className="serif text-4xl font-medium tracking-tight mt-2.5">{s.title}</h1>
          <div className="mono text-[11px] tracking-wider mt-1.5 opacity-85">
            {s.photoCount} PHOTOS{s.videoCount > 0 && ` · ${s.videoCount} VIDEO · ${Math.floor(s.videoDurationSec / 60)}:${String(s.videoDurationSec % 60).padStart(2,'0')}`}
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
        <MediaGrid media={media} onOpen={(i) => setLightbox({ items: media, index: i })} onToggleFavorite={toggleFav}/>
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
