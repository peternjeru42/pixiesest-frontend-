import { CollectionWorkspace } from '@/components/collections/collection-workspace';

export default function CollectionMediaPage({ params }: { params: { collectionId: string } }) {
  return <CollectionWorkspace collectionId={params.collectionId} initialTab="media"/>;
}
