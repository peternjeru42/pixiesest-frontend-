'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/components/media/upload-dropzone';
import { getSet } from '@/lib/api/sets';
import type { Set as CollectionSet } from '@/lib/types';

export default function SetUploadPage({ params }: { params: { setId: string } }) {
  const [set, setSet] = React.useState<CollectionSet | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    getSet(params.setId).then(current => {
      if (!mounted) return;
      setSet(current);
      setLoaded(true);
    });
    return () => {
      mounted = false;
    };
  }, [params.setId]);

  if (!loaded) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Sets' }, { label: 'Upload' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading upload workspace...</div>
      </AdminLayout>
    );
  }

  if (!set || !set.collectionId) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Sets' }, { label: set.title, href: `/sets/${params.setId}` }, { label: 'Upload' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-4xl mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-3">
          <Link href={`/sets/${params.setId}`}><ArrowLeft size={12}/>Back to set</Link>
        </Button>
        <PageHeader eyebrow={`Upload to ${set.title}`} title="Upload media" sub="Select image or video files and they will be added to this set."/>
        <UploadDropzone collectionId={set.collectionId} setId={set.id} fallbackThumb={set.cover}/>
      </div>
    </AdminLayout>
  );
}
