'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  labelAf: string;
}

const stats: StatItem[] = [
  { icon: GraduationCap, value: '98%', label: 'Matric Pass Rate', labelAf: 'Matriekslaagkoers' },
  { icon: BookOpen, value: '45+', label: 'Academic Subjects', labelAf: 'Akademiese Vakke' },
  { icon: Users, value: '1,200', label: 'Enrolled Students', labelAf: 'Ingeskryfde Leerders' },
  { icon: Trophy, value: '15', label: 'Provincial Awards', labelAf: 'Provinsiale Toekennings' },
];

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-8 border border-white/8 bg-[#223f99]/20 backdrop-blur-sm relative group hover:border-[#fd1b3d]/40 transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top accent line that fills on hover */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#fd1b3d] group-hover:w-full transition-all duration-500" />

      <item.icon
        className="text-[#fd1b3d] mb-5"
        size={30}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="text-4xl md:text-5xl font-serif text-white mb-2 tabular-nums">
        {item.value}
      </h3>
      <p className="text-white/50 text-xs tracking-[0.2em] uppercase">{item.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-20 bg-[#172b66] relative z-20"
      aria-label="School statistics"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
