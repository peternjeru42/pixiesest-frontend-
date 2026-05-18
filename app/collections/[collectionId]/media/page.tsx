'use client';
import * as React from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { getCachedCollections, getCollection, subscribeToCollectionChanges } from '@/lib/api/collections';
import { bulkMove, listMedia, subscribeToMediaChanges } from '@/lib/api/media';
import { listSets } from '@/lib/api/sets';
import { ArrowDownUp, LayoutGrid, Upload, Folder, Download, Trash2, X } from 'lucide-react';
import type { Collection, Media, Set as CollectionSet } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function CollectionMediaPage({ params }: { params: { collectionId: string } }) {
  const router = useRouter();
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [sets, setSets] = React.useState<CollectionSet[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [moveOpen, setMoveOpen] = React.useState(false);
  const [targetSetId, setTargetSetId] = React.useState('');
  const [moving, setMoving] = React.useState(false);
  const [moveError, setMoveError] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setCollection(getCachedCollections().find(item => item.id === params.collectionId) ?? null);
      const current = await getCollection(params.collectionId);
      const [items, setItems] = current
        ? await Promise.all([listMedia({ collectionId: current.id }), listSets(current.id)])
        : [[], []];
      if (!mounted) return;
      setCollection(current);
      setMedia(items);
      setSets(setItems);
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
  }, [params.collectionId]);

  if (!loaded && !collection) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Media' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading media...</div>
      </AdminLayout>
    );
  }

  if (!collection) return notFound();

  const toggleSel = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleFav = (id: string) => setMedia(arr => arr.map(m => m.id === id ? { ...m, faved: !m.faved } : m));
  const selectedCount = selected.size;

  async function addSelectedToSet() {
    if (!targetSetId || selected.size === 0) return;

    setMoving(true);
    setMoveError('');

    try {
      const mediaIds = Array.from(selected);
      await bulkMove(mediaIds, targetSetId);
      setMedia(current => current.map(item => (
        selected.has(item.id) ? { ...item, setId: targetSetId } : item
      )));
      setSelected(new Set());
      setMoveOpen(false);
    } catch (error) {
      setMoveError(error instanceof Error ? error.message : 'Unable to add media to set.');
    } finally {
      setMoving(false);
    }
  }

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Media' }]}>
      <CollectionDetailHeader c={collection} activeTab="media"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-end flex-wrap gap-3 mb-4">
          <div className="flex gap-2">
            <Button size="sm" variant="outline"><ArrowDownUp size={12}/>Date</Button>
            <Button size="sm" variant="outline"><LayoutGrid size={12}/>Grid</Button>
            <Button size="sm" variant="default" onClick={() => router.push(`/collections/${collection.id}/media/upload`)}><Upload size={12}/>Upload</Button>
          </div>
        </div>

        {!loaded ? (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            Loading media...
          </div>
        ) : media.length > 0 ? (
          <MediaGrid
            media={media}
            selectable
            selected={selected}
            onToggleSelect={toggleSel}
            onOpen={(i) => setLightbox({ items: media, index: i })}
            onToggleFavorite={toggleFav}
          />
        ) : (
          <div className="rounded-md border border-line bg-surface px-5 py-8 text-sm text-muted">
            There are no photos here.
          </div>
        )}

        {selected.size > 0 && (
          <div className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-xl rounded-2xl bg-ink px-3 py-3 text-sm text-bg shadow-deep sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-[min(92vw,560px)] sm:-translate-x-1/2 sm:rounded-full sm:px-4 sm:py-2.5">
            <div className="flex items-center gap-2">
              <span className="mono min-w-[74px] text-[10.5px] leading-tight tracking-wider text-bg/85 sm:min-w-[86px] sm:text-[11px]">
                {selected.size} SELECTED
              </span>
              <div className="grid flex-1 grid-cols-3 gap-1.5 sm:flex sm:items-center sm:justify-center sm:gap-2">
                <BulkBtn icon={<Folder size={13}/>} onClick={() => setMoveOpen(true)}>Add to set</BulkBtn>
                <BulkBtn icon={<Download size={13}/>}>Download</BulkBtn>
                <BulkBtn icon={<Trash2 size={13}/>} danger>Delete</BulkBtn>
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
            onIndex={(i) => setLightbox(lb => lb && { ...lb, index: i })}
            onToggleFavorite={toggleFav}
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
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-center text-[11.5px] font-medium leading-tight hover:bg-bg/10 sm:min-h-8 sm:px-3 sm:text-[12.5px]',
        danger && 'text-rose-300',
      )}
    >
      {icon}{children}
    </button>
  );
}
