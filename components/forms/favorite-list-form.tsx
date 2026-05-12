'use client';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FavoriteListModal({ open, onOpenChange, onCreate }: {
  open: boolean; onOpenChange: (v: boolean) => void; onCreate: (v: { name: string; clientName: string; clientEmail: string }) => void;
}) {
  const [name, setName] = React.useState('My favorites');
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Save your favorites</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-1.5">
            <Label>List name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Your name</Label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Your email</Label>
            <Input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onCreate({ name, clientName, clientEmail })}>Save list</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
