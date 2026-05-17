import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/components/media/upload-dropzone';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { COLLECTIONS, SETS } from '@/lib/mock-data';

export default function UploadPage({ params }: { params: { collectionId: string } }) {
  const c = COLLECTIONS.find(x => x.id === params.collectionId);
  if (!c) return notFound();
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: c.title, href: `/collections/${c.id}` }, { label: 'Upload' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-4xl mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-3">
          <Link href={`/collections/${c.id}/media`}><ArrowLeft size={12}/>Back to media</Link>
        </Button>
        <PageHeader
          eyebrow={`Upload to ${c.title}`}
          title="Upload media"
          sub="Originals upload directly to Droptop storage. Drag a folder for fastest results."
        />
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col gap-1.5">
            <Label>Collection</Label>
            <Select defaultValue={c.id}>
              {COLLECTIONS.map(x => <option key={x.id} value={x.id}>{x.title}</option>)}
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Set</Label>
            <Select defaultValue="ceremony">
              {Object.values(SETS).map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              <option value="new">+ New set…</option>
            </Select>
          </div>
        </div>
        <UploadDropzone/>
      </div>
    </AdminLayout>
  );
}
