# Prompt 09 — SEO, Sitemap, Performance y Deploy en Vercel

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). Este es el prompt final. Todas las páginas y componentes ya están construidos. Ahora optimizamos para SEO, performance y deploy.

---

## 1. SEO — Metadata por página

Verificá que todas las páginas tengan su `metadata` export con título, descripción y Open Graph correctos. Usá la siguiente función helper para generar metadata consistente.

**Archivo:** `src/lib/metadata.ts`

```typescript
import { Metadata } from "next";
import { SITE } from "./constants";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function createMetadata({ title, description, path = "", image }: PageMetaOptions): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image || `${SITE.url}/images/og-image.jpg`;

  return {
    title,
    description,
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
```

**Metadata por página:**

```typescript
// src/app/page.tsx
export const metadata = createMetadata({
  title: "Viajar Mejor — Asesoría de viajes personalizada",
  description: "Asesoría de viajes personalizada para Argentina y Latinoamérica. Más de 55 países de experiencia real. Travel Blueprint, soporte antes y durante el viaje.",
  path: "/",
});

// src/app/planes/page.tsx
export const metadata = createMetadata({
  title: "Planes y Precios — Viajar Mejor",
  description: "Elegí el plan de asesoría de viaje ideal. Plan Básico desde USD 25, Avanzado desde USD 40, Premium desde USD 65. Incluye Travel Blueprint personalizado.",
  path: "/planes",
});

// src/app/sobre-mi/page.tsx
export const metadata = createMetadata({
  title: "Sobre mí — Andy | Viajar Mejor",
  description: "Conocé a Andy, asesor de viajes con experiencia en más de 55 países y 200 ciudades. La persona detrás de Viajar Mejor.",
  path: "/sobre-mi",
});

// src/app/blog/page.tsx
export const metadata = createMetadata({
  title: "Blog de viajes — Viajar Mejor",
  description: "Consejos prácticos, guías de destinos, tips de logística y todo lo que necesitás para viajar mejor. Desde Argentina para el mundo.",
  path: "/blog",
});

// src/app/reservar/page.tsx
export const metadata = createMetadata({
  title: "Reservar llamada de asesoría — Viajar Mejor",
  description: "Reservá tu llamada de asesoría de viaje personalizada. Elegí tu plan, pagá y agendá tu turno en minutos.",
  path: "/reservar",
});
```

---

## 2. Sitemap dinámico

**Archivo:** `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE.url}/planes`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/reservar`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/sobre-mi`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE.url}/contacto`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
```

---

## 3. Robots.txt

**Archivo:** `src/app/robots.ts`

```typescript
import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

---

## 4. Schema.org (JSON-LD)

Agregar structured data para que Google entienda el sitio.

**Archivo:** `src/components/seo/JsonLd.tsx`

```tsx
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Viajar Mejor",
    "description": "Asesoría de viajes personalizada para Argentina y Latinoamérica.",
    "url": "https://viajarmejor.travel",
    "telephone": "+5493417424395",
    "priceRange": "USD 25–80",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": -34.6037, "longitude": -58.3816 },
      "geoRadius": "20000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planes de asesoría de viajes",
      "itemListElement": [
        { "@type": "Offer", "name": "Plan Básico", "price": "25", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Plan Avanzado", "price": "40", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Plan Premium", "price": "65", "priceCurrency": "USD" },
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

Incluirlo en `src/app/layout.tsx` dentro del `<head>`.

Para artículos del blog, agregar `BlogPosting` schema en `src/app/blog/[slug]/page.tsx`.

---

## 5. Performance — Optimizaciones

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
};

module.exports = nextConfig;
```

### Lazy loading de componentes pesados

En `src/app/page.tsx`, hacer lazy loading de las secciones below-the-fold:

```tsx
import dynamic from "next/dynamic";

// Above the fold: importar directo
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";

// Below the fold: lazy load
const ComoFunciona     = dynamic(() => import("@/components/home/ComoFunciona").then(m => m.ComoFunciona));
const PlanesPreview    = dynamic(() => import("@/components/home/PlanesPreview").then(m => m.PlanesPreview));
const Testimonios      = dynamic(() => import("@/components/home/Testimonios").then(m => m.Testimonios));
const SobreMiPreview   = dynamic(() => import("@/components/home/SobreMiPreview").then(m => m.SobreMiPreview));
const BlogPreview      = dynamic(() => import("@/components/home/BlogPreview").then(m => m.BlogPreview));
const CTAFinal         = dynamic(() => import("@/components/home/CTAFinal").then(m => m.CTAFinal));
```

---

## 6. Variables de entorno para producción

Antes del deploy, asegurate de tener estas variables configuradas en Vercel:

```
NEXT_PUBLIC_SITE_URL=https://viajarmejor.travel
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/TU_USUARIO
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   (cuando tengas Google Analytics)
```

---

## 7. Deploy en Vercel

### Paso 1 — Subir a GitHub

```bash
git init
git add .
git commit -m "feat: initial commit — Viajar Mejor landing"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/viajarmejor.git
git push -u origin main
```

### Paso 2 — Conectar con Vercel

1. Ir a [vercel.com](https://vercel.com) e iniciar sesión
2. "Add New Project" → importar el repo de GitHub
3. Framework preset: Next.js (se detecta automáticamente)
4. Agregar las variables de entorno en la sección "Environment Variables"
5. Hacer click en "Deploy"

### Paso 3 — Conectar el dominio

1. En el dashboard de Vercel → Settings → Domains
2. Agregar `viajarmejor.travel`
3. Vercel da los DNS records para configurar en tu proveedor de dominio:
   - Tipo A: `@` → IP de Vercel
   - Tipo CNAME: `www` → `cname.vercel-dns.com`
4. Esperar propagación DNS (puede tardar hasta 24 hs, generalmente menos)

### Paso 4 — Verificar

Después del deploy, verificar:
- [ ] El sitio carga en `https://viajarmejor.travel`
- [ ] El certificado SSL está activo (candado verde)
- [ ] Las imágenes cargan correctamente
- [ ] El botón de WhatsApp funciona
- [ ] La integración de Calendly carga en `/reservar`
- [ ] El blog muestra los artículos
- [ ] El sitemap está accesible en `https://viajarmejor.travel/sitemap.xml`
- [ ] No hay errores en la consola de Vercel

---

## 8. Google Search Console

Una vez que el dominio esté activo:

1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Agregar propiedad: `https://viajarmejor.travel`
3. Verificar con el método HTML tag (agregar a `layout.tsx` en la metadata)
4. Enviar el sitemap: `https://viajarmejor.travel/sitemap.xml`

---

## 9. Checklist final antes de lanzar

**Contenido:**
- [ ] Logo cargado en `/public/logo.svg`
- [ ] Foto de Andy en `/public/images/andy.jpg`
- [ ] OG image en `/public/images/og-image.jpg` (1200x630px)
- [ ] Imágenes del blog en `/public/images/blog/`
- [ ] URL de Calendly configurada en `.env`
- [ ] Datos de pago actualizados en la página de reserva
- [ ] Links de Instagram actualizados en el footer

**Técnico:**
- [ ] Sin errores de TypeScript (`npm run build` limpio)
- [ ] Lighthouse score > 90 en Performance, Accessibility y SEO
- [ ] Sitemap generado correctamente
- [ ] robots.txt configurado
- [ ] Variables de entorno en producción

**Funcional:**
- [ ] Flujo de reserva completo funciona end-to-end
- [ ] WhatsApp abre con el mensaje correcto
- [ ] Calendly carga en el paso 4 de la reserva
- [ ] Blog muestra artículos con MDX renderizado
- [ ] Filtros del blog funcionan
- [ ] Navbar sticky funciona en mobile y desktop
- [ ] Todas las páginas del sitemap devuelven 200
