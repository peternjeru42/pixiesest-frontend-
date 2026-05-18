'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/components/media/upload-dropzone';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getCollection, listCollections } from '@/lib/api/collections';
import { listSets } from '@/lib/api/sets';
import type { Collection, Set } from '@/lib/types';

export default function UploadPage({ params }: { params: { collectionId: string } }) {
  const router = useRouter();
  const [collection, setCollection] = React.useState<Collection | null>(null);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [sets, setSets] = React.useState<Set[]>([]);
  const [selectedSetId, setSelectedSetId] = React.useState('');
  const [uploadedCount, setUploadedCount] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const [current, collectionItems] = await Promise.all([
        getCollection(params.collectionId),
        listCollections(),
      ]);
      if (!mounted) return;

      setCollection(current);
      setCollections(collectionItems);
      setLoaded(true);

      if (current) {
        const setItems = await listSets(current.id);
        if (!mounted) return;
        setSets(setItems);
        setSelectedSetId(existing => existing || 'general');
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [params.collectionId]);

  if (!loaded) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Upload' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Loading upload workspace...</div>
      </AdminLayout>
    );
  }

  if (!collection) {
    return (
      <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: 'Upload' }]}>
        <div className="px-6 lg:px-10 py-8 text-sm text-muted">Collection not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Collections', href: '/collections' }, { label: collection.title, href: `/collections/${collection.id}` }, { label: 'Upload' }]}>
      <div className="px-6 lg:px-10 py-8 pb-20 max-w-4xl mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-3">
          <Link href={`/collections/${collection.id}/media`}><ArrowLeft size={12}/>Back to media</Link>
        </Button>
        <PageHeader
          eyebrow={`Upload to ${collection.title}`}
          title="Upload media"
          sub="Select image or video files and they will be added to this collection."
        />
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col gap-1.5">
            <Label>Collection</Label>
            <Select
              value={collection.id}
              onChange={(event) => router.push(`/collections/${event.target.value}/media/upload`)}
            >
              {collections.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Set</Label>
            <Select value={selectedSetId} onChange={(event) => setSelectedSetId(event.target.value)}>
              <option value="general">General collection media</option>
              {sets.map(set => <option key={set.id} value={set.id}>{set.title}</option>)}
            </Select>
          </div>
        </div>
        {uploadedCount > 0 && (
          <div className="mb-4 rounded-md border border-ok/30 bg-ok/5 px-3 py-2 text-sm text-ok">
            {uploadedCount} file{uploadedCount === 1 ? '' : 's'} added to {collection.title}.
          </div>
        )}
        <UploadDropzone
          collectionId={collection.id}
          setId={selectedSetId || sets[0]?.id || 'general'}
          fallbackThumb={collection.cover}
          onComplete={(media) => setUploadedCount(count => count + media.length)}
        />
      </div>
    </AdminLayout>
  );
}
