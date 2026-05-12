import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { ActivityTimeline } from '@/components/data-display/activity-timeline';
import { COLLECTIONS, ACTIVITY } from '@/lib/mock-data';

export default function CollectionActivityPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Activity' }]}>
      <CollectionDetailHeader c={c} activeTab="activity"/>
      <div className="px-6 lg:px-10 pb-20 max-w-3xl">
        <div className="bg-surface border border-line rounded-md p-5">
          <ActivityTimeline events={ACTIVITY.filter(a => !a.collectionId || a.collectionId === c.id)}/>
        </div>
      </div>
    </AdminLayout>
  );
}
