'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { createCollection } from '@/lib/api/collections';
import { listFolders } from '@/lib/api/folders';
import { cn } from '@/lib/utils';
import type { Folder } from '@/lib/types';

export function CollectionForm({ initialFolderId }: { initialFolderId?: string }) {
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [folder, setFolder] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [vis, setVis] = React.useState<'public' | 'password' | 'client'>('password');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    listFolders().then(items => {
      if (!mounted) return;
      setFolders(items);
      setFolder(current => current || items.find(item => item.id === initialFolderId)?.id || items[0]?.id || '');
    });
    return () => {
      mounted = false;
    };
  }, [initialFolderId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !folder) return;
    setSaving(true);
    try {
      await createCollection({
        title,
        folderId: folder,
        date,
        description,
        status: vis === 'public' ? 'published' : 'draft',
      });
      router.push('/collections');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="flex flex-col gap-5 max-w-2xl" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Iris & Theo" required/>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Folder</Label>
          <Select value={folder} onChange={(e) => setFolder(e.target.value)} required>
            {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Event date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="June 22, 2026"/>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short note shown on the gallery cover."/>
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
        <Button type="submit" variant="default" disabled={!title || !folder || saving}>{saving ? 'Creating...' : 'Create collection'}</Button>
      </div>
    </form>
  );
}
