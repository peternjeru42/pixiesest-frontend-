import { Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import type { Set } from '@/lib/types';

export function SetCard({ s }: { s: Set }) {
  return (
    <article className="group bg-surface border border-line rounded-md overflow-hidden flex flex-col hover:shadow-lift transition-shadow">
      <div className="relative aspect-[3/2] bg-panel overflow-hidden">
        {s.cover ? (
          <img src={s.cover} alt="" className="w-full h-full object-cover"/>
        ) : (
          <div className="grid h-full place-items-center bg-panel text-muted">
            <ImageIcon size={24} strokeWidth={1.5}/>
          </div>
        )}
        <span className="absolute top-2.5 left-2.5 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full border border-line">
          {s.visibility === 'client' ? '🔒 Client only' : s.visibility === 'hidden' ? 'Hidden' : 'Visible'}
        </span>
        <span className="absolute top-2 right-2 mono text-[10px] uppercase tracking-wider bg-bg/90 backdrop-blur px-2 py-1 rounded-full border border-line opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={11}/>
        </span>
      </div>
      <div className="p-4">
        <div className="serif text-[19px]">{s.title}</div>
        <div className="mono text-[10.5px] uppercase tracking-wider text-muted mt-2 flex gap-2">
          <span>{s.photoCount} photos</span>
          {s.videoCount > 0 && (<><span className="text-line-2">·</span><span>{s.videoCount} video</span></>)}
        </div>
      </div>
    </article>
  );
}
