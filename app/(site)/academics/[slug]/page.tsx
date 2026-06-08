import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { SUBJECT_BY_SLUG_QUERY, ALL_SUBJECT_SLUGS_QUERY } from '@/lib/sanity/queries';

interface Teacher {
  name: string;
  role: string;
  email: string | null;
  photoUrl: string | null;
}

interface Subject {
  _id: string;
  title: string;
  slug: string;
  department: string;
  description: string;
  imageUrl: string | null;
  gradeLevel: string[];
  teacher: Teacher | null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your_project_id_here') return [];
    const slugs = await client.fetch<string[]>(ALL_SUBJECT_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const subject = await client.fetch<Subject | null>(SUBJECT_BY_SLUG_QUERY, { slug });
    if (!subject) return { title: 'Subject Not Found' };
    return {
      title: subject.title,
      description: subject.description,
      openGraph: {
        title: `${subject.title} | Villiersdorp Secondary School`,
        description: subject.description,
        images: subject.imageUrl ? [{ url: subject.imageUrl }] : [],
      },
    };
  } catch {
    return { title: 'Subject' };
  }
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;

  let subject: Subject | null = null;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId && projectId !== 'your_project_id_here') {
      subject = await client.fetch<Subject | null>(SUBJECT_BY_SLUG_QUERY, { slug });
    }
  } catch {
    // falls through to notFound
  }

  if (!subject) {
    // Provide a demo view in development
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="bg-[#172b66] min-h-screen pt-40 max-w-4xl mx-auto px-6 md:px-10">
          <Link href="/academics" className="inline-flex items-center gap-2 text-[#fd1b3d] text-sm mb-8 hover:opacity-70 transition-opacity">
            <ArrowLeft size={14} /> Back to Academics
          </Link>
          <p className="text-white/60 text-lg">Subject &quot;{slug}&quot; not found in Sanity yet.</p>
          <p className="text-white/40 text-sm mt-2">Add content in Sanity Studio at <code className="text-[#fd1b3d]">/admin</code></p>
        </div>
      );
    }
    notFound();
  }

  return (
    <div className="bg-[#172b66] min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end pb-16 overflow-hidden">
        {subject.imageUrl && (
          <div className="absolute inset-0">
            <Image src={subject.imageUrl} alt={subject.title} fill priority className="object-cover opacity-40" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172b66] to-transparent" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 z-10">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#fd1b3d] text-white text-xs uppercase tracking-widest font-medium">
              {subject.department}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white">{subject.title}</h1>
          {subject.gradeLevel?.length > 0 && (
            <p className="text-white/50 text-sm mt-3 tracking-widest">
              {subject.gradeLevel.join(' · ')}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <Link
          href="/academics"
          className="inline-flex items-center gap-2 text-[#fd1b3d] text-sm mb-12 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={14} /> Back to Academics
        </Link>

        {subject.description && (
          <p className="text-white/70 text-xl leading-relaxed mb-12 font-light">
            {subject.description}
          </p>
        )}

        {/* Teacher card */}
        {subject.teacher && (
          <div className="border border-white/10 p-6 flex items-start gap-5 mb-12 hover:border-[#fd1b3d]/30 transition-colors">
            {subject.teacher.photoUrl && (
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                <Image src={subject.teacher.photoUrl} alt={subject.teacher.name} fill className="object-cover" sizes="64px" />
              </div>
            )}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Head Teacher</p>
              <p className="text-white font-medium">{subject.teacher.name}</p>
              <p className="text-white/50 text-sm">{subject.teacher.role}</p>
              {subject.teacher.email && (
                <a href={`mailto:${subject.teacher.email}`} className="inline-flex items-center gap-2 text-[#fd1b3d] text-sm mt-2 hover:opacity-70 transition-opacity">
                  <Mail size={13} /> {subject.teacher.email}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
