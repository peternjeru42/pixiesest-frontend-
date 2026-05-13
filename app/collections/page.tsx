'use client';
import * as React from 'react';
import Link from 'next/link';
import { Plus, Filter, ArrowDown } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { CollectionCard } from '@/components/data-display/collection-card';
import { listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import { cn } from '@/lib/utils';
import type { Collection } from '@/lib/types';

const STATUSES = ['all', 'published', 'draft', 'archived'] as const;
type StatusF = typeof STATUSES[number];

export default function CollectionsPage() {
  const [filter, setFilter] = React.useState<StatusF>('all');
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const list = collections.filter(c => filter === 'all' ? true : c.status === filter);

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
        <div className="inline-flex bg-surface border border-line rounded-lg p-0.5 mb-7">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn(
              'px-2.5 py-1 text-xs rounded-md capitalize transition-colors',
              filter === s ? 'bg-panel text-ink font-medium' : 'text-muted hover:text-ink',
            )}>
              {s} {s !== 'all' && <span className="opacity-50 ml-1">{collections.filter(c => c.status === s).length}</span>}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map(c => <CollectionCard key={c.id} c={c} onCollectionChange={updateCollection}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
