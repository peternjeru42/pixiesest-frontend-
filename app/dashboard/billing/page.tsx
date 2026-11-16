import { Suspense } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { BillingDashboard } from '@/components/billing/billing-dashboard';
import { PageHeader } from '@/components/layout/page-header';

export default function BillingPage() {
  return (
    <AdminLayout crumbs={[{ label: 'Account' }, { label: 'Billing' }]}>
      <div className="mx-auto max-w-[1400px] px-6 py-8 pb-20 lg:px-10">
        <PageHeader eyebrow="Account · billing" title="Plans & billing" sub="Manage storage, payments and renewal from one place." />
        <Suspense fallback={<div className="min-h-64 text-sm text-muted">Loading billing…</div>}>
          <BillingDashboard />
        </Suspense>
      </div>
    </AdminLayout>
  );
}
