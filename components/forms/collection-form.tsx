'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { FOLDERS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function CollectionForm() {
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [folder, setFolder] = React.useState(FOLDERS[0].id);
  const [date, setDate] = React.useState('');
  const [vis, setVis] = React.useState<'public' | 'password' | 'client'>('password');
  return (
    <form className="flex flex-col gap-5 max-w-2xl" onSubmit={(e) => { e.preventDefault(); router.push('/collections'); }}>
      <div className="flex flex-col gap-1.5">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Iris & Theo" required/>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Folder</Label>
          <Select value={folder} onChange={(e) => setFolder(e.target.value)}>
            {FOLDERS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Event date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="June 22, 2026"/>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea placeholder="A short note shown on the gallery cover."/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Visibility</Label>
        <div className="inline-flex bg-surface border border-line rounded-lg p-0.5 w-fit">
          {(['public','password','client'] as const).map(v => (
            <button type="button" key={v} onClick={() => setVis(v)} className={cn(
              'px-2.5 py-1 text-xs rounded-md capitalize',
              vis === v ? 'bg-panel text-ink font-medium' : 'text-muted hover:text-ink',
            )}>{v}</button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-3 border-t border-line">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" variant="default" disabled={!title}>Create collection</Button>
      </div>
    </form>
  );
}
