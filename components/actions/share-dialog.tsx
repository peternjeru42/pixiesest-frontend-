'use client';
import * as React from 'react';
import { Copy } from 'lucide-react';
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

export function publicCollectionPath(slug: string) {
  return `/galleries/${slug}`;
}

export function publicCollectionPreviewPath(slug: string) {
  return `/galleries/${slug}?preview=1`;
}

export function publicFolderPath(slug: string) {
  return `/folders/${slug}/public`;
}

function absoluteUrl(path: string) {
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function ShareDialog({
  open,
  onOpenChange,
  title,
  description,
  path,
  details = [],
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  path: string;
  details?: Array<{ label: string; value: string; helper?: string }>;
}) {
  const [copied, setCopied] = React.useState(false);
  const url = absoluteUrl(path);

  async function copyValue(value: string) {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" className="rounded-md" onClose={() => onOpenChange(false)}>
        <DialogHeader className="px-5 pt-6 pb-2 sm:px-6">
          <DialogTitle className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em]">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody className="gap-5 px-5 pb-3 sm:px-6">
          <CopyBlock label="Public URL" value={url} copied={copied} onCopy={() => copyValue(url)} />
          {details.map(detail => (
            <CopyBlock
              key={detail.label}
              label={detail.label}
              value={detail.value}
              helper={detail.helper}
              onCopy={() => copyValue(detail.value)}
            />
          ))}
        </DialogBody>
        <DialogFooter className="px-5 pb-6 sm:px-6">
          <Button type="button" variant="outline" onClick={() => copyValue(url)}>
            <Copy size={14}/>{copied ? 'Copied' : 'Copy link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CopyBlock({
  label,
  value,
  helper,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  helper?: string;
  copied?: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[13.5px] font-medium">{label}</div>
      <div className="flex min-h-11 items-center justify-between gap-3 rounded-md bg-panel px-3 text-[13px]">
        <span className="min-w-0 truncate">{value}</span>
        <button type="button" onClick={onCopy} className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-teal-600">
          <Copy size={14}/>{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {helper && <p className="mt-2 text-[12.5px] leading-5 text-muted">{helper}</p>}
    </div>
  );
}
