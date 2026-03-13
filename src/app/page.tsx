import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";

const ComoFunciona = dynamic(
  () =>
    import("@/components/home/ComoFunciona").then((m) => ({ default: m.ComoFunciona })),
  { ssr: true }
);
const QueDiferencia = dynamic(
  () =>
    import("@/components/home/QueDiferencia").then((m) => ({
      default: m.QueDiferencia,
    })),
  { ssr: true }
);
const PlanesPreview = dynamic(
  () =>
    import("@/components/home/PlanesPreview").then((m) => ({
      default: m.PlanesPreview,
    })),
  { ssr: true }
);
const Testimonios = dynamic(
  () =>
    import("@/components/home/Testimonios").then((m) => ({
      default: m.Testimonios,
    })),
  { ssr: true }
);
const SobreMiPreview = dynamic(
  () =>
    import("@/components/home/SobreMiPreview").then((m) => ({
      default: m.SobreMiPreview,
    })),
  { ssr: true }
);
const CountryFlags = dynamic(
  () =>
    import("@/components/home/CountryFlags").then((m) => ({
      default: m.CountryFlags,
    })),
  { ssr: true }
);
const BlogPreview = dynamic(
  () =>
    import("@/components/home/BlogPreview").then((m) => ({ default: m.BlogPreview })),
  { ssr: true }
);
const CTAFinal = dynamic(
  () =>
    import("@/components/home/CTAFinal").then((m) => ({ default: m.CTAFinal })),
  { ssr: true }
);

export const metadata = createMetadata({
  title: "Viajar Mejor — Asesoría de viajes personalizada",
  description:
    "Asesoría de viajes personalizada para Argentina y Latinoamérica. Más de 55 países de experiencia real. Travel Blueprint, soporte antes y durante el viaje.",
  path: "/",
});

export default function HomePage() {
  const blogPosts = getAllPosts();

  return (
    <>
      <Hero />
      <Stats />
      <ComoFunciona />
      <QueDiferencia />
      <PlanesPreview />
      <Testimonios />
      <SobreMiPreview />
      <CountryFlags />
      <BlogPreview posts={blogPosts} />
      <CTAFinal />
    </>
  );
}
