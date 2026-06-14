/**
 * JSON-LD Structured Data for Villiersdorp Secondary School
 * Inject this in the root layout's <head> via next/script.
 */
export default function SchemaOrgScript({ customSchema }: { customSchema?: object | object[] }) {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': ['HighSchool', 'EducationalOrganization', 'LocalBusiness'],
    name: 'Villiersdorp Secondary School',
    alternateName: 'VSS',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/logo.png`,
    description:
      'Villiersdorp Secondary School is a public secondary school located in Villiersdorp, Western Cape, South Africa, committed to academic excellence and community growth.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Church Street',
      addressLocality: 'Villiersdorp',
      addressRegion: 'Western Cape',
      postalCode: '7170',
      addressCountry: 'ZA',
    },
    telephone: '+27288401111',
    email: 'info@villiersdorphs.co.za',
    foundingDate: '1952',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.9833,
      longitude: 19.2833,
    },
    sameAs: [],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
    },
    teaches: [
      'Mathematics',
      'Physical Sciences',
      'Life Sciences',
      'English',
      'Afrikaans',
      'History',
      'Geography',
      'Business Studies',
      'Economics',
      'Accounting',
      'Visual Arts',
      'Computer Applications Technology',
    ],
  };

  const schemas = customSchema 
    ? (Array.isArray(customSchema) ? [defaultSchema, ...customSchema] : [defaultSchema, customSchema])
    : [defaultSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
