'use client';
import * as React from 'react';
import Link from 'next/link';
import { Plus, Filter, ArrowDown } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { CollectionCard } from '@/components/data-display/collection-card';
import { listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import type { Collection } from '@/lib/types';

export default function CollectionsPage() {
  const [collections, setCollections] = React.useState<Collection[]>([]);

  React.useEffect(() => {
    let mounted = true;
    const load = () => listCollections().then(items => {
      if (mounted) setCollections(items);
    });
    load();
    const unsubscribe = subscribeToCollectionChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  function updateCollection(updated: Collection) {
    setCollections(current => current.map(collection => collection.id === updated.id ? updated : collection));
  }

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
        <PageHeader
          eyebrow={`Studio · ${collections.length} collections`}
          title="Collections"
          actions={<>
            <Button variant="outline"><Filter size={14}/>Filter</Button>
            <Button variant="outline"><ArrowDown size={14}/>Newest</Button>
            <Button asChild variant="default"><Link href="/collections/new"><Plus size={14}/>New collection</Link></Button>
          </>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map(c => <CollectionCard key={c.id} c={c} onCollectionChange={updateCollection}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
