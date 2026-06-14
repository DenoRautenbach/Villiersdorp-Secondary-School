import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { staticNews } from '@/lib/staticData';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'News & Announcements',
  description:
    'Stay up to date with the latest news, events, achievements, and announcements from Villiersdorp Secondary School.',
};

export default function NewsPage() {
  const [featured, ...rest] = staticNews;

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
