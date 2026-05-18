import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { AdminDashboardTabs } from '@/components/dashboard/admin-dashboard-tabs';
import { DashboardApiError, getAdminDashboard } from '@/lib/api/dashboard';

const AUTH_COOKIE = 'droptop.accessToken';

export default async function OpsAdminPage() {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token) {
    redirect('/login?next=/ops/admin');
  }

  let dashboard;

  try {
    dashboard = await getAdminDashboard(token);
  } catch (error) {
    if (error instanceof DashboardApiError && error.status === 401) {
      redirect('/auth/clear-session?next=/ops/admin');
    }

    return (
      <AdminLayout crumbs={[{ label: 'Ops' }, { label: 'Admin' }]}>
        <div className="mx-auto max-w-[1600px] px-6 py-8 pb-20 lg:px-10">
          <PageHeader
            eyebrow="Admin dashboard"
            title={error instanceof DashboardApiError && error.status === 403 ? 'Staff access required.' : 'Admin data could not be loaded.'}
            sub={error instanceof DashboardApiError && error.status === 403
              ? 'This dashboard is only available to staff users.'
              : 'The backend API did not return the admin dashboard data.'}
          />
          <div className="rounded-md border border-line bg-surface p-5 text-sm text-muted">
            {error instanceof DashboardApiError
              ? `Backend responded with status ${error.status}.`
              : 'The admin dashboard request failed before a response was received.'}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout crumbs={[{ label: 'Ops' }, { label: 'Admin' }]}>
      <div className="mx-auto max-w-[1600px] px-6 py-8 pb-20 lg:px-10">
        <PageHeader
          eyebrow="Admin dashboard"
          title="Platform admin"
          sub="Review user storage consumption and platform-wide gallery totals."
        />
        <AdminDashboardTabs dashboard={dashboard}/>
      </div>
    </AdminLayout>
  );
}
