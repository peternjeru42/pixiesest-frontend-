import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Download, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/actions/status-badge';
import { FAVORITE_LISTS, ALL_MEDIA } from '@/lib/mock-data';
import { PublicGalleryNav, PublicGalleryFooter } from '@/components/layout/public-gallery-layout';

export default function FavoritesShareLinkPage({ params }: { params: { shareToken: string } }) {
  const f = FAVORITE_LISTS.find(l => l.shareToken === params.shareToken || l.id === params.shareToken);
  if (!f) return notFound();
  const media = ALL_MEDIA.filter(m => f.mediaIds.includes(m.id));
  return (
    <div className="bg-bg min-h-screen text-ink">
      <PublicGalleryNav favCount={f.mediaIds.length} onOpenFavorites={()=>{}} onOpenDownload={()=>{}}/>
      <div className="max-w-6xl mx-auto px-6 md:px-9 py-12 pb-20">
        <Button asChild size="sm" variant="ghost" className="mb-6">
          <Link href="/dashboard"><ArrowLeft size={12}/>Back</Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow mb-2">Favorite list · {f.collectionTitle}</div>
            <h1 className="serif text-5xl font-medium tracking-tight">{f.clientName}'s selection</h1>
            <div className="text-sm text-muted mt-2">{f.clientEmail} · <span className="mono text-xs uppercase tracking-wider">{f.mediaIds.length} photos · {f.notes.length} notes</span></div>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={f.status}/>
            <Button variant="outline"><Download size={14}/>Download favorites</Button>
          </div>
        </div>

        {f.notes.length > 0 && (
          <div className="bg-surface border border-line rounded-md p-5 mb-9">
            <div className="eyebrow mb-3">Notes</div>
            <div className="flex flex-col gap-3">
              {f.notes.map((n, i) => {
                const m = ALL_MEDIA.find(x => x.id === n.mediaId);
                return (
                  <div key={i} className="flex gap-3 items-start">
                    {m && <img src={m.thumb} className="w-14 h-14 rounded object-cover" alt=""/>}
                    <div>
                      <div className="mono text-[10.5px] uppercase tracking-wider text-muted">{m?.filename}</div>
                      <div className="text-sm mt-1 serif italic">"{n.text}"</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid gap-1.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {media.map(m => (
            <div key={m.id} className="relative aspect-[4/3] overflow-hidden bg-panel">
              <img src={m.thumb} alt="" loading="lazy" className="w-full h-full object-cover"/>
              <Heart size={16} fill="currentColor" className="absolute bottom-2 right-2 text-rose-400"/>
            </div>
          ))}
        </div>

        <PublicGalleryFooter coupleName={f.collectionTitle}/>
      </div>
    </div>
  );
}
