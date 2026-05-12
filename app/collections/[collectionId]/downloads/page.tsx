import { notFound } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { CollectionDetailHeader } from '@/components/layout/collection-detail-header';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table';
import { StatusBadge } from '@/components/actions/status-badge';
import { COLLECTIONS, DOWNLOAD_LOGS } from '@/lib/mock-data';
import { formatBytes } from '@/lib/utils';

export default function CollectionDownloadsPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  const rows = DOWNLOAD_LOGS.filter(d => d.collectionId === c.id);
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Downloads' }]}>
      <CollectionDetailHeader c={c} activeTab="downloads"/>
      <div className="px-6 lg:px-10 pb-20">
        <div className="bg-surface border border-line rounded-md">
          <Table>
            <THead><TR><TH>Client</TH><TH>File</TH><TH>Type</TH><TH>Size</TH><TH>Status</TH><TH>Date</TH></TR></THead>
            <TBody>
              {rows.map(d => (
                <TR key={d.id}>
                  <TD>{d.clientEmail}</TD>
                  <TD>{d.fileLabel}</TD>
                  <TD className="mono text-xs uppercase">{d.type}</TD>
                  <TD className="mono">{formatBytes(d.sizeMB * 1024 * 1024)}</TD>
                  <TD><StatusBadge status={d.status}/></TD>
                  <TD className="text-muted">{d.date}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
