import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbfaf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Droptop home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#181816] text-sm font-semibold text-white">D</span>
          <span className="text-[14px] font-semibold tracking-[0.18em]">DROPTOP</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#5c5b57] sm:gap-8" aria-label="Blog navigation">
          <Link href="/blog" className="font-medium text-[#181816]">Journal</Link>
          <Link href="/#pricing" className="hidden hover:text-[#181816] sm:block">Pricing</Link>
          <Link href="/register" className="inline-flex h-9 items-center gap-2 rounded-full bg-[#181816] px-4 text-xs font-semibold text-white">
            Try Droptop <ArrowRight size={13}/>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#181816] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:grid-cols-2 lg:px-10">
        <div>
          <div className="text-[13px] font-semibold tracking-[0.18em]">DROPTOP JOURNAL</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60">Clear answers for photographers comparing client-gallery software.</p>
        </div>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-3 text-sm text-white/70 sm:justify-end">
          <Link href="/blog">All articles</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/register">Create an account</Link>
        </div>
      </div>
    </footer>
  );
}
