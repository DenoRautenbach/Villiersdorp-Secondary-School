import type { Metadata } from 'next';
import { MapPin, Mailbox, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Villiersdorp Secondary School (Villiersdorp Sekondêr): Serruriastraat, Villiersdorp, 6848. Tel 028 840 1079. Email villiersec@hotmail.com.',
  alternates: { canonical: '/contact' },
};

const contactDetails = [
  {
    icon: MapPin,
    label: 'Street Address / Straatadres',
    lines: ['Serruriastraat', 'Villiersdorp, 6848'],
  },
  {
    icon: Mailbox,
    label: 'Postal Address / Posadres',
    lines: ['Posbus 347', 'Villiersdorp, 6848'],
  },
  {
    icon: Phone,
    label: 'Telephone / Telefoon',
    lines: ['028 840 1079'],
    href: 'tel:+27288401079',
  },
  {
    icon: Mail,
    label: 'Email / E-pos',
    lines: ['villiersec@hotmail.com'],
    href: 'mailto:villiersec@hotmail.com',
  },
  {
    icon: Clock,
    label: 'Office Hours / Kantoorure',
    lines: ['Monday – Friday', '07:30 – 16:00'],
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#172b66] min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-20 max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[#fd1b3d] tracking-[0.3em] uppercase text-xs mb-6 font-medium">
          Contact / Kontak
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
          Get in Touch
        </h1>
        <p className="text-white/60 text-lg max-w-xl font-light">
          We'd love to hear from you. Reach out for admissions enquiries, general
          information, or to schedule a school visit.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="font-serif text-3xl text-white mb-10">Contact Details</h2>
            <div className="space-y-8">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-[#fd1b3d]/15 flex items-center justify-center flex-shrink-0">
                    <detail.icon size={16} className="text-[#fd1b3d]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-white hover:text-[#fd1b3d] transition-colors"
                      >
                        {detail.lines.map((line, i) => (
                          <span key={i} className="block text-lg">
                            {line}
                          </span>
                        ))}
                      </a>
                    ) : (
                      detail.lines.map((line, i) => (
                        <span key={i} className="block text-white text-lg">
                          {line}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed placeholder */}
            <div className="mt-12 h-64 border border-white/10 relative overflow-hidden">
              <iframe
                title="Villiersdorp Secondary School location"
                src="https://maps.google.com/maps?q=-33.986005,19.28128&z=16&output=embed"
                className="w-full h-full opacity-60 grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <h2 className="font-serif text-3xl text-white mb-10">Send an Enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
