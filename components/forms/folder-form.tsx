'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export function FolderForm() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [showHome, setShowHome] = React.useState(true);
  const [hasPassword, setHasPassword] = React.useState(false);
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); router.push('/folders'); }}>
      <div className="flex flex-col gap-1.5">
        <Label>Folder name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Weddings 2026" required/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea placeholder="A short description shown on the public folder page."/>
      </div>
      <Row label="Show on homepage" sub="Display this folder on your public site." checked={showHome} onChange={setShowHome}/>
      <Row label="Require password" sub="Protect with a password." checked={hasPassword} onChange={setHasPassword}/>
      {hasPassword && (
        <div className="flex flex-col gap-1.5 ml-11 -mt-2">
          <Label>Password</Label>
          <Input className="max-w-xs"/>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" variant="default">Create folder</Button>
      </div>
    </form>
  );
}
function Row({ label, sub, checked, onChange }: { label: string; sub?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start justify-between gap-4 cursor-pointer">
      <div>
        <div className="text-[13.5px] font-medium">{label}</div>
        {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange}/>
    </label>
  );
}
