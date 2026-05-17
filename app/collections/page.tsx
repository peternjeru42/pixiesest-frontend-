'use client';
import * as React from 'react';
import Link from 'next/link';
import { Plus, ArrowDown } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { CollectionCard } from '@/components/data-display/collection-card';
import { getCachedCollections, listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import { searchFolders } from '@/lib/api/folders';
import type { Collection } from '@/lib/types';

export default function CollectionsPage() {
  const [collections, setCollections] = React.useState<Collection[]>(() => filterCachedCollections(''));
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const query = search.trim();
      setCollections(filterCachedCollections(query));

      const [items, folders] = await Promise.all([
        listCollections(),
        query ? searchFolders(query) : Promise.resolve([]),
      ]);
      if (!mounted) return;

      if (!query) {
        setCollections(items);
        return;
      }

      const folderIds = new Set(folders.map(folder => folder.id));
      const normalized = query.toLowerCase();
      setCollections(items.filter(collection =>
        folderIds.has(collection.folderId ?? '') ||
        collection.title.toLowerCase().includes(normalized) ||
        collection.slug.toLowerCase().includes(normalized),
      ));
    };
    load();
    const unsubscribe = subscribeToCollectionChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [search]);

  function updateCollection(updated: Collection) {
    setCollections(current => current.map(collection => collection.id === updated.id ? updated : collection));
  }

  return (
    <AdminLayout
      crumbs={[{ label: 'Studio' }, { label: 'Collections' }]}
      search={{ value: search, onChange: setSearch, placeholder: 'Search collections or folders...' }}
    >
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
        <PageHeader
          eyebrow={`Studio · ${collections.length} collections`}
          title="Collections"
          actions={<>
            <Button variant="outline"><ArrowDown size={14}/>Newest</Button>
            <Button asChild variant="default"><Link href="/collections/new"><Plus size={14}/>New collection</Link></Button>
          </>}
        />
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collections.map(c => <CollectionCard key={c.id} c={c} onCollectionChange={updateCollection}/>)}
          </div>
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            No collections found.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function filterCachedCollections(query: string) {
  const collections = getCachedCollections();
  const normalized = query.trim().toLowerCase();
  if (!normalized) return collections;
  return collections.filter(collection =>
    collection.title.toLowerCase().includes(normalized) ||
    collection.slug.toLowerCase().includes(normalized) ||
    (collection.folderName ?? '').toLowerCase().includes(normalized),
  );
}
