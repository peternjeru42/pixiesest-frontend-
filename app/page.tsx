import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Download,
  Image as ImageIcon,
  LayoutTemplate,
  Menu,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
];

const products = [
  {
    icon: ImageIcon,
    title: 'Client Gallery',
    text: 'Share, proof, download and sell photos through polished online galleries.',
  },
  {
    icon: LayoutTemplate,
    title: 'Website',
    text: 'Build a portfolio site that carries the same quiet brand experience.',
  },
  {
    icon: CalendarCheck,
    title: 'Studio Manager',
    text: 'Keep bookings, invoices and client communication close to delivery.',
  },
  {
    icon: ShoppingBag,
    title: 'Store',
    text: 'Sell prints, products and digital downloads without extra handoff.',
  },
];

const stats = [
  ['1M+', 'photographers supported'],
  ['6B+', 'photos delivered'],
  ['10+', 'years serving studios'],
  ['$1.5B+', 'sold through stores'],
];

const workflows = ['Wedding', 'Portrait', 'Family', 'Seniors', 'Events', 'Adventure', 'Commercial', 'Sports'];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171512]">
      <header className="sticky top-0 z-40 border-b border-[#ded8cc] bg-[#f7f5f0]/92 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#171512] text-sm font-semibold text-[#f7f5f0]">
              L
            </span>
            <span className="text-[15px] font-semibold tracking-[0.18em]">LUMEN</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#514c43] md:flex">
            <a href="#products">Products</a>
            <a href="#examples">Examples</a>
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
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">
            Photographer platform
          </p>
          <h1 className="max-w-2xl font-display text-[48px] font-medium leading-[0.98] tracking-normal text-[#171512] sm:text-[64px] lg:text-[76px]">
            Designed for photographers. Built to help you grow.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f594f]">
            Deliver client galleries, launch your portfolio, sell prints and run the business side of your studio from one refined workspace.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[#171512] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#39342c]"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <Link
              href="#products"
              className="inline-flex h-12 items-center justify-center rounded-[4px] border border-[#cfc7b7] bg-white px-6 text-sm font-semibold text-[#171512] transition-colors hover:bg-[#efebe3]"
            >
              Explore Products
            </Link>
          </div>
          <div className="mt-9 grid max-w-lg grid-cols-2 gap-x-8 gap-y-3 text-sm text-[#514c43]">
            {['Free to start', 'No credit card required', 'Gallery proofing', 'Print sales ready'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={15} className="text-[#5f7b62]" />
                {item}
              </div>
            ))}
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

      <section id="products" className="border-y border-[#ded8cc] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">All-in-one platform</p>
            <h2 className="font-display text-5xl font-medium leading-none tracking-normal">Everything you need. All in one place.</h2>
            <p className="mt-5 max-w-md leading-7 text-[#625c52]">
              A suite of products intentionally shaped for the key stages of a photography business.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[6px] border border-[#e0dacf] bg-[#fbfaf7] p-6">
                <Icon size={22} className="mb-8 text-[#496d71]" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#625c52]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[6px] bg-[#dfe6e0]">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
              alt="Outdoor portrait gallery"
              className="h-full min-h-[460px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">Client Gallery</p>
            <h2 className="font-display text-5xl font-medium leading-none tracking-normal">
              The gallery experience clients remember.
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-[#625c52]">
              Present full-resolution work with favorites, proofing, digital delivery and print sales in a branded flow that feels deliberate from the first click.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Private access controls', 'Favorites and proofing', 'High-res delivery', 'Integrated store'].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-[#d8d1c4] pt-4 text-sm font-medium">
                  <Sparkles size={16} className="text-[#496d71]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="examples" className="bg-[#1b1a17] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b3aa99]">
                Designed for every workflow
              </p>
              <h2 className="font-display text-5xl font-medium leading-none tracking-normal">Made for all photographers.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {workflows.map((workflow) => (
                <div key={workflow} className="rounded-[6px] border border-white/12 bg-white/6 p-5 text-sm font-semibold">
                  {workflow}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={value} className="border-t border-white/16 pt-5">
                <div className="font-display text-5xl leading-none">{value}</div>
                <p className="mt-3 text-sm text-[#c7bead]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-5xl px-5 py-20 text-center lg:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">Start free</p>
        <h2 className="font-display text-5xl font-medium leading-none tracking-normal">Start using Lumen today for free.</h2>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-[#625c52]">
          Build your first galleries now and upgrade when your studio needs more storage, storefront tools or team workflows.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[#171512] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#39342c]"
        >
          Get Started <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="border-t border-[#ded8cc] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[#625c52] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="font-semibold tracking-[0.18em] text-[#171512]">LUMEN</div>
          <div className="flex flex-wrap gap-5">
            <Link href="#products">Products</Link>
            <Link href="#examples">Examples</Link>
            <Link href="/login">Log In</Link>
            <Link href="/register">Get Started</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
