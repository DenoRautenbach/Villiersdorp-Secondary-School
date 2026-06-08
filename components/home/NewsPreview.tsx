'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
}

const fallbackNews: NewsItem[] = [
  {
    _id: '1',
    title: 'Grade 12 Class of 2025 Achieves Outstanding Matric Results',
    slug: 'matric-results-2025',
    category: 'Achievement',
    publishedAt: '2026-01-15T00:00:00Z',
    excerpt: 'Villiersdorp Secondary School celebrates a 98% matric pass rate for the class of 2025, with 14 distinctions awarded.',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800',
  },
  {
    _id: '2',
    title: 'Annual Cultural Festival Returns with Record Participation',
    slug: 'cultural-festival-2025',
    category: 'Arts & Culture',
    publishedAt: '2025-11-02T00:00:00Z',
    excerpt: "This year's cultural festival saw participation from all 1,200 learners, showcasing the rich diversity of our school community.",
    imageUrl: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=800',
  },
  {
    _id: '3',
    title: 'New Science Lab Opening Elevates STEM Programme',
    slug: 'new-science-lab',
    category: 'Academics',
    publishedAt: '2025-09-18T00:00:00Z',
    excerpt: 'Thanks to community partnerships, our state-of-the-art science laboratory opened this term, benefiting all Grade 10–12 science learners.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800',
  },
];

export default function NewsPreview() {
  const [articles, setArticles] = useState<NewsItem[]>(fallbackNews);

  useEffect(() => {
    // Attempt to fetch from Sanity API route once on mount
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your_project_id_here') return;

    fetch('/api/news-preview')
      .then((r) => r.json())
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) setArticles(data);
      })
      .catch(() => {
        // Keep fallback
      });
  }, []);

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
