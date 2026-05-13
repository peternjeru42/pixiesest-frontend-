'use client';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DownloadPinModal({ open, error, onOpenChange, onConfirm }: { open: boolean; error?: string; onOpenChange: (v: boolean) => void; onConfirm: (pin: string) => void }) {
  const [pin, setPin] = React.useState('');

  React.useEffect(() => {
    if (open) setPin('');
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Enter download PIN</DialogTitle>
          <DialogDescription>Your photographer set a 4-digit PIN. Ask them if you don&apos;t have it.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Input
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
            placeholder="••••"
            inputMode="numeric"
            maxLength={4}
            className="text-center text-2xl tracking-[0.5em] py-4 h-auto"
          />
          {error && <div className="mt-2 text-xs text-danger">{error}</div>}
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={pin.length !== 4} onClick={() => onConfirm(pin)}>Unlock</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
