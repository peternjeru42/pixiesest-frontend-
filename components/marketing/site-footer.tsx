import Link from 'next/link';

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Client galleries', href: '/#client-galleries' },
      { label: 'Photo & video delivery', href: '/#photo-video-delivery' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Start free', href: '/register' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Droptop Blog', href: '/blog' },
      { label: 'Gallery comparisons', href: '/blog#platform-comparisons' },
      { label: 'Pixieset alternatives', href: '/blog#pixieset-alternatives' },
      { label: 'View plans', href: '/#pricing' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Create an account', href: '/register' },
      { label: 'Log in', href: '/login' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Billing & storage', href: '/dashboard/billing' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d2d2d7] bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 border-b border-[#d2d2d7] py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#0066cc]">Start with 5 GB free</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
              Deliver your next gallery with Droptop.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#6e6e73]">
              Private galleries, client favorites, photo and video delivery, and controlled downloads in one clean workspace.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-[#1d1d1f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1d1f]"
          >
            Create a free account
          </Link>
        </div>

        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-10 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Droptop home">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1d1d1f] text-base font-semibold text-white">D</span>
              <span className="text-[15px] font-semibold tracking-[0.18em]">DROPTOP</span>
            </Link>
            <p className="mt-5 max-w-sm text-base leading-7 text-[#6e6e73]">
              A simple, polished way for photographers and videographers to share client work online.
            </p>
          </div>

          {footerGroups.map(group => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="text-sm font-semibold text-[#1d1d1f]">{group.title}</h2>
              <ul className="mt-5 space-y-3.5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm leading-6 text-[#6e6e73] transition-colors hover:text-[#1d1d1f]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#d2d2d7] py-7 text-[13px] leading-6 text-[#6e6e73] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Droptop. All rights reserved.</p>
          <p>Built for photographers and videographers.</p>
        </div>
      </div>
    </footer>
  );
}
