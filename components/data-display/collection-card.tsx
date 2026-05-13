'use client';
import * as React from 'react';
import Link from 'next/link';
import { FolderInput, Heart, Download, Eye, MoreHorizontal, Lock, Share2, Trash2 } from 'lucide-react';
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
          className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg/90 text-ink-2 opacity-0 backdrop-blur transition-opacity hover:text-ink group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          <MoreHorizontal size={11}/>
        </button>
      </div>
      <div className="p-4">
        <Link href={`/collections/${c.id}`} className="serif text-[21px] leading-tight hover:underline">{c.title}</Link>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2 flex-wrap">
          <span>{c.date}</span>
          <span className="text-line-2">·</span>
          <span>{c.counts.photos} photos</span>
          {c.counts.videos > 0 && (<><span className="text-line-2">·</span><span>{c.counts.videos} video</span></>)}
          <span className="text-line-2">·</span>
          <span>{c.folderName}</span>
        </div>
        <div className="flex gap-4 mt-3 text-[11.5px] text-muted">
          <span className="inline-flex items-center gap-1"><Heart size={11}/>{c.counts.favorites}</span>
          <span className="inline-flex items-center gap-1"><Download size={11}/>{c.counts.downloads}</span>
          <span className="inline-flex items-center gap-1"><Eye size={11}/>{c.counts.views.toLocaleString()}</span>
        </div>
      </div>
      <Dialog open={actionsOpen} onOpenChange={setActionsOpen}>
        <DialogContent size="sm" onClose={() => setActionsOpen(false)}>
          <DialogHeader>
            <DialogTitle>{c.title}</DialogTitle>
            <DialogDescription>Choose what to do with this collection.</DialogDescription>
          </DialogHeader>
          <DialogBody className="gap-1 pb-5">
            <ActionLink href={`/galleries/${c.slug}`} icon={<Eye size={15}/>}>Preview</ActionLink>
            <ActionButton icon={<Share2 size={15}/>} onClick={() => setActionsOpen(false)}>Share</ActionButton>
            <ActionButton icon={<FolderInput size={15}/>} onClick={() => setActionsOpen(false)}>Move to folder</ActionButton>
            <ActionButton danger icon={<Trash2 size={15}/>} onClick={() => setActionsOpen(false)}>Delete</ActionButton>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function ActionLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] text-ink-2 transition-colors hover:bg-panel hover:text-ink"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function ActionButton({ icon, children, danger, onClick }: {
  icon: React.ReactNode;
  children: React.ReactNode;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] transition-colors hover:bg-panel ${
        danger ? 'text-danger' : 'text-ink-2 hover:text-ink'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
