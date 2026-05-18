'use client';
import * as React from 'react';
import Link from 'next/link';
import { Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PublicGalleryNav({ favCount, onOpenFavorites, onOpenDownload }: {
  favCount: number; onOpenFavorites: () => void; onOpenDownload?: () => void;
}) {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-9 py-4 bg-bg/85 backdrop-blur border-b border-line">
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <span className="w-6 h-6 grid place-items-center rounded-full bg-ink text-bg serif italic text-[12px]">D</span>
        <span className="serif text-[18px] uppercase tracking-[0.05em]">Droptop</span>
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onOpenFavorites} className="relative">
          <Heart size={14}/>
          {favCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-ink text-bg mono text-[9.5px] px-1.5 py-px rounded-full">{favCount}</span>
          )}
        </Button>
        {onOpenDownload && <Button variant="outline" size="icon" onClick={onOpenDownload}><Download size={14}/></Button>}
      </div>
    </nav>
  );
}

export function PublicGalleryFooter({ coupleName }: { coupleName: string }) {
  return (
    <footer className="mt-20 pt-8 pb-12 border-t border-line text-center">
      <div className="serif text-2xl mb-1">Thank you, {coupleName}.</div>
      <div className="text-[12.5px] text-muted">Photographed with care by Droptop Studio · droptop.studio · @droptop.studio</div>
      <div className="mono text-[10.5px] text-muted tracking-[0.14em] mt-5">© 2026 DROPTOP STUDIO · ALL RIGHTS RESERVED</div>
    </footer>
  );
}
