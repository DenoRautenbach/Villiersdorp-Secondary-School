import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import SmoothScroll from '@/components/global/SmoothScroll';
import SchemaOrg from '@/components/global/SchemaOrg';
import '@/app/globals.css';

const CustomCursor = dynamic(() => import('@/components/global/CustomCursor'), {
  ssr: false,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <SchemaOrg />
      </head>
      <body style={{ fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)' }}>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
