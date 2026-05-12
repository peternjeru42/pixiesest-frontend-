import * as React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export function AdminLayout({ crumbs, children }: { crumbs: { label: string; href?: string }[]; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[224px_1fr] min-h-screen">
      <Sidebar/>
      <main className="min-w-0">
        <Topbar crumbs={crumbs}/>
        {children}
      </main>
    </div>
  );
}
