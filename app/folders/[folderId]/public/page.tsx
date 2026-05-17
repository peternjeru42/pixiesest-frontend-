import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FOLDERS, COLLECTIONS } from '@/lib/mock-data';
import { CollectionCard } from '@/components/data-display/collection-card';

export default function FolderPublicPage({ params }: { params: { folderId: string } }) {
  const f = FOLDERS.find(x => x.id === params.folderId || x.slug === params.folderId);
  if (!f) return notFound();
  const cols = COLLECTIONS.filter(c => c.folderId === f.id && c.status === 'published');
  return (
    <div className="bg-bg min-h-screen text-ink">
      <nav className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-9 py-4 bg-bg/85 backdrop-blur border-b border-line">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-6 h-6 grid place-items-center rounded-full bg-ink text-bg serif italic text-[12px]">D</span>
          <span className="serif text-[18px] uppercase tracking-[0.05em]">Droptop</span>
        </Link>
      </nav>
      <header className="relative h-[60vh] min-h-[420px] bg-panel overflow-hidden">
        <img src={f.cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/55"/>
        <div className="absolute left-0 right-0 bottom-12 text-center text-bg px-6 z-10">
          <div className="mono text-[11px] tracking-[0.14em] uppercase opacity-85 mb-3">A collection of work</div>
          <h1 className="serif text-6xl md:text-7xl font-medium tracking-tight">{f.name}</h1>
          {f.description && <p className="text-bg/85 max-w-2xl mx-auto mt-4">{f.description}</p>}
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {cols.map(c => <CollectionCard key={c.id} c={c}/>)}
        </div>
      </div>
    </div>
  );
}
