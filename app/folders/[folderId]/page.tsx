import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Lock, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { CollectionCard } from '@/components/data-display/collection-card';
import { FOLDERS, COLLECTIONS } from '@/lib/mock-data';

export default function FolderDetailPage({ params }: { params: { folderId: string } }) {
  const f = FOLDERS.find(x => x.id === params.folderId || x.slug === params.folderId);
  if (!f) return notFound();
  const cols = COLLECTIONS.filter(c => c.folderId === f.id);
  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Folders', href: '/folders' }, { label: f.name }]}>
      <div className="relative h-72 overflow-hidden bg-panel">
        <img src={f.cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55"/>
        <Button asChild size="sm" className="absolute top-5 left-6 lg:left-10 bg-bg/95 hover:bg-bg">
          <Link href="/folders"><ArrowLeft size={12}/>Folders</Link>
        </Button>
        <div className="absolute left-6 lg:left-10 right-6 lg:right-10 bottom-6 text-bg">
          <h1 className="serif text-5xl font-medium tracking-tight">{f.name}</h1>
          {f.description && <div className="text-bg/85 max-w-2xl mt-1.5">{f.description}</div>}
          <div className="mono text-[11px] tracking-wider mt-3 opacity-85">
            {cols.length} COLLECTIONS · CREATED {f.createdAt.toUpperCase()}
            {f.hasPassword && ' · PASSWORD PROTECTED'}
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-7 pb-20 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-muted">{cols.length} collections in this folder</div>
          <div className="flex gap-2">
            <Button variant="outline"><Edit size={14}/>Edit folder</Button>
            <Button variant="outline">{f.hasPassword ? <><Lock size={14}/>Remove password</> : <><Lock size={14}/>Set password</>}</Button>
            <Button variant="danger"><Trash2 size={14}/>Delete</Button>
            <Button variant="default"><Plus size={14}/>New collection</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cols.map(c => <CollectionCard key={c.id} c={c}/>)}
        </div>
      </div>
    </AdminLayout>
  );
}
