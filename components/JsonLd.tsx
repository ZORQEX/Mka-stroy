import { companyData } from '@/constants/company'

export function JsonLd() {
  const { name, legalForm, city, description, contacts, services } = companyData

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: `${legalForm} ${name}`,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contacts.address.city,
      addressCountry: 'KZ',
      streetAddress: contacts.address.street || '',
    },
    telephone: contacts.phone,
    email: contacts.email,
    url: 'https://mkastroy.kz',
    areaServed: {
      '@type': 'City',
      name: city,
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Строительные и ремонтные услуги',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
    ...(contacts.address.coords && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: contacts.address.coords.lat,
        longitude: contacts.address.coords.lng,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
