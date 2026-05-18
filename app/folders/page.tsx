'use client';
import * as React from 'react';
import { Plus } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FolderCard } from '@/components/data-display/folder-card';
import { FolderForm } from '@/components/forms/folder-form';
import { listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import { getCachedFolders, listFolders, subscribeToFolderChanges } from '@/lib/api/folders';
import type { Collection, Folder } from '@/lib/types';

export default function FoldersPage() {
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [createOpen, setCreateOpen] = React.useState(false);

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
          actions={<Button type="button" variant="default" onClick={() => setCreateOpen(true)}><Plus size={14}/>New folder</Button>}
        />
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent size="md" onClose={() => setCreateOpen(false)}>
            <DialogHeader>
              <DialogTitle>New folder</DialogTitle>
              <DialogDescription>Group collections by year, event type, or client delivery workflow.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <FolderForm
                onCancel={() => setCreateOpen(false)}
                onCreated={(folder) => {
                  setFolders(current => [folder, ...current.filter(item => item.id !== folder.id)]);
                  setCreateOpen(false);
                }}
              />
            </DialogBody>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map(folder => <FolderCard key={folder.id} f={folder} collections={collections}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
