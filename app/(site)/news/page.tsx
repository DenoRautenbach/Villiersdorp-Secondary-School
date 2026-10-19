import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { ALL_NEWS_QUERY } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'News & Announcements',
  description:
    'Stay up to date with the latest news, events, achievements, and announcements from Villiersdorp Secondary School.',
  alternates: { canonical: '/news' },
};

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  author: { name: string; role: string } | null;
}

const fallbackNews: NewsItem[] = [
  { _id: '1', title: 'Class of 2025 Matric Results', slug: 'matric-results-2025', category: 'Achievement', publishedAt: '2026-01-15T00:00:00Z', excerpt: '104 of our 131 Grade 12 candidates passed the 2025 National Senior Certificate exams — a 79.4% pass rate. Congratulations, matrics!', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800', author: null },
  { _id: '2', title: 'Annual Cultural Festival Returns with Record Participation', slug: 'cultural-festival-2025', category: 'Arts & Culture', publishedAt: '2025-11-02T00:00:00Z', excerpt: "This year's cultural festival saw participation from our 921 learners.", imageUrl: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=800', author: null },
  { _id: '3', title: 'New Science Lab Opens', slug: 'new-science-lab', category: 'Academics', publishedAt: '2025-09-18T00:00:00Z', excerpt: 'Our state-of-the-art science laboratory opened this term, benefiting all Grade 10–12 science learners.', imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800', author: null },
  { _id: '4', title: 'U16 Rugby Team Reaches Western Cape Finals', slug: 'u16-rugby-finals', category: 'Sports', publishedAt: '2025-08-10T00:00:00Z', excerpt: 'Our Under-16 rugby team has qualified for the Western Cape School Sports finals for the first time in school history.', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800', author: null },
  { _id: '5', title: 'School Garden Project Wins Community Award', slug: 'garden-award', category: 'Community', publishedAt: '2025-07-22T00:00:00Z', excerpt: 'Our learner-run vegetable garden project received the Overberg Community Excellence Award this month.', imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800', author: null },
  { _id: '6', title: 'Term 3 Examination Timetable Released', slug: 'term-3-timetable', category: 'Announcement', publishedAt: '2025-06-30T00:00:00Z', excerpt: 'The Term 3 examination timetable is now available. All learners should check the schedule on the school notice board.', imageUrl: null, author: null },
];

async function getAllNews(): Promise<NewsItem[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your_project_id_here') return fallbackNews;
    const data = await client.fetch<NewsItem[]>(ALL_NEWS_QUERY, {}, { next: { revalidate: 3600 } });
    return data?.length ? data : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export default async function NewsPage() {
  const articles = await getAllNews();
  const [featured, ...rest] = articles;

  return (
    <div className="bg-[#172b66] min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-20 max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[#fd1b3d] tracking-[0.3em] uppercase text-xs mb-6 font-medium">
          News &amp; Announcements / Nuus
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-white">
          Latest from VSS
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        {/* Featured article */}
        {featured && (
          <Link href={`/news/${featured.slug}`} id="news-featured" className="group block mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 hover:border-[#fd1b3d]/40 transition-colors duration-500 overflow-hidden">
              {featured.imageUrl && (
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-[#fd1b3d] text-white text-xs uppercase tracking-widest font-medium mb-6 self-start">
                  {featured.category}
                </span>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                  {formatDate(featured.publishedAt)}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 group-hover:text-[#fd1b3d] transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-3 text-[#fd1b3d] text-xs uppercase tracking-widest group-hover:gap-5 transition-all duration-300">
                  Read article <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article._id}
              href={`/news/${article.slug}`}
              id={`news-${article._id}`}
              className="group border border-white/10 hover:border-[#fd1b3d]/40 transition-colors duration-500 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-[#223f99]/40 flex items-center justify-center">
                    <span className="text-white/20 text-xs uppercase tracking-widest">No image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#fd1b3d] text-white text-[10px] uppercase tracking-widest font-medium">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                  {formatDate(article.publishedAt)}
                </p>
                <h3 className="font-serif text-xl text-white mb-3 group-hover:text-[#fd1b3d] transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
