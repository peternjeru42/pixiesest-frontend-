'use client';
import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LayoutGrid, Download, Send, Heart, X, ArrowDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PublicGalleryNav, PublicGalleryFooter } from '@/components/layout/public-gallery-layout';
import { EmptyState } from '@/components/data-display/empty-state';
import { MediaLightbox } from '@/components/media/media-lightbox';
import { DownloadPinModal } from '@/components/forms/download-pin-modal';
import { COLLECTIONS, SET_MEDIA, ALL_MEDIA } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

export default function PublicGalleryPage({ params }: { params: { collectionSlug: string } }) {
  const c = COLLECTIONS.find(x => x.slug === params.collectionSlug);
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const [setId, setSetId] = React.useState('ceremony');
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [favPanel, setFavPanel] = React.useState(false);
  const [dlModal, setDlModal] = React.useState(false);
  const [submitModal, setSubmitModal] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<{ items: Media[]; index: number } | null>(null);
  const [singleDownload, setSingleDownload] = React.useState<Media | null>(null);
  const [singleDownloadError, setSingleDownloadError] = React.useState('');

  if (!c) return notFound();

  const items = (SET_MEDIA[setId] ?? []).map(m => ({ ...m, faved: favorites.has(m.id) }));
  const toggleFav = (id: string) => setFavorites(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const scrollToGallery = () => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="bg-bg min-h-screen text-ink">
      <PublicGalleryNav
        favCount={favorites.size}
        onOpenFavorites={() => setFavPanel(true)}
        onOpenDownload={() => setDlModal(true)}
        adminHref={`/collections/${c.id}`}
      />

      <header className="relative h-[calc(100dvh-61px)] min-h-[520px] bg-panel overflow-hidden">
        <img src={c.cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/35"/>
        <div className="hidden">
          <div className="mono text-[11px] tracking-[0.14em] uppercase opacity-85 mb-3.5">A wedding · {c.date}</div>
          <h1 className="serif text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight">{c.couple ?? c.title}</h1>
          <div className="mono text-[11.5px] tracking-[0.16em] uppercase mt-5 opacity-85">
            Photographed by Droptop Studio
          </div>
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

      <div ref={galleryRef} className="scroll-mt-[60px] sticky top-[60px] z-20 bg-bg/95 backdrop-blur border-b border-line px-6 md:px-9 flex items-center justify-between overflow-x-auto">
        <div className="flex gap-5">
          {c.sets.map(s => (
            <button
              key={s.id}
              onClick={() => setSetId(s.id)}
              className={cn(
                'py-4 mono text-[12px] tracking-wider uppercase border-b-[1.5px] -mb-px whitespace-nowrap transition-colors',
                setId === s.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {s.title} <span className="opacity-50">{s.photoCount}</span>
            </button>
          ))}
        </div>
        <div className="hidden md:flex gap-2 shrink-0">
          <Button size="sm" variant="outline"><LayoutGrid size={12}/>Grid</Button>
          <Button size="sm" variant="outline" onClick={() => setDlModal(true)}><Download size={12}/>Download all</Button>
        </div>
      </div>

      <div className="px-6 md:px-9 py-12 pb-20">
        <div className="flex items-end justify-between mb-7 flex-wrap gap-3">
          <div>
            <h2 className="serif text-4xl font-medium">{c.sets.find(s => s.id === setId)?.title}</h2>
            <div className="text-sm text-muted mt-1">{items.length} photos</div>
          </div>
          <div className="flex items-center gap-1.5 mono text-[10.5px] tracking-wider text-muted uppercase">
            Press <span className="border border-line bg-surface rounded px-1.5 py-0.5">F</span> to favorite
          </div>
        </div>

        <div className="grid gap-1.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((m, i) => (
            <div
              key={m.id}
              onClick={() => setLightbox({ items, index: i })}
              className={cn(
                'group relative overflow-hidden bg-panel cursor-pointer',
                i % 5 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]',
              )}
            >
              <img src={m.thumb} alt="" loading="lazy" className="w-full h-full object-cover"/>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFav(m.id); }}
                className={cn(
                  'absolute bottom-2 right-2 transition-opacity',
                  m.faved ? 'opacity-100 text-rose-400' : 'opacity-0 group-hover:opacity-100 text-bg',
                )}
              >
                <Heart size={20} fill={m.faved ? 'currentColor' : 'none'}/>
              </button>
            </div>
          ))}
        </div>

        <PublicGalleryFooter coupleName={c.couple ?? c.title}/>
      </div>

      {favPanel && (
        <FavPanel
          favorites={favorites}
          allItems={ALL_MEDIA}
          onClose={() => setFavPanel(false)}
          onSubmit={() => { setFavPanel(false); setSubmitModal(true); }}
          onRemove={toggleFav}
        />
      )}

      {dlModal && <DownloadModal c={c} onClose={() => setDlModal(false)}/>}

      {submitModal && (
        <Dialog open={submitModal} onOpenChange={setSubmitModal}>
          <DialogContent size="md" onClose={() => setSubmitModal(false)}>
            <DialogHeader>
              <DialogTitle>Favorites submitted</DialogTitle>
              <DialogDescription>Your photographer will be in touch shortly.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-soft text-accent grid place-items-center"><Check size={22}/></div>
                <div>
                  <div className="text-sm font-medium">{favorites.size} photo{favorites.size === 1 ? '' : 's'} sent</div>
                  <div className="text-muted text-xs mt-0.5">You can keep adding favorites — we&apos;ll let Mara know each time you submit.</div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setSubmitModal(false)}>Continue browsing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {lightbox && (
        <MediaLightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(i) => setLightbox(lb => lb && { ...lb, index: i })}
          onToggleFavorite={toggleFav}
          onDownload={(media) => {
            setSingleDownload(media);
            setSingleDownloadError('');
          }}
        />
      )}

      <DownloadPinModal
        open={!!singleDownload}
        error={singleDownloadError}
        onOpenChange={(open) => {
          if (!open) setSingleDownload(null);
        }}
        onConfirm={(pin) => {
          if (pin !== c.downloadPin) {
            setSingleDownloadError('Enter the 4-digit PIN shared by the photographer.');
            return;
          }
          setSingleDownload(null);
        }}
      />
    </div>
  );
}

function FavPanel({ favorites, allItems, onClose, onSubmit, onRemove }: {
  favorites: Set<string>; allItems: Media[];
  onClose: () => void; onSubmit: () => void; onRemove: (id: string) => void;
}) {
  const list = allItems.filter(m => favorites.has(m.id));
  return (
    <div className="fixed inset-0 z-40 bg-ink/40" onClick={onClose}>
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface shadow-deep flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div>
            <div className="eyebrow">Your favorites</div>
            <h3 className="serif text-2xl mt-0.5">{list.length} {list.length === 1 ? 'photo' : 'photos'}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X size={15}/></Button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
          {list.length === 0
            ? <EmptyState icon={Heart} title="No favorites yet" body="Tap the heart on any photo to add it to your selection."/>
            : (
              <div className="grid grid-cols-2 gap-2">
                {list.map(m => (
                  <div key={m.id} className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-panel">
                    <img src={m.thumb} className="h-full w-full object-cover" alt=""/>
                    <button
                      type="button"
                      aria-label={`Remove ${m.filename} from favorites`}
                      onClick={() => onRemove(m.id)}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-bg/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 focus:opacity-100"
                    >
                      <X size={13}/>
                    </button>
                  </div>
                ))}
              </div>
            )
          }
        </div>
        <div className="px-6 py-5 border-t border-line bg-panel">
          <Button disabled={list.length === 0} size="lg" className="w-full" onClick={onSubmit}>
            <Send size={14}/>Submit favorites to photographer
          </Button>
          <div className="text-xs text-muted text-center mt-2">Mara will see your selection and notes.</div>
        </div>
      </aside>
    </div>
  );
}

function DownloadModal({ c, onClose }: { c: any; onClose: () => void }) {
  const [stage, setStage] = React.useState<'choose' | 'preparing' | 'ready'>('choose');
  const [progress, setProgress] = React.useState(0);
  const [type, setType] = React.useState('originals');
  const [pin, setPin] = React.useState('');
  const [pinError, setPinError] = React.useState('');

  const start = () => {
    if (pin !== c.downloadPin) {
      setPinError('Enter the 4-digit PIN shared by the photographer.');
      return;
    }
    setStage('preparing'); setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setStage('ready'); return 100; }
        return p + 2 + Math.random() * 6;
      });
    }, 130);
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent size="md" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Download gallery</DialogTitle>
          <DialogDescription>{c.title} · {c.date}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          {stage === 'choose' && (
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'originals', label: 'Original quality', sub: 'Full resolution · ~1.2 GB · 412 photos' },
                { id: 'web', label: 'Web size', sub: 'Long edge 2048px · ~280 MB · for social' },
                { id: 'favorites', label: 'My favorites only', sub: 'Submit favorites first' },
              ].map(o => (
                <label key={o.id} className={cn(
                  'flex gap-3 p-4 border-[1.5px] rounded-lg cursor-pointer',
                  type === o.id ? 'border-ink bg-panel/40' : 'border-line',
                )}>
                  <input type="radio" checked={type === o.id} onChange={() => setType(o.id)} className="accent-ink mt-0.5"/>
                  <div>
                    <div className="font-medium">{o.label}</div>
                    <div className="text-xs text-muted mt-0.5">{o.sub}</div>
                  </div>
                </label>
              ))}
              <div className="mt-1.5 flex flex-col gap-1.5">
                <Label>Download PIN</Label>
                <Input
                  value={pin}
                  onChange={(event) => {
                    setPin(event.target.value.replace(/[^0-9]/g, '').slice(0, 4));
                    setPinError('');
                  }}
                  inputMode="numeric"
                  maxLength={4}
                  className="max-w-[140px]"
                />
                {pinError && <div className="text-xs text-danger">{pinError}</div>}
              </div>
            </div>
          )}
          {stage === 'preparing' && (
            <div>
              <div className="eyebrow mb-2">Preparing your archive</div>
              <div className="serif text-2xl mb-4">Packaging {Math.floor(progress * 4.12)} of 412 photos</div>
              <Progress value={progress}/>
              <div className="mono text-xs text-muted mt-2">{Math.round(progress)}% · ETA {Math.max(1, Math.round((100-progress)/8))}s</div>
            </div>
          )}
          {stage === 'ready' && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent-soft text-accent grid place-items-center mx-auto mb-3"><Check size={26}/></div>
              <div className="serif text-2xl">Your archive is ready</div>
              <div className="text-xs text-muted mt-1.5">Amelia-James-Originals.zip · 1.21 GB</div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          {stage === 'choose' && <>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button disabled={pin.length !== 4} onClick={start}><Download size={14}/>Prepare ZIP</Button>
          </>}
          {stage === 'preparing' && <Button variant="outline" onClick={onClose}>Cancel</Button>}
          {stage === 'ready' && <>
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button><Download size={14}/>Download ZIP</Button>
          </>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
