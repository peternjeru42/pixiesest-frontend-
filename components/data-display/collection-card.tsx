'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Copy,
  Download,
  Eye,
  FolderInput,
  Heart,
  ImageIcon,
  Lock,
  MoreHorizontal,
  Share2,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Collection } from '@/lib/types';

export function CollectionCard({ c }: { c: Collection }) {
  const [actionsOpen, setActionsOpen] = React.useState(false);

  return (
    <article className="group bg-surface border border-line rounded-md overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] bg-panel overflow-hidden">
        <Link href={`/collections/${c.id}`} className="block h-full">
          <img src={c.cover} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"/>
          {c.password && (
            <span className="absolute top-2.5 left-2.5 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1.5 border border-line">
              <Lock size={9}/>Password
            </span>
          )}
          <span className="absolute bottom-2.5 left-2.5">
            <Badge tone={c.status as any}>{c.status}</Badge>
          </span>
        </Link>
        <button
          type="button"
          aria-label={`Open actions for ${c.title}`}
          onClick={() => setActionsOpen(true)}
          className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg/90 text-ink-2 opacity-100 backdrop-blur transition-colors hover:text-ink focus:outline-none focus:ring-2 focus:ring-ring/30 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        >
          <MoreHorizontal size={13}/>
        </button>
      </div>
      <div className="p-4">
        <Link href={`/collections/${c.id}`} className="serif text-[21px] leading-tight hover:underline">{c.title}</Link>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2 flex-wrap">
          <span>{c.date}</span>
          <span className="text-line-2">/</span>
          <span>{c.counts.photos} photos</span>
          {c.counts.videos > 0 && (<><span className="text-line-2">/</span><span>{c.counts.videos} video</span></>)}
          <span className="text-line-2">/</span>
          <span>{c.folderName}</span>
        </div>
        <div className="flex gap-4 mt-3 text-[11.5px] text-muted">
          <span className="inline-flex items-center gap-1"><Heart size={11}/>{c.counts.favorites}</span>
          <span className="inline-flex items-center gap-1"><Download size={11}/>{c.counts.downloads}</span>
          <span className="inline-flex items-center gap-1"><Eye size={11}/>{c.counts.views.toLocaleString()}</span>
        </div>
      </div>

      <Dialog open={actionsOpen} onOpenChange={setActionsOpen}>
        <DialogContent size="lg" className="rounded-t-2xl sm:rounded-lg" onClose={() => setActionsOpen(false)}>
          <div className="grid max-h-[calc(100dvh-1rem)] overflow-y-auto sm:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-48 bg-panel sm:min-h-full">
              {c.cover ? (
                <img src={c.cover} alt="" className="absolute inset-0 h-full w-full object-cover"/>
              ) : (
                <div className="absolute inset-0 grid place-items-center text-muted">
                  <ImageIcon size={28}/>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"/>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <Badge tone={c.status as any}>{c.status}</Badge>
                {c.password && (
                  <span className="mono inline-flex items-center gap-1 rounded-full border border-bg/35 bg-bg/85 px-2 py-1 text-[10px] uppercase tracking-wider text-ink backdrop-blur">
                    <Lock size={10}/>Password
                  </span>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <DialogHeader className="pr-14">
                <DialogTitle className="text-[28px] leading-none sm:text-[30px]">{c.title}</DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13}/>{c.date}</span>
                  <span className="text-line-2">/</span>
                  <span>{c.folderName}</span>
                </DialogDescription>
              </DialogHeader>

              <DialogBody className="gap-5 pb-5">
                <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-line bg-bg">
                  <Metric icon={<Heart size={13}/>} label="Favorites" value={c.counts.favorites.toLocaleString()}/>
                  <Metric icon={<Download size={13}/>} label="Downloads" value={c.counts.downloads.toLocaleString()}/>
                  <Metric icon={<Eye size={13}/>} label="Views" value={c.counts.views.toLocaleString()}/>
                </div>

                <div>
                  <div className="eyebrow mb-2">Collection actions</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <ActionLink href={`/galleries/${c.slug}`} icon={<Eye size={16}/>} description="Open the client-facing gallery.">
                      Preview gallery
                    </ActionLink>
                    <ActionButton icon={<Share2 size={16}/>} description="Prepare a shareable gallery link." onClick={() => setActionsOpen(false)}>
                      Share collection
                    </ActionButton>
                    <ActionButton icon={<Copy size={16}/>} description="Copy the public gallery URL." onClick={() => setActionsOpen(false)}>
                      Copy link
                    </ActionButton>
                    <ActionButton icon={<FolderInput size={16}/>} description="Organize this collection elsewhere." onClick={() => setActionsOpen(false)}>
                      Move to folder
                    </ActionButton>
                  </div>
                </div>

                <div className="rounded-lg border border-danger/20 bg-danger/5 p-3">
                  <ActionButton danger icon={<Trash2 size={16}/>} description="Remove this collection and its settings." onClick={() => setActionsOpen(false)}>
                    Delete collection
                  </ActionButton>
                </div>
              </DialogBody>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border-r border-line p-3 last:border-r-0">
      <div className="mb-1 flex items-center gap-1.5 text-muted">
        {icon}
        <span className="mono text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="serif text-[22px] leading-none">{value}</div>
    </div>
  );
}

function ActionLink({
  href,
  icon,
  children,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-20 w-full items-start gap-3 rounded-lg border border-line bg-surface p-3 text-left transition-colors hover:border-line-2 hover:bg-panel"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-bg text-ink-2">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[13.5px] font-medium text-ink">{children}</span>
        <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>
      </span>
    </Link>
  );
}

function ActionButton({ icon, children, description, danger, onClick }: {
  icon: React.ReactNode;
  children: React.ReactNode;
  description: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-20 w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        danger ? 'border-transparent bg-transparent text-danger hover:bg-surface' : 'border-line bg-surface hover:border-line-2 hover:bg-panel'
      }`}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${danger ? 'bg-danger/10 text-danger' : 'bg-bg text-ink-2'}`}>{icon}</span>
      <span className="min-w-0">
        <span className={`block text-[13.5px] font-medium ${danger ? 'text-danger' : 'text-ink'}`}>{children}</span>
        <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>
      </span>
    </button>
  );
}
