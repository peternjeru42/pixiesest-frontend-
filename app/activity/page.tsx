import { Filter, FolderOpen } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { ActivityTimeline } from '@/components/data-display/activity-timeline';
import { ACTIVITY } from '@/lib/mock-data';

export default function ActivityPage() {
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Activity' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1200px] mx-auto">
        <PageHeader
          eyebrow="Studio"
          title="Activity"
          sub="All gallery views, downloads, favorites, and uploads."
          actions={<>
            <Button variant="outline"><Filter size={14}/>All events</Button>
            <Button variant="outline"><FolderOpen size={14}/>All collections</Button>
          </>}
        />
        <div className="bg-surface border border-line rounded-md p-5">
          <ActivityTimeline events={[...ACTIVITY, ...ACTIVITY]}/>
        </div>
      </div>
    </AdminLayout>
  );
}
