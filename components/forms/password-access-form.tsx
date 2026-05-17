'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyCollectionPassword, verifyFolderPassword } from '@/lib/api/public-gallery';
import type { Collection } from '@/lib/types';

export function PasswordAccessForm({
  c,
  slug,
  resource = 'collection',
  title,
  subtitle,
  returnPath,
  onUnlock,
}: {
  c?: Collection;
  slug?: string;
  resource?: 'collection' | 'folder';
  title?: string;
  subtitle?: string;
  returnPath?: string;
  onUnlock?: () => void;
}) {
  const router = useRouter();
  const resourceSlug = slug ?? c?.slug ?? '';
  const resourceTitle = title ?? c?.couple ?? c?.title ?? 'Private gallery';
  const resourceSubtitle = subtitle ?? c?.date ?? '';
  const [pw, setPw] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!resourceSlug) return;
    setLoading(true);
    setErr('');

    try {
      if (resource === 'folder') {
        await verifyFolderPassword(resourceSlug, pw, email);
      } else {
        await verifyCollectionPassword(resourceSlug, pw, email);
      }
      if (onUnlock) onUnlock();
      else router.push(returnPath ?? (resource === 'folder' ? `/folders/${resourceSlug}/public` : `/galleries/${resourceSlug}`));
    } catch {
      setErr('Password is incorrect. Try again or contact the photographer.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="relative z-10 w-full max-w-sm p-8 text-center">
      <span className="block w-9 h-9 rounded-full bg-bg text-ink grid place-items-center mx-auto mb-7 serif italic text-lg">D</span>
      {resourceSubtitle && <div className="mono text-[10.5px] tracking-[0.14em] text-bg/70 mb-3">{resourceSubtitle.toUpperCase()}</div>}
      <h1 className="serif text-5xl font-medium tracking-tight text-bg mb-7">{resourceTitle}</h1>
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
        {loading ? 'Unlocking...' : 'Enter gallery'} <ArrowRight size={14}/>
      </Button>
    </form>
  );
}
