import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock3 } from 'lucide-react';
import { BlogFooter, BlogHeader } from '@/components/blog/blog-shell';
import { articles } from '@/lib/blog/content';

export const metadata: Metadata = {
  title: 'Droptop Blog — Client Galleries & Photography Business',
  description: 'Independent comparisons of Pixieset, Pic-Time, SmugMug, ShootProof, CloudSpot, Zenfolio, and other client-gallery platforms.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Droptop Blog',
    description: 'Straightforward comparisons for photographers choosing client-gallery software.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = articles;
  const pixiesetArticles = rest.filter(article => (article.category ?? 'Pixieset alternatives') === 'Pixieset alternatives');
  const platformArticles = rest.filter(article => article.category === 'Platform comparisons');
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#181816]">
      <BlogHeader/>

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#74716a]">Droptop Blog</p>
            <h1 className="mt-6 text-[54px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[76px] lg:text-[96px]">
              Better decisions for a photography business.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#65635e]">
              Clear comparisons of client galleries, storage, proofing, delivery, and sales tools for photographers.
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
                <span>Featured</span><span>•</span><span>12 min read</span>
              </div>
              <h2 className="mt-7 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{featured.h1}</h2>
              <p className="mt-6 text-[16px] leading-7 text-[#66635d]">{featured.dek}</p>
            </div>
            <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-6 text-sm font-semibold">
              <span className="underline decoration-black/20 underline-offset-4 group-hover:decoration-black">Read article</span>
              <span>{featured.category ?? 'Pixieset alternatives'}</span>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10">
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Pixieset alternatives</h2>
          <span className="text-xs text-[#77736b]">{pixiesetArticles.length + 1} articles</span>
        </div>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {pixiesetArticles.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#e7e4dc]">
                <Image src={article.hero.src} alt={article.hero.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]"/>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">Pixieset alternatives</div>
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{article.h1}</h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#68655f]">{article.dek}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#77736b]"><Clock3 size={13}/> 8–12 min read</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10">
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#77736b]">Compare before you subscribe</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Platform comparisons</h2>
          </div>
          <span className="text-xs text-[#77736b]">{platformArticles.length} articles</span>
        </div>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {platformArticles.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#e7e4dc]">
                <Image src={article.hero.src} alt={article.hero.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]"/>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">{article.category}</div>
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{article.h1}</h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#68655f]">{article.dek}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#77736b]"><Clock3 size={13}/> 8–12 min read</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#eae6dc]">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736b]">Droptop galleries</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em]">A simple place to deliver photos and videos to clients.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#68655f]">Start free with 5 GB, private galleries, client favorites, password protection, and controlled downloads.</p>
          </div>
          <Link href="/#pricing" className="inline-flex h-12 items-center rounded-full border border-black/20 bg-white px-6 text-sm font-semibold">View pricing</Link>
        </div>
      </section>
      <BlogFooter/>
    </main>
  );
}
