'use client';

import { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import AboutPreview from '@/components/home/AboutPreview';
import Marquee from '@/components/home/Marquee';
import NewsPreview from '@/components/home/NewsPreview';

// Lazy load preloader to avoid SSR issues
const Preloader = dynamic(() => import('@/components/home/Preloader'), { ssr: false });

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-[#172b66] min-h-screen">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Always rendered so search engines see the content; the full-screen preloader sits on top */}
      {/* Remount the hero after the preloader so its entrance animation plays */}
      <Hero key={loading ? 'hero-preload' : 'hero'} />
      <Stats />
      <AboutPreview />
      <Marquee />
      <NewsPreview />
    </div>
  );
}
