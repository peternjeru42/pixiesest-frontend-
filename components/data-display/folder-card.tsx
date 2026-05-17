import Link from 'next/link';
import { Image as ImageIcon, Lock, MoreHorizontal } from 'lucide-react';
import type { Collection, Folder } from '@/lib/types';

export function FolderCard({ f, collections = [] }: { f: Folder; collections?: Collection[] }) {
  const previews = collections.filter(collection => collection.folderId === f.id).slice(0, 4);
  const tiles = Array.from({ length: 4 }, (_, index) => previews[index]?.cover ?? f.cover);

  return (
    <Link href={`/folders/${f.id}`} className="group bg-surface border border-line rounded-md overflow-hidden block hover:shadow-lift hover:-translate-y-0.5 transition-transform">
      <div className="relative aspect-[3/2] bg-panel overflow-hidden p-1.5">
        <div className="grid h-full grid-cols-2 gap-1.5">
          {tiles.map((src, index) => (
            <div key={`${src}-${index}`} className="overflow-hidden rounded-sm bg-bg">
              {src ? (
                <img src={src} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"/>
              ) : (
                <div className="grid h-full place-items-center text-muted">
                  <ImageIcon size={18} strokeWidth={1.5}/>
                </div>
              )}
            </div>
          ))}
        </div>
        {f.hasPassword && (
          <span className="absolute top-2.5 left-2.5 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1.5 border border-line">
            <Lock size={9}/>Password
          </span>
        )}
        <span className="absolute top-2 right-2 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full border border-line opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={11}/>
        </span>
      </div>
      <div className="p-4">
        <div className="serif text-[21px]">{f.name}</div>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2 flex-wrap">
          <span>{f.collectionsCount} collections</span>
          {f.showOnHomepage && (<><span className="text-line-2">/</span><span>On homepage</span></>)}
        </div>
      </div>
    </Link>
  );
}
