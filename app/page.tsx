import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Download,
  Menu,
  Sparkles,
} from 'lucide-react';

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
    name: 'Free',
    price: 'Free',
    storage: '5 GB',
    note: 'A clean starting point for every new user.',
    features: ['5 GB storage', 'Beautiful client galleries', 'Shareable gallery links', 'Photo and video uploads'],
  },
  {
    name: 'Starter',
    price: '250 KSh',
    suffix: '/month',
    storage: '12 GB',
    note: 'For light shoots and small client deliveries.',
    features: ['12 GB storage', 'Private client galleries', 'Favorites for client selection', 'High-quality downloads'],
  },
  {
    name: 'Pro',
    price: '500 KSh',
    suffix: '/month',
    storage: '25 GB',
    note: 'Best value for active photographers and videographers.',
    recommended: true,
    features: ['25 GB storage', 'Priority gallery delivery', 'Favorites and proofing', 'Best for regular paid shoots'],
  },
  {
    name: 'Studio',
    price: '1,000 KSh',
    suffix: '/month',
    storage: '100 GB',
    note: 'For studios handling many galleries each month.',
    features: ['100 GB storage', 'More room for video files', 'Multiple client projects', 'Built for busy teams'],
  },
  {
    name: 'Custom',
    price: 'Custom',
    storage: 'As needed',
    note: 'Need more storage or a tailored setup? Call us for a quote.',
    features: ['Custom storage', 'Flexible package size', 'Quote based on your workload', 'Support for high-volume delivery'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171512]">
      <header className="sticky top-0 z-40 border-b border-[#ded8cc] bg-[#f7f5f0]/92 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#171512] text-sm font-semibold text-[#f7f5f0]">
              D
            </span>
            <span className="text-[15px] font-semibold tracking-[0.18em]">DROPTOP</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#514c43] md:flex">
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-[13px] font-medium text-[#514c43]">
              Log In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#171512] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#39342c]"
            >
              Get Started
            </Link>
          </div>
          <Link
            href="/login"
            aria-label="Open login"
            className="grid h-10 w-10 place-items-center rounded-[4px] border border-[#d6d0c3] md:hidden"
          >
            <Menu size={18} />
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#d7cec0] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5f594f]">
              Free 5GB for every new user
            </span>
            <span className="rounded-full bg-[#171512] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Works like Pixieset but 10 times cheaper
            </span>
          </div>
          <h1 className="max-w-2xl font-display text-[48px] font-medium leading-[0.98] tracking-normal text-[#171512] sm:text-[64px] lg:text-[76px]">
            Share your work beautifully and professionally.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f594f]">
            Droptop is built for photographers and videographers who need a simple, polished way to deliver galleries, videos and client projects online.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[#171512] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#39342c]"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-[4px] border border-[#cfc7b7] bg-white px-6 text-sm font-semibold text-[#171512] transition-colors hover:bg-[#efebe3]"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[6px] bg-[#ebe5d8]">
          <img
            src={galleryImages[0]}
            alt="Wedding gallery preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[6px] bg-white p-4 shadow-deep sm:left-8 sm:right-8 sm:p-5">
            <div className="flex items-center justify-between gap-4 border-b border-[#e5dfd4] pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a7265]">Client Gallery</p>
                <h2 className="mt-1 font-display text-3xl leading-none">Meghan & Desmond</h2>
              </div>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#171512] text-white" aria-label="Download gallery">
                <Download size={17} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {galleryImages.map((image) => (
                <img key={image} src={image} alt="" className="aspect-[4/5] rounded-[4px] object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid auto-rows-[120px] grid-cols-2 gap-3 overflow-hidden rounded-[6px] sm:auto-rows-[140px] sm:grid-cols-3 lg:auto-rows-[145px]">
            {masonryImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={`Droptop gallery sample ${index + 1}`}
                className={`${image.className} h-full w-full rounded-[4px] object-cover`}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">Client Gallery</p>
            <h2 className="font-display text-5xl font-medium leading-none tracking-normal">
              Send photos and videos your clients can open in seconds.
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-[#625c52]">
              Upload your work, share a private link and let clients view, select and download their files from a clean gallery that looks good on phone and desktop.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Share with a simple link', 'Clients can pick favorites', 'Downloads stay organized', 'Looks professional on every screen'].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-[#d8d1c4] pt-4 text-sm font-medium">
                  <Sparkles size={16} className="text-[#496d71]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">Start free</p>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <h2 className="font-display text-5xl font-medium leading-none tracking-normal">Simple storage-based pricing.</h2>
            <p className="mt-5 max-w-xl leading-8 text-[#625c52]">
              Every new user gets 5 GB free. Upgrade only when you need more room for client galleries and video projects.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[#171512] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#39342c] lg:justify-self-end"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-[6px] border bg-white p-6 ${
                plan.recommended ? 'border-[#171512] shadow-deep' : 'border-[#ded8cc]'
              }`}
            >
              {plan.recommended && (
                <span className="absolute right-4 top-4 rounded-full bg-[#171512] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  Recommended
                </span>
              )}
              <h3 className="pr-24 text-lg font-semibold">{plan.name}</h3>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-4xl leading-none">{plan.price}</span>
                {plan.suffix && <span className="pb-1 text-sm text-[#786f61]">{plan.suffix}</span>}
              </div>
              <div className="mt-6 border-t border-[#e4ded3] pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#786f61]">Storage</p>
                <p className="mt-2 text-2xl font-semibold">{plan.storage}</p>
              </div>
              <p className="mt-5 min-h-12 leading-6 text-[#625c52]">{plan.note}</p>
              <ul className="mt-6 space-y-3 border-t border-[#e4ded3] pt-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm leading-6 text-[#514c43]">
                    <Check size={15} className="mt-1 shrink-0 text-[#5f7b62]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.name === 'Custom' && (
                <div className="mt-6 space-y-2 text-sm font-semibold">
                  <a href="tel:0716333142" className="block text-[#171512] hover:text-[#496d71]">
                    0716333142
                  </a>
                  <a href="tel:+254746149916" className="block text-[#171512] hover:text-[#496d71]">
                    +254 746 149916
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[#625c52]">
          Works like Pixieset but 10 times cheaper, with storage packages that fit local creators.
        </p>
      </section>

      <footer className="border-t border-[#ded8cc] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[#625c52] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="font-semibold tracking-[0.18em] text-[#171512]">DROPTOP</div>
          <div className="flex flex-wrap gap-5">
            <Link href="#pricing">Pricing</Link>
            <Link href="/login">Log In</Link>
            <Link href="/register">Get Started</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
