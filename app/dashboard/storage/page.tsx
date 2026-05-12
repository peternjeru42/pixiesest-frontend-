import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Progress } from '@/components/ui/progress';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table';
import { COLLECTIONS, PHOTOGRAPHER } from '@/lib/mock-data';

export default function StoragePage() {
  const s = PHOTOGRAPHER.storage;
  const pct = (s.usedGB / s.totalGB) * 100;
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Dashboard', href: '/dashboard' }, { label: 'Storage' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1200px] mx-auto">
        <PageHeader eyebrow="Account · storage" title="Storage" sub="How your gallery storage breaks down."/>

        <div className="bg-surface border border-line rounded-md p-5 mb-7">
          <div className="flex items-end justify-between mb-3">
            <div className="serif text-2xl">{s.usedGB} GB / {s.totalGB} GB</div>
            <div className="mono text-[11px] text-muted">{Math.round(pct)}% USED</div>
          </div>
          <Progress value={pct} className="mb-5"/>
          <div className="grid sm:grid-cols-3 gap-4">
            <Bucket label="Originals" gb={s.originalsGB} total={s.usedGB}/>
            <Bucket label="Previews" gb={s.previewsGB} total={s.usedGB}/>
            <Bucket label="Thumbnails" gb={s.thumbsGB} total={s.usedGB}/>
          </div>
        </div>

        <h2 className="serif text-[22px] mb-3">By collection</h2>
        <div className="bg-surface border border-line rounded-md">
          <Table>
            <THead><TR><TH>Collection</TH><TH>Photos</TH><TH>Videos</TH><TH>Originals</TH><TH>Total</TH></TR></THead>
            <TBody>
              {COLLECTIONS.map(c => (
                <TR key={c.id}>
                  <TD><div className="font-medium">{c.title}</div><div className="text-xs text-muted">{c.folderName}</div></TD>
                  <TD className="mono">{c.counts.photos}</TD>
                  <TD className="mono">{c.counts.videos}</TD>
                  <TD className="mono">{(c.counts.photos * 0.025).toFixed(1)} GB</TD>
                  <TD className="mono">{(c.counts.photos * 0.032).toFixed(1)} GB</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

function Bucket({ label, gb, total }: { label: string; gb: number; total: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted">{label}</div>
        <div className="mono text-[11px]">{gb} GB</div>
      </div>
      <Progress value={(gb / total) * 100} barClassName="bg-accent"/>
    </div>
  );
}
