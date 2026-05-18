import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ArrowRight, Eye, Image as ImageIcon, Link2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader, SectionHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/data-display/stats-card';
import { Badge } from '@/components/ui/badge';
import { DashboardApiError, getDashboardOverview } from '@/lib/api/dashboard';

const AUTH_COOKIE = 'droptop.accessToken';

export default async function DashboardPage() {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token) {
    redirect('/login?next=/dashboard');
  }

  let dashboard;

  try {
    dashboard = await getDashboardOverview(token);
  } catch (error) {
    if (error instanceof DashboardApiError && error.status === 401) {
      redirect('/auth/clear-session?next=/dashboard');
    }

    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Dashboard' }]}>
        <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
          <PageHeader
            eyebrow="Dashboard unavailable"
            title="Dashboard data could not be loaded."
            sub="The backend API did not return the dashboard overview. Check the frontend API base URL and backend deployment status."
          />
          <div className="bg-surface border border-line rounded-md p-5 text-sm text-muted">
            {error instanceof DashboardApiError
              ? `Backend responded with status ${error.status}.`
              : 'The dashboard request failed before a response was received.'}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { stats, latest_collection: latestCollection } = dashboard;
  const storageLimit = stats.storage_limit_bytes;
  const storageProgress = storageLimit > 0 ? stats.storage_used_bytes / storageLimit : 0;

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Dashboard' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
        <PageHeader
          title="Dashboard"
          sub={`${stats.active_collections} active galleries and ${stats.pending_favorite_lists} client favorite lists awaiting review.`}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-3.5">
          <StatsCard label="Photos" value={formatNumber(stats.photos)} delta={`${formatNumber(stats.photos_this_month)} this month`} up={stats.photos_this_month > 0} />
          <StatsCard label="Collections" value={formatNumber(stats.collections)} delta={`${formatNumber(stats.published_collections)} published`} />
          <StatsCard label="Gallery views" value={formatNumber(stats.gallery_views)} delta={`${formatNumber(stats.gallery_views_this_week)} this week`} up={stats.gallery_views_this_week > 0} />
          <StatsCard label="Favorites" value={formatNumber(stats.favorite_lists)} delta={`${formatNumber(stats.pending_favorite_lists)} pending review`} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <StatsCard label="Videos" value={formatNumber(stats.videos)} delta={`${formatDuration(stats.video_duration_seconds)} total`} />
          <StatsCard label="Downloads" value={formatNumber(stats.downloads)} delta={`${formatNumber(stats.downloads_this_week)} this week`} up={stats.downloads_this_week > 0} />
          <StatsCard label="Sets" value={formatNumber(stats.sets)} />
          <StatsCard
            label="Storage"
            value={formatBytes(stats.storage_used_bytes)}
            delta={storageLimit > 0 ? `of ${formatBytes(storageLimit)}` : 'No quota set'}
            progress={Math.min(storageProgress, 1)}
          />
        </div>

        <div className="h-px bg-line my-7" />

        <section>
          <SectionHeader
            title="Recent uploads"
            action={
              latestCollection ? (
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/collections/${latestCollection.id}`}>
                    View collection <ArrowRight size={12} />
                  </Link>
                </Button>
              ) : null
            }
          />

          {dashboard.recent_uploads.length > 0 ? (
            <div className="grid grid-cols-4 gap-1.5 mb-5">
              {dashboard.recent_uploads.map((media, index) => (
                <div key={media.id} className="relative aspect-square rounded-sm overflow-hidden bg-panel">
                  {media.thumbnail_url ? (
                    <img src={media.thumbnail_url} alt={media.filename} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">
                      <ImageIcon size={22} />
                    </div>
                  )}
                  {index === 0 && (
                    <span className="absolute top-2 left-2 mono text-[9.5px] bg-ink/55 text-bg px-1.5 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-line rounded-md p-5 mb-5 text-sm text-muted">
              No uploads yet.
            </div>
          )}

          {latestCollection ? (
            <div className="bg-surface border border-line rounded-md p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="eyebrow mb-1.5">Latest collection</div>
                  <div className="serif text-[22px]">{latestCollection.title}</div>
                </div>
                <Badge tone={latestCollection.status === 'published' ? 'published' : 'draft'}>
                  {latestCollection.status}
                </Badge>
              </div>
              <div className="mono text-[11px] text-muted flex flex-wrap gap-2 uppercase tracking-wider">
                <span>{formatNumber(latestCollection.counts.photos)} photos</span><span>/</span>
                <span>{formatNumber(latestCollection.counts.sets)} sets</span><span>/</span>
                <span>{formatNumber(latestCollection.counts.favorites)} favorites</span><span>/</span>
                <span>{formatNumber(latestCollection.counts.views)} views</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/collections/${latestCollection.id}`}>Open</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/galleries/${latestCollection.slug}?preview=1`}>
                    <Eye size={12} />Preview gallery
                  </Link>
                </Button>
                <Button size="sm" variant="outline">
                  <Link2 size={12} />Copy link
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-line rounded-md p-5 text-sm text-muted">
              No collections yet.
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatBytes(bytes: number) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value >= 10 || exponent === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[exponent]}`;
}

function formatDuration(seconds: number) {
  if (!seconds) return '0m';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours <= 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}
