import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import { staticSubjects } from '@/lib/staticData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticSubjects.map((subject) => ({
    slug: subject.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = staticSubjects.find((s) => s.slug === slug);
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
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;
  const subject = staticSubjects.find((s) => s.slug === slug);

  if (!subject) {
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
          <p className="text-white/70 text-xl leading-relaxed mb-8 font-light">
            {subject.description}
          </p>
        )}

        {subject.content && (
          <div className="text-white/60 leading-relaxed space-y-6 text-base font-light mb-12 whitespace-pre-line">
            {subject.content}
          </div>
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
