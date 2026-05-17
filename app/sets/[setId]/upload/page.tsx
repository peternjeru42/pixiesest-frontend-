import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/components/media/upload-dropzone';
import { SETS } from '@/lib/mock-data';

export default function SetUploadPage({ params }: { params: { setId: string } }) {
  const s = SETS[params.setId];
  if (!s) return notFound();
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Sets' }, { label: s.title, href: `/sets/${params.setId}` }, { label: 'Upload' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-4xl mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-3">
          <Link href={`/sets/${params.setId}`}><ArrowLeft size={12}/>Back to set</Link>
        </Button>
        <PageHeader eyebrow={`Upload to ${s.title}`} title="Upload media" sub="Originals upload directly to Droptop storage."/>
        <UploadDropzone/>
      </div>
    </AdminLayout>
  );
}
