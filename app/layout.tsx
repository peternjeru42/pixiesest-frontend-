import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://droptop.studio'),
  title: {
    default: 'Droptop — Photography Client Galleries',
    template: '%s | Droptop',
  },
  description: 'Private photo and video client galleries for professional photographers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-bg text-ink">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
