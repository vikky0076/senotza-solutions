export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://senotza.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SENOTZA SOLUTIONS",
    "image": `${baseUrl}/og-image.jpg`,
    "url": baseUrl,
    "telephone": "+919876543210", // Placeholder from contact form
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tech Park",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://twitter.com/senotza",
      "https://linkedin.com/company/senotza"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
