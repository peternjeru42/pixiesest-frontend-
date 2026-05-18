'use client';
import * as React from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ChevronRight, Download, Folder, Palette, Plus, Shield, Trash2, Upload, X } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader, type CollectionMainTab } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { ActivityTimeline } from '@/components/data-display/activity-timeline';
import { SetCard } from '@/components/data-display/set-card';
import { SetForm } from '@/components/forms/set-form';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { getCachedCollections, getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listActivity } from '@/lib/api/activity';
import { bulkDelete, bulkMove, getMediaDownloadUrl, listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import { createSet, listSets } from '@/lib/api/sets';
import { cn } from '@/lib/utils';
import type { ActivityEvent, Collection, Media, Set as CollectionSet } from '@/lib/types';

export function CollectionWorkspace({
  collectionId,
  initialTab = 'sets',
}: {
  collectionId: string;
  initialTab?: CollectionMainTab;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<CollectionMainTab>(initialTab);
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [sets, setSets] = React.useState<CollectionSet[]>([]);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [activity, setActivity] = React.useState<ActivityEvent[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [setDialogOpen, setSetDialogOpen] = React.useState(false);
  const [savingSet, setSavingSet] = React.useState(false);
  const [setError, setSetError] = React.useState('');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const [moveOpen, setMoveOpen] = React.useState(false);
  const [targetSetId, setTargetSetId] = React.useState('');
  const [moving, setMoving] = React.useState(false);
  const [moveError, setMoveError] = React.useState('');
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState('');
  const [downloading, setDownloading] = React.useState(false);
  const [bulkError, setBulkError] = React.useState('');

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  React.useEffect(() => {
    function syncTabFromPath() {
      const lastSegment = window.location.pathname.split('/').filter(Boolean).at(-1);
      setActiveTab(lastSegment === 'media' || lastSegment === 'activity' || lastSegment === 'settings' ? lastSegment : 'sets');
    }

    window.addEventListener('popstate', syncTabFromPath);
    return () => window.removeEventListener('popstate', syncTabFromPath);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setCollection(getCachedCollections().find(item => item.id === collectionId) ?? null);
      const current = await getCollection(collectionId);
      const [setItems, mediaItems, activityItems] = current
        ? await Promise.all([
            listSets(current.id),
            listMedia({ collectionId: current.id }),
            listActivity({ collectionId: current.id }),
          ])
        : [[], [], []];
      if (!mounted) return;
      setCollection(current);
      setSets(current?.sets.length ? current.sets : setItems);
      setMedia(mediaItems);
      setActivity(activityItems);
      setTargetSetId(existing => existing || setItems[0]?.id || '');
      setLoaded(true);
    };

    load();
    const unsubscribeCollections = subscribeToCollectionChanges(load);
    const unsubscribeMedia = subscribeToMediaChanges(load);
    return () => {
      mounted = false;
      unsubscribeCollections();
      unsubscribeMedia();
    };
  }, [collectionId]);

  React.useEffect(() => {
    if (!loaded || !collection) return;
    if (!media.some(item => item.status === 'processing' || item.status === 'uploading')) return;

    let active = true;
    const refreshProcessingMedia = async () => {
      try {
        const [items, setItems] = await Promise.all([listMedia({ collectionId: collection.id }), listSets(collection.id)]);
        if (!active) return;
        setMedia(items);
        setSets(setItems);
        setTargetSetId(existing => existing || setItems[0]?.id || '');
      } catch {
        // Keep current content visible while background processing updates retry.
      }
    };
    const interval = window.setInterval(refreshProcessingMedia, 3000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [collection, loaded, media]);

  if (!loaded && !collection) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }]}>
        <div className="px-6 py-8 text-sm text-muted lg:px-10">Loading collection...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  const visibleFileCount = collection.counts.photos + collection.counts.videos;
  const selectedCount = selected.size;
  const selectedItems = media.filter(item => selected.has(item.id));

  const toggleSel = (id: string) => setSelected(current => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleFav = (id: string) => setMedia(current => current.map(item => item.id === id ? { ...item, faved: !item.faved } : item));

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

  function triggerBrowserDownload(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function downloadMediaItem(item: Media) {
    const download = await getMediaDownloadUrl(item.id);
    if (!download.url) throw new Error(`No download URL returned for ${item.filename}.`);
    triggerBrowserDownload(download.url, download.filename || item.filename);
  }

  async function downloadSelected() {
    if (selectedItems.length === 0) return;
    setDownloading(true);
    setBulkError('');

    try {
      for (const item of selectedItems) {
        await downloadMediaItem(item);
      }
    } catch (error) {
      setBulkError(error instanceof Error ? error.message : 'Unable to download selected media.');
    } finally {
      setDownloading(false);
    }
  }

  function openMoveDialog() {
    setBulkError('');
    setMoveError('');
    setTargetSetId(current => current || sets[0]?.id || '');
    setMoveOpen(true);
  }

  async function addSelectedToSet() {
    if (!targetSetId || selected.size === 0) return;

    setMoving(true);
    setMoveError('');

    try {
      const mediaIds = Array.from(selected);
      await bulkMove(mediaIds, targetSetId);
      setMedia(current => current.map(item => selected.has(item.id) ? { ...item, setId: targetSetId } : item));
      setSelected(new Set());
      setMoveOpen(false);
    } catch (error) {
      setMoveError(error instanceof Error ? error.message : 'Unable to add media to set.');
    } finally {
      setMoving(false);
    }
  }

  async function deleteSelected() {
    if (selected.size === 0) return;

    setDeleting(true);
    setBulkError('');
    setDeleteError('');

    try {
      const mediaIds = Array.from(selected);
      await bulkDelete(mediaIds);
      setMedia(current => current.filter(item => !selected.has(item.id)));
      setSelected(new Set());
      setDeleteOpen(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Unable to delete selected media.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title }]}>
      <CollectionDetailHeader c={collection} activeTab={activeTab} onTabChange={setActiveTab}/>
      <div className="px-6 pb-20 lg:px-10">
        <div className="mb-4 flex items-center justify-end gap-2">
          {activeTab === 'sets' && (
            <Button variant="outline" onClick={() => setSetDialogOpen(true)}><Plus size={14}/>New set</Button>
          )}
          <Button variant="default" onClick={() => router.push(`/collections/${collection.id}/media/upload`)}>
            <Upload size={14}/>Upload
          </Button>
        </div>

        {activeTab === 'sets' && (
          !loaded ? (
            <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">Loading sets...</div>
          ) : visibleFileCount === 0 ? (
            <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">There are no photos here.</div>
          ) : sets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sets.map(set => <SetCard key={set.id} s={set}/>)}
            </div>
          ) : (
            <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">No sets in this collection yet.</div>
          )
        )}

        {activeTab === 'media' && (
          !loaded ? (
            <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">Loading media...</div>
          ) : media.length > 0 ? (
            <MediaGrid
              media={media}
              selectable
              selected={selected}
              onToggleSelect={toggleSel}
              onOpen={(index) => setLightbox({ items: media, index })}
              onToggleFavorite={toggleFav}
              onDownload={downloadMediaItem}
            />
          ) : (
            <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">There are no photos here.</div>
          )
        )}

        {activeTab === 'activity' && (
          <div className="max-w-3xl rounded-md border border-line bg-surface p-5">
            {!loaded ? (
              <div className="text-sm text-muted">Loading activity...</div>
            ) : activity.length > 0 ? (
              <ActivityTimeline events={activity}/>
            ) : (
              <div className="text-sm text-muted">No activity for this collection yet.</div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid max-w-3xl gap-3">
            {[
              { href: `/collections/${collection.id}/settings/privacy`, icon: Shield, title: 'Privacy', sub: 'Password, client access, visitor email capture.' },
              { href: `/collections/${collection.id}/settings/downloads`, icon: Download, title: 'Downloads', sub: 'Originals, web-size, gallery ZIP, PIN, and more.' },
              { href: `/collections/${collection.id}/settings/design`, icon: Palette, title: 'Design', sub: 'Cover, layout, theme, fonts, and color.' },
            ].map(section => (
              <Link key={section.href} href={section.href} className="flex items-center gap-5 rounded-md border border-line bg-surface p-5 transition-shadow hover:shadow-lift">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-panel text-ink-2"><section.icon size={18}/></div>
                <div className="flex-1">
                  <div className="serif text-[20px]">{section.title}</div>
                  <div className="mt-0.5 text-sm text-muted">{section.sub}</div>
                </div>
                <ChevronRight size={16} className="text-muted"/>
              </Link>
            ))}
          </div>
        )}

        {selected.size > 0 && (
          <div className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-xl rounded-2xl bg-ink px-3 py-3 text-sm text-bg shadow-deep sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-[min(92vw,560px)] sm:-translate-x-1/2 sm:rounded-full sm:px-4 sm:py-2.5">
            {bulkError && (
              <div role="alert" className="mb-2 rounded-lg border border-rose-300/40 bg-rose-500/15 px-3 py-2 text-xs text-rose-100 sm:absolute sm:bottom-full sm:left-0 sm:right-0 sm:mb-3">
                {bulkError}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="mono min-w-[74px] text-[10.5px] leading-tight tracking-wider text-bg/85 sm:min-w-[86px] sm:text-[11px]">
                {selected.size} SELECTED
              </span>
              <div className="grid flex-1 grid-cols-3 gap-1.5 sm:flex sm:items-center sm:justify-center sm:gap-2">
                <BulkBtn icon={<Folder size={13}/>} onClick={openMoveDialog} disabled={moving || deleting || downloading}>Add to set</BulkBtn>
                <BulkBtn icon={<Download size={13}/>} onClick={downloadSelected} disabled={moving || deleting || downloading}>
                  {downloading ? 'Downloading...' : 'Download'}
                </BulkBtn>
                <BulkBtn icon={<Trash2 size={13}/>} onClick={() => { setBulkError(''); setDeleteError(''); setDeleteOpen(true); }} disabled={moving || deleting || downloading} danger>
                  Delete
                </BulkBtn>
              </div>
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-bg/10"
                aria-label="Clear selected media"
              >
                <X size={14}/>
              </button>
            </div>
          </div>
        )}

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

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent onClose={() => setDeleteOpen(false)}>
            <DialogHeader>
              <DialogTitle>Delete media</DialogTitle>
              <DialogDescription>
                Delete {selectedCount} selected item{selectedCount === 1 ? '' : 's'} from {collection.title}.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="rounded-md border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger">
                This removes the selected media from the studio library.
              </div>
              {deleteError && (
                <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
                  {deleteError}
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setDeleteOpen(false)} disabled={deleting}>Cancel</Button>
                <Button type="button" variant="danger" onClick={deleteSelected} disabled={deleting || selectedCount === 0}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>

        <Dialog open={moveOpen} onOpenChange={setMoveOpen}>
          <DialogContent onClose={() => setMoveOpen(false)}>
            <DialogHeader>
              <DialogTitle>Add to set</DialogTitle>
              <DialogDescription>
                Add {selectedCount} selected item{selectedCount === 1 ? '' : 's'} to a set in {collection.title}.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {sets.length > 0 ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="target-set">Set</Label>
                    <Select id="target-set" value={targetSetId} onChange={(event) => setTargetSetId(event.target.value)}>
                      {sets.map(set => <option key={set.id} value={set.id}>{set.title}</option>)}
                    </Select>
                  </div>
                  {moveError && (
                    <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
                      {moveError}
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" onClick={() => setMoveOpen(false)} disabled={moving}>Cancel</Button>
                    <Button type="button" variant="default" onClick={addSelectedToSet} disabled={moving || !targetSetId}>
                      {moving ? 'Adding...' : 'Add to set'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="rounded-md border border-line bg-panel px-4 py-5 text-sm text-muted">
                  Create a set first, then select media here and add it to that set.
                </div>
              )}
            </DialogBody>
          </DialogContent>
        </Dialog>

        {lightbox && (
          <MediaLightbox
            items={lightbox.items}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onIndex={(index) => setLightbox(current => current && { ...current, index })}
            onToggleFavorite={toggleFav}
            onDownload={downloadMediaItem}
          />
        )}
      </div>
    </AdminLayout>
  );
}

function BulkBtn({
  icon,
  children,
  danger,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-center text-[11.5px] font-medium leading-tight hover:bg-bg/10 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-8 sm:px-3 sm:text-[12.5px]',
        danger && 'text-rose-300',
      )}
    >
      {icon}{children}
    </button>
  );
}
