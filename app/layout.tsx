import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Droptop — Photography Client Galleries',
  description: 'A lean, premium photography client gallery platform.',
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
