import { Filter, Download } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table';
import { StatusBadge } from '@/components/actions/status-badge';
import { FAVORITE_LISTS } from '@/lib/mock-data';

export default function FavoritesPage() {
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Favorites' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1400px] mx-auto">
        <PageHeader
          eyebrow="Studio · 28 lists"
          title="Favorites"
          sub="Lists your clients have created in their galleries."
          actions={<>
            <Button variant="outline"><Filter size={14}/>All statuses</Button>
            <Button variant="outline"><Download size={14}/>Export</Button>
          </>}
        />
        <div className="bg-surface border border-line rounded-md">
          <Table>
            <THead><TR><TH>Client</TH><TH>Collection</TH><TH>Status</TH><TH>Selected</TH><TH>Notes</TH><TH>Updated</TH><TH></TH></TR></THead>
            <TBody>
              {FAVORITE_LISTS.map(f => (
                <TR key={f.id}>
                  <TD><div className="font-medium">{f.clientName}</div><div className="text-xs text-muted">{f.clientEmail}</div></TD>
                  <TD>{f.collectionTitle}</TD>
                  <TD><StatusBadge status={f.status}/></TD>
                  <TD className="mono">{f.mediaIds.length} photos</TD>
                  <TD className="mono">{f.notes.length}</TD>
                  <TD className="text-muted">{f.updatedAt}</TD>
                  <TD><Button size="sm">Open</Button></TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
