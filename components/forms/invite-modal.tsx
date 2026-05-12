'use client';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function InviteModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Send gallery invite</DialogTitle>
          <DialogDescription>Email a link to your client with optional note.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-1.5">
            <Label>Recipients</Label>
            <Input placeholder="amelia.t@gmail.com, james.harlow@me.com"/>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subject</Label>
            <Input defaultValue="Your wedding gallery is ready"/>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Note</Label>
            <Textarea rows={4} defaultValue="Amelia &amp; James — your photos are ready to view. Password: amelia26"/>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
