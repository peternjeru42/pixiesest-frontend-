'use client';
import * as React from 'react';
import { Trash2 } from 'lucide-react';
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
import { deleteCollection } from '@/lib/api/collections';
import type { Collection } from '@/lib/types';

export function DeleteCollectionDialog({
  open,
  onOpenChange,
  collection,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: Collection;
  onDeleted?: (collectionId: string) => void;
}) {
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!open) {
      setDeleting(false);
      setError('');
    }
  }, [open]);

  async function confirmDelete() {
    setDeleting(true);
    setError('');
    try {
      await deleteCollection(collection.id);
      onOpenChange(false);
      onDeleted?.(collection.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete this collection.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !deleting && onOpenChange(nextOpen)}>
      <DialogContent size="md" className="rounded-md" onClose={() => !deleting && onOpenChange(false)}>
        <DialogHeader className="px-5 pt-6 pb-2 sm:px-6">
          <DialogTitle className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em]">Delete collection</DialogTitle>
          <DialogDescription>
            This permanently removes the original files, previews, and thumbnails for {collection.title}.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="px-5 pb-3 sm:px-6">
          {error && (
            <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
              {error}
            </div>
          )}
          <div className="rounded-md border border-danger/25 bg-danger/5 px-3 py-2 text-sm leading-6 text-ink">
            Delete this collection? This action cannot be undone.
          </div>
        </DialogBody>
        <DialogFooter className="px-5 pb-6 sm:px-6">
          <Button type="button" variant="ghost" disabled={deleting} onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" variant="danger" disabled={deleting} onClick={confirmDelete}>
            <Trash2 size={14}/>{deleting ? 'Deleting...' : 'Delete collection'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
