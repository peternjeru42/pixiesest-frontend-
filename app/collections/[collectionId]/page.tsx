'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { SetCard } from '@/components/data-display/set-card';
import { getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listSets } from '@/lib/api/sets';
import type { Collection, Set } from '@/lib/types';

export default function CollectionDetailPage({ params }: { params: { collectionId: string } }) {
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [sets, setSets] = React.useState<Set[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const current = await getCollection(params.collectionId);
      const setItems = current ? await listSets(current.id) : [];
      if (!mounted) return;
      setCollection(current);
      setSets(current?.sets.length ? current.sets : setItems);
      setLoaded(true);
    };
    load();
    const unsubscribe = subscribeToCollectionChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [params.collectionId]);

  if (!loaded) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading collection...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title }]}>
      <CollectionDetailHeader c={collection} activeTab="sets"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted">{sets.length} sets - drag to reorder - clients see this order</div>
          <Button variant="outline"><Plus size={14}/>New set</Button>
        </div>
        {sets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sets.map(set => <SetCard key={set.id} s={set}/>)}
          </div>
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            No sets in this collection yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
