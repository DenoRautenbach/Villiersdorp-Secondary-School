'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', labelAf: 'Tuis', href: '/' },
  { label: 'About Us', labelAf: 'Oor Ons', href: '/about' },
  { label: 'Academics', labelAf: 'Akademies', href: '/academics' },
  { label: 'News', labelAf: 'Nuus', href: '/news' },
  { label: 'Contact', labelAf: 'Kontak', href: '/contact' },
];

const menuVariants = {
  closed: {
    x: '100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  open: {
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar Bar */}
      <nav
        id="main-navbar"
        className="fixed top-0 w-full z-50 px-6 md:px-10 py-4 md:py-5 flex justify-between items-center bg-gradient-to-b from-[#0e1c44]/80 to-transparent"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-white"
          aria-label="Villiersdorp Secondary School home"
        >
          <Image
            src="/logo-light.png"
            alt="Villiersdorp Secondary School crest"
            width={496}
            height={503}
            priority
            className="h-12 md:h-14 w-auto drop-shadow-md"
          />
          <span className="font-serif text-lg md:text-xl leading-tight hidden sm:block">
            Villiersdorp
            <span className="block text-xs md:text-sm font-semibold text-white/70">
              Secondary School
            </span>
          </span>
        </Link>

        <button
          id="nav-menu-toggle"
          onClick={() => setIsOpen(true)}
          className="text-white flex items-center gap-2 uppercase tracking-widest text-xs font-medium hover:text-[#fd1b3d] transition-colors"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          Menu <Menu size={18} />
        </button>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 bg-[#172b66] z-[150] flex flex-col justify-center px-8 md:px-20 lg:px-32"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Close button */}
            <button
              id="nav-close-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 md:top-10 md:right-10 text-white flex items-center gap-2 uppercase tracking-widest text-xs hover:text-[#fd1b3d] transition-colors"
              aria-label="Close navigation menu"
            >
              Close <X size={20} />
            </button>

            {/* Nav Links */}
            <div className="flex flex-col gap-4 md:gap-6">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{
                      delay: i * 0.08 + 0.2,
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6"
                    >
                      <span className="text-[#fd1b3d] font-serif text-sm italic opacity-60 group-hover:opacity-100 transition-opacity w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-4xl md:text-6xl lg:text-7xl font-serif text-white hover:text-[#fd1b3d] transition-colors duration-300 leading-none">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Footer info inside menu */}
            <motion.div
              className="absolute bottom-8 left-8 md:left-20 lg:left-32 flex gap-8 text-white/40 text-xs uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span>Villiersdorp, Western Cape</span>
              <span>Grades 8–12</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
