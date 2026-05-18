'use client';
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowDown, Download, Heart, Image as ImageIcon, LayoutGrid, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmptyState } from '@/components/data-display/empty-state';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { PublicGalleryFooter, PublicGalleryNav } from '@/components/layout/public-gallery-layout';
import {
  PublicApiError,
  getPublicCollection,
  listPublicCollectionMedia,
  listPublicCollectionSets,
} from '@/lib/api/public-gallery';
import { cn } from '@/lib/utils';
import type { Collection, Media, Set as GallerySet } from '@/lib/types';

type PublicSet = GallerySet & { slug: string };

export default function PublicGalleryPage({ params }: { params: { collectionSlug: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preview = searchParams.get('preview') === '1';
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [sets, setSets] = React.useState<PublicSet[]>([]);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [setId, setSetId] = React.useState('all');
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [favPanel, setFavPanel] = React.useState(false);
  const [downloadNotice, setDownloadNotice] = React.useState(false);
  const [submitModal, setSubmitModal] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let mounted = true;

    async function loadGallery() {
      setLoading(true);
      setError('');
      try {
        const [nextCollection, nextSets, nextMedia] = await Promise.all([
          getPublicCollection(params.collectionSlug, { preview }),
          listPublicCollectionSets(params.collectionSlug, { preview }),
          listPublicCollectionMedia(params.collectionSlug, { preview }),
        ]);
        if (!mounted) return;
        setCollection(nextCollection);
        setSets(nextSets);
        setMedia(nextMedia);
        setSetId(nextSets[0]?.id ?? 'all');
      } catch (err) {
        if (!mounted) return;
        if (err instanceof PublicApiError && err.status === 403) {
          router.replace(`/galleries/${params.collectionSlug}/access`);
          return;
        }
        setError(err instanceof Error ? err.message : 'Unable to load this gallery.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadGallery();
    return () => {
      mounted = false;
    };
  }, [params.collectionSlug, preview, router]);

  const activeItems = React.useMemo(() => {
    const visible = setId === 'all' ? media : media.filter(item => item.setId === setId);
    return visible.map(item => ({ ...item, faved: favorites.has(item.id) }));
  }, [favorites, media, setId]);

  const toggleFav = (id: string) => setFavorites(current => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const scrollToGallery = () => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-ink">
        <div className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Loading gallery</div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-6 text-ink">
        <div className="max-w-sm text-center">
          <div className="serif text-3xl">Gallery unavailable</div>
          <p className="mt-2 text-sm text-muted">{error || 'This shared gallery could not be found.'}</p>
        </div>
      </div>
    );
  }

  const tabs = sets.length > 0 ? sets : [{ id: 'all', slug: 'all', title: 'Gallery', photoCount: media.length, videoCount: 0, videoDurationSec: 0, visibility: 'public' as const, cover: '', order: 0 }];
  const currentSet = tabs.find(set => set.id === setId) ?? tabs[0];

  return (
    <div className="min-h-screen bg-bg text-ink">
      <PublicGalleryNav
        favCount={favorites.size}
        onOpenFavorites={() => setFavPanel(true)}
        onOpenDownload={() => setDownloadNotice(true)}
        adminHref={`/collections/${collection.id}`}
      />

      <header className="relative h-[calc(100dvh-61px)] min-h-[520px] overflow-hidden bg-panel">
        {collection.cover ? (
          <img src={collection.cover} alt="" className="h-full w-full object-cover"/>
        ) : (
          <div className="grid h-full w-full place-items-center text-muted">
            <ImageIcon size={56} strokeWidth={1.2}/>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/35"/>
        <div className="absolute bottom-20 left-6 right-6 text-bg md:left-10">
          {collection.date && <div className="mono mb-3.5 text-[11px] uppercase tracking-[0.14em] opacity-85">{collection.date}</div>}
          <h1 className="serif max-w-4xl text-6xl font-normal tracking-tight md:text-7xl lg:text-8xl">{collection.title}</h1>
          {collection.description && <p className="mt-4 max-w-xl text-sm leading-6 text-bg/85">{collection.description}</p>}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={scrollToGallery}
          className="absolute bottom-6 left-6 bg-bg/95 text-ink hover:bg-bg lg:left-10"
        >
          <ArrowDown size={12}/>View gallery
        </Button>
      </header>

      <div ref={galleryRef} className="sticky top-[60px] z-20 flex scroll-mt-[60px] items-center justify-between overflow-x-auto border-b border-line bg-bg/95 px-6 backdrop-blur md:px-9">
        <div className="flex gap-5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSetId(tab.id)}
              className={cn(
                'mono -mb-px whitespace-nowrap border-b-[1.5px] py-4 text-[12px] uppercase tracking-wider transition-colors',
                setId === tab.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {tab.title} <span className="opacity-50">{tab.photoCount + tab.videoCount}</span>
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button size="sm" variant="outline"><LayoutGrid size={12}/>Grid</Button>
          <Button size="sm" variant="outline" onClick={() => setDownloadNotice(true)}><Download size={12}/>Download all</Button>
        </div>
      </div>

      <main className="px-6 py-12 pb-20 md:px-9">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="serif text-4xl font-medium">{currentSet.title}</h2>
            <div className="mt-1 text-sm text-muted">{activeItems.length} files</div>
          </div>
        </div>

        {activeItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {activeItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightbox({ items: activeItems, index })}
                className={cn('group relative cursor-pointer overflow-hidden bg-panel', index % 5 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]')}
              >
                {item.thumb ? (
                  <img src={item.thumb} alt="" loading="lazy" className="h-full w-full object-cover"/>
                ) : (
                  <div className="grid h-full w-full place-items-center text-muted"><ImageIcon size={24}/></div>
                )}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFav(item.id);
                  }}
                  className={cn('absolute bottom-2 right-2 transition-opacity', item.faved ? 'text-rose-400 opacity-100' : 'text-bg opacity-0 group-hover:opacity-100')}
                >
                  <Heart size={20} fill={item.faved ? 'currentColor' : 'none'}/>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={ImageIcon} title="There are no photos here." body="This gallery does not have visible files yet."/>
        )}

        <PublicGalleryFooter coupleName={collection.title}/>
      </main>

      {favPanel && (
        <FavPanel
          favorites={favorites}
          allItems={media}
          onClose={() => setFavPanel(false)}
          onSubmit={() => {
            setFavPanel(false);
            setSubmitModal(true);
          }}
          onRemove={toggleFav}
        />
      )}

      <Dialog open={downloadNotice} onOpenChange={setDownloadNotice}>
        <DialogContent size="sm" onClose={() => setDownloadNotice(false)}>
          <DialogHeader>
            <DialogTitle>Downloads</DialogTitle>
            <DialogDescription>Use the download button on an individual file, or ask the photographer for a gallery download link.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDownloadNotice(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={submitModal} onOpenChange={setSubmitModal}>
        <DialogContent size="md" onClose={() => setSubmitModal(false)}>
          <DialogHeader>
            <DialogTitle>Favorites selected</DialogTitle>
            <DialogDescription>Your selection is saved in this browser.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="text-sm text-muted">{favorites.size} file{favorites.size === 1 ? '' : 's'} selected.</div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setSubmitModal(false)}>Continue browsing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {lightbox && (
        <MediaLightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(index) => setLightbox(current => current && { ...current, index })}
          onToggleFavorite={toggleFav}
          onDownload={() => setDownloadNotice(true)}
        />
      )}
    </div>
  );
}

function FavPanel({
  favorites,
  allItems,
  onClose,
  onSubmit,
  onRemove,
}: {
  favorites: Set<string>;
  allItems: Media[];
  onClose: () => void;
  onSubmit: () => void;
  onRemove: (id: string) => void;
}) {
  const list = allItems.filter(item => favorites.has(item.id));
  return (
    <div className="fixed inset-0 z-40 bg-ink/40" onClick={onClose}>
      <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-surface shadow-deep" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <div className="eyebrow">Your favorites</div>
            <h3 className="serif mt-0.5 text-2xl">{list.length} {list.length === 1 ? 'file' : 'files'}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X size={15}/></Button>
        </div>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-4">
          {list.length === 0 ? (
            <EmptyState icon={Heart} title="No favorites yet" body="Tap the heart on any file to add it to your selection."/>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {list.map(item => (
                <div key={item.id} className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-panel">
                  {item.thumb ? <img src={item.thumb} className="h-full w-full object-cover" alt=""/> : null}
                  <button
                    type="button"
                    aria-label={`Remove ${item.filename} from favorites`}
                    onClick={() => onRemove(item.id)}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-bg/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 focus:opacity-100"
                  >
                    <X size={13}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-line bg-panel px-6 py-5">
          <Button disabled={list.length === 0} size="lg" className="w-full" onClick={onSubmit}>
            <Send size={14}/>Review selection
          </Button>
        </div>
      </aside>
    </div>
  );
}
