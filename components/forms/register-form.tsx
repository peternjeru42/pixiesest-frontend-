'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
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
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      await api.register(form);
      router.push('/dashboard');
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
          <GoogleIcon />
          Sign up with Google
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
          <div className="relative">
            <Input
              id="registerPassword"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              className="rounded-[4px] bg-white pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-[4px] text-[#786f61] hover:bg-[#efebe3] hover:text-[#171512]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
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

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
