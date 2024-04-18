// components/JsonLd.js
export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pocketlink - AI powered Creator Tool kit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Automate your brand, grow your audience, and turn clicks into sales, all from one beautiful, customizable link.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description:
        'Free plan available, with premium plans starting at $12.00/month',
    },
    softwareVersion: '1.0',
    screenshot: 'https://pocketlink.co/ogImg.png',
    featureList: [
      'Customizable link-in-bio pages',
      'Form creation',
      'Appointment scheduling',
      'Payment links',
      'Analytics',
      'AI bio generator',
    ],
    url: 'https://pocketlink.co',
    sameAs: [
      'https://twitter.com/pocketlinkapp',
      'https://instagram.com/pocketlink.co',
    ],
  };

  // Safely stringify the data with error handling
  try {
    const jsonString = JSON.stringify(structuredData);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
    );
  } catch (error) {
    // Return empty script tag if serialization fails
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{}' }}
      />
    );
  }
}

// Organization data component
export function OrganizationJsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pocketlink - AI powered Creator Tool kit',
    url: 'https://pocketlink.co',
    logo: 'https://pocketlink.co/logo.png',
    description:
      'Automate your brand, grow your audience, and turn clicks into sales, all from one beautiful, customizable link.',
    sameAs: [
      'https://x.com/pocketlink_co',
      'https://www.linkedin.com/company/pocketlink',
      'https://www.linkedin.com/company/pocketlink/',
    ],
  };

  // Safely stringify the data with error handling
  try {
    const jsonString = JSON.stringify(organizationData);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
    );
  } catch (error) {
    // Return empty script tag if serialization fails
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{}' }}
      />
    );
  }
}
