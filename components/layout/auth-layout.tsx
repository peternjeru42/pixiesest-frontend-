import * as React from 'react';

export function AuthLayout({ children, image, quote }: { children: React.ReactNode; image: string; quote?: { text: string; cite: string } }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative bg-ink text-bg overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55"/>
        {quote && (
          <div className="absolute bottom-14 left-12 right-12 z-10 serif italic text-3xl leading-tight text-bg/95">
            "{quote.text}"
            <cite className="block mono not-italic text-[11px] tracking-[0.14em] uppercase mt-4 opacity-75">— {quote.cite}</cite>
          </div>
        )}
      </div>
      <div className="grid place-items-center px-6 py-12 bg-bg">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
