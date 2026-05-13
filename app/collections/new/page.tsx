import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { CollectionForm } from '@/components/forms/collection-form';
import { Button } from '@/components/ui/button';

export default function NewCollectionPage({ searchParams }: { searchParams?: { folderId?: string } }) {
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'New' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[900px] mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-3">
          <Link href="/collections"><ArrowLeft size={12}/>Back to collections</Link>
        </Button>
        <PageHeader title="New collection" sub="Galleries are private until you publish."/>
        <div className="bg-surface border border-line rounded-md p-7">
          <CollectionForm initialFolderId={searchParams?.folderId}/>
        </div>
      </div>
    </AdminLayout>
  );
}
