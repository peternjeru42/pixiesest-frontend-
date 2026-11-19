import type { MetadataRoute } from 'next';
import { articles, modifiedDate } from '@/lib/blog/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.droptop.app';
  return [
    { url: baseUrl, lastModified: modifiedDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: modifiedDate, changeFrequency: 'weekly', priority: 0.9 },
    ...articles.map(article => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: article.modifiedDate ?? modifiedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
