'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { Heart } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { MediaGrid } from '@/components/media/media-grid';
import { getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import type { Collection, Media } from '@/lib/types';

export default function CollectionFavoritesPage({ params }: { params: { collectionId: string } }) {
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [favorites, setFavorites] = React.useState<Media[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const current = await getCollection(params.collectionId);
      const media = current ? await listMedia({ collectionId: current.id }) : [];
      if (!mounted) return;
      setCollection(current);
      setFavorites(media.filter(item => item.faved));
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
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Favorites' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading favorites...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Favorites' }]}>
      <CollectionDetailHeader c={collection} activeTab="favorites"/>
      <div className="px-6 lg:px-10 pb-20">
        {favorites.length > 0 ? (
          <MediaGrid media={favorites} density="regular"/>
        ) : (
          <div className="grid min-h-64 place-items-center rounded-md border border-line bg-surface text-center">
            <div>
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-panel text-muted">
                <Heart size={16}/>
              </div>
              <div className="font-medium">No favorites yet</div>
              <div className="mt-1 text-sm text-muted">Favorited photos will appear here.</div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
