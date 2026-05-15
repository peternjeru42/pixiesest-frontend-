import * as React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

type AdminLayoutSearch = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function AdminLayout({
  crumbs,
  children,
  search,
}: {
  crumbs: { label: string; href?: string }[];
  children: React.ReactNode;
  search?: AdminLayoutSearch;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[224px_1fr] min-h-screen">
      <Sidebar/>
      <main className="min-w-0">
        <Topbar crumbs={crumbs} search={search}/>
        {children}
      </main>
    </div>
  );
}
