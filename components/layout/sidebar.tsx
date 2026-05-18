'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Grid3x3, FolderOpen, Shield, User } from 'lucide-react';
import { LogoutButton } from '@/components/actions/logout-button';
import { listCollections, subscribeToCollectionChanges } from '@/lib/api/collections';
import { listFolders, subscribeToFolderChanges } from '@/lib/api/folders';
import { cn } from '@/lib/utils';
import { useAuthRole } from './use-auth-role';

const STUDIO = [
  { href: '/collections', label: 'Collections', icon: Grid3x3, count: 12 },
  { href: '/folders',     label: 'Folders',    icon: FolderOpen, count: 4 },
];
const ADMIN = [
  { href: '/ops/admin', label: 'Dashboard', icon: Shield },
];
const PROFILE = [
  { href: '/profile',       label: 'Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isAdmin, resolved } = useAuthRole();
  const [counts, setCounts] = React.useState({ collections: 0, folders: 0 });
  const homeHref = resolved && isAdmin ? '/ops/admin' : '/collections';

  React.useEffect(() => {
    if (!resolved || isAdmin) return;
    let mounted = true;
    const loadCounts = async () => {
      const [collections, folders] = await Promise.all([listCollections(), listFolders()]);
      if (mounted) setCounts({ collections: collections.length, folders: folders.length });
    };
    loadCounts();
    const unsubscribeCollections = subscribeToCollectionChanges(loadCounts);
    const unsubscribeFolders = subscribeToFolderChanges(loadCounts);
    return () => {
      mounted = false;
      unsubscribeCollections();
      unsubscribeFolders();
    };
  }, [isAdmin, resolved]);

  const studioItems = STUDIO.map(item => {
    if (item.href === '/collections') return { ...item, count: counts.collections };
    if (item.href === '/folders') return { ...item, count: counts.folders };
    return item;
  });

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-surface border-r border-line sticky top-0 h-screen px-3.5 py-4 gap-3">
      <Link href={homeHref} className="flex items-center gap-2.5 px-2 pb-3 border-b border-line">
        <span className="w-7 h-7 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">D</span>
        <span className="serif text-[21px] tracking-wide">Droptop</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5">
        {!resolved ? null : isAdmin ? (
          <>
            <SidebarLabel>Admin</SidebarLabel>
            {ADMIN.map(it => <SidebarItem key={it.href} {...it} active={isActive(pathname, it.href)}/>)}
          </>
        ) : (
          <>
            <SidebarLabel>Studio</SidebarLabel>
            {studioItems.map(it => <SidebarItem key={it.href} {...it} active={isActive(pathname, it.href)}/>)}
          </>
        )}
        <SidebarLabel>Account</SidebarLabel>
        {PROFILE.map(it => <SidebarItem key={it.href} {...it} active={isActive(pathname, it.href)}/>)}
      </nav>

      <div className="border-t border-line pt-3">
        <LogoutButton />
      </div>
    </aside>
  );
}

function isActive(pathname: string, href: string) {
  if (href === '/ops/admin') return pathname === href;
  return pathname === href || pathname.startsWith(href + '/');
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return <div className="mono text-[10px] uppercase tracking-[0.14em] text-muted px-2.5 pt-3.5 pb-1.5">{children}</div>;
}

function SidebarItem({ href, label, icon: Icon, count, active, external }: {
  href: string; label: string; icon: any; count?: number; active?: boolean; external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] transition-colors',
        active ? 'bg-panel text-ink font-medium' : 'text-ink-2 hover:bg-panel hover:text-ink',
      )}
    >
      <Icon size={15} strokeWidth={1.6}/>
      <span>{label}</span>
      {count !== undefined && <span className="ml-auto mono text-[10.5px] text-muted">{count}</span>}
      {external && <span className="ml-auto mono text-[12px] text-accent">↗</span>}
    </Link>
  );
}
