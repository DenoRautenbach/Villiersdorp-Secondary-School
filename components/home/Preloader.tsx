'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return next;
      });
    }, 130);
    return () => clearInterval(interval);
  }, [onComplete]);

  const clamped = Math.min(progress, 100);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[500] bg-[#172b66] flex flex-col items-center justify-center"
        exit={{
          y: '-100%',
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-serif text-4xl md:text-7xl text-white tracking-[0.25em] uppercase"
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            Villiersdorp
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.p
            className="text-white/40 tracking-[0.4em] uppercase text-xs"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            Secondary School
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-[1px] bg-white/15 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#fd1b3d]"
            style={{ width: `${clamped}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <motion.p
          className="mt-4 font-serif text-[#fd1b3d] text-lg tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {clamped}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
