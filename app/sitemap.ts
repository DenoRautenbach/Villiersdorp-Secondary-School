import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { ALL_NEWS_SLUGS_QUERY, ALL_SUBJECT_SLUGS_QUERY } from '@/lib/sanity/queries';
import { siteUrl } from '@/lib/utils';

async function fetchSlugs(query: string): Promise<string[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your_project_id_here') return [];
    return await client.fetch<string[]>(query);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [subjects, news] = await Promise.all([
    fetchSlugs(ALL_SUBJECT_SLUGS_QUERY),
    fetchSlugs(ALL_NEWS_SLUGS_QUERY),
  ]);
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/academics`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/news`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    ...subjects.map((slug) => ({
      url: `${siteUrl}/academics/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...news.map((slug) => ({
      url: `${siteUrl}/news/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
