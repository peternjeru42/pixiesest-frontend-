import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Button } from '@/components/ui/button';
import { SetCard } from '@/components/data-display/set-card';
import { COLLECTIONS, SETS } from '@/lib/mock-data';

export default function CollectionDetailPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId || x.slug === params.collectionId);
  if (!c) return notFound();
  const sets = c.sets.length > 0 ? c.sets : Object.values(SETS);
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title }]}>
      <CollectionDetailHeader c={c} activeTab="sets"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted">{sets.length} sets · drag to reorder · clients see this order</div>
          <Button variant="outline"><Plus size={14}/>New set</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sets.map(s => <SetCard key={s.id} s={s}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
