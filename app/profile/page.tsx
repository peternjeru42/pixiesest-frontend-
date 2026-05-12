import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { ProfileForm } from '@/components/forms/profile-form';
import { PHOTOGRAPHER } from '@/lib/mock-data';

export default function ProfilePage() {
  return (
    <AdminLayout crumbs={[{ label: 'Account' }, { label: 'Profile' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-3xl mx-auto">
        <PageHeader eyebrow="Account" title="Profile" sub="How you appear to clients and on public gallery pages."/>
        <div className="bg-surface border border-line rounded-md p-7">
          <ProfileForm photographer={PHOTOGRAPHER}/>
        </div>
      </div>
    </AdminLayout>
  );
}
