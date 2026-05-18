'use client';
import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Download, Palette, Shield } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { getCachedCollections, getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import type { Collection } from '@/lib/types';

export default function SettingsIndex({ params }: { params: { collectionId: string } }) {
  const initialCollection = React.useMemo(
    () => getCachedCollections().find(item => item.id === params.collectionId) ?? null,
    [params.collectionId],
  );
  const [collection, setCollection] = React.useState<Collection | null>(initialCollection);
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

  if (!loaded && !collection) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Settings' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading settings...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  const sections = [
    { href: `/collections/${collection.id}/settings/privacy`, icon: Shield, title: 'Privacy', sub: 'Password, client access, visitor email capture.' },
    { href: `/collections/${collection.id}/settings/downloads`, icon: Download, title: 'Downloads', sub: 'Originals, web-size, gallery ZIP, PIN, and more.' },
    { href: `/collections/${collection.id}/settings/design`, icon: Palette, title: 'Design', sub: 'Cover, layout, theme, fonts, and color.' },
  ];

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Settings' }]}>
      <CollectionDetailHeader c={collection} activeTab="settings"/>
      <div className="px-6 lg:px-10 pb-20 max-w-3xl">
        <div className="grid gap-3">
          {sections.map(section => (
            <Link key={section.href} href={section.href} className="bg-surface border border-line rounded-md p-5 flex items-center gap-5 hover:shadow-lift transition-shadow">
              <div className="w-11 h-11 rounded-full bg-panel grid place-items-center text-ink-2"><section.icon size={18}/></div>
              <div className="flex-1">
                <div className="serif text-[20px]">{section.title}</div>
                <div className="text-sm text-muted mt-0.5">{section.sub}</div>
              </div>
              <ChevronRight size={16} className="text-muted"/>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
