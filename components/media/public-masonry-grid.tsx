'use client';
import { Download, Heart, Image as ImageIcon, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

export function PublicMasonryGrid({
  items,
  onOpen,
  onDownload,
  onToggleFavorite,
}: {
  items: Media[];
  onOpen: (index: number) => void;
  onDownload?: (item: Media) => void;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <div className="columns-2 gap-[9px] bg-white md:columns-3 lg:columns-4 2xl:columns-5">
      {items.map((item, index) => {
        const imageSrc = item.src || item.thumb;
        const videoPreview = item.type === 'video' ? item.playbackUrl : '';
        const ratio = item.width > 0 && item.height > 0 ? item.width / item.height : 3 / 2;

        return (
          <div
            key={item.id}
            onClick={() => onOpen(index)}
            className="group relative mb-[9px] block w-full cursor-pointer break-inside-avoid overflow-hidden bg-panel"
          >
            {videoPreview ? (
              <div className="relative w-full" style={{ aspectRatio: ratio }}>
                <video
                  src={videoPreview}
                  poster={item.thumb || undefined}
                  preload="metadata"
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt=""
                width={item.width || undefined}
                height={item.height || undefined}
                loading="lazy"
                className="block h-auto w-full"
              />
            ) : (
              <div className="grid w-full place-items-center text-muted" style={{ aspectRatio: ratio }}>
                <ImageIcon size={24}/>
              </div>
            )}
            {item.type === 'video' && (
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-ink/60 px-1.5 py-0.5 text-bg">
                <Play size={10}/>
                <span className="mono text-[9.5px]">{Math.floor((item.durationSec ?? 0) / 60)}:{String((item.durationSec ?? 0) % 60).padStart(2, '0')}</span>
              </span>
            )}
            {(onDownload || onToggleFavorite) && (
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                {onDownload && (
                  <button
                    type="button"
                    aria-label={`Download ${item.filename}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDownload(item);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-ink/70 text-bg opacity-0 transition-opacity hover:bg-ink group-hover:opacity-100 focus:opacity-100"
                  >
                    <Download size={15}/>
                  </button>
                )}
                {onToggleFavorite && (
                  <button
                    type="button"
                    aria-label={item.faved ? `Remove ${item.filename} from favourites` : `Add ${item.filename} to favourites`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className={cn(
                      'grid h-8 w-8 place-items-center rounded-full bg-ink/70 transition-opacity hover:bg-ink',
                      item.faved ? 'text-rose-400 opacity-100' : 'text-bg opacity-0 group-hover:opacity-100 focus:opacity-100',
                    )}
                  >
                    <Heart size={18} fill={item.faved ? 'currentColor' : 'none'}/>
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
