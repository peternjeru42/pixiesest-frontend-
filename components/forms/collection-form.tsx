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
import type { Collection, Folder } from '@/lib/types';

export function CollectionForm({
  initialFolderId,
  onCreated,
  onCancel,
}: {
  initialFolderId?: string;
  onCreated?: (collection: Collection) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [folder, setFolder] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    listFolders().then(items => {
      if (!mounted) return;
      setFolders(items);
      setFolder(current => current || items.find(item => item.id === initialFolderId)?.id || '');
    });
    return () => {
      mounted = false;
    };
  }, [initialFolderId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || saving) return;
    setSaving(true);
    setError('');
    try {
      const collection = await createCollection({
        title: cleanTitle,
        folderId: folder || null,
        date,
        description: description.trim(),
      });
      if (onCreated) {
        onCreated(collection);
        setTitle('');
        setDate('');
        setDescription('');
        setFolder(initialFolderId ?? '');
      } else {
        router.push('/collections');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create collection.');
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
          <Select value={folder} onChange={(e) => setFolder(e.target.value)}>
            <option value="">None</option>
            {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Event date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short note shown on the gallery cover."/>
      </div>
      {error && (
        <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}
      <div className="flex justify-end gap-2 pt-3 border-t border-line">
        <Button type="button" variant="ghost" onClick={onCancel ?? (() => router.back())}>Cancel</Button>
        <Button type="submit" variant="default" disabled={!title.trim() || saving}>{saving ? 'Creating...' : 'Create collection'}</Button>
      </div>
    </form>
  );
}
