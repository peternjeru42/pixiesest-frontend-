'use client';
import * as React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { FolderCard } from '@/components/data-display/folder-card';
import { listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import { getCachedFolders, listFolders, subscribeToFolderChanges } from '@/lib/api/folders';
import type { Collection, Folder } from '@/lib/types';

export default function FoldersPage() {
  const [folders, setFolders] = React.useState<Folder[]>(() => getCachedFolders());
  const [collections, setCollections] = React.useState<Collection[]>([]);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setFolders(getCachedFolders());
      const [folderItems, collectionItems] = await Promise.all([listFolders(), listCollections()]);
      if (!mounted) return;
      setFolders(folderItems);
      setCollections(collectionItems);
    };
    load();
    const unsubscribeCollections = subscribeToCollectionChanges(load);
    const unsubscribeFolders = subscribeToFolderChanges(load);
    return () => {
      mounted = false;
      unsubscribeCollections();
      unsubscribeFolders();
    };
  }, []);

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
        <PageHeader
          eyebrow={`Organize · ${folders.length} folders`}
          title="Folders"
          sub="Group collections by year, event type, or however you work."
          actions={<Button asChild variant="default"><Link href="/folders/new"><Plus size={14}/>New folder</Link></Button>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map(folder => <FolderCard key={folder.id} f={folder} collections={collections}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
