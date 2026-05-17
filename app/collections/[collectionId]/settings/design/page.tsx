'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { DesignSettingsForm } from '@/components/forms/design-settings-form';
import { getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import type { Collection } from '@/lib/types';

export default function DesignSettingsPage({ params }: { params: { collectionId: string } }) {
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const current = await getCollection(params.collectionId);
      if (!mounted) return;
      setCollection(current);
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
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Design' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading design settings...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Settings', href: `/collections/${collection.id}/settings` }, { label: 'Design' }]}>
      <CollectionDetailHeader c={collection} activeTab="settings"/>
      <div className="px-6 lg:px-10 pb-20 max-w-5xl">
        <h2 className="serif text-2xl mb-1">Design</h2>
        <div className="text-sm text-muted mb-6">How the public gallery looks to your clients.</div>
        <DesignSettingsForm/>
      </div>
    </AdminLayout>
  );
}
