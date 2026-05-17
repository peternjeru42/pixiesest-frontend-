'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/lib/types';

export function PasswordAccessForm({ c, onUnlock }: { c: Collection; onUnlock?: () => void }) {
  const router = useRouter();
  const [pw, setPw] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr('');
    setTimeout(() => {
      if (pw === (c.password ?? 'amelia26')) {
        if (onUnlock) onUnlock();
        else router.push(`/galleries/${c.slug}`);
      } else {
        setErr('Password is incorrect. Try again or contact the photographer.');
        setLoading(false);
      }
    }, 500);
  }

  return (
    <form onSubmit={submit} className="relative z-10 w-full max-w-sm p-8 text-center">
      <span className="block w-9 h-9 rounded-full bg-bg text-ink grid place-items-center mx-auto mb-7 serif italic text-lg">D</span>
      <div className="mono text-[10.5px] tracking-[0.14em] text-bg/70 mb-3">{c.date.toUpperCase()}</div>
      <h1 className="serif text-5xl font-medium tracking-tight text-bg mb-7">{c.couple ?? c.title}</h1>
      <p className="text-sm opacity-80 text-bg mb-6 leading-relaxed">This gallery is private. Please enter the password your photographer provided.</p>
      <input
        autoFocus
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="Password"
        className="w-full px-3.5 py-3 rounded-lg border border-bg/20 bg-bg/10 text-bg text-sm mb-2 text-center tracking-wide placeholder:text-bg/50"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email (optional)"
        className="w-full px-3.5 py-3 rounded-lg border border-bg/20 bg-bg/10 text-bg text-sm mb-3 text-center placeholder:text-bg/50"
      />
      {err && <div className="text-[12.5px] text-rose-300 mb-3">{err}</div>}
      <Button size="lg" disabled={loading || !pw} className="w-full bg-bg text-ink border-bg hover:bg-bg/90">
        {loading ? 'Unlocking…' : 'Enter gallery'} <ArrowRight size={14}/>
      </Button>
      <div className="mono text-[10.5px] tracking-[0.14em] text-bg/40 mt-6">HINT FOR DEMO: AMELIA26</div>
    </form>
  );
}
