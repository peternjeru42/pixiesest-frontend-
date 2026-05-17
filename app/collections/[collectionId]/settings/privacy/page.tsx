'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { PrivacySettingsForm } from '@/components/forms/privacy-settings-form';
import { getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import type { Collection } from '@/lib/types';

export default function PrivacySettingsPage({ params }: { params: { collectionId: string } }) {
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
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Privacy' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading privacy settings...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Settings', href: `/collections/${collection.id}/settings` }, { label: 'Privacy' }]}>
      <CollectionDetailHeader c={collection} activeTab="settings"/>
      <div className="px-6 lg:px-10 pb-20 max-w-2xl">
        <h2 className="serif text-2xl mb-1">Privacy</h2>
        <div className="text-sm text-muted mb-6">Who can see this gallery and what they need to enter.</div>
        <div className="bg-surface border border-line rounded-md p-6">
          <PrivacySettingsForm c={collection}/>
        </div>
      </div>
    </AdminLayout>
  );
}
