'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { ActivityTimeline } from '@/components/data-display/activity-timeline';
import { getCachedCollections, getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listActivity } from '@/lib/api/activity';
import type { ActivityEvent, Collection } from '@/lib/types';

export default function CollectionActivityPage({ params }: { params: { collectionId: string } }) {
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [activity, setActivity] = React.useState<ActivityEvent[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setCollection(getCachedCollections().find(item => item.id === params.collectionId) ?? null);
      const current = await getCollection(params.collectionId);
      const events = current ? await listActivity({ collectionId: current.id }) : [];
      if (!mounted) return;
      setCollection(current);
      setActivity(events);
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
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Activity' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading activity...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Activity' }]}>
      <CollectionDetailHeader c={collection} activeTab="activity"/>
      <div className="px-6 lg:px-10 pb-20 max-w-3xl">
        <div className="bg-surface border border-line rounded-md p-5">
          {!loaded ? (
            <div className="text-sm text-muted">Loading activity...</div>
          ) : activity.length > 0 ? (
            <ActivityTimeline events={activity}/>
          ) : (
            <div className="text-sm text-muted">No activity for this collection yet.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
