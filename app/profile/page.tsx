'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { ProfileForm } from '@/components/forms/profile-form';
import { ProfileApiError, getProfile } from '@/lib/api/profile';
import type { Photographer } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const [photographer, setPhotographer] = React.useState<Photographer | null>(null);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const token = window.localStorage.getItem('lumen.accessToken');

    if (!token) {
      router.replace('/login?next=/profile');
      return;
    }

    getProfile(token)
      .then(setPhotographer)
      .catch(err => {
        if (err instanceof ProfileApiError && err.status === 401) {
          router.replace('/login?next=/profile');
          return;
        }
        setError(err instanceof Error ? err.message : 'The profile request failed before a response was received.');
      });
  }, [router]);

  return (
    <AdminLayout crumbs={[{ label: 'Account' }, { label: 'Profile' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-3xl mx-auto">
        {error ? (
          <>
            <PageHeader
              eyebrow="Account"
              title="Profile data could not be loaded."
              sub="The backend API did not return your profile. Check the API base URL and backend status."
            />
            <div className="bg-surface border border-line rounded-md p-5 text-sm text-muted">{error}</div>
          </>
        ) : (
          <>
            <PageHeader eyebrow="Account" title="Profile" sub="How you appear to clients and on public gallery pages."/>
            <div className="bg-surface border border-line rounded-md p-7">
              {photographer ? (
                <ProfileForm photographer={photographer}/>
              ) : (
                <div className="space-y-4">
                  <div className="h-20 w-20 rounded-full bg-panel"/>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-10 rounded-lg bg-panel"/>)}
                  </div>
                  <div className="h-24 rounded-lg bg-panel"/>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
