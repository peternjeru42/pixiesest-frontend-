'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Eye, Image as ImageIcon, Lock, MoreHorizontal, Send } from 'lucide-react';
import { publicFolderPath, ShareDialog } from '@/components/actions/share-dialog';
import { cn } from '@/lib/utils';
import type { Collection, Folder } from '@/lib/types';

const MENU_WIDTH = 180;

export function FolderCard({ f, collections = [] }: { f: Folder; collections?: Collection[] }) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});
  const previews = collections.filter(collection => collection.folderId === f.id).slice(0, 4);
  const tiles = Array.from({ length: 4 }, (_, index) => previews[index]?.cover ?? f.cover);

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
    <article className="group bg-surface border border-line rounded-md overflow-hidden block hover:shadow-lift hover:-translate-y-0.5 transition-transform">
      <div className="relative aspect-[3/2] bg-panel overflow-hidden p-1.5">
        <Link href={`/folders/${f.id}`} className="block h-full">
          <div className="grid h-full grid-cols-2 gap-1.5">
            {tiles.map((src, index) => (
              <div key={`${src}-${index}`} className="overflow-hidden rounded-sm bg-bg">
                {src ? (
                  <img src={src} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"/>
                ) : (
                  <div className="grid h-full place-items-center text-muted">
                    <ImageIcon size={18} strokeWidth={1.5}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Link>
        {f.hasPassword && (
          <span className="absolute top-2.5 left-2.5 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1.5 border border-line">
            <Lock size={9}/>Password
          </span>
        )}
        <button
          ref={triggerRef}
          type="button"
          aria-label={`Open actions for ${f.name}`}
          onClick={openMenu}
          className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-md border border-bg/25 bg-ink/85 text-bg shadow-soft backdrop-blur transition-colors hover:bg-ink focus:outline-none focus:ring-2 focus:ring-bg/40"
        >
          <MoreHorizontal size={13}/>
        </button>
      </div>
      <div className="p-4">
        <Link href={`/folders/${f.id}`} className="serif text-[21px] hover:underline">{f.name}</Link>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2 flex-wrap">
          <span>{f.collectionsCount} collections</span>
          {f.showOnHomepage && (<><span className="text-line-2">/</span><span>On homepage</span></>)}
        </div>
      </div>

      <FolderActionDropdown
        folder={f}
        open={menuOpen}
        style={menuStyle}
        onClose={() => setMenuOpen(false)}
        onShare={() => {
          setMenuOpen(false);
          setShareOpen(true);
        }}
      />

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title="Share folder"
        description="Copy the public link for this folder."
        path={publicFolderPath(f.slug)}
      />
    </article>
  );
}

function FolderActionDropdown({
  folder,
  open,
  style,
  onClose,
  onShare,
}: {
  folder: Folder;
  open: boolean;
  style: React.CSSProperties;
  onClose: () => void;
  onShare: () => void;
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
        <MenuLink href={publicFolderPath(folder.slug)} icon={<Eye size={15} strokeWidth={1.7}/>}>Preview</MenuLink>
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

function MenuButton({ icon, children, onClick }: { icon: React.ReactNode; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex min-h-9 w-full items-center gap-2.5 px-3 text-left text-[13px] text-ink-2 transition-colors hover:bg-panel hover:text-ink')}
    >
      <span className="grid h-5 w-5 place-items-center">{icon}</span>
      <span>{children}</span>
    </button>
  );
}
