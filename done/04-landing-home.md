# Prompt 04 — Landing Page (Home)

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). Asesoría de viajes personalizada para Argentina y Latinoamérica. Andy tiene experiencia en 55+ países y 200+ ciudades. El diseño es moderno, tipo revista de viajes.

La home debe convertir visitantes en clientes. El flujo es: impactar → generar confianza → explicar el servicio → mostrar precios → llamar a la acción.

---

## Secciones de la Home

Implementá `src/app/page.tsx` importando cada sección como componente separado.

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { QueDiferencia } from "@/components/home/QueDiferencia";
import { PlanesPreview } from "@/components/home/PlanesPreview";
import { Testimonios } from "@/components/home/Testimonios";
import { SobreMiPreview } from "@/components/home/SobreMiPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTAFinal } from "@/components/home/CTAFinal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ComoFunciona />
      <QueDiferencia />
      <PlanesPreview />
      <Testimonios />
      <SobreMiPreview />
      <BlogPreview />
      <CTAFinal />
    </>
  );
}
```

---

### Sección 1 — Hero

**Archivo:** `src/components/home/Hero.tsx`

**Concepto:** Hero de pantalla completa con imagen de fondo de viaje (overlay oscuro), título grande en serif, subtítulo, y dos CTAs.

```
Fondo: imagen de ciudad o paisaje de viaje (placeholder /images/hero-bg.jpg)
Overlay: gradiente de izquierda a derecha, de primary-950/80 a primary-900/40

Título principal (H1, font-serif, display-xl):
"Viajá con inteligencia.
Aprovechá cada destino."

Subtítulo (text-lg, text-white/80):
"Asesoría de viajes personalizada para que no desperdicies ni un día,
ni un peso, ni una experiencia. Más de 55 países de experiencia real."

CTAs:
→ Primario: "Reservar llamada de asesoría" → /reservar (btn-primary grande)
→ Secundario: "Ver cómo funciona" → /#como-funciona (btn-secondary con fondo white/10)

Indicadores de confianza debajo de los CTAs (iconos + texto pequeño):
✓ Asesoría 100% personalizada
✓ Experiencia en 55+ países
✓ Respuesta en menos de 24 hs

Scroll indicator animado al fondo del hero
```

**Notas de implementación:**
- Usar `next/image` con `fill` y `priority` para la imagen de fondo
- El texto debe ser legible en mobile — ajustá el overlay si es necesario
- Animaciones de entrada con framer-motion: fade-up escalonado para título, subtítulo y CTAs
- Altura: `min-h-screen` con padding-top para compensar el navbar

---

### Sección 2 — Stats

**Archivo:** `src/components/home/Stats.tsx`

Banda horizontal con números clave. Fondo `bg-primary-950`, texto blanco.

```
Números a mostrar:
55+    → Países visitados
200+   → Ciudades recorridas
10+    → Años viajando
100%   → Asesoría personalizada
```

Cada stat: número grande en serif + label pequeño debajo. Separados por líneas verticales sutiles en desktop, grilla 2x2 en mobile.

Animación: los números suben con contador animado cuando entran al viewport (useInView de framer-motion).

---

### Sección 3 — Cómo Funciona

**Archivo:** `src/components/home/ComoFunciona.tsx`
**ID del elemento:** `id="como-funciona"` (para el anchor del navbar)

Fondo blanco. Título de sección centrado.

```
Badge: "El proceso"
Título: "Simple, rápido y completamente personalizado"
Subtítulo: "En menos de 48 horas tenés tu plan de viaje listo."

Pasos (3 cards horizontales con número):

1. "Completás el formulario"
   Contanos tu destino, fechas, con quién viajás y qué experiencias buscás.
   Ícono: ClipboardList

2. "Tenemos una llamada de 30–40 min"
   Te hacemos las preguntas clave para entender exactamente qué necesitás.
   Ícono: Phone

3. "Recibís tu Travel Blueprint"
   Un documento completo y personalizado con todo lo que necesitás para viajar mejor.
   Ícono: MapPin

Conector visual entre los pasos: línea punteada horizontal (desktop) o vertical (mobile)
```

---

### Sección 4 — Qué nos Diferencia

**Archivo:** `src/components/home/QueDiferencia.tsx`

Layout de dos columnas: texto a la izquierda, imagen a la derecha (foto de destino de viaje).

```
Badge: "Por qué Viajar Mejor"
Título: "No es una agencia. Es un asesor que ya estuvo ahí."

Texto:
"Las agencias te venden vuelos y hoteles. Los influencers te muestran fotos.
Yo te digo exactamente qué hacer, qué evitar y cómo aprovechar cada hora de tu viaje."

Lista de diferenciales (con checkmarks en primary-600):
✓ Experiencia real en 55+ países — no información de internet
✓ Asesoría ante imprevistos: vuelos cancelados, equipaje perdido, overbooking
✓ Soporte durante el viaje (Plan Premium): estás acompañado aunque estés lejos
✓ Contenido adaptado a vos: tu destino, tu presupuesto, tu grupo de viaje
✓ Asesoría para trámites: visa, ESTA, seguros — sin bloqueos ni confusión

CTA: "Conocé los planes" → /planes
```

---

### Sección 5 — Planes (Preview)

**Archivo:** `src/components/home/PlanesPreview.tsx`

Mostrar las 3 cards de planes en versión simplificada. El plan Avanzado debe tener un badge "Más popular".

Importar los datos de `PLANES` en `src/lib/constants.ts`.

Cada card:
- Nombre del plan
- Precio (desde USD XX)
- 3-4 features clave
- CTA: "Reservar este plan" → `/reservar`
- El plan Avanzado tiene borde `border-primary-500` y escala ligeramente más grande

Debajo de las cards:
```
"¿No sabés qué plan elegir? Escribime y te ayudo a decidir."
→ Botón WhatsApp
```

---

### Sección 6 — Testimonios

**Archivo:** `src/components/home/Testimonios.tsx`

Fondo `bg-stone-50`.

```
Badge: "Qué dicen los viajeros"
Título: "Historias reales de personas que viajaron mejor"

Testimonios (3 cards, carrusel en mobile):
[Usar placeholders por ahora — se reemplazarán con reales]

Card 1:
"Andy nos armó el viaje a Europa más organizado que tuvimos. Llegamos a París
y todo estaba planificado al detalle. Ni una cola, ni un lugar cerrado por falta de reserva."
— María y Javier, Buenos Aires — París + Londres, 10 días

Card 2:
"Nunca había viajado solo al exterior y tenía muchísimas dudas. Con el Travel Blueprint
me sentí seguro desde el primer día. Vale cada peso."
— Sebastián, Córdoba — Roma + Barcelona, 8 días

Card 3:
"El tema de la visa americana me tenía loco. Andy me explicó todo el proceso,
revisó mi formulario y no tuve ningún problema. Increíble."
— Laura, Rosario — Nueva York, 7 días
```

Cada card: quote en serif + autor + destino + duración. Stars (5 estrellas doradas).

---

### Sección 7 — Preview de Andy

**Archivo:** `src/components/home/SobreMiPreview.tsx`

Layout dos columnas: foto a la izquierda (circular o con bordes redondeados), texto a la derecha.

```
Imagen: /public/images/andy.jpg (foto real de Andy)

Título: "Hola, soy Andy"
Texto:
"Viajé a más de 55 países y 200 ciudades. Safari en África, auroras boreales
en Islandia, surf en Costa Rica, maratones en distintos continentes.

Pero lo que más me apasiona no es viajar — es ayudar a otros a viajar mejor.
Durante años amigos y familia me consultaron sobre sus viajes, y noté que
siempre podía ahorrarles tiempo, plata y dolores de cabeza.

Por eso creé Viajar Mejor."

CTA: "Conocer más sobre mí" → /sobre-mi
```

---

### Sección 8 — Preview del Blog

**Archivo:** `src/components/home/BlogPreview.tsx`

Grilla de 3 artículos más recientes del blog.

```tsx
// Leer los últimos 3 posts desde /content/blog/*.mdx
// Mostrar: imagen de portada, categoría (badge), título, descripción corta, tiempo de lectura
// CTA al final: "Ver todos los artículos" → /blog
```

---

### Sección 9 — CTA Final

**Archivo:** `src/components/home/CTAFinal.tsx`

Sección de cierre con fondo `gradient-hero` (azul profundo). Centrado, impactante.

```
Título (serif, blanco, grande):
"¿Listo para viajar mejor?"

Subtítulo (blanco/70):
"Reservá tu llamada de asesoría. 30–40 minutos para transformar tu próximo viaje."

CTA principal: "Reservar llamada ahora" → /reservar (btn blanco con texto primary)
CTA secundario: "Escribime por WhatsApp" → wa.me link

Texto chico debajo:
"Sin compromiso. Pago seguro. Respuesta garantizada en 24 hs."
```

---

## Notas generales
- Todas las animaciones usan `framer-motion` con `useInView` para activarse al entrar al viewport
- Cada sección debe tener `id` relevante para los anchor links del navbar
- Mobile first: empezá diseñando para mobile y extendé con `md:` y `lg:`
- Usá `next/image` para todas las imágenes
- Los CTAs de WhatsApp usan la constante `CONTACT.whatsappUrl` de `constants.ts`
