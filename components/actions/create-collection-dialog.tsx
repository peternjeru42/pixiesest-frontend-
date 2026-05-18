'use client';
import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CollectionForm } from '@/components/forms/collection-form';
import type { Collection } from '@/lib/types';

export function CreateCollectionDialog({
  open,
  onOpenChange,
  initialFolderId,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFolderId?: string;
  onCreated?: (collection: Collection) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" className="rounded-md" onClose={() => onOpenChange(false)}>
        <DialogHeader className="px-5 pt-6 pb-2 sm:px-6">
          <DialogTitle className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em]">New collection</DialogTitle>
          <DialogDescription>Galleries are private until you publish.</DialogDescription>
        </DialogHeader>
        <DialogBody className="px-5 pb-6 sm:px-6">
          <CollectionForm
            initialFolderId={initialFolderId}
            onCancel={() => onOpenChange(false)}
            onCreated={(collection) => {
              onCreated?.(collection);
              onOpenChange(false);
            }}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
