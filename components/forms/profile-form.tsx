'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Upload } from 'lucide-react';
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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setForm(photographer);
  }, [photographer]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!saved) return;
    const timeout = window.setTimeout(() => setSaved(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [saved]);

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
      {error && <div className="text-sm text-danger">{error}</div>}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="text-sm text-muted">Public profile appears on your homepage and gallery covers.</div>
        <Button variant="default" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save changes'}</Button>
      </div>
      {mounted && saved && createPortal(
        <div className="fixed right-4 top-4 z-[130] w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-line bg-surface p-4 shadow-deep sm:right-6 sm:top-6">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok/10 text-ok">
              <CheckCircle2 size={19}/>
            </span>
            <div>
              <div className="font-medium">Profile changes saved.</div>
              <div className="mt-0.5 text-sm text-muted">Your public profile details are up to date.</div>
            </div>
          </div>
        </div>,
        document.body,
      )}
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
