'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as api from '@/lib/api';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('mara@lumen.studio');
  const [password, setPassword] = React.useState('demo-pass-1');
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      await api.login(email, password);
      router.push('/dashboard');
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'Sign in failed');
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
          Continue with Google
        </button>
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[4px] border border-[#d8d1c4] bg-white text-sm font-semibold text-[#171512] transition-colors hover:bg-[#efebe3]"
        >
          <span className="text-base font-semibold">A</span>
          Continue with Apple
        </button>
      </div>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#ddd6ca]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7265]">Or use your email</span>
        <div className="h-px flex-1 bg-[#ddd6ca]" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-[4px] bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-[4px] bg-white"
          />
        </div>
        <div className="flex items-center justify-between gap-4 text-[12.5px]">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox checked={remember} onCheckedChange={setRemember} />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium underline underline-offset-4">
            Lost Password?
          </Link>
        </div>
        {err && <div className="text-xs text-danger">{err}</div>}
        <Button size="lg" disabled={loading} className="mt-1 rounded-[4px]">
          {loading ? 'Signing in...' : 'Log in'}
          <ArrowRight size={14} />
        </Button>
      </form>
    </div>
  );
}
