import Link from 'next/link';
import { Upload, Plus, ArrowRight, Eye, Link2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader, SectionHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/data-display/stats-card';
import { Badge } from '@/components/ui/badge';
import { ActivityTimeline } from '@/components/data-display/activity-timeline';
import { STUDIO_STATS, ACTIVITY, COLLECTIONS, SET_MEDIA } from '@/lib/mock-data';

export default function DashboardPage() {
  const recent = SET_MEDIA.ceremony.slice(0, 8);
  const featured = COLLECTIONS[0];
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Dashboard' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
        <PageHeader
          eyebrow="Welcome back"
          title="Good morning, Mara"
          sub="You have 3 active galleries and 4 client favorite lists awaiting your review."
          actions={
            <>
              <Button variant="outline"><Upload size={14}/>Upload</Button>
              <Button asChild variant="default"><Link href="/collections/new"><Plus size={14}/>New collection</Link></Button>
            </>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-3.5">
          <StatsCard label="Photos" value={STUDIO_STATS.photos.toLocaleString()} delta="+412 this month" up/>
          <StatsCard label="Collections" value={STUDIO_STATS.collections} delta="3 published"/>
          <StatsCard label="Gallery views" value={STUDIO_STATS.views.toLocaleString()} delta="+1,284 this week" up/>
          <StatsCard label="Favorites" value={STUDIO_STATS.favoriteLists} delta="4 pending review"/>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <StatsCard label="Videos" value={STUDIO_STATS.videos} delta="1h 42m total"/>
          <StatsCard label="Downloads" value={STUDIO_STATS.downloads.toLocaleString()} delta="42 this week" up/>
          <StatsCard label="Sets" value={STUDIO_STATS.sets}/>
          <StatsCard label="Storage" value="312 GB" delta="of 500 GB" progress={312/500}/>
        </div>

        <div className="h-px bg-line my-7"/>

        <div className="grid lg:grid-cols-[1.65fr_1fr] gap-7">
          <section>
            <SectionHeader
              title="Recent uploads"
              action={<Button asChild size="sm" variant="ghost"><Link href={`/collections/${featured.id}`}>View collection <ArrowRight size={12}/></Link></Button>}
            />
            <div className="grid grid-cols-4 gap-1.5 mb-5">
              {recent.map((m, i) => (
                <div key={m.id} className="relative aspect-square rounded-sm overflow-hidden bg-panel">
                  <img src={m.thumb} alt="" className="w-full h-full object-cover"/>
                  {i === 0 && <span className="absolute top-2 left-2 mono text-[9.5px] bg-ink/55 text-bg px-1.5 py-0.5 rounded">NEW · 124</span>}
                </div>
              ))}
            </div>
            <div className="bg-surface border border-line rounded-md p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="eyebrow mb-1.5">Latest collection</div>
                  <div className="serif text-[22px]">{featured.title}</div>
                </div>
                <Badge tone="published">{featured.status}</Badge>
              </div>
              <div className="mono text-[11px] text-muted flex flex-wrap gap-2 uppercase tracking-wider">
                <span>{featured.counts.photos} photos</span><span>·</span>
                <span>4 sets</span><span>·</span>
                <span>{featured.counts.favorites} favorites</span><span>·</span>
                <span>{featured.counts.views.toLocaleString()} views</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button asChild size="sm" variant="outline"><Link href={`/collections/${featured.id}`}>Open</Link></Button>
                <Button asChild size="sm" variant="outline"><Link href={`/galleries/${featured.slug}`}><Eye size={12}/>Preview gallery</Link></Button>
                <Button size="sm" variant="outline"><Link2 size={12}/>Copy link</Button>
              </div>
            </div>
          </section>
          <section>
            <SectionHeader title="Activity"/>
            <ActivityTimeline events={ACTIVITY.slice(0, 6)}/>
            <Button asChild size="sm" variant="ghost" className="mt-3"><Link href="/activity">View all activity <ArrowRight size={12}/></Link></Button>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
