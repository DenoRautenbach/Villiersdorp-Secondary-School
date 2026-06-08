import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { ALL_SUBJECTS_QUERY } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Academics',
  description:
    'Explore the full range of academic subjects offered at Villiersdorp Secondary School across Sciences, Humanities, Languages, Arts, Commerce, and Technology.',
};

interface Subject {
  _id: string;
  title: string;
  slug: string;
  department: string;
  description: string;
  imageUrl: string | null;
}

const fallbackSubjects: Subject[] = [
  { _id: '1', title: 'Mathematics', slug: 'mathematics', department: 'Sciences', description: 'Pure and applied mathematics for Grades 8–12.', imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800' },
  { _id: '2', title: 'Physical Sciences', slug: 'physical-sciences', department: 'Sciences', description: 'Physics and chemistry explored through theory and practical labs.', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800' },
  { _id: '3', title: 'Life Sciences', slug: 'life-sciences', department: 'Sciences', description: 'Biology and environmental science for the modern world.', imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800' },
  { _id: '4', title: 'History', slug: 'history', department: 'Humanities', description: 'South African and world history, critical analysis and essay skills.', imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800' },
  { _id: '5', title: 'Geography', slug: 'geography', department: 'Humanities', description: 'Human and physical geography with GIS and mapwork skills.', imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800' },
  { _id: '6', title: 'Afrikaans', slug: 'afrikaans', department: 'Languages', description: 'First and second additional language Afrikaans programmes.', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800' },
  { _id: '7', title: 'English', slug: 'english', department: 'Languages', description: 'English Home Language and First Additional Language.', imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800' },
  { _id: '8', title: 'Visual Arts', slug: 'visual-arts', department: 'Arts', description: 'Drawing, painting, design, and visual communication.', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800' },
  { _id: '9', title: 'Business Studies', slug: 'business-studies', department: 'Commerce', description: 'Entrepreneurship, management, and business principles.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800' },
  { _id: '10', title: 'Economics', slug: 'economics', department: 'Commerce', description: 'Micro and macroeconomics with real-world applications.', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800' },
  { _id: '11', title: 'Computer Applications Technology', slug: 'cat', department: 'Technology', description: 'Practical computing, data handling, and digital literacy.', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800' },
  { _id: '12', title: 'Accounting', slug: 'accounting', department: 'Commerce', description: 'Financial accounting and bookkeeping from Grade 10.', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800' },
];

const departments = ['All', 'Sciences', 'Humanities', 'Languages', 'Arts', 'Commerce', 'Technology'];

async function getSubjects(): Promise<Subject[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your_project_id_here') return fallbackSubjects;
    const data = await client.fetch<Subject[]>(ALL_SUBJECTS_QUERY, {}, { next: { revalidate: 3600 } });
    return data?.length ? data : fallbackSubjects;
  } catch {
    return fallbackSubjects;
  }
}

export default async function AcademicsPage() {
  const subjects = await getSubjects();

  const grouped = departments.slice(1).reduce<Record<string, Subject[]>>((acc, dept) => {
    acc[dept] = subjects.filter((s) => s.department === dept);
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
