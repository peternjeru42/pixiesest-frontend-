import Link from 'next/link';
import {
  Check,
  Download,
  Menu,
  Sparkles,
} from 'lucide-react';
import { SiteFooter } from '@/components/marketing/site-footer';

const galleryImages = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
];

const masonryImages = [
  {
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=80',
    className: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80',
    className: 'row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=80',
    className: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=80',
    className: 'row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80',
    className: 'row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    className: 'row-span-2',
  },
];

const plans = [
  {
    slug: 'free',
    name: 'Free',
    price: '$0',
    suffix: '/month',
    storage: '5 GB',
    note: 'Everything you need to start delivering polished client galleries.',
    features: ['5 GB photo storage', 'Unlimited galleries', 'Client favorites', 'Secure gallery sharing'],
  },
  {
    slug: 'basic',
    name: 'Basic',
    price: '$5',
    suffix: '/month',
    storage: '10 GB',
    note: 'Professional delivery tools for growing photographers.',
    features: [
      'All Free features',
      '30 minutes of HD video',
      'Custom branding',
      'Connect a custom domain',
      'Full-resolution downloads',
      '100 campaign emails per month',
      'Unlimited mobile gallery apps',
      'Commission-free sales',
    ],
  },
  {
    slug: 'plus',
    name: 'Plus',
    price: '$12',
    suffix: '/month',
    storage: '100 GB',
    note: 'More room and reach for an active client workflow.',
    features: ['All Basic features', '1 hour of HD video', '500 campaign emails per month'],
  },
  {
    slug: 'pro',
    name: 'Pro',
    price: '$20',
    suffix: '/month',
    storage: '1,000 GB',
    note: 'Maximum capacity and advanced delivery for busy studios.',
    recommended: true,
    features: [
      'All Plus features',
      '2 hours of 4K video',
      '5,000 campaign emails per month',
      'Bulk share collections',
      'RAW photo support',
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#1d1d1f]">
      <header className="sticky top-0 z-40 border-b border-[#d2d2d7]/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1d1d1f] text-sm font-semibold text-white">
              D
            </span>
            <span className="text-[15px] font-semibold tracking-[0.18em]">DROPTOP</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#515154] md:flex">
            <a href="#pricing">Pricing</a>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-[13px] font-medium text-[#515154]">
              Log In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#1d1d1f] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-black"
            >
              Get Started
            </Link>
          </div>
          <Link
            href="/login"
            aria-label="Open login"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d2d2d7] md:hidden"
          >
            <Menu size={18} />
          </Link>
        </div>
      </header>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-2xl text-[48px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#1d1d1f] sm:text-[64px] lg:text-[76px]">
            Share your work beautifully and professionally.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#515154]">
            Droptop is built for photographers and videographers who need a simple, polished way to deliver galleries, videos and client projects online.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              Get Started
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#d2d2d7] bg-white px-6 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#f5f5f7]">
          <img
            src={galleryImages[0]}
            alt="Wedding gallery preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[20px] bg-white/95 p-4 shadow-deep backdrop-blur sm:left-8 sm:right-8 sm:p-5">
            <div className="flex items-center justify-between gap-4 border-b border-[#e5e5e7] pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Client Gallery</p>
                <h2 className="mt-1 text-3xl font-semibold leading-none tracking-[-0.03em]">Meghan & Desmond</h2>
              </div>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1d1d1f] text-white" aria-label="Download gallery">
                <Download size={17} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {galleryImages.map((image) => (
                <img key={image} src={image} alt="" className="aspect-[4/5] rounded-[10px] object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="client-galleries" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid auto-rows-[120px] grid-cols-2 gap-3 overflow-hidden rounded-[24px] sm:auto-rows-[140px] sm:grid-cols-3 lg:auto-rows-[145px]">
            {masonryImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={`Droptop gallery sample ${index + 1}`}
                className={`${image.className} h-full w-full rounded-[16px] object-cover`}
              />
            ))}
          </div>
          <div id="photo-video-delivery" className="flex scroll-mt-24 flex-col justify-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">Client Gallery</p>
            <h2 className="text-5xl font-semibold leading-none tracking-[-0.04em]">
              Send photos and videos your clients can open in seconds.
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-[#515154]">
              Upload your work, share a private link and let clients view, select and download their files from a clean gallery that looks good on phone and desktop.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Share with a simple link', 'Clients can pick favorites', 'Downloads stay organized', 'Looks professional on every screen'].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-[#d2d2d7] pt-4 text-sm font-medium">
                  <Sparkles size={16} className="text-[#0071e3]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#f5f5f7] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-[#0071e3]">Plans for every stage</p>
            <h2 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              Simple plans. Serious delivery.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#515154]">
              Start with 5 GB at no cost, then move up when your client work needs more storage and advanced delivery tools.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-[28px] border bg-white p-7 transition-transform duration-200 hover:-translate-y-1 ${
                  plan.recommended
                    ? 'border-[#1d1d1f] shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                    : 'border-[#d2d2d7] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                }`}
              >
                {plan.recommended ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[#1d1d1f] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Recommended
                  </span>
                ) : null}

                <h3 className="pr-24 text-xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
                <div className="mt-6 flex items-end gap-1.5">
                  <span className="text-5xl font-semibold leading-none tracking-[-0.05em]">{plan.price}</span>
                  <span className="pb-1 text-sm text-[#6e6e73]">{plan.suffix}</span>
                </div>
                <p className="mt-6 text-sm font-semibold text-[#1d1d1f]">{plan.storage} storage</p>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#6e6e73]">{plan.note}</p>

                <Link
                  href={plan.slug === 'free' ? '/register' : `/register?plan=${plan.slug}`}
                  className={`mt-7 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-[#1d1d1f] text-white hover:bg-black'
                      : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                  }`}
                >
                  {plan.name === 'Free' ? 'Start free' : `Choose ${plan.name}`}
                </Link>

                <ul className="mt-7 flex-1 space-y-3.5 border-t border-[#e5e5e7] pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-5 text-[#424245]">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0071e3]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#6e6e73]">Prices are in USD and billed monthly. Cancel anytime.</p>
        </div>
      </section>

      <SiteFooter/>
    </main>
  );
}
