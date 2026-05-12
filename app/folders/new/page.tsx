import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { FolderForm } from '@/components/forms/folder-form';

export default function NewFolderPage() {
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders', href: '/folders' }, { label: 'New' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-2xl mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-3">
          <Link href="/folders"><ArrowLeft size={12}/>Back to folders</Link>
        </Button>
        <PageHeader title="New folder"/>
        <div className="bg-surface border border-line rounded-md p-7">
          <FolderForm/>
        </div>
      </div>
    </AdminLayout>
  );
}
