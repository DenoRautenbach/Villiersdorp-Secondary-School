import { siteUrl } from '@/lib/utils';

/**
 * JSON-LD Structured Data for Villiersdorp Secondary School
 * Inject this in the root layout's <head> via next/script.
 */
export default function SchemaOrgScript() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HighSchool',
    name: 'Villiersdorp Secondary School',
    alternateName: ['VSS', 'Villiersdorp Sekondêr'],
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/hero-staff.png`,
    description:
      'Villiersdorp Secondary School (Villiersdorp Sekondêr) is a public high school for Grades 8–12 in Villiersdorp, Western Cape, South Africa.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serruriastraat',
      addressLocality: 'Villiersdorp',
      addressRegion: 'Western Cape',
      postalCode: '6848',
      addressCountry: 'ZA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'school office',
      telephone: '+27288401079',
      email: 'villiersec@hotmail.com',
      availableLanguage: ['Afrikaans', 'English'],
    },
    email: 'villiersec@hotmail.com',
    telephone: '+27288401079',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'EMIS',
      value: '114333077',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.986005,
      longitude: 19.28128,
    },
    sameAs: [],
    employee: {
      '@type': 'Person',
      name: 'B Ockhuis',
      jobTitle: 'Principal',
    },
    teaches: [
      'English',
      'Afrikaans',
      'Mathematical Literacy',
      'Life Sciences',
      'History',
      'Geography',
      'Business Studies',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
