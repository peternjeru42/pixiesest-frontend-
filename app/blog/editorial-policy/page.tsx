import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BlogFooter, BlogHeader } from '@/components/blog/blog-shell';
import { researchDate } from '@/lib/blog/content';

export const metadata: Metadata = {
  title: 'Editorial & Review Policy | Droptop Journal',
  description: 'How Droptop researches, verifies, scores, updates, and discloses photography software comparisons.',
  alternates: { canonical: '/blog/editorial-policy' },
};

const standards = [
  ['Official sources first', 'Pricing, limits, fees, and feature claims are checked against vendor pricing pages, help centers, or terms. Independent sources add context but do not replace primary evidence.'],
  ['No invented testing', 'We distinguish documentation review from hands-on testing. A product is never described as tested unless an editor actually completed the stated workflow.'],
  ['Balanced recommendations', 'Every leading product receives a best-fit use case and meaningful limitations. A competitor is allowed to be the stronger recommendation.'],
  ['Commercial disclosure', 'Droptop publishes the Journal. Articles disclose that relationship and explain where Droptop does not meet the reader’s requirement.'],
  ['Dated verification', 'Every comparison carries a visible research date and links readers to official sources because pricing and product terms change.'],
  ['Reproducible workflow', 'We provide a practical test readers can run with their own gallery, device, client flow, and sales model before purchase.'],
];

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#181816]">
      <BlogHeader/>
      <article className="mx-auto max-w-5xl px-5 py-16 lg:px-10 lg:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736b]">Editorial policy</p>
        <h1 className="mt-6 max-w-4xl text-[56px] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-[76px]">Useful comparisons require visible evidence.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-[#5f5c56]">Droptop is a participant in the category we cover. Our job is therefore to make the evidence, methodology, limitations, and relationship obvious enough for readers to judge every recommendation.</p>

        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          {standards.map(([title, body]) => (
            <div key={title} className="rounded-[18px] border border-black/10 bg-white p-6">
              <CheckCircle2 size={18} className="text-[#526e53]"/>
              <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#65615a]">{body}</p>
            </div>
          ))}
        </section>

        <section className="blog-prose mt-20">
          <p className="kicker">Research process</p>
          <h2>How a comparison is produced</h2>
          <ol>
            <li>Define one primary query, related queries, intended reader, and the decision the reader needs to make.</li>
            <li>Review current search results and record missing questions, stale facts, unsupported claims, and conflicts of interest.</li>
            <li>Build a source sheet from official pricing, documentation, and terms. Record the date checked and regional or promotional caveats.</li>
            <li>When access permits, run a representative workflow and document the exact plan, device, file count, and date. Otherwise label the work documentation-based.</li>
            <li>Write the direct answer first, then the comparison, balanced evaluations, decision framework, methodology, FAQ, and references.</li>
            <li>Run editorial, technical SEO, link, and factual checks. Target at least 90/100 before publication.</li>
          </ol>
          <h2>Our 100-point scorecard</h2>
          <p>Each article receives up to 20 points in five categories: research depth, reader usefulness, factual accuracy and sourcing, search usefulness, and editorial quality. A score below 90 requires revision before release.</p>
          <h2>Corrections and updates</h2>
          <p>The current comparison set was checked on {researchDate}. If an official page conflicts with an article, the official page should be treated as current. We update the article, verification date, and material conclusions when a change affects the recommendation.</p>
          <h2>Images and screenshots</h2>
          <p>Editorial photography is labeled as such. Product screenshots must come from an authorized product session or the vendor’s approved media. We do not generate simulated competitor interfaces and present them as evidence.</p>
        </section>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-black/10 pt-8">
          <Link href="/blog" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#181816] px-5 text-sm font-semibold text-white">Browse the Journal <ArrowRight size={14}/></Link>
          <Link href="/#pricing" className="inline-flex h-11 items-center rounded-full border border-black/15 bg-white px-5 text-sm font-semibold">See Droptop pricing</Link>
        </div>
      </article>
      <BlogFooter/>
    </main>
  );
}
