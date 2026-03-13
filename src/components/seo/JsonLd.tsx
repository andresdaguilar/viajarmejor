import { SITE, CONTACT } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACT.whatsapp,
    priceRange: "USD 25–80",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -34.6037,
        longitude: -58.3816,
      },
      geoRadius: "20000000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planes de asesoría de viajes",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Plan Básico",
          price: "25",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Plan Avanzado",
          price: "40",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Plan Premium",
          price: "65",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
