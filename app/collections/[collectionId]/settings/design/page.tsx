import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { DesignSettingsForm } from '@/components/forms/design-settings-form';
import { COLLECTIONS } from '@/lib/mock-data';

export default function DesignSettingsPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Settings', href: `/collections/${c.id}/settings` }, { label: 'Design' }]}>
      <CollectionDetailHeader c={c} activeTab="settings"/>
      <div className="px-6 lg:px-10 pb-20 max-w-5xl">
        <h2 className="serif text-2xl mb-1">Design</h2>
        <div className="text-sm text-muted mb-6">How the public gallery looks to your clients.</div>
        <DesignSettingsForm/>
      </div>
    </AdminLayout>
  );
}
