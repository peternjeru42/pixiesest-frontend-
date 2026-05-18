'use client';
import * as React from 'react';
import { Copy, Send } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { publishCollection, sendCollectionInvite } from '@/lib/api/collections';
import type { Collection } from '@/lib/types';

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
  notice,
  copyLinkLabel = 'Copy link',
  onBeforeCopyLink,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  path: string;
  details?: Array<{ label: string; value: string; helper?: string }>;
  notice?: string;
  copyLinkLabel?: string;
  onBeforeCopyLink?: () => Promise<void>;
}) {
  const [copiedKey, setCopiedKey] = React.useState('');
  const [copyingKey, setCopyingKey] = React.useState('');
  const [copyError, setCopyError] = React.useState('');
  const url = absoluteUrl(path);

  async function copyValue(key: string, value: string, beforeCopy?: () => Promise<void>) {
    setCopyingKey(key);
    setCopyError('');
    try {
      await beforeCopy?.();
      await navigator.clipboard?.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(''), 1400);
    } catch (error) {
      setCopyError(error instanceof Error ? error.message : 'Unable to copy this link.');
    } finally {
      setCopyingKey('');
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" className="rounded-md" onClose={() => onOpenChange(false)}>
        <DialogHeader className="px-5 pt-6 pb-2 sm:px-6">
          <DialogTitle className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em]">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody className="gap-5 px-5 pb-3 sm:px-6">
          {notice && (
            <div className="rounded-md border border-line bg-panel px-3 py-2 text-[12.5px] leading-5 text-muted">
              {notice}
            </div>
          )}
          {copyError && (
            <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-[12.5px] leading-5 text-danger">
              {copyError}
            </div>
          )}
          <CopyBlock
            label="Public URL"
            value={url}
            copied={copiedKey === 'public-url'}
            copying={copyingKey === 'public-url'}
            onCopy={() => copyValue('public-url', url, onBeforeCopyLink)}
          />
          {details.map(detail => (
            <CopyBlock
              key={detail.label}
              label={detail.label}
              value={detail.value}
              helper={detail.helper}
              copied={copiedKey === detail.label}
              copying={copyingKey === detail.label}
              onCopy={() => copyValue(detail.label, detail.value)}
            />
          ))}
        </DialogBody>
        <DialogFooter className="px-5 pb-6 sm:px-6">
          <Button type="button" variant="outline" disabled={Boolean(copyingKey)} onClick={() => copyValue('public-url', url, onBeforeCopyLink)}>
            <Copy size={14}/>{copiedKey === 'public-url' ? 'Copied' : copyingKey === 'public-url' ? 'Copying...' : copyLinkLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CollectionShareDialog({
  open,
  onOpenChange,
  collection,
  onPublished,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: Collection;
  onPublished?: (collection: Collection) => void;
}) {
  const [isPublished, setIsPublished] = React.useState(collection.status === 'published');

  React.useEffect(() => {
    setIsPublished(collection.status === 'published');
  }, [collection.id, collection.status]);

  async function publishBeforeCopy() {
    if (isPublished) return;
    const published = await publishCollection(collection.id);
    setIsPublished(published.status === 'published');
    onPublished?.(published);
  }

  return (
    <ShareDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Share collection"
      description={isPublished ? 'Copy the public link for this collection.' : 'Publish this collection before copying its public link.'}
      path={publicCollectionPath(collection.slug)}
      copyLinkLabel={isPublished ? 'Copy link' : 'Publish & copy link'}
      notice={isPublished ? undefined : 'This collection is still a draft. Publishing makes the shared gallery link viewable.'}
      onBeforeCopyLink={publishBeforeCopy}
      details={collection.downloadPin ? [{
        label: 'Download PIN',
        value: collection.downloadPin,
        helper: 'Share this PIN only with clients who should be able to download files.',
      }] : []}
    />
  );
}

export function CollectionEmailShareDialog({
  open,
  onOpenChange,
  collection,
  onPublished,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: Collection;
  onPublished?: (collection: Collection) => void;
}) {
  const [recipients, setRecipients] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [sentCount, setSentCount] = React.useState(0);
  const [isPublished, setIsPublished] = React.useState(collection.status === 'published');

  React.useEffect(() => {
    setIsPublished(collection.status === 'published');
  }, [collection.id, collection.status]);

  React.useEffect(() => {
    if (!open) return;
    setError('');
    setSentCount(0);
  }, [open]);

  const recipientList = React.useMemo(
    () => Array.from(new Set(recipients.split(/[\s,;]+/).map(email => email.trim()).filter(Boolean))),
    [recipients],
  );

  async function publishBeforeSend() {
    if (isPublished) return;
    const published = await publishCollection(collection.id);
    setIsPublished(published.status === 'published');
    onPublished?.(published);
  }

  async function sendInvites(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSentCount(0);

    if (recipientList.length === 0) {
      setError('Add at least one recipient email.');
      return;
    }
    const invalidRecipients = recipientList.filter(email => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    if (invalidRecipients.length > 0) {
      setError(`Check ${invalidRecipients[0]} and try again.`);
      return;
    }

    setSending(true);
    try {
      await publishBeforeSend();
      await Promise.all(
        recipientList.map(recipientEmail => sendCollectionInvite(collection.id, {
          recipientEmail,
          message: message.trim(),
        })),
      );
      setSentCount(recipientList.length);
      setRecipients('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send the email invite.');
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" className="rounded-md" onClose={() => onOpenChange(false)}>
        <form onSubmit={sendInvites}>
          <DialogHeader className="px-5 pt-6 pb-2 sm:px-6">
            <DialogTitle className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em]">Share by email</DialogTitle>
            <DialogDescription>
              {isPublished ? `Email the public gallery link for ${collection.title}.` : 'Publishing makes the emailed gallery link viewable.'}
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="gap-4 px-5 pb-3 sm:px-6">
            {!isPublished && (
              <div className="rounded-md border border-line bg-panel px-3 py-2 text-[12.5px] leading-5 text-muted">
                This collection is still a draft. Sending will publish it first.
              </div>
            )}
            {error && (
              <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-[12.5px] leading-5 text-danger">
                {error}
              </div>
            )}
            {sentCount > 0 && (
              <div role="status" className="rounded-md border border-teal-600/20 bg-teal-600/5 px-3 py-2 text-[12.5px] leading-5 text-teal-700">
                Email invite queued for {sentCount} {sentCount === 1 ? 'recipient' : 'recipients'}.
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor={`collection-email-recipients-${collection.id}`}>Recipients</Label>
              <Input
                id={`collection-email-recipients-${collection.id}`}
                type="text"
                inputMode="email"
                value={recipients}
                onChange={event => setRecipients(event.target.value)}
                placeholder="client@example.com, partner@example.com"
                disabled={sending}
              />
              <p className="text-[12.5px] leading-5 text-muted">Separate multiple emails with commas or spaces.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`collection-email-message-${collection.id}`}>Message</Label>
              <Textarea
                id={`collection-email-message-${collection.id}`}
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Your gallery is ready. I hope you love it."
                maxLength={1200}
                disabled={sending}
              />
            </div>
          </DialogBody>
          <DialogFooter className="px-5 pb-6 sm:px-6">
            <Button type="button" variant="ghost" disabled={sending} onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" variant="default" disabled={sending || recipientList.length === 0}>
              <Send size={14}/>{sending ? 'Sending...' : isPublished ? 'Send email' : 'Publish & send'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CopyBlock({
  label,
  value,
  helper,
  copied,
  copying,
  onCopy,
}: {
  label: string;
  value: string;
  helper?: string;
  copied?: boolean;
  copying?: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[13.5px] font-medium">{label}</div>
      <div className="flex min-h-11 items-center justify-between gap-3 rounded-md bg-panel px-3 text-[13px]">
        <span className="min-w-0 truncate">{value}</span>
        <button type="button" disabled={copying} onClick={onCopy} className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-teal-600 disabled:cursor-not-allowed disabled:opacity-60">
          <Copy size={14}/>{copied ? 'Copied' : copying ? 'Copying...' : 'Copy'}
        </button>
      </div>
      {helper && <p className="mt-2 text-[12.5px] leading-5 text-muted">{helper}</p>}
    </div>
  );
}
