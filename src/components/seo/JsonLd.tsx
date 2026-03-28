import { SITE, CONTACT } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/Logo_ViajarMejor.png`,
    telephone: CONTACT.whatsapp.replace(/\s/g, ""),
    priceRange: "AR$ 35.000–99.000",
    areaServed: "Argentina, Latinoamérica",
    sameAs: ["https://www.instagram.com/viajarmejor.travel"],
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
          price: "35000",
          priceCurrency: "ARS",
        },
        {
          "@type": "Offer",
          name: "Plan Avanzado",
          price: "60000",
          priceCurrency: "ARS",
        },
        {
          "@type": "Offer",
          name: "Plan Premium",
          price: "99000",
          priceCurrency: "ARS",
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
