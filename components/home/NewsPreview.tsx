'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { staticNews } from '@/lib/staticData';

export default function NewsPreview() {
  const articles = staticNews.slice(0, 3);

  return (
    <section
      id="news-preview"
      className="py-32 bg-[#172b66]"
      aria-label="Latest news"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              className="text-[#fd1b3d] tracking-[0.3em] uppercase text-xs font-medium mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Latest Updates
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-serif text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
            >
              News &amp; Announcements
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/news"
              id="news-view-all"
              className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* News cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
              className="group"
            >
              <Link href={`/news/${article.slug}`} id={`news-card-${article._id}`}>
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden mb-5">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#223f99]" />
                  )}
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#fd1b3d] text-white text-[10px] uppercase tracking-widest font-medium">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                  {formatDate(article.publishedAt)}
                </p>
                <h3 className="text-white font-serif text-xl leading-snug mb-3 group-hover:text-[#fd1b3d] transition-colors duration-300">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
