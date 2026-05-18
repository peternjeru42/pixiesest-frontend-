import { CollectionWorkspace } from '@/components/collections/collection-workspace';

export default function SettingsIndex({ params }: { params: { collectionId: string } }) {
  return <CollectionWorkspace collectionId={params.collectionId} initialTab="settings"/>;
}
