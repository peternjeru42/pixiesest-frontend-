import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { DownloadSettingsForm } from '@/components/forms/download-settings-form';
import { COLLECTIONS } from '@/lib/mock-data';

export default function DownloadSettingsPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Settings', href: `/collections/${c.id}/settings` }, { label: 'Downloads' }]}>
      <CollectionDetailHeader c={c} activeTab="settings"/>
      <div className="px-6 lg:px-10 pb-20 max-w-2xl">
        <h2 className="serif text-2xl mb-1">Downloads</h2>
        <div className="text-sm text-muted mb-6">What clients can save and at what quality.</div>
        <div className="bg-surface border border-line rounded-md p-6">
          <DownloadSettingsForm collection={c}/>
        </div>
      </div>
    </AdminLayout>
  );
}
