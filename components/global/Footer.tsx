import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'About Us', href: '/about' },
    { label: 'Academics', href: '/academics' },
    { label: 'News & Events', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#223f99] pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logo-light.png"
              alt="Villiersdorp Secondary School crest"
              width={496}
              height={503}
              className="h-24 w-auto mb-6"
            />
            <h4 className="font-serif text-3xl text-white mb-4 leading-tight">
              Villiersdorp<br />Secondary School
            </h4>
            <p className="text-white/70 text-sm font-semibold mb-3">Villiersdorp Sekondêr</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A public, no-fee high school for Grades 8–12 in Villiersdorp,
              Overberg district, Western Cape.
            </p>
            <p className="mt-4 text-[#fd1b3d] font-serif italic text-sm">
              Build with Pride · Bou met Trots · Sakhangeqhayiya
            </p>
          </div>

          {/* Explore */}
          <div>
            <h5 className="text-[#fd1b3d] uppercase tracking-[0.2em] text-xs font-medium mb-6">
              Explore
            </h5>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[#fd1b3d] uppercase tracking-[0.2em] text-xs font-medium mb-6">
              Contact
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#fd1b3d]" />
                <span>
                  Serruriastraat, Villiersdorp, 6848<br />
                  Posbus 347, Villiersdorp, 6848
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={15} className="flex-shrink-0 text-[#fd1b3d]" />
                <a href="tel:+27288401079" className="hover:text-white transition-colors">
                  028 840 1079
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={15} className="flex-shrink-0 text-[#fd1b3d]" />
                <a
                  href="mailto:villiersec@hotmail.com"
                  className="hover:text-white transition-colors"
                >
                  villiersec@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs uppercase tracking-widest">
            © {year} Villiersdorp Secondary School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
