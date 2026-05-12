import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { FolderCard } from '@/components/data-display/folder-card';
import { FOLDERS } from '@/lib/mock-data';

export default function FoldersPage() {
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-[1600px] mx-auto">
        <PageHeader
          eyebrow="Organize · 4 folders"
          title="Folders"
          sub="Group collections by year, event type, or however you work."
          actions={<Button asChild variant="default"><Link href="/folders/new"><Plus size={14}/>New folder</Link></Button>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FOLDERS.map(f => <FolderCard key={f.id} f={f}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
