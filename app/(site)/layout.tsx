import type { Metadata } from 'next';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import SmoothScroll from '@/components/global/SmoothScroll';
import SchemaOrg from '@/components/global/SchemaOrg';
import CursorWrapper from '@/components/global/CursorWrapper';
import '@/app/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Villiersdorp Secondary School',
    template: '%s | Villiersdorp Secondary School',
  },
  description:
    'Villiersdorp Secondary School — cultivating academic excellence, character, and community pride in the heart of the Western Cape Overberg.',
  keywords: ['Villiersdorp', 'Secondary School', 'Western Cape', 'Matric', 'Overberg', 'VSS'],
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Villiersdorp Secondary School',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <head>
        <SchemaOrg />
      </head>
      <body style={{ fontFamily: 'var(--font-open-sans, "Open Sans", system-ui, sans-serif)' }}>
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
