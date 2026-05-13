'use client';
import * as React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateProfile } from '@/lib/api/profile';
import type { Photographer } from '@/lib/types';

export function ProfileForm({ photographer }: { photographer: Photographer }) {
  const [form, setForm] = React.useState(photographer);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setForm(photographer);
  }, [photographer]);

  const upd = (patch: Partial<Photographer>) => setForm(f => ({ ...f, ...patch }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setSaved(false);

    try {
      const updated = await updateProfile({
        displayName: form.displayName,
        businessName: form.businessName,
        phone: form.phone,
        website: form.website,
        instagram: form.instagram,
        bio: form.bio,
      });
      setForm(updated);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile could not be saved.');
    } finally {
      setIsSaving(false);
    }
  }

  const avatarLabel = (form.displayName || form.businessName || form.email || 'Profile').slice(0, 1).toUpperCase();

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-panel border-2 border-surface shadow-soft">
          {form.avatar ? (
            <img src={form.avatar} alt="" className="w-full h-full object-cover"/>
          ) : (
            <div className="w-full h-full grid place-items-center serif text-3xl text-muted">{avatarLabel}</div>
          )}
        </div>
        <div>
          <div className="serif text-[22px]">{form.displayName}</div>
          <div className="text-sm text-muted">{form.businessName || form.email}</div>
          <div className="flex gap-2 mt-2.5">
            <Button type="button" size="sm" disabled><Upload size={12}/>Replace photo</Button>
            <Button type="button" size="sm" variant="ghost" disabled>Remove</Button>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3.5">
        <Field label="Display name" value={form.displayName} onChange={v => upd({ displayName: v })}/>
        <Field label="Business name" value={form.businessName} onChange={v => upd({ businessName: v })}/>
        <Field label="Email" value={form.email} onChange={() => {}} disabled/>
        <Field label="Phone" value={form.phone ?? ''} onChange={v => upd({ phone: v })}/>
        <Field label="Website" value={form.website ?? ''} onChange={v => upd({ website: v })}/>
        <Field label="Instagram" value={form.instagram ?? ''} onChange={v => upd({ instagram: v })}/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Bio</Label>
        <Textarea value={form.bio ?? ''} onChange={e => upd({ bio: e.target.value })}/>
      </div>
      {(error || saved) && (
        <div className={error ? 'text-sm text-danger' : 'text-sm text-muted'}>
          {error || 'Profile changes saved.'}
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="text-sm text-muted">Public profile appears on your homepage and gallery covers.</div>
        <Button variant="default" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save changes'}</Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input value={value} disabled={disabled} onChange={e => onChange(e.target.value)}/>
    </div>
  );
}
