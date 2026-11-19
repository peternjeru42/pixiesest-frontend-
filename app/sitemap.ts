import type { MetadataRoute } from 'next';
import { articles, publishedDate } from '@/lib/blog/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://droptop.studio';
  return [
    { url: baseUrl, lastModified: publishedDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: publishedDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog/editorial-policy`, lastModified: publishedDate, changeFrequency: 'monthly', priority: 0.5 },
    ...articles.map(article => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: publishedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
