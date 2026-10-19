'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ParallaxImage from '@/components/shared/ParallaxImage';

export default function AboutPreview() {
  return (
    <section
      id="about-preview"
      className="py-32 bg-[#172b66] overflow-hidden"
      aria-label="About the school"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text Content */}
          <div>
            <div className="overflow-hidden mb-6">
              <motion.p
                className="text-[#fd1b3d] tracking-[0.3em] uppercase text-xs font-medium"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Our Philosophy
              </motion.p>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                Empowering the leaders of tomorrow, today.
              </motion.h2>
            </div>

            <motion.p
              className="text-white/60 text-base md:text-lg leading-relaxed mb-6 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Villiersdorp Secondary School (Villiersdorp Sekondêr) is a public,
              co-educational high school on Serruriastraat in Villiersdorp, serving
              learners from Grade 8 to Grade 12 in the Overberg district.
            </motion.p>

            <motion.p
              className="text-white/60 text-base md:text-lg leading-relaxed mb-10 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.28 }}
            >
              As a no-fee school, we believe every learner in our community deserves
              a quality education. Our 28 educators, led by principal Mr B Ockhuis,
              help more than 900 learners build their future with pride.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.36 }}
            >
              <Link
                href="/about"
                id="about-read-more"
                className="group inline-flex items-center gap-5 text-white hover:text-[#fd1b3d] transition-colors duration-300"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-medium">
                  Read the full story
                </span>
                <span className="relative flex-shrink-0 w-12 h-[1px] bg-current">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current rotate-45" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Parallax Image with decorative element */}
          <motion.div
            className="relative h-[500px] md:h-[620px] w-full"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <ParallaxImage
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
              alt="Students collaborating in class"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
              strength={60}
            />
            {/* Color overlay */}
            <div className="absolute inset-0 bg-[#172b66]/20 mix-blend-multiply pointer-events-none" />
            {/* Decorative accent block */}
            <div
              className="absolute -bottom-5 -left-5 w-40 h-40 bg-[#fd1b3d] -z-10"
              aria-hidden="true"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
