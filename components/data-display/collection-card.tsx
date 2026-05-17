'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Copy, Download, Eye, FolderInput, Heart, Image as ImageIcon, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { listFolders } from '@/lib/api/folders';
import { moveCollectionToFolder } from '@/lib/api/collections';
import { cn } from '@/lib/utils';
import type { Collection, Folder } from '@/lib/types';

const MENU_WIDTH = 190;

export function CollectionCard({ c, onCollectionChange }: { c: Collection; onCollectionChange?: (collection: Collection) => void }) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [moveOpen, setMoveOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});

  function openMenu() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = Math.min(MENU_WIDTH, window.innerWidth - 24);
    const left = Math.min(Math.max(12, rect.right - width), window.innerWidth - width - 12);
    const top = Math.min(rect.bottom + 8, window.innerHeight - 24);

    setMenuStyle({ left, top, width });
    setMenuOpen(true);
  }

  return (
    <article className="group bg-surface border border-line rounded-md overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[16/11] bg-panel overflow-hidden">
        <Link href={`/collections/${c.id}`} className="block h-full">
          {c.cover ? (
            <img src={c.cover} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"/>
          ) : (
            <div className="grid h-full place-items-center bg-panel text-muted">
              <ImageIcon size={28} strokeWidth={1.5}/>
            </div>
          )}
          <span className="absolute bottom-2.5 left-2.5 rounded-md border border-bg/20 bg-ink/70 px-2 py-1 text-[10.5px] font-medium uppercase tracking-wider text-bg backdrop-blur">
            {c.date}
          </span>
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-label={`Open actions for ${c.title}`}
          onClick={openMenu}
          className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-md border border-bg/25 bg-ink/85 text-bg shadow-soft backdrop-blur transition-colors hover:bg-ink focus:outline-none focus:ring-2 focus:ring-bg/40"
        >
          <MoreHorizontal size={13}/>
        </button>
      </div>
      <div className="p-3.5">
        <Link href={`/collections/${c.id}`} className="serif text-[21px] leading-tight hover:underline">{c.title}</Link>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2 whitespace-nowrap">
          <span>{c.counts.photos} photos</span>
          {c.counts.videos > 0 && (<><span className="text-line-2">/</span><span>{c.counts.videos} video</span></>)}
        </div>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-1 truncate">
          <span>{c.folderName ?? 'No folder'}</span>
        </div>
        <div className="flex gap-4 mt-2.5 text-[11.5px] text-muted">
          <span className="inline-flex items-center gap-1"><Heart size={11}/>{c.counts.favorites}</span>
          <span className="inline-flex items-center gap-1"><Download size={11}/>{c.counts.downloads}</span>
          <span className="inline-flex items-center gap-1"><Eye size={11}/>{c.counts.views.toLocaleString()}</span>
        </div>
      </div>

      <CollectionActionDropdown
        collection={c}
        open={menuOpen}
        style={menuStyle}
        onClose={() => setMenuOpen(false)}
        onShare={() => {
          setMenuOpen(false);
          setShareOpen(true);
        }}
        onMove={() => {
          setMenuOpen(false);
          setMoveOpen(true);
        }}
      />

      <ShareCollectionDialog collection={c} open={shareOpen} onOpenChange={setShareOpen}/>
      <MoveToFolderDialog collection={c} open={moveOpen} onOpenChange={setMoveOpen} onMoved={onCollectionChange}/>
    </article>
  );
}

function CollectionActionDropdown({
  collection,
  open,
  style,
  onClose,
  onShare,
  onMove,
}: {
  collection: Collection;
  open: boolean;
  style: React.CSSProperties;
  onClose: () => void;
  onShare: () => void;
  onMove: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[110]" onMouseDown={onClose}>
      <div
        className="fixed max-h-[calc(100dvh-24px)] overflow-y-auto rounded-md border border-line bg-surface py-1.5 shadow-lift"
        style={style}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <MenuButton icon={<Send size={15} strokeWidth={1.7}/>} onClick={onShare}>Share</MenuButton>
        <MenuLink href={`/galleries/${collection.slug}`} icon={<Eye size={15} strokeWidth={1.7}/>}>Preview</MenuLink>
        <MenuButton icon={<FolderInput size={15} strokeWidth={1.7}/>} onClick={onMove}>Move to</MenuButton>
        <MenuButton icon={<Trash2 size={15} strokeWidth={1.7}/>} danger onClick={onClose}>Delete</MenuButton>
      </div>
    </div>,
    document.body,
  );
}

function MenuLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex min-h-9 w-full items-center gap-2.5 px-3 text-[13px] text-ink-2 transition-colors hover:bg-panel hover:text-ink">
      <span className="grid h-5 w-5 place-items-center text-ink-2">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

function MenuButton({
  icon,
  children,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex min-h-9 w-full items-center gap-2.5 px-3 text-left text-[13px] transition-colors hover:bg-panel',
        danger ? 'text-danger' : 'text-ink-2 hover:text-ink',
      )}
    >
      <span className="grid h-5 w-5 place-items-center">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function ShareCollectionDialog({
  collection,
  open,
  onOpenChange,
}: {
  collection: Collection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const publicUrl = typeof window === 'undefined'
    ? `/galleries/${collection.slug}`
    : `${window.location.origin}/galleries/${collection.slug}`;
  const downloadPin = collection.downloadPin || 'No PIN available';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" className="rounded-md" onClose={() => onOpenChange(false)}>
        <DialogHeader className="px-5 pt-6 pb-2 sm:px-6">
          <DialogTitle className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em]">Get direct link</DialogTitle>
        </DialogHeader>
        <DialogBody className="gap-5 px-5 pb-6 sm:px-6">
          <CopyBlock
            label="Collection URL"
            value={publicUrl}
            helper="Share this unique URL for this collection with your client."
          />
          <CopyBlock
            label="Gallery password"
            value={downloadPin}
            helper="Share this 4-digit PIN with your client for single-photo and full-gallery downloads."
          />
          <div className="flex gap-3 text-muted">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-panel text-xs font-semibold">f</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-panel text-xs font-semibold">p</span>
            <span className="grid h-6 w-6 place-items-center text-lg leading-none">x</span>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

function CopyBlock({ label, value, helper }: { label: string; value: string; helper: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copyValue() {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div>
      <div className="mb-2 text-[13.5px] font-medium">{label}</div>
      <div className="flex min-h-11 items-center justify-between gap-3 rounded-md bg-panel px-3 text-[13px]">
        <span className="min-w-0 truncate">{value}</span>
        <button type="button" onClick={copyValue} className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-teal-600">
          <Copy size={14}/>{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="mt-2 text-[12.5px] leading-5 text-muted">{helper}</p>
    </div>
  );
}

function MoveToFolderDialog({
  collection,
  open,
  onOpenChange,
  onMoved,
}: {
  collection: Collection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMoved?: (collection: Collection) => void;
}) {
  const [folderId, setFolderId] = React.useState<string | null>(collection.folderId);
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [moving, setMoving] = React.useState(false);

  React.useEffect(() => {
    if (open) setFolderId(collection.folderId);
  }, [collection.folderId, open]);

  React.useEffect(() => {
    if (!open) return;
    let mounted = true;
    listFolders().then(items => {
      if (mounted) setFolders(items);
    });
    return () => {
      mounted = false;
    };
  }, [open]);

  const selectedFolder = folders.find(folder => folder.id === folderId);

  async function moveCollection() {
    if (folderId === collection.folderId) {
      onOpenChange(false);
      return;
    }
    setMoving(true);
    try {
      const updated = await moveCollectionToFolder(collection.id, folderId);
      onMoved?.(updated);
      onOpenChange(false);
    } finally {
      setMoving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" className="rounded-none sm:rounded-md" onClose={() => onOpenChange(false)}>
        <DialogHeader className="px-7 pt-8 pb-3 sm:px-9 sm:pt-9">
          <DialogTitle className="font-sans text-[22px] font-semibold uppercase tracking-[0.14em]">Move to folder</DialogTitle>
          <DialogDescription>Choose where to organize {collection.title}.</DialogDescription>
        </DialogHeader>
        <DialogBody className="gap-2 px-7 pb-3 sm:px-9">
          <button
            type="button"
            onClick={() => setFolderId(null)}
            className={cn(
              'flex min-h-14 items-center justify-between rounded-md border px-4 text-left transition-colors',
              folderId === null ? 'border-ink bg-panel' : 'border-line bg-surface hover:bg-panel',
            )}
          >
            <span>
              <span className="block text-[15px] font-medium">None</span>
              <span className="text-xs text-muted">Do not assign this collection to a folder</span>
            </span>
            <span className={cn('h-4 w-4 rounded-full border', folderId === null ? 'border-ink bg-ink' : 'border-line-2')}/>
          </button>
          {folders.map(folder => (
            <button
              key={folder.id}
              type="button"
              onClick={() => setFolderId(folder.id)}
              className={cn(
                'flex min-h-14 items-center justify-between rounded-md border px-4 text-left transition-colors',
                folderId === folder.id ? 'border-ink bg-panel' : 'border-line bg-surface hover:bg-panel',
              )}
            >
              <span>
                <span className="block text-[15px] font-medium">{folder.name}</span>
                <span className="text-xs text-muted">{folder.collectionsCount} collections</span>
              </span>
              <span className={cn('h-4 w-4 rounded-full border', folderId === folder.id ? 'border-ink bg-ink' : 'border-line-2')}/>
            </button>
          ))}
        </DialogBody>
        <DialogFooter className="items-center justify-between px-7 pb-7 sm:px-9">
          <div className="text-sm text-muted">
            {selectedFolder ? `Selected: ${selectedFolder.name}` : 'Selected: None'}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="button" variant="default" disabled={moving} onClick={moveCollection}>{moving ? 'Moving...' : 'Move'}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
