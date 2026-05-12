'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as api from '@/lib/api';

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = React.useState({ firstName: '', lastName: '', businessName: '', email: '', password: '' });
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await api.register(form);
    router.push('/verify-email');
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>First name</Label>
          <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required/>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Last name</Label>
          <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required/>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Business name</Label>
        <Input placeholder="Lumen Studio" value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Email</Label>
        <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Password</Label>
        <Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required/>
      </div>
      <Button size="lg" disabled={loading}>{loading ? 'Creating studio…' : 'Create studio'}</Button>
      <div className="text-center text-sm text-muted">Already on Lumen? <Link href="/login" className="text-ink underline">Sign in</Link></div>
    </form>
  );
}
