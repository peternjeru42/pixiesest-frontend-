import { PasswordAccessForm } from '@/components/forms/password-access-form';

export default function GalleryAccessPage({ params }: { params: { collectionSlug: string } }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-ink text-bg grid place-items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 to-ink/85"/>
      <PasswordAccessForm
        slug={params.collectionSlug}
        resource="collection"
        title="Private gallery"
        returnPath={`/galleries/${params.collectionSlug}`}
      />
    </div>
  );
}
