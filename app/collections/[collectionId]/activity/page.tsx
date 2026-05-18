import { CollectionWorkspace } from '@/components/collections/collection-workspace';

export default function CollectionActivityPage({ params }: { params: { collectionId: string } }) {
  return <CollectionWorkspace collectionId={params.collectionId} initialTab="activity"/>;
}
