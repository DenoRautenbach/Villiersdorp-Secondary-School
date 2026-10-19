import type { Metadata } from 'next';
import { Poppins, Nunito } from 'next/font/google';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import SmoothScroll from '@/components/global/SmoothScroll';
import SchemaOrg from '@/components/global/SchemaOrg';
import CursorWrapper from '@/components/global/CursorWrapper';
import { siteUrl } from '@/lib/utils';
import '@/app/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Villiersdorp Secondary School | Villiersdorp Sekondêr',
    template: '%s | Villiersdorp Secondary School',
  },
  description:
    'Villiersdorp Secondary School (Villiersdorp Sekondêr) is the high school in Villiersdorp, Western Cape, for Grades 8–12. Serruriastraat, Villiersdorp, 6848.',
  keywords: [
    'Villiersdorp',
    'Villiersdorp Secondary School',
    'Villiersdorp Sekondêr',
    'Villiersdorp high school',
    'hoërskool Villiersdorp',
    'skool Villiersdorp',
    'Overberg',
    'Western Cape',
    'Matric',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    alternateLocale: ['af_ZA'],
    url: '/',
    siteName: 'Villiersdorp Secondary School',
    title: 'Villiersdorp Secondary School | Villiersdorp Sekondêr',
    description: 'The high school in Villiersdorp, Western Cape, for Grades 8–12.',
    images: [
      { url: '/hero-staff.png', width: 854, height: 854, alt: 'Villiersdorp Secondary School staff' },
      { url: '/logo.png', width: 496, height: 503, alt: 'Villiersdorp Secondary School crest' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className={`${poppins.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <SchemaOrg />
      </head>
      <body suppressHydrationWarning>
        <CursorWrapper />
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
