'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createFolder } from '@/lib/api/folders';

export function FolderForm() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [showHome, setShowHome] = React.useState(true);
  const [hasPassword, setHasPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || saving) return;
    if (hasPassword && !password.trim()) {
      setError('Enter a password or turn off password protection.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await createFolder({
        name: cleanName,
        description: description.trim(),
        showOnHomepage: showHome,
        hasPassword,
        password: hasPassword ? password.trim() : undefined,
      });
      router.push('/folders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create folder.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <Label>Folder name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Weddings 2026" required/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description shown on the public folder page."/>
      </div>
      <Row label="Show on homepage" sub="Display this folder on your public site." checked={showHome} onChange={setShowHome}/>
      <Row label="Require password" sub="Protect with a password." checked={hasPassword} onChange={setHasPassword}/>
      {hasPassword && (
        <div className="flex flex-col gap-1.5 ml-11 -mt-2">
          <Label>Password</Label>
          <Input className="max-w-xs" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
      )}
      {error && (
        <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" variant="default" disabled={!name.trim() || saving}>{saving ? 'Creating...' : 'Create folder'}</Button>
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
