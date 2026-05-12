import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Download, Palette, ChevronRight } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { COLLECTIONS } from '@/lib/mock-data';

export default function SettingsIndex({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  const sections = [
    { href: `/collections/${c.id}/settings/privacy`, icon: Shield, title: 'Privacy', sub: 'Password, client access, visitor email capture.' },
    { href: `/collections/${c.id}/settings/downloads`, icon: Download, title: 'Downloads', sub: 'Originals, web-size, gallery ZIP, PIN, and more.' },
    { href: `/collections/${c.id}/settings/design`, icon: Palette, title: 'Design', sub: 'Cover, layout, theme, fonts, and color.' },
  ];
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Settings' }]}>
      <CollectionDetailHeader c={c} activeTab="settings"/>
      <div className="px-6 lg:px-10 pb-20 max-w-3xl">
        <div className="grid gap-3">
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="bg-surface border border-line rounded-md p-5 flex items-center gap-5 hover:shadow-lift transition-shadow">
              <div className="w-11 h-11 rounded-full bg-panel grid place-items-center text-ink-2"><s.icon size={18}/></div>
              <div className="flex-1">
                <div className="serif text-[20px]">{s.title}</div>
                <div className="text-sm text-muted mt-0.5">{s.sub}</div>
              </div>
              <ChevronRight size={16} className="text-muted"/>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
