import type { Metadata } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Villiersdorp Secondary School, the high school in Villiersdorp, Western Cape — our history, vision, values, and the people who make our school a place of excellence and belonging.',
  alternates: { canonical: '/about' },
};

const facts = [
  { label: 'Principal', labelAf: 'Skoolhoof', value: 'Mr B Ockhuis' },
  { label: 'Grades', labelAf: 'Grade', value: 'Grade 8 – 12' },
  { label: 'Learners (2025)', labelAf: 'Leerders', value: '921' },
  { label: 'Educators', labelAf: 'Opvoeders', value: '28' },
  { label: 'School Type', labelAf: 'Skooltipe', value: 'Public, co-educational day school' },
  { label: 'Fees', labelAf: 'Skoolgeld', value: 'No-fee school (Quintile 3)' },
  { label: 'Curriculum', labelAf: 'Kurrikulum', value: 'CAPS' },
  { label: 'District', labelAf: 'Distrik', value: 'Overberg (Theewaterskloof Municipality)' },
  { label: 'EMIS Number', labelAf: 'EMIS-nommer', value: '114333077' },
];

const matricResults = [
  { year: '2025', wrote: 131, passed: 104, rate: '79.4%' },
  { year: '2024', wrote: 166, passed: 137, rate: '82.5%' },
  { year: '2023', wrote: 146, passed: 119, rate: '81.5%' },
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
              { en: 'Pride', af: 'Trots' },
              { en: 'Respect', af: 'Respek' },
              { en: 'Integrity', af: 'Integriteit' },
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

      {/* School at a glance */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
          School at a Glance
        </h2>
        <p className="text-white/40 italic mb-12">Skool in 'n neutedop</p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map((f) => (
            <div key={f.label} className="p-6 rounded-2xl border border-white/10 bg-[#223f99]/20">
              <dt className="text-white/50 text-sm mb-1">
                {f.label} <span className="italic">/ {f.labelAf}</span>
              </dt>
              <dd className="text-white text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Matric results */}
      <section className="pb-24 max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
          Matric Results
        </h2>
        <p className="text-white/40 italic mb-12">Matriekuitslae (NSC)</p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-[#223f99]/40 text-white/70 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Year</th>
                <th className="px-6 py-4 font-semibold">Wrote</th>
                <th className="px-6 py-4 font-semibold">Passed</th>
                <th className="px-6 py-4 font-semibold">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {matricResults.map((r) => (
                <tr key={r.year} className="border-t border-white/10 text-white">
                  <td className="px-6 py-4 font-serif text-[#fd1b3d] text-xl">{r.year}</td>
                  <td className="px-6 py-4 tabular-nums">{r.wrote}</td>
                  <td className="px-6 py-4 tabular-nums">{r.passed}</td>
                  <td className="px-6 py-4 tabular-nums font-semibold">{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/40 text-sm mt-4">
          Source: Department of Basic Education NSC results.
        </p>
      </section>
    </div>
  );
}
