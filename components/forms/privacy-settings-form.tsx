'use client';
import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/lib/types';

export function PrivacySettingsForm({ c }: { c: Collection }) {
  const [password, setPassword] = React.useState(c.password ?? '');
  const [hasPassword, setHasPassword] = React.useState(!!c.password);
  const [clientOnly, setClientOnly] = React.useState(false);
  const [emailReq, setEmailReq] = React.useState(true);
  const [hideHome, setHideHome] = React.useState(false);
  const [allowPrivate, setAllowPrivate] = React.useState(true);

  return (
    <div className="flex flex-col gap-5">
      <FormSwitch label="Require password" sub="Visitors enter a password before viewing." checked={hasPassword} onCheckedChange={setHasPassword}/>
      {hasPassword && (
        <div className="ml-11 flex flex-col gap-1.5 -mt-2">
          <Label>Collection password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} className="max-w-xs"/>
        </div>
      )}
      <FormSwitch label="Client-only access" sub="Limit to specific client emails." checked={clientOnly} onCheckedChange={setClientOnly}/>
      <FormSwitch label="Capture visitor email" sub="Used for download notifications." checked={emailReq} onCheckedChange={setEmailReq}/>
      <FormSwitch label="Hide from homepage" sub="Direct link still works." checked={hideHome} onCheckedChange={setHideHome}/>
      <FormSwitch label="Allow private marking" sub="Clients can flag photos as private." checked={allowPrivate} onCheckedChange={setAllowPrivate}/>
      <div className="flex justify-end pt-3 border-t border-line">
        <Button variant="default">Save changes</Button>
      </div>
    </div>
  );
}

export function FormSwitch({ label, sub, checked, disabled, onCheckedChange }: { label: string; sub?: string; checked: boolean; disabled?: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <label className={disabled ? 'flex items-start justify-between gap-4 cursor-default' : 'flex items-start justify-between gap-4 cursor-pointer'}>
      <div>
        <div className="text-[13.5px] font-medium">{label}</div>
        {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onCheckedChange}/>
    </label>
  );
}
