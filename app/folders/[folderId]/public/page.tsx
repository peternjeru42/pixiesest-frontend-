'use client';
import * as React from 'react';
import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
import { PasswordAccessForm } from '@/components/forms/password-access-form';
import { PublicApiError, getPublicFolder, listPublicFolderCollections } from '@/lib/api/public-gallery';
import type { Collection, Folder } from '@/lib/types';

export default function FolderPublicPage({ params }: { params: { folderId: string } }) {
  const [folder, setFolder] = React.useState<Folder | null>(null);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [locked, setLocked] = React.useState(false);
  const [error, setError] = React.useState('');

  const loadFolder = React.useCallback(async () => {
    setLoading(true);
    setLocked(false);
    setError('');
    try {
      const nextFolder = await getPublicFolder(params.folderId);
      const nextCollections = await listPublicFolderCollections(nextFolder.slug);
      setFolder(nextFolder);
      setCollections(nextCollections);
    } catch (err) {
      if (err instanceof PublicApiError && err.status === 403) {
        setLocked(true);
        return;
      }
      setError(err instanceof Error ? err.message : 'Unable to load this folder.');
    } finally {
      setLoading(false);
    }
  }, [params.folderId]);
  const visibleFileCount = collections.reduce((total, collection) => (
    total + collection.counts.photos + collection.counts.videos
  ), 0);

  React.useEffect(() => {
    loadFolder();
  }, [loadFolder]);

  if (locked) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink text-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 to-ink/85"/>
        <PasswordAccessForm
          slug={params.folderId}
          resource="folder"
          title="Private folder"
          returnPath={`/folders/${params.folderId}/public`}
          onUnlock={loadFolder}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-ink">
        <div className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Loading folder</div>
      </div>
    );
  }

  if (error || !folder) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-6 text-ink">
        <div className="max-w-sm text-center">
          <div className="serif text-3xl">Folder unavailable</div>
          <p className="mt-2 text-sm text-muted">{error || 'This shared folder could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/85 px-6 py-4 backdrop-blur md:px-9">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[12px] text-bg serif italic">D</span>
          <span className="serif text-[18px] uppercase tracking-[0.05em]">Droptop</span>
        </Link>
      </nav>
      <header className="relative h-[52vh] min-h-[360px] overflow-hidden bg-ink">
        {folder.cover ? (
          <img src={folder.cover} alt="" className="h-full w-full object-cover opacity-85"/>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-bg/45">
            <ImageIcon size={56} strokeWidth={1.2}/>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/60"/>
        <div className="absolute bottom-12 left-0 right-0 z-10 px-6 text-center text-bg">
          <div className="mono mb-3 text-[11px] uppercase tracking-[0.14em] opacity-85">A collection of work</div>
          <h1 className="serif text-6xl font-medium tracking-tight md:text-7xl">{folder.name}</h1>
          {folder.description && <p className="mx-auto mt-4 max-w-2xl text-bg/85">{folder.description}</p>}
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {collections.length > 0 && visibleFileCount > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map(collection => (
              <Link key={collection.id} href={`/galleries/${collection.slug}`} className="group rounded-md border border-line bg-surface p-5 transition-transform hover:-translate-y-0.5 hover:shadow-lift">
                <div className="mb-4 grid aspect-[16/10] place-items-center overflow-hidden rounded-sm bg-panel text-muted">
                  {collection.cover ? <img src={collection.cover} alt="" className="h-full w-full object-cover"/> : <ImageIcon size={24} strokeWidth={1.5}/>}
                </div>
                <div className="serif text-[24px] leading-tight group-hover:underline">{collection.title}</div>
                {collection.description && <p className="mt-2 line-clamp-2 text-sm text-muted">{collection.description}</p>}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-center text-sm text-muted">
            <div className="serif text-[22px] text-ink">There are no photos here.</div>
            <p className="mt-1">This folder does not have visible files yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
