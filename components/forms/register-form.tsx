'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as api from '@/lib/api';

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      await api.register(form);
      router.push('/verify-email');
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'Account creation failed');
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="grid gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[4px] border border-[#d8d1c4] bg-white text-sm font-semibold text-[#171512] transition-colors hover:bg-[#efebe3]"
        >
          <Chrome size={16} />
          Sign up with Google
        </button>
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[4px] border border-[#d8d1c4] bg-white text-sm font-semibold text-[#171512] transition-colors hover:bg-[#efebe3]"
        >
          <span className="text-base font-semibold">A</span>
          Sign up with Apple
        </button>
      </div>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#ddd6ca]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7265]">Or use your email</span>
        <div className="h-px flex-1 bg-[#ddd6ca]" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              required
              className="rounded-[4px] bg-white"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              required
              className="rounded-[4px] bg-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            placeholder="Lumen Studio"
            value={form.businessName}
            onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
            className="rounded-[4px] bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="registerEmail">Email</Label>
          <Input
            id="registerEmail"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            className="rounded-[4px] bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="registerPassword">Password</Label>
          <Input
            id="registerPassword"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
            className="rounded-[4px] bg-white"
          />
        </div>
        {err && <div className="text-xs text-danger">{err}</div>}
        <Button size="lg" disabled={loading} className="mt-1 rounded-[4px]">
          {loading ? 'Creating account...' : 'Create account'}
          <ArrowRight size={14} />
        </Button>
      </form>

      <p className="mt-5 text-center text-[12px] leading-5 text-[#786f61]">
        By creating an account, you agree to Lumen&apos;s{' '}
        <Link href="#" className="font-medium text-[#171512] underline underline-offset-4">
          Terms of Service
        </Link>{' '}
        and acknowledge the{' '}
        <Link href="#" className="font-medium text-[#171512] underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
