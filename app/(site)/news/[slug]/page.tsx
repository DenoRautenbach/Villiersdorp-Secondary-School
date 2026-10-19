import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { NEWS_BY_SLUG_QUERY, ALL_NEWS_SLUGS_QUERY } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';

interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  author: { name: string; role: string; photoUrl: string | null } | null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your_project_id_here') return [];
    const slugs = await client.fetch<string[]>(ALL_NEWS_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await client.fetch<NewsArticle | null>(NEWS_BY_SLUG_QUERY, { slug });
    if (!article) return { title: 'Article Not Found' };
    return {
      title: article.title,
      description: article.excerpt,
      alternates: { canonical: `/news/${slug}` },
      openGraph: {
        title: `${article.title} | VSS`,
        description: article.excerpt,
        images: article.imageUrl ? [{ url: article.imageUrl }] : [],
        type: 'article',
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    return { title: 'News' };
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;

  let article: NewsArticle | null = null;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId && projectId !== 'your_project_id_here') {
      article = await client.fetch<NewsArticle | null>(NEWS_BY_SLUG_QUERY, { slug });
    }
  } catch {
    // falls through
  }

  if (!article) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="bg-[#172b66] min-h-screen pt-40 max-w-3xl mx-auto px-6 md:px-10">
          <Link href="/news" className="inline-flex items-center gap-2 text-[#fd1b3d] text-sm mb-8 hover:opacity-70 transition-opacity">
            <ArrowLeft size={14} /> Back to News
          </Link>
          <p className="text-white/60 text-lg">Article &quot;{slug}&quot; not found in Sanity yet.</p>
          <p className="text-white/40 text-sm mt-2">Add content in Sanity Studio at <code className="text-[#fd1b3d]">/admin</code></p>
        </div>
      );
    }
    notFound();
  }

  return (
    <div className="bg-[#172b66] min-h-screen">
      {/* Cover image */}
      {article.imageUrl && (
        <div className="relative h-[50vh] w-full overflow-hidden">
          <Image src={article.imageUrl} alt={article.title} fill priority className="object-cover opacity-60" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172b66] to-transparent" />
        </div>
      )}

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <Link href="/news" className="inline-flex items-center gap-2 text-[#fd1b3d] text-sm mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={14} /> Back to News
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-[#fd1b3d] text-white text-xs uppercase tracking-widest font-medium">
            {article.category}
          </span>
          <time className="text-white/40 text-xs uppercase tracking-widest">
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-white/70 text-xl leading-relaxed mb-10 font-light border-l-2 border-[#fd1b3d] pl-6">
            {article.excerpt}
          </p>
        )}

        {/* Author */}
        {article.author && (
          <div className="flex items-center gap-4 pb-10 border-b border-white/10 mb-10">
            {article.author.photoUrl && (
              <div className="relative w-10 h-10 overflow-hidden rounded-full flex-shrink-0">
                <Image src={article.author.photoUrl} alt={article.author.name} fill className="object-cover" sizes="40px" />
              </div>
            )}
            <div>
              <p className="text-white text-sm font-medium">{article.author.name}</p>
              <p className="text-white/40 text-xs">{article.author.role}</p>
            </div>
          </div>
        )}

        <p className="text-white/50 text-sm">
          Full article content will render here once connected to Sanity CMS.
        </p>
      </article>
    </div>
  );
}
