'use client';
import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, Bell, Check, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listUnreadNotifications, markNotificationsRead, type AppNotification } from '@/lib/api/notifications';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';

type TopbarSearch = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Topbar({ crumbs, search }: { crumbs: { label: string; href?: string }[]; search?: TopbarSearch }) {
  const currentCrumb = crumbs[crumbs.length - 1]?.label ?? 'Droptop';
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [loadingNotifications, setLoadingNotifications] = React.useState(false);

  const refreshNotifications = React.useCallback(async () => {
    setLoadingNotifications(true);
    try {
      setNotifications(await listUnreadNotifications());
    } catch {
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  React.useEffect(() => {
    refreshNotifications();
    const interval = window.setInterval(refreshNotifications, 15000);
    return () => window.clearInterval(interval);
  }, [refreshNotifications]);

  React.useEffect(() => {
    if (!notificationsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) setNotificationsOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [notificationsOpen]);

  async function markRead(ids?: string[]) {
    try {
      await markNotificationsRead(ids);
      setNotifications(current => ids ? current.filter(item => !ids.includes(item.id)) : []);
    } catch {
      await refreshNotifications();
    }
  }

  return (
    <header className="sticky top-0 z-50 flex min-h-[64px] items-center gap-3 border-b border-line bg-bg/95 px-4 py-3.5 backdrop-blur lg:gap-4 lg:px-8">
      <MobileNav/>
      <div className="min-w-0 lg:hidden">
        <div className="mono text-[9.5px] uppercase tracking-[0.14em] text-muted">Droptop</div>
        <div className="truncate text-[15px] font-medium leading-5">{currentCrumb}</div>
      </div>
      <nav className="hidden items-center gap-2 mono text-[11px] uppercase tracking-wider text-muted md:flex">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="opacity-50">/</span>}
            {c.href ? (
              <Link href={c.href} className="hover:text-ink">{c.label}</Link>
            ) : (
              <span className={i === crumbs.length - 1 ? 'text-ink font-medium' : ''}>{c.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
      <div className="flex-1"/>
      <div className="hidden min-w-[260px] items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm md:flex">
        <Search size={14} className="text-muted"/>
        <input
          className="flex-1 bg-transparent outline-none placeholder:text-muted"
          placeholder={search?.placeholder ?? 'Search collections, photos, clients...'}
          value={search?.value ?? ''}
          onChange={(event) => search?.onChange(event.target.value)}
          readOnly={!search}
        />
      </div>
      <div ref={notificationRef} className="relative">
        <Button
          size="icon"
          variant="outline"
          aria-label={`Notifications${notifications.length ? `, ${notifications.length} unread` : ''}`}
          aria-expanded={notificationsOpen}
          className="relative h-10 w-10 shrink-0 rounded-md bg-surface"
          onClick={() => {
            setNotificationsOpen(open => !open);
            refreshNotifications();
          }}
        >
          <Bell size={15}/>
          {notifications.length > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-bg">
              {notifications.length > 9 ? '9+' : notifications.length}
            </span>
          )}
        </Button>
        {notificationsOpen && (
          <div className="absolute right-0 top-12 z-[120] w-[min(22rem,calc(100vw-1rem))] overflow-hidden rounded-md border border-line bg-surface shadow-deep">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <div className="text-[13px] font-medium">Notifications</div>
                <div className="text-[11.5px] text-muted">{notifications.length} unread</div>
              </div>
              {notifications.length > 0 && (
                <button type="button" className="text-[12px] font-medium text-teal-600" onClick={() => markRead()}>
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-1">
              {loadingNotifications && notifications.length === 0 ? (
                <div className="px-4 py-5 text-sm text-muted">Checking for completed tasks...</div>
              ) : notifications.length === 0 ? (
                <div className="px-4 py-5 text-sm text-muted">No unread notifications.</div>
              ) : (
                notifications.map(item => (
                  <NotificationItem key={item.id} item={item} onMarkRead={() => markRead([item.id])}/>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NotificationItem({ item, onMarkRead }: { item: AppNotification; onMarkRead: () => void }) {
  const failed = item.status === 'failed';
  const title = failed ? 'Email failed' : 'Email sent';
  const target = item.collectionTitle || 'Collection';
  const description = failed
    ? item.errorMessage || `Email to ${item.recipientEmail} could not be sent.`
    : `${target} was sent to ${item.recipientEmail}.`;

  return (
    <div className="flex gap-3 px-4 py-3 hover:bg-panel">
      <div className={cn('mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md', failed ? 'bg-danger/10 text-danger' : 'bg-teal-600/10 text-teal-700')}>
        {failed ? <AlertCircle size={16}/> : <Mail size={16}/>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="text-[13px] font-medium">{title}</div>
          <button type="button" aria-label="Mark notification read" className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink" onClick={onMarkRead}>
            <Check size={13}/>
          </button>
        </div>
        <div className="mt-0.5 text-[12.5px] leading-5 text-muted">{description}</div>
        <div className="mt-1 mono text-[10.5px] uppercase tracking-wider text-muted">{formatNotificationTime(item.sentAt ?? item.createdAt)}</div>
      </div>
    </div>
  );
}

function formatNotificationTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
