'use client';
import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Home, Grid3x3, FolderOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/collections', label: 'Collections', icon: Grid3x3 },
  { href: '/folders', label: 'Folders', icon: FolderOpen },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
        <Menu size={16}/>
      </Button>
      {open && (
        <div className="fixed inset-0 z-40 bg-ink/40" onClick={() => setOpen(false)}>
          <aside className="absolute top-0 left-0 bottom-0 w-72 bg-surface border-r border-line flex flex-col p-4 gap-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <span className="serif text-xl">Lumen</span>
              <Button size="icon" variant="ghost" onClick={() => setOpen(false)}><X size={16}/></Button>
            </div>
            {NAV.map(it => (
              <Link key={it.href} href={it.href} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-panel">
                <it.icon size={15}/>{it.label}
              </Link>
            ))}
          </aside>
        </div>
      )}
    </>
  );
}
