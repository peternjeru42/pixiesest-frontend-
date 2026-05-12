import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/actions/status-badge';
import { COLLECTIONS, FAVORITE_LISTS } from '@/lib/mock-data';

export default function CollectionFavoritesPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  const lists = FAVORITE_LISTS.filter(f => f.collectionId === c.id);
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Favorites' }]}>
      <CollectionDetailHeader c={c} activeTab="favorites"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="text-sm text-muted mb-4">{lists.length} client favorite list{lists.length === 1 ? '' : 's'}</div>
        <div className="bg-surface border border-line rounded-md">
          <Table>
            <THead><TR><TH>Client</TH><TH>Status</TH><TH>Selected</TH><TH>Notes</TH><TH>Updated</TH><TH></TH></TR></THead>
            <TBody>
              {lists.map(f => (
                <TR key={f.id}>
                  <TD><div className="font-medium">{f.clientName}</div><div className="text-xs text-muted">{f.clientEmail}</div></TD>
                  <TD><StatusBadge status={f.status}/></TD>
                  <TD className="mono">{f.mediaIds.length} photos</TD>
                  <TD className="mono">{f.notes.length}</TD>
                  <TD className="text-muted">{f.updatedAt}</TD>
                  <TD><Button asChild size="sm"><Link href={`/favorites/${f.shareToken}`}>Open</Link></Button></TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
