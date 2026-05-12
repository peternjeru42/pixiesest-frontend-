'use client';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function FavoriteNoteModal({ open, onOpenChange, initialNote, onSave }: {
  open: boolean; onOpenChange: (v: boolean) => void; initialNote?: string; onSave: (note: string) => void;
}) {
  const [note, setNote] = React.useState(initialNote ?? '');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" onClose={() => onOpenChange(false)}>
        <DialogHeader><DialogTitle>Add a note</DialogTitle></DialogHeader>
        <DialogBody>
          <Textarea autoFocus rows={5} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell your photographer about this photo…"/>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onSave(note); onOpenChange(false); }}>Save note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
