'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

export function SetForm({ onSubmit, onCancel, defaultValues }: {
  onSubmit?: (v: { title: string; description: string; visibility: string }) => void;
  onCancel?: () => void;
  defaultValues?: { title?: string; description?: string; visibility?: string };
}) {
  const [title, setTitle] = React.useState(defaultValues?.title ?? '');
  const [description, setDescription] = React.useState(defaultValues?.description ?? '');
  const [visibility, setVisibility] = React.useState(defaultValues?.visibility ?? 'public');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({ title, description, visibility }); }} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Visibility</Label>
        <Select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Visible to all</option>
          <option value="client">Client only</option>
          <option value="hidden">Hidden</option>
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" variant="default">Save</Button>
      </div>
    </form>
  );
}
