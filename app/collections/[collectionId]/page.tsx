'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SetCard } from '@/components/data-display/set-card';
import { SetForm } from '@/components/forms/set-form';
import { getCachedCollections, getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { createSet, listSets } from '@/lib/api/sets';
import type { Collection, Set } from '@/lib/types';

export default function CollectionDetailPage({ params }: { params: { collectionId: string } }) {
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [sets, setSets] = React.useState<Set[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [setDialogOpen, setSetDialogOpen] = React.useState(false);
  const [savingSet, setSavingSet] = React.useState(false);
  const [setError, setSetError] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setCollection(getCachedCollections().find(item => item.id === params.collectionId) ?? null);
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

  if (!loaded && !collection) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading collection...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();
  const visibleFileCount = collection.counts.photos + collection.counts.videos;

  async function handleCreateSet(values: { title: string; description: string; visibility: string }) {
    if (!collection) return;

    setSavingSet(true);
    setSetError('');

    try {
      const created = await createSet(collection.id, {
        title: values.title,
        description: values.description,
        visibility: values.visibility === 'client' || values.visibility === 'hidden' ? values.visibility : 'public',
        order: sets.length,
      });
      setSets(current => [...current, created]);
      setSetDialogOpen(false);
    } catch (error) {
      setSetError(error instanceof Error ? error.message : 'Unable to create set.');
    } finally {
      setSavingSet(false);
    }
  }

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title }]}>
      <CollectionDetailHeader c={collection} activeTab="sets"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted">{sets.length} sets - drag to reorder - clients see this order</div>
          <Button variant="outline" onClick={() => setSetDialogOpen(true)}><Plus size={14}/>New set</Button>
        </div>
        {!loaded ? (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            Loading sets...
          </div>
        ) : visibleFileCount === 0 ? (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            There are no photos here.
          </div>
        ) : sets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sets.map(set => <SetCard key={set.id} s={set}/>)}
          </div>
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            No sets in this collection yet.
          </div>
        )}
      </div>
      <Dialog open={setDialogOpen} onOpenChange={setSetDialogOpen}>
        <DialogContent onClose={() => setSetDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>New set</DialogTitle>
            <DialogDescription>Create a set inside {collection.title}.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            {setError && (
              <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
                {setError}
              </div>
            )}
            <SetForm onSubmit={handleCreateSet} onCancel={() => setSetDialogOpen(false)} submitLabel={savingSet ? 'Creating...' : 'Create set'} disabled={savingSet}/>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
