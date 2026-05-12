'use client';
import * as React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Photographer } from '@/lib/types';

export function ProfileForm({ photographer }: { photographer: Photographer }) {
  const [form, setForm] = React.useState(photographer);
  const upd = (patch: Partial<Photographer>) => setForm(f => ({ ...f, ...patch }));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-panel border-2 border-surface shadow-soft">
          <img src={form.avatar} alt="" className="w-full h-full object-cover"/>
        </div>
        <div>
          <div className="serif text-[22px]">{form.displayName}</div>
          <div className="text-sm text-muted">{form.businessName} · Sonoma, California</div>
          <div className="flex gap-2 mt-2.5">
            <Button size="sm"><Upload size={12}/>Replace photo</Button>
            <Button size="sm" variant="ghost">Remove</Button>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3.5">
        <Field label="Display name" value={form.displayName} onChange={v => upd({ displayName: v })}/>
        <Field label="Business name" value={form.businessName} onChange={v => upd({ businessName: v })}/>
        <Field label="Email" value={form.email} onChange={v => upd({ email: v })}/>
        <Field label="Phone" value={form.phone ?? ''} onChange={v => upd({ phone: v })}/>
        <Field label="Website" value={form.website ?? ''} onChange={v => upd({ website: v })}/>
        <Field label="Instagram" value={form.instagram ?? ''} onChange={v => upd({ instagram: v })}/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Bio</Label>
        <Textarea value={form.bio ?? ''} onChange={e => upd({ bio: e.target.value })}/>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="text-sm text-muted">Public profile appears on your homepage and gallery covers.</div>
        <Button variant="default">Save changes</Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={e => onChange(e.target.value)}/>
    </div>
  );
}
