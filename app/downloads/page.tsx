import { Filter, Download } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table';
import { StatusBadge } from '@/components/actions/status-badge';
import { DOWNLOAD_LOGS } from '@/lib/mock-data';
import { formatBytes } from '@/lib/utils';

export default function DownloadsPage() {
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Downloads' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1500px] mx-auto">
        <PageHeader
          eyebrow="Studio · 412 logs"
          title="Downloads"
          sub="Every gallery, ZIP, and original file your clients have downloaded."
          actions={<>
            <Button variant="outline"><Filter size={14}/>All collections</Button>
            <Button variant="outline"><Download size={14}/>Export CSV</Button>
          </>}
        />
        <div className="bg-surface border border-line rounded-md">
          <Table>
            <THead><TR><TH>Client</TH><TH>Collection</TH><TH>File</TH><TH>Type</TH><TH>Size</TH><TH>Status</TH><TH>Date</TH></TR></THead>
            <TBody>
              {DOWNLOAD_LOGS.map(d => (
                <TR key={d.id}>
                  <TD>{d.clientEmail}</TD>
                  <TD>{d.collectionTitle}</TD>
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
