import type { Metadata } from "next";
import { SITE } from "./constants";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  keywords,
}: PageMetaOptions): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image || `${SITE.url}/opengraph-image`;

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "es_AR",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
