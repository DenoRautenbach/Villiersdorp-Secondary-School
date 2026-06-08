import type { Metadata } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Villiersdorp Secondary School — our history, vision, values, and the people who make our school a place of excellence and belonging.',
};

const milestones = [
  { year: '1952', event: 'School founded in Villiersdorp', eventAf: 'Skool gestig in Villiersdorp' },
  { year: '1978', event: 'First purpose-built campus completed', eventAf: 'Eerste doelgeboude kampus voltooi' },
  { year: '1995', event: 'Integration and new era of unity', eventAf: 'Integrasie en nuwe eenheid' },
  { year: '2010', event: 'Provincial excellence award received', eventAf: 'Provinsiale uitnemendheidskommers ontvang' },
  { year: '2019', event: 'New science & technology block opens', eventAf: 'Nuwe wetenskap- & tegnologieblok oop' },
  { year: '2024', event: '98% Matric pass rate — highest ever', eventAf: '98% Matriekslaagkoers — hoogste ooit' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#172b66] min-h-screen">
      {/* Hero banner */}
      <section className="relative h-[55vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
            alt="Villiersdorp Secondary School"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172b66] via-[#172b66]/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 z-10">
          <p className="text-[#fd1b3d] tracking-[0.3em] uppercase text-xs mb-4 font-medium">
            Our Story
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white">
            About Villiersdorp<br />Secondary School
          </h1>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              Our Vision
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light">
              To be the leading school of choice in the Overberg region — where every
              learner is inspired to achieve their highest potential academically,
              socially, and personally.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              Our Mission
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light">
              We provide a safe, inclusive, and stimulating environment that nurtures
              intellectual curiosity, encourages responsible citizenship, and celebrates
              the unique talents of every learner.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#223f99]/20 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="font-serif text-3xl text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { en: 'Excellence', af: 'Uitnemendheid' },
              { en: 'Integrity', af: 'Integriteit' },
              { en: 'Respect', af: 'Respek' },
              { en: 'Community', af: 'Gemeenskap' },
            ].map((value) => (
              <div key={value.en} className="p-6 border border-white/10 hover:border-[#fd1b3d]/40 transition-colors">
                <p className="font-serif text-2xl text-white mb-1">{value.en}</p>
                <p className="text-white/40 text-sm italic">{value.af}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-16">
          Our History
        </h2>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start border-b border-white/10 py-8"
            >
              <span className="font-serif text-[#fd1b3d] text-2xl md:text-3xl tabular-nums">
                {m.year}
              </span>
              <div>
                <p className="text-white text-base md:text-lg">{m.event}</p>
                <p className="text-white/40 text-sm italic mt-1">{m.eventAf}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
