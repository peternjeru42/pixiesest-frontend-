'use client';
import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Lock, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { CollectionCard } from '@/components/data-display/collection-card';
import { listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listFolders } from '@/lib/api/folders';
import type { Collection, Folder } from '@/lib/types';

export default function FolderDetailPage({ params }: { params: { folderId: string } }) {
  const [folder, setFolder] = React.useState<Folder | null>(null);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const [folders, items] = await Promise.all([listFolders(), listCollections()]);
      if (!mounted) return;
      const currentFolder = folders.find(item => item.id === params.folderId || item.slug === params.folderId) ?? null;
      setFolder(currentFolder);
      setCollections(currentFolder ? items.filter(item => item.folderId === currentFolder.id) : []);
      setLoaded(true);
    };
    load();
    const unsubscribe = subscribeToCollectionChanges(load);
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [params.folderId]);

  function updateCollection(updated: Collection) {
    setCollections(current => current
      .map(collection => collection.id === updated.id ? updated : collection)
      .filter(collection => collection.folderId === folder?.id));
  }

  if (!loaded) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders', href: '/folders' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading folder...</div>
      </AdminLayout>
    );
  }

  if (!folder) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders', href: '/folders' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Folder not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders', href: '/folders' }, { label: folder.name }]}>
      <div className="relative h-72 overflow-hidden bg-panel">
        <img src={folder.cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55"/>
        <Button asChild size="sm" className="absolute top-5 left-6 lg:left-10 bg-bg/95 hover:bg-bg">
          <Link href="/folders"><ArrowLeft size={12}/>Folders</Link>
        </Button>
        <div className="absolute left-6 lg:left-10 right-6 lg:right-10 bottom-6 text-bg">
          <h1 className="serif text-5xl font-medium tracking-tight">{folder.name}</h1>
          {folder.description && <div className="text-bg/85 max-w-2xl mt-1.5">{folder.description}</div>}
          <div className="mono text-[11px] tracking-wider mt-3 opacity-85">
            {collections.length} COLLECTIONS · CREATED {folder.createdAt.toUpperCase()}
            {folder.hasPassword && ' · PASSWORD PROTECTED'}
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-7 pb-20 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-muted">{collections.length} collections in this folder</div>
          <div className="flex gap-2">
            <Button variant="outline"><Edit size={14}/>Edit folder</Button>
            <Button variant="outline">{folder.hasPassword ? <><Lock size={14}/>Remove password</> : <><Lock size={14}/>Set password</>}</Button>
            <Button variant="danger"><Trash2 size={14}/>Delete</Button>
            <Button asChild variant="default"><Link href={`/collections/new?folderId=${folder.id}`}><Plus size={14}/>New collection</Link></Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map(collection => (
            <CollectionCard
              key={collection.id}
              c={collection}
              onCollectionChange={updateCollection}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
