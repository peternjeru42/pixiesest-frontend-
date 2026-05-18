'use client';
import * as React from 'react';
import { Database, FolderOpen, Grid3x3, Image as ImageIcon, Share2, Trash2, Users } from 'lucide-react';
import { StatsCard } from '@/components/data-display/stats-card';
import { Badge } from '@/components/ui/badge';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import type { AdminDashboard } from '@/lib/api/dashboard';
import { cn, formatBytes } from '@/lib/utils';

type Tab = 'users' | 'stats';

export function AdminDashboardTabs({ dashboard }: { dashboard: AdminDashboard }) {
  const [tab, setTab] = React.useState<Tab>('users');

  const cards = [
    { label: 'Collections created', value: formatNumber(dashboard.stats.collections_created), icon: Grid3x3 },
    { label: 'Folders created', value: formatNumber(dashboard.stats.folders_created), icon: FolderOpen },
    { label: 'Photos uploaded', value: formatNumber(dashboard.stats.photos_uploaded), icon: ImageIcon },
    { label: 'Total space consumed', value: formatBytes(dashboard.stats.total_space_consumed_bytes), icon: Database },
    { label: 'Shared collections', value: formatNumber(dashboard.stats.shared_collections), icon: Share2 },
    { label: 'Total users', value: formatNumber(dashboard.stats.total_users), icon: Users },
    { label: 'Deleted folders', value: formatNumber(dashboard.stats.deleted_folders), icon: Trash2 },
    { label: 'Deleted collections', value: formatNumber(dashboard.stats.deleted_collections), icon: Trash2 },
  ];

  return (
    <>
      <div className="mb-5 flex gap-1 border-b border-line">
        <TabButton active={tab === 'users'} onClick={() => setTab('users')}>Users</TabButton>
        <TabButton active={tab === 'stats'} onClick={() => setTab('stats')}>Stats</TabButton>
      </div>

      {tab === 'users' ? (
        <div className="rounded-md border border-line bg-surface">
          <Table>
            <THead>
              <TR>
                <TH>User</TH>
                <TH>Storage used</TH>
                <TH>Originals</TH>
                <TH>Previews</TH>
                <TH>Collections</TH>
                <TH>Folders</TH>
                <TH>Photos</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {dashboard.users.map(user => (
                <TR key={user.id}>
                  <TD>
                    <div className="font-medium">{user.name || user.email}</div>
                    <div className="mt-0.5 text-xs text-muted">{user.email}</div>
                    {user.business_name && <div className="mt-0.5 text-xs text-muted">{user.business_name}</div>}
                  </TD>
                  <TD className="font-medium">{formatBytes(user.storage.total_bytes)}</TD>
                  <TD>{formatBytes(user.storage.original_bytes)}</TD>
                  <TD>{formatBytes(user.storage.preview_bytes + user.storage.thumbnail_bytes)}</TD>
                  <TD className="mono">{formatNumber(user.collections_count)}</TD>
                  <TD className="mono">{formatNumber(user.folders_count)}</TD>
                  <TD className="mono">{formatNumber(user.photos_count)}</TD>
                  <TD>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge tone={user.is_active ? 'published' : 'draft'}>{user.is_active ? 'Active' : 'Inactive'}</Badge>
                      {user.is_staff && <Badge>Staff</Badge>}
                    </div>
                  </TD>
                </TR>
              ))}
              {dashboard.users.length === 0 && (
                <TR>
                  <TD colSpan={8} className="text-muted">No users found.</TD>
                </TR>
              )}
            </TBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(card => (
            <StatsCard
              key={card.label}
              label={card.label}
              value={
                <span className="inline-flex items-center gap-2">
                  <card.icon size={22} strokeWidth={1.5}/>
                  {card.value}
                </span>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3.5 py-2.5 text-[13px] border-b-[1.5px] -mb-px transition-colors',
        active ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}
