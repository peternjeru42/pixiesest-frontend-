import { Download } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/data-display/stats-card';
import { Progress } from '@/components/ui/progress';
import { STUDIO_STATS, PHOTOGRAPHER } from '@/lib/mock-data';

export default function StatsPage() {
  const s = PHOTOGRAPHER.storage;
  const pct = s.usedGB / s.totalGB * 100;
  return (
    <AdminLayout crumbs={[{ label: 'Account' }, { label: 'Stats' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1300px] mx-auto">
        <PageHeader
          eyebrow="Account · all-time"
          title="Studio stats"
          actions={<Button variant="outline"><Download size={14}/>Export</Button>}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-3.5">
          <StatsCard label="Total photos" value={STUDIO_STATS.photos.toLocaleString()}/>
          <StatsCard label="Total videos" value={STUDIO_STATS.videos}/>
          <StatsCard label="Video duration" value="1h 42m"/>
          <StatsCard label="Collections" value={STUDIO_STATS.collections}/>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-7">
          <StatsCard label="Folders" value={STUDIO_STATS.folders}/>
          <StatsCard label="Sets" value={STUDIO_STATS.sets}/>
          <StatsCard label="Downloads" value={STUDIO_STATS.downloads.toLocaleString()}/>
          <StatsCard label="Favorite lists" value={STUDIO_STATS.favoriteLists}/>
        </div>
        <div className="bg-surface border border-line rounded-md p-6">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="eyebrow mb-1">Storage</div>
              <div className="serif text-2xl">{s.usedGB} GB / {s.totalGB} GB</div>
            </div>
            <div className="mono text-[11px] text-muted">{Math.round(pct)}% USED</div>
          </div>
          <Progress value={pct} className="mb-6"/>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { label: 'Originals', gb: s.originalsGB },
              { label: 'Previews', gb: s.previewsGB },
              { label: 'Thumbnails', gb: s.thumbsGB },
            ].map(b => (
              <div key={b.label}>
                <div className="flex justify-between mb-1.5">
                  <div className="mono text-[10.5px] uppercase tracking-wider text-muted">{b.label}</div>
                  <div className="mono text-[11px]">{b.gb} GB</div>
                </div>
                <Progress value={b.gb / s.usedGB * 100} barClassName="bg-accent"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
