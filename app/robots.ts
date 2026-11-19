import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://droptop.studio';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/ops/', '/dashboard/', '/collections/', '/profile/'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
