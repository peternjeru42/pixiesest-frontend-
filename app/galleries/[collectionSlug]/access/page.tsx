import { notFound } from 'next/navigation';
import { PasswordAccessForm } from '@/components/forms/password-access-form';
import { COLLECTIONS } from '@/lib/mock-data';

export default function GalleryAccessPage({ params }: { params: { collectionSlug: string } }) {
  const c = COLLECTIONS.find(x => x.slug === params.collectionSlug);
  if (!c) return notFound();
  return (
    <div className="min-h-screen relative overflow-hidden bg-ink text-bg grid place-items-center">
      <img src={c.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35"/>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 to-ink/85"/>
      <PasswordAccessForm c={c}/>
    </div>
  );
}
