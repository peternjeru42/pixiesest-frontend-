import Link from 'next/link';
import { SiteFooter } from '@/components/marketing/site-footer';

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbfaf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Droptop home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#181816] text-sm font-semibold text-white">D</span>
          <span className="text-[14px] font-semibold tracking-[0.18em]">DROPTOP</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#5c5b57] sm:gap-8" aria-label="Blog navigation">
          <Link href="/blog" className="font-medium text-[#181816]">Blog</Link>
          <Link href="/#pricing" className="hidden hover:text-[#181816] sm:block">Pricing</Link>
          <Link href="/register" className="inline-flex h-9 items-center gap-2 rounded-full bg-[#181816] px-4 text-xs font-semibold text-white">
            Try Droptop
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return <SiteFooter/>;
}
