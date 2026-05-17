'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { StatusBadge } from '@/components/actions/status-badge';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { DOWNLOAD_LOGS } from '@/lib/mock-data';
import { formatBytes } from '@/lib/utils';
import type { Collection } from '@/lib/types';

export default function CollectionDownloadsPage({ params }: { params: { collectionId: string } }) {
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
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Downloads' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading downloads...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  const rows = DOWNLOAD_LOGS.filter(download => download.collectionId === collection.id);

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Downloads' }]}>
      <CollectionDetailHeader c={collection} activeTab="downloads"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="bg-surface border border-line rounded-md">
          <Table>
            <THead><TR><TH>Client</TH><TH>File</TH><TH>Type</TH><TH>Size</TH><TH>Status</TH><TH>Date</TH></TR></THead>
            <TBody>
              {rows.map(download => (
                <TR key={download.id}>
                  <TD>{download.clientEmail}</TD>
                  <TD>{download.fileLabel}</TD>
                  <TD className="mono text-xs uppercase">{download.type}</TD>
                  <TD className="mono">{formatBytes(download.sizeMB * 1024 * 1024)}</TD>
                  <TD><StatusBadge status={download.status}/></TD>
                  <TD className="text-muted">{download.date}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
