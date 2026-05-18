import { CollectionWorkspace } from '@/components/collections/collection-workspace';

export default function CollectionDetailPage({ params }: { params: { collectionId: string } }) {
  return <CollectionWorkspace collectionId={params.collectionId} initialTab="sets"/>;
}
