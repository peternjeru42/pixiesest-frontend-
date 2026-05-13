'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
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
          <GoogleIcon />
          Continue with Google
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
