import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { ProfileForm } from '@/components/forms/profile-form';
import { ProfileApiError, getProfile } from '@/lib/api/profile';

const AUTH_COOKIE = 'lumen.accessToken';

export default async function ProfilePage() {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token) {
    redirect('/login?next=/profile');
  }

  let photographer;

  try {
    photographer = await getProfile(token);
  } catch (error) {
    if (error instanceof ProfileApiError && error.status === 401) {
      redirect('/login?next=/profile');
    }

    return (
      <AdminLayout crumbs={[{ label: 'Account' }, { label: 'Profile' }]}>
        <div className="px-6 lg:px-10 py-8 pb-20 max-w-3xl mx-auto">
          <PageHeader
            eyebrow="Account"
            title="Profile data could not be loaded."
            sub="The backend API did not return your profile. Check the API base URL and backend status."
          />
          <div className="bg-surface border border-line rounded-md p-5 text-sm text-muted">
            {error instanceof ProfileApiError
              ? `Backend responded with status ${error.status}.`
              : 'The profile request failed before a response was received.'}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout crumbs={[{ label: 'Account' }, { label: 'Profile' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-3xl mx-auto">
        <PageHeader eyebrow="Account" title="Profile" sub="How you appear to clients and on public gallery pages."/>
        <div className="bg-surface border border-line rounded-md p-7">
          <ProfileForm photographer={photographer}/>
        </div>
      </div>
    </AdminLayout>
  );
}
