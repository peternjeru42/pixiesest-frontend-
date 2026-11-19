import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Minus, ShieldCheck } from 'lucide-react';
import { BlogFooter, BlogHeader } from '@/components/blog/blog-shell';
import {
  articles,
  getArticle,
  getProduct,
  getSource,
  modifiedDate,
  publishedDate,
  researchDate,
  sources,
} from '@/lib/blog/content';

type ArticlePageProps = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  const articlePublishedDate = article.publishedDate ?? publishedDate;
  const articleModifiedDate = article.modifiedDate ?? modifiedDate;
  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      type: 'article',
      publishedTime: articlePublishedDate,
      modifiedTime: articleModifiedDate,
      authors: ['Droptop Editorial'],
      images: [{ url: article.hero.src, alt: article.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title: article.seoTitle, description: article.description, images: [article.hero.src] },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const category = article.category ?? 'Pixieset alternatives';
  const articlePublishedDate = article.publishedDate ?? publishedDate;
  const articleModifiedDate = article.modifiedDate ?? modifiedDate;

  const picks = article.picks.map(pick => ({ ...pick, product: getProduct(pick.productId) })).filter(item => item.product);
  const sourceIds = new Set(['pixieset', ...picks.flatMap(item => item.product?.sourceIds ?? [])]);
  if (article.slug === 'switch-from-pixieset') {
    ['pixieset-downloads', 'pixieset-favorites', 'pixieset-billing'].forEach(id => sourceIds.add(id));
  }
  const articleSources = sources.filter(source => sourceIds.has(source.id));
  const related = article.related.map(slug => getArticle(slug)).filter(Boolean);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1,
    description: article.description,
    datePublished: articlePublishedDate,
    dateModified: articleModifiedDate,
    author: { '@type': 'Organization', name: 'Droptop Editorial' },
    publisher: { '@type': 'Organization', name: 'Droptop' },
    mainEntityOfPage: `/blog/${article.slug}`,
    image: article.hero.src,
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#181816]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}/>
      <BlogHeader/>

      <article>
        <header className="mx-auto max-w-[1120px] px-5 pb-10 pt-12 lg:px-10 lg:pb-16 lg:pt-20">
          <nav className="text-xs text-[#77736b]" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-[#181816]">Journal</Link><span className="mx-2">/</span><span>{category}</span>
          </nav>
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736b]">{category}</p>
          <h1 className="mt-5 max-w-5xl text-[48px] font-semibold leading-[0.98] tracking-[-0.052em] sm:text-[66px] lg:text-[80px]">{article.h1}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[#5f5c56]">{article.dek}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/10 pt-6 text-xs text-[#706d66]">
            <span className="font-semibold text-[#181816]">By Droptop Editorial</span>
            <span>Updated {researchDate}</span>
            <span>8–12 min read</span>
          </div>
        </header>

        <figure className="mx-auto max-w-[1400px] px-0 sm:px-5 lg:px-10">
          <div className="relative aspect-[16/8] min-h-[360px] overflow-hidden bg-[#e6e2d8] sm:rounded-[28px]">
            <Image src={article.hero.src} alt={article.hero.alt} fill priority sizes="(min-width: 1400px) 1400px, 100vw" className="object-cover"/>
          </div>
          <figcaption className="px-5 pt-3 text-xs leading-5 text-[#77736b] sm:px-0">{article.hero.caption}</figcaption>
        </figure>

        <div className="mx-auto max-w-[900px] px-5 py-14 lg:px-10 lg:py-20">
          <div className="min-w-0">
            <section aria-labelledby="answer" className="rounded-[22px] border border-black/10 bg-white p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#77736b]">The short answer</p>
              <h2 id="answer" className="sr-only">Quick answer</h2>
              <p className="mt-4 text-xl font-medium leading-8 tracking-[-0.02em]">{article.quickAnswer}</p>
            </section>

            <section className="blog-prose mt-14" aria-labelledby="comparison">
              <p className="kicker">Comparison</p>
              <h2 id="comparison">The best options at a glance</h2>
              <p>Prices and plan terms are current as of {researchDate}. Currency, tax, promotions, and renewal terms can vary by country.</p>
            </section>

            <div className="mt-7 overflow-x-auto rounded-[18px] border border-black/10 bg-white">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#eeece6] text-[10px] uppercase tracking-[0.13em] text-[#65625c]">
                  <tr><th className="p-4">Platform</th><th className="p-4">Best for</th><th className="p-4">Entry price</th><th className="p-4">Storage</th><th className="p-4">Official source</th></tr>
                </thead>
                <tbody>
                  {picks.map(({ product }) => product && (
                    <tr key={product.id} className="border-t border-black/10 align-top">
                      <td className="p-4 font-semibold">{product.name}</td>
                      <td className="p-4 text-[#5f5c56]">{product.bestFor}</td>
                      <td className="p-4 text-[#5f5c56]">{product.entry}</td>
                      <td className="p-4 text-[#5f5c56]">{product.storage}</td>
                      <td className="p-4"><SourceLinks ids={product.sourceIds}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {article.sections?.map(section => (
              <section key={section.heading} className="blog-prose mt-16">
                <h2>{section.heading}</h2>
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}

            <section className="mt-16" aria-labelledby="reviews">
              <div className="blog-prose">
                <p className="kicker">The platforms</p>
                <h2 id="reviews">How the leading options compare</h2>
              </div>
              <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
                {picks.map(({ product, angle }, index) => product && (
                  <section key={product.id} id={product.id} className="scroll-mt-24 py-10">
                    <div className="flex gap-5">
                      <span className="mt-1 text-xs font-semibold tabular-nums text-[#918d84]">{String(index + 1).padStart(2, '0')}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-3xl font-semibold tracking-[-0.04em]">{product.name}</h3>
                        <p className="mt-2 text-sm font-semibold text-[#535049]">{angle}</p>
                        <p className="mt-5 text-[16px] leading-7 text-[#5f5c56]">{product.summary}</p>
                        <p className="mt-4 text-[15px] leading-7 text-[#5f5c56]"><strong className="text-[#181816]">Commerce:</strong> {product.commerce}</p>
                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                          <div className="rounded-[14px] bg-[#edf2eb] p-5">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#426047]"><Check size={14}/> Strengths</div>
                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#485149]">{product.strengths.map(strength => <li key={strength}>{strength}</li>)}</ul>
                          </div>
                          <div className="rounded-[14px] bg-[#f1eeea] p-5">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#665f56]"><Minus size={14}/> Limitations</div>
                            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5d5851]">{product.limitations.map(limitation => <li key={limitation}>{limitation}</li>)}</ul>
                          </div>
                        </div>
                        <div className="mt-5 text-xs text-[#77736b]">Source: <SourceLinks ids={product.sourceIds}/></div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-[22px] border border-[#b9cbb7] bg-[#edf3eb] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#456044]"><ShieldCheck size={16}/> Where Droptop fits</div>
              <p className="mt-4 text-lg leading-8">Choose Droptop when you need affordable private photo and video delivery, client favorites, password protection, and controlled downloads. Choose Pic-Time, ShootProof, or another commerce platform when integrated print fulfillment is essential.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/register" className="inline-flex h-11 items-center rounded-full bg-[#181816] px-5 text-sm font-semibold text-white">Create a free gallery</Link>
                <Link href="/#pricing" className="inline-flex h-11 items-center rounded-full border border-black/15 bg-white px-5 text-sm font-semibold">See Droptop pricing</Link>
              </div>
            </section>

            <section className="blog-prose mt-16" aria-labelledby="faq">
              <p className="kicker">Common questions</p>
              <h2 id="faq">Frequently asked questions</h2>
              <div className="not-prose mt-7 divide-y divide-black/10 border-y border-black/10">
                {article.faqs.map(faq => (
                  <details key={faq.question} className="group py-5">
                    <summary className="cursor-pointer list-none pr-8 text-lg font-semibold tracking-[-0.02em] marker:hidden">{faq.question}</summary>
                    <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#5f5c56]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-16" aria-labelledby="sources">
              <div className="blog-prose"><p className="kicker">Sources</p><h2 id="sources">Product information</h2></div>
              <ol className="mt-7 space-y-3 text-sm leading-6">
                {articleSources.map((source, index) => (
                  <li key={source.id} className="flex gap-3">
                    <span className="text-[#918d84]">{index + 1}.</span>
                    <div><a href={source.url} className="font-medium underline decoration-black/20 underline-offset-4 hover:decoration-black" target={source.url.startsWith('http') ? '_blank' : undefined} rel={source.url.startsWith('http') ? 'noreferrer' : undefined}>{source.name}</a></div>
                  </li>
                ))}
              </ol>
            </section>

          </div>
        </div>
      </article>

      <section className="border-t border-black/10 bg-[#eae6dc]">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#77736b]">Keep reading</p>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {related.map(item => item && (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="group rounded-[18px] border border-black/10 bg-white p-6">
                <h2 className="text-xl font-semibold leading-tight tracking-[-0.03em]">{item.h1}</h2>
                <span className="mt-7 inline-flex text-xs font-semibold underline decoration-black/20 underline-offset-4 group-hover:decoration-black">Read article</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BlogFooter/>
    </main>
  );
}

function SourceLinks({ ids }: { ids: string[] }) {
  const linkedSources = ids.map(id => getSource(id)).filter(Boolean);
  return (
    <span className="inline-flex flex-wrap gap-2">
      {linkedSources.map(source => source && (
        <a key={source.id} href={source.url} target={source.url.startsWith('http') ? '_blank' : undefined} rel={source.url.startsWith('http') ? 'noreferrer' : undefined} className="inline-flex items-center gap-1 font-medium text-[#46433e] underline decoration-black/20 underline-offset-4 hover:decoration-black">
          {source.name.replace(' official pricing', '').replace(' official plans', '').replace(' pricing and product overview', '')}
        </a>
      ))}
    </span>
  );
}
