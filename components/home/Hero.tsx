'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 220]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.08]);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#0e1c44] flex items-center justify-center"
      aria-label="Hero section"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#172b66]/50 to-[#172b66] z-10" />
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="Villiersdorp Secondary School campus"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay z-20" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-20"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <div className="overflow-hidden mb-6">
          <motion.p
            className="text-[#fd1b3d] tracking-[0.4em] uppercase text-xs md:text-sm font-medium"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            Excellence in the Heart of the Overberg
          </motion.p>
        </div>

        {/* Main heading */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-[7rem] font-serif text-white leading-[1.05] tracking-tight"
            initial={{ y: 160 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            A Legacy of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd1b3d] to-[#F8DFE7]">
              Brilliance.
            </span>
          </motion.h1>
        </div>

        {/* Subline */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
          >
            Shaping confident, critical thinkers who lead with integrity — rooted
            in the Western Cape community, reaching for the world.
          </motion.p>
        </div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Link
            href="/contact"
            id="hero-apply-btn"
            className="btn-primary group"
          >
            Apply Now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            id="hero-story-btn"
            className="btn-outline"
          >
            Discover Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase">
          Scroll to explore
        </span>
        <div className="w-[1px] h-14 bg-white/15 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#fd1b3d]"
            animate={{ y: ['0%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Horizontal rule line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
    </section>
  );
}
