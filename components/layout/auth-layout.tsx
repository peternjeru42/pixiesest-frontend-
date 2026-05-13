import Link from 'next/link';
import * as React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  image?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
};

export function AuthLayout({ children, image, eyebrow, title, text }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171512]">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#171512] text-sm font-semibold text-[#f7f5f0]">
            L
          </span>
          <span className="text-[15px] font-semibold tracking-[0.18em]">LUMEN</span>
        </Link>
        <Link href="/" className="text-[13px] font-medium text-[#514c43]">
          Back to site
        </Link>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-5 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <section className="mx-auto w-full max-w-[420px]">{children}</section>

        <section className="hidden min-h-[680px] overflow-hidden rounded-[6px] bg-[#d9ddd4] lg:block">
          {image ? (
            <div className="relative h-full min-h-[680px]">
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                {eyebrow && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
                    {eyebrow}
                  </p>
                )}
                {title && <h2 className="mt-4 max-w-lg font-display text-5xl leading-none">{title}</h2>}
                {text && <p className="mt-4 max-w-md leading-7 text-white/78">{text}</p>}
              </div>
            </div>
          ) : (
            <div className="grid h-full place-items-center p-10">
              <div className="w-full max-w-lg rounded-[6px] bg-white p-5 shadow-deep">
                <div className="aspect-[4/3] rounded-[4px] bg-[#ece6da]" />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
