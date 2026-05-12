'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
    setLoading(true); setErr('');
    try { await api.login(email, password); router.push('/dashboard'); }
    catch (e: any) { setErr(e.message || 'Sign in failed'); setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
      </div>
      <div className="flex items-center justify-between text-[12.5px]">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={remember} onCheckedChange={setRemember}/>Remember me
        </label>
        <Link href="/forgot-password" className="underline">Forgot password?</Link>
      </div>
      {err && <div className="text-xs text-danger">{err}</div>}
      <Button size="lg" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}<ArrowRight size={14}/></Button>
      <div className="text-center text-sm text-muted">New to Lumen? <Link href="/register" className="text-ink underline">Create an account</Link></div>
    </form>
  );
}
