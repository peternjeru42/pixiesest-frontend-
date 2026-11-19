import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { BlogFooter, BlogHeader } from '@/components/blog/blog-shell';
import { articles, researchDate } from '@/lib/blog/content';

export const metadata: Metadata = {
  title: 'Droptop Journal — Client Galleries & Photography Business',
  description: 'Fact-checked guides to client galleries, Pixieset alternatives, photo delivery, storage, proofing, and selling photography online.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Droptop Journal',
    description: 'Researched, practical guides for photographers choosing client-gallery software.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = articles;
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#181816]">
      <BlogHeader/>

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#74716a]">Droptop Journal</p>
            <h1 className="mt-6 text-[54px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[76px] lg:text-[96px]">
              Better decisions for a photography business.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#65635e]">
              Original, source-linked guides to gallery delivery, proofing, storage, and sales. Product facts last reviewed {researchDate}.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-16">
        <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] border border-black/10 bg-white lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative min-h-[380px] overflow-hidden lg:min-h-[570px]">
            <Image src={featured.hero.src} alt={featured.hero.alt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"/>
          </div>
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77736b]">
                <span>Featured guide</span><span>•</span><span>18 min read</span>
              </div>
              <h2 className="mt-7 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{featured.h1}</h2>
              <p className="mt-6 text-[16px] leading-7 text-[#66635d]">{featured.dek}</p>
            </div>
            <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-6 text-sm font-semibold">
              <span>Read the comparison</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#181816] text-white transition group-hover:rotate-6"><ArrowUpRight size={17}/></span>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10">
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Pixieset alternatives</h2>
          <span className="text-xs text-[#77736b]">10 researched guides</span>
        </div>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, index) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#e7e4dc]">
                <Image src={article.hero.src} alt={article.hero.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]"/>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">Guide {String(index + 2).padStart(2, '0')}</div>
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{article.h1}</h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#68655f]">{article.dek}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#77736b]"><Clock3 size={13}/> 10–16 min read</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#eae6dc]">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736b]">Our standard</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em]">Prices change. Sources should not be a mystery.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#68655f]">Every material comparison links to an official product page and carries a verification date. Droptop’s relationship to the article is disclosed on every guide.</p>
          </div>
          <Link href="/blog/editorial-policy" className="inline-flex h-12 items-center gap-2 rounded-full border border-black/20 bg-white px-6 text-sm font-semibold">Read our methodology <ArrowUpRight size={15}/></Link>
        </div>
      </section>
      <BlogFooter/>
    </main>
  );
}
