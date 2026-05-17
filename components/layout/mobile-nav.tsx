'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderOpen, Grid3x3, Home, Menu, User, X, type LucideIcon } from 'lucide-react';
import { LogoutButton } from '@/components/actions/logout-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STUDIO = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/collections', label: 'Collections', icon: Grid3x3 },
  { href: '/folders', label: 'Folders', icon: FolderOpen },
];

const ACCOUNT = [
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Open navigation"
        className="lg:hidden h-10 w-10 shrink-0 rounded-md bg-surface shadow-soft"
        onClick={() => setOpen(true)}
      >
        <Menu size={18}/>
      </Button>
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] bg-ink/45 backdrop-blur-[2px]" onClick={() => setOpen(false)}>
          <aside
            className="flex h-full w-[min(22rem,calc(100vw-1.25rem))] flex-col border-r border-line bg-surface shadow-deep"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Link href="/dashboard" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-bg serif italic text-base">L</span>
                <span className="serif text-[24px] tracking-wide">Droptop</span>
              </Link>
              <Button size="icon" variant="ghost" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X size={18}/>
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <NavGroup label="Studio">
                {STUDIO.map(item => (
                  <MobileNavItem
                    key={item.href}
                    {...item}
                    active={isActive(pathname, item.href)}
                    onSelect={() => setOpen(false)}
                  />
                ))}
              </NavGroup>
              <NavGroup label="Account">
                {ACCOUNT.map(item => (
                  <MobileNavItem
                    key={item.href}
                    {...item}
                    active={isActive(pathname, item.href)}
                    onSelect={() => setOpen(false)}
                  />
                ))}
              </NavGroup>
            </nav>

            <div className="border-t border-line px-3 py-4">
              <LogoutButton mobile onSignedOut={() => setOpen(false)} />
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </>
  );
}

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/' || pathname.startsWith('/dashboard');
  return pathname === href || pathname.startsWith(href + '/');
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mono px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.14em] text-muted">{label}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function MobileNavItem({
  href,
  label,
  icon: Icon,
  active,
  onSelect,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className={cn(
        'flex min-h-12 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors',
        active ? 'bg-panel text-ink font-medium' : 'text-ink-2 hover:bg-panel hover:text-ink',
      )}
    >
      <span className={cn('grid h-8 w-8 place-items-center rounded-md', active ? 'bg-surface' : 'bg-bg')}>
        <Icon size={17} strokeWidth={1.7}/>
      </span>
      <span>{label}</span>
    </Link>
  );
}
