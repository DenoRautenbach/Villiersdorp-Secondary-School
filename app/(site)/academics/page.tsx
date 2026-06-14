import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { staticSubjects } from '@/lib/staticData';

export const metadata: Metadata = {
  title: 'Academics',
  description:
    'Explore the full range of academic subjects offered at Villiersdorp Secondary School across Sciences, Humanities, Languages, Arts, Commerce, and Technology.',
};

const departments = ['All', 'Sciences', 'Humanities', 'Languages', 'Arts', 'Commerce', 'Technology'];

export default function AcademicsPage() {
  const grouped = departments.slice(1).reduce<Record<string, typeof staticSubjects>>((acc, dept) => {
    acc[dept] = staticSubjects.filter((s) => s.department === dept);
    return acc;
  }, {});

  return (
    <div className="bg-[#172b66] min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-20 max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[#fd1b3d] tracking-[0.3em] uppercase text-xs mb-6 font-medium">
          Academics / Akademies
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
          Our Subjects
        </h1>
        <p className="text-white/60 text-lg max-w-2xl font-light">
          We offer a comprehensive range of CAPS-aligned subjects across six departments,
          from Grade 8 through to Matric.
        </p>
      </section>

      {/* Subjects by department */}
      {departments.slice(1).map((dept) => {
        const items = grouped[dept];
        if (!items?.length) return null;
        return (
          <section key={dept} className="py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-10">{dept}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((subject) => (
                  <Link
                    key={subject._id}
                    href={`/academics/${subject.slug}`}
                    id={`subject-${subject._id}`}
                    className="group relative overflow-hidden border border-white/10 hover:border-[#fd1b3d]/50 transition-colors duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      {subject.imageUrl ? (
                        <Image
                          src={subject.imageUrl}
                          alt={subject.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#223f99]" />
                      )}
                    </div>
                    {/* Text */}
                    <div className="p-5">
                      <h3 className="font-serif text-xl text-white mb-2 group-hover:text-[#fd1b3d] transition-colors duration-300">
                        {subject.title}
                      </h3>
                      {subject.description && (
                        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                          {subject.description}
                        </p>
                      )}
                    </div>
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#fd1b3d] group-hover:w-full transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
