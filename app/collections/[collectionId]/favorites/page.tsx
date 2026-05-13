import { notFound } from 'next/navigation';
import { Heart } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { MediaGrid } from '@/components/media/media-grid';
import { COLLECTIONS, ALL_MEDIA } from '@/lib/mock-data';

export default function CollectionFavoritesPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();

  const favorites = ALL_MEDIA.filter(media => media.collectionId === c.id && media.faved);

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Favorites' }]}>
      <CollectionDetailHeader c={c} activeTab="favorites"/>
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
