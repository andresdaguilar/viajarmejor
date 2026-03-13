# Prompt 07 — Blog Completo con Artículos de Ejemplo

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). El blog es clave para posicionamiento SEO y para demostrar expertise. Los artículos hablan de cómo viajar mejor — no de destinos como un influencer.

El sistema de blog usa archivos **MDX** en `/content/blog/` con frontmatter.

---

## 1. Sistema de lectura de posts

**Archivo:** `src/lib/blog.ts`

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));
  return files
    .map(filename => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return { slug, ...data } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...data, content } as Post;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(p => p.category === category);
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter(p => p.featured);
}
```

---

## 2. Página lista de artículos

**Archivo:** `src/app/blog/page.tsx`

```tsx
export const metadata = {
  title: "Blog de viajes",
  description: "Consejos prácticos, guías de destinos, tips de logística y todo lo que necesitás para viajar mejor.",
};
```

**Estructura:**

```
Hero de página:
  Badge: "Blog"
  Título: "Viajá mejor con cada artículo"
  Subtítulo: "Consejos prácticos de alguien que ya estuvo ahí."

Filtros por categoría (pills clickeables, estado en URL con searchParams):
  Todos | Errores comunes | Logística | Destinos | Trámites | Seguridad | Eventos

Artículo destacado (featured: true):
  Layout horizontal: imagen grande izquierda, texto derecha
  Badge de categoría, título grande, descripción, autor, fecha, tiempo de lectura
  CTA: "Leer artículo"

Grilla de artículos (3 columnas desktop, 2 tablet, 1 mobile):
  Cada ArticleCard muestra:
  - Imagen de portada
  - Badge de categoría
  - Título
  - Descripción corta
  - Fecha + tiempo de lectura
  - Link a /blog/[slug]
```

---

## 3. Página de artículo individual

**Archivo:** `src/app/blog/[slug]/page.tsx`

```tsx
// Generar rutas estáticas
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

// Metadata dinámica
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.coverImage],
    },
  };
}
```

**Layout del artículo:**

```
Header del artículo:
  - Badge de categoría
  - Título (H1, font-serif, text-display-lg)
  - Descripción
  - Autor: foto de Andy + "Andy" + fecha + tiempo de lectura
  - Imagen de portada (full width, rounded-2xl)

Contenido:
  - Columna centrada max-w-2xl
  - Estilos: clase prose-viajarmejor (definida en globals.css)
  - Renderizar MDX con next-mdx-remote

Sidebar derecho (sticky, solo desktop):
  - "¿Querés que te ayude a planificar tu viaje?"
  - Mini-card con CTA a /reservar y WhatsApp
  - Lista de artículos relacionados (misma categoría)

Footer del artículo:
  - Tags
  - Compartir: WhatsApp, copiar link
  - CTA: "¿Te fue útil? Reservá tu asesoría personalizada"
  - Artículos relacionados (3 cards)
```

---

## 4. Componente ArticleCard

**Archivo:** `src/components/blog/ArticleCard.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group block overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 badge-primary text-xs">{post.category}</span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2">{post.description}</p>
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
```

Agregar `formatDate` a `src/lib/utils.ts`:
```typescript
import { format } from "date-fns";
import { es } from "date-fns/locale";
export function formatDate(date: string) {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
}
```

---

## 5. Artículos de ejemplo (archivos MDX)

Creá los siguientes 4 artículos en `src/content/blog/`:

---

### Artículo 1: `errores-comunes-europa.mdx`

```mdx
---
title: "7 errores que arruinan un viaje a Europa (y cómo evitarlos)"
description: "Después de decenas de viajes por Europa, estos son los errores que veo repetir siempre. Aprendé de los que ya los cometieron."
date: "2025-03-01"
category: "Errores comunes"
readingTime: "6 min de lectura"
coverImage: "/images/blog/errores-europa.jpg"
tags: ["Europa", "errores", "planificación", "primera vez"]
featured: true
---

Viajé a Europa más de veinte veces. Vi cómo la gente llega emocionada y pierde horas enteras por errores que eran completamente evitables.

Este artículo no es para asustarte. Es para que llegues preparado.

## 1. No reservar las atracciones principales con anticipación

La Torre Eiffel, el Coliseo, la Sagrada Familia. Son lugares que pueden tener semanas de espera si no reservás antes.

Muchos viajeros llegan al destino y recién ahí buscan las entradas. El resultado: colas de 3 horas o entradas agotadas.

**Qué hacer:** Reservá las atracciones más populares con al menos 2–3 semanas de anticipación. Algunos lugares (como el Sky Garden en Londres o el Reichstag en Berlín) requieren reserva gratuita pero obligatoria.

## 2. Armar un itinerario imposible

Querer ver 5 ciudades en 7 días suena emocionante. En la práctica, significa pasar más tiempo en trenes y hoteles que en los destinos.

Un viaje apresurado cansa y frustra. Llegás a casa sin haber disfrutado ningún lugar de verdad.

**Qué hacer:** Menos destinos, más profundidad. Con 7 días en Europa es mejor ver 2 ciudades bien que 5 de pasada.

## 3. Ignorar el transporte público

Tomar taxi o Uber en Europa es caro y lento. El transporte público en ciudades como Londres, París o Berlín es excelente, frecuente y económico.

Muchos viajeros no lo usan por miedo o desconocimiento — y terminan pagando 3 o 4 veces más de lo necesario.

**Qué hacer:** Aprendé antes de llegar cómo funciona el metro o el tren urbano de cada ciudad. En Londres usá Oyster Card. En París, Navigo. En Berlín, los pases de día.

## 4. Cambiar dinero en el aeropuerto

El aeropuerto es el peor lugar para cambiar moneda. Las casas de cambio del aeropuerto ofrecen tipos de cambio pésimos y comisiones altísimas.

**Qué hacer:** Retirar euros directamente de un cajero automático con tu tarjeta de débito internacional. O llevar efectivo cambiado en Argentina antes de partir. Nunca en el aeropuerto de destino.

## 5. No tener el seguro de viaje activado

"Total, no me va a pasar nada." Esta frase la escuché demasiadas veces de personas que después tuvieron que pagar una consulta médica en Europa de su bolsillo.

Una consulta básica en Alemania puede costar 200 euros. Una internación, miles.

**Qué hacer:** Contratá un seguro de viaje antes de salir. Revisá que cubra asistencia médica, cancelaciones y pérdida de equipaje.

## 6. Subestimar las distancias dentro de las ciudades

París tiene 100 km². Roma, 1.200 km². Muchos turistas planifican el día pensando que todo está "cerca" y terminan caminando 20 km o gastando en taxis de emergencia.

**Qué hacer:** Planificá los días por zonas. Si vas a ver el Louvre y la Torre Eiffel, hacelos el mismo día — están a 30 minutos caminando. No los mezcles con el Marais y Notre Dame que están del otro lado de la ciudad.

## 7. No conocer las estafas locales

Las pulseras de la amistad en Montmartre, los "artistas" que te dibujan sin pedírtelo y después te cobran, los taxistas sin taxímetro en Roma.

No es que Europa sea peligrosa. Pero hay estafas clásicas que afectan a los turistas que no las conocen.

**Qué hacer:** Antes de ir a cada ciudad, buscá "estafas comunes para turistas en [ciudad]". 10 minutos de lectura pueden ahorrarte mucho dinero y frustración.

---

¿Querés que te ayude a planificar tu viaje a Europa sin cometer ninguno de estos errores? [Reservá una llamada de asesoría](/reservar) y armamos tu Travel Blueprint personalizado.
```

---

### Artículo 2: `que-reservar-antes-europa.mdx`

```mdx
---
title: "Qué reservar antes de viajar a Europa (y con cuánta anticipación)"
description: "Lista completa de reservas obligatorias y recomendadas para un viaje a Europa. Las que no pueden faltar y las que conviene hacer con tiempo."
date: "2025-03-10"
category: "Logística"
readingTime: "5 min de lectura"
coverImage: "/images/blog/reservas-europa.jpg"
tags: ["Europa", "reservas", "planificación", "logística"]
featured: false
---

Una de las preguntas más comunes antes de viajar a Europa es: ¿qué tengo que reservar sí o sí antes de llegar?

La respuesta depende del destino y la época del año. Pero hay ciertas reservas que son prácticamente obligatorias si no querés perder horas o directamente no poder entrar.

## Reservas obligatorias (sin esto, no entrás)

### Torre Eiffel — París
La entrada a los pisos superiores de la Torre Eiffel se vende online y suele agotarse semanas antes en temporada alta. Podés hacer fila para el primer piso, pero si querés subir arriba, reservá con 2–3 semanas de anticipación.

### Sky Garden — Londres
El jardín en el piso 35 de un rascacielos del centro de Londres es gratuito, pero requiere reserva previa en su sitio web. Las entradas se liberan con 3 semanas de anticipación y se agotan en horas.

### Reichstag — Berlín
El techo del Parlamento alemán es gratuito y tiene vistas increíbles. Pero requiere registro online con nombre, apellido y documento. Reservá con al menos 2 semanas.

### Coliseo — Roma
Las entradas al Coliseo con visita al interior se agotan rápido. También hay colas de 2–3 horas si llegás sin reserva. Comprá online antes del viaje.

### Sagrada Família — Barcelona
La catedral de Gaudí es la atracción más visitada de España. Vendé entradas con horario asignado. Sin reserva previa, es casi imposible entrar sin esperar mucho.

## Reservas muy recomendadas

- **Museos del Vaticano** — Cola de horas si llegás sin reserva
- **Museo del Louvre** — Comprá online para entrar directo
- **Uffizi Gallery, Florencia** — Especialmente en temporada alta
- **Anne Frank House, Ámsterdam** — Se agota con semanas de anticipación

## Qué no necesitás reservar (generalmente)

- Calles, plazas y espacios públicos (obvio, pero lo aclaro)
- La mayoría de las iglesias (excepto algunas con acceso controlado)
- Parques y jardines
- Mercados

## Herramientas para reservar

- **GetYourGuide** — Entradas y tours en toda Europa
- **Tiqets** — Buena alternativa a GetYourGuide
- **Sitios oficiales** — Siempre chequeá el sitio oficial del lugar antes de comprar en revendedores

---

¿Querés una lista personalizada de qué reservar según tu destino y fechas? En el [Travel Blueprint](/planes) incluyo todas las reservas importantes para tu viaje específico.
```

---

### Artículo 3: `visa-americana-argentina.mdx`

```mdx
---
title: "Cómo sacar la visa americana desde Argentina: todo lo que necesitás saber"
description: "Guía completa para argentinos que quieren viajar a Estados Unidos. El proceso paso a paso, los errores más comunes y cómo preparar la entrevista."
date: "2025-03-15"
category: "Trámites"
readingTime: "8 min de lectura"
coverImage: "/images/blog/visa-americana.jpg"
tags: ["visa", "Estados Unidos", "trámites", "Argentina"]
featured: false
---

La visa americana es uno de los trámites que más preguntas genera entre los viajeros argentinos. El proceso parece complicado, pero si lo entendés paso a paso, es perfectamente manejable.

En este artículo te explico todo: desde cómo completar el formulario hasta qué decir en la entrevista.

## Quiénes necesitan visa

Los ciudadanos argentinos necesitan visa para ingresar a Estados Unidos. No aplica el ESTA (que es solo para ciudadanos de países del Programa de Exención de Visas, como España, Italia o Alemania).

## El proceso paso a paso

### Paso 1: Completar el DS-160

El DS-160 es el formulario de solicitud de visa online. Se completa en el sitio del Departamento de Estado de EE.UU.

Puntos importantes:
- Se guarda automáticamente pero tiene un tiempo límite de sesión — guardá el número de confirmación desde el principio
- Las respuestas deben ser en inglés
- La sección de viajes anteriores requiere detalles de todos los viajes internacionales de los últimos 5 años
- La foto debe cumplir requisitos específicos (fondo blanco, cara sin anteojos, tamaño preciso)

### Paso 2: Pagar la tarifa MRV

El costo es de 185 USD. Se paga online en el sitio del banco designado. Guardá el comprobante.

### Paso 3: Agendar la entrevista

Después del pago, podés reservar la entrevista en el consulado. Actualmente los tiempos de espera en Argentina varían — revisá la disponibilidad en el sitio oficial.

Los consulados en Argentina están en Buenos Aires, Córdoba y Mendoza.

### Paso 4: La entrevista consular

La entrevista dura entre 2 y 5 minutos. El cónsul hace preguntas sobre el motivo del viaje, situación económica y vínculos con Argentina.

**Documentación a llevar:**
- Pasaporte vigente (y pasaportes anteriores si los tenés)
- Confirmación de turno
- Comprobante de pago MRV
- Formulario DS-160 impreso (código de barras)
- Foto tamaño pasaporte (aunque ya la subiste al formulario)
- Documentación de respaldo financiero: extractos bancarios, recibo de sueldo
- Documentación que demuestre vínculos con Argentina: trabajo, propiedad, familia

### Paso 5: Entrega del pasaporte

Si la visa es aprobada, te dan un ticket para retirar el pasaporte con la visa estampada en los días siguientes.

## Errores comunes

**Error 1: No llevar suficiente documentación financiera**
Muchas visas se rechazan porque el solicitante no puede demostrar que tiene fondos para el viaje y motivo para volver a Argentina.

**Error 2: Inconsistencias en el DS-160**
Si lo que decís en la entrevista no coincide con lo que pusiste en el formulario, genera dudas. Revisá bien el formulario antes de la entrevista.

**Error 3: Ponerse nervioso en la entrevista**
Es normal estarlo, pero respondé con calma y en forma directa. No des más información de la que te piden.

## Cuánto tarda

Desde que pedís el turno hasta que tenés la visa: entre 2 y 6 meses dependiendo de la disponibilidad de turnos. Planificá con mucho tiempo.

---

¿Querés que revise tu documentación antes de la entrevista o que te explique el proceso en detalle? Esto está incluido en el [Plan Avanzado y Premium](/planes).
```

---

### Artículo 4: `esta-viaje-europa.mdx`

```mdx
---
title: "ESTA: qué es, cómo pedirlo y quiénes lo necesitan"
description: "Si tenés pasaporte español, italiano u otro europeo además del argentino, podés entrar a EE.UU. sin visa. Te explico cómo funciona el ESTA."
date: "2025-03-20"
category: "Trámites"
readingTime: "4 min de lectura"
coverImage: "/images/blog/esta.jpg"
tags: ["ESTA", "visa", "Estados Unidos", "trámites", "doble ciudadanía"]
featured: false
---

El ESTA (Electronic System for Travel Authorization) es la autorización de viaje para entrar a Estados Unidos sin visa. Solo aplica para ciudadanos de ciertos países — no para argentinos con pasaporte argentino.

## ¿Quiénes pueden usar el ESTA?

El ESTA aplica para ciudadanos de los países del Visa Waiver Program (VWP). Algunos ejemplos:
- España
- Italia
- Francia
- Alemania
- Portugal
- Australia
- Japón

Si tenés doble ciudadanía argentina y española (por ejemplo), podés usar tu pasaporte español para entrar a EE.UU. con ESTA en lugar de tramitar visa.

## Cómo pedirlo

El ESTA se solicita online en el sitio oficial del gobierno de EE.UU.: esta.cbp.dhs.gov

El proceso toma 10–15 minutos. Cuesta 21 USD y se paga con tarjeta de crédito.

La autorización generalmente se aprueba en minutos, aunque puede demorar hasta 72 horas.

## Vigencia

El ESTA es válido por 2 años o hasta que venza el pasaporte (lo que ocurra primero). Podés entrar múltiples veces durante ese período. Cada entrada no puede superar los 90 días.

## Errores frecuentes

**Tramitarlo en sitios no oficiales.** Hay muchos sitios que cobran 70–100 USD por un servicio que en el sitio oficial cuesta 21 USD. El único sitio oficial es esta.cbp.dhs.gov.

**No pedirlo con suficiente anticipación.** Aunque generalmente se aprueba rápido, pedilo al menos 72 horas antes del vuelo.

**Confundir ESTA con visa.** El ESTA solo aplica para vuelos directos a EE.UU. en aerolíneas que participan del programa. Y solo para ciudadanos de los países habilitados.

---

¿Tenés dudas sobre si necesitás visa o ESTA, o sobre cómo preparar tu documentación? Escribime y te ayudo a entenderlo.
```

---

## 6. Imágenes placeholder

Agregá imágenes placeholder en `/public/images/blog/` con los nombres usados en los MDX. Por ahora podés usar imágenes de Unsplash con `next/image` desde URLs externas, agregando los dominios a `next.config.js`:

```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
module.exports = nextConfig;
```

O usar el servicio placeholder: `https://picsum.photos/800/450`

---

## Verificación
- Las rutas `/blog` y `/blog/[slug]` funcionan correctamente
- Los 4 artículos se muestran en la lista
- El MDX se renderiza con los estilos de `prose-viajarmejor`
- Los artículos tienen metadata correcta para SEO
- El filtro por categoría funciona
- La sidebar con CTA aparece en desktop al leer un artículo
