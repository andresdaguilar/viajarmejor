# Prompt 01 — Setup del Proyecto

## Contexto
Estoy creando el sitio web de **Viajar Mejor**, un servicio de asesoría de viajes personalizada orientado a personas de Argentina y Latinoamérica. El sitio es `viajarmejor.travel`.

## Tarea
Inicializá un proyecto Next.js 14 con App Router con la siguiente configuración completa. Ejecutá cada comando y verificá que el proyecto levante correctamente antes de continuar.

## Stack requerido
- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Lenguaje:** TypeScript
- **Fuentes:** next/font con Google Fonts (usar Playfair Display para títulos y Inter para cuerpo)
- **Íconos:** lucide-react
- **Markdown/Blog:** next-mdx-remote + gray-matter
- **Animaciones:** framer-motion
- **Formularios:** react-hook-form + zod
- **Analytics:** next/analytics (preparado para Vercel Analytics)

## Comandos a ejecutar

```bash
npx create-next-app@latest viajarmejor --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd viajarmejor
npm install lucide-react framer-motion react-hook-form zod @hookform/resolvers next-mdx-remote gray-matter date-fns
```

## Estructura de carpetas a crear

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz con fuentes, metadata global y WhatsApp button
│   ├── page.tsx                # Home / Landing
│   ├── planes/
│   │   └── page.tsx            # Planes y precios
│   ├── sobre-mi/
│   │   └── page.tsx            # Página sobre Andy
│   ├── blog/
│   │   ├── page.tsx            # Lista de artículos
│   │   └── [slug]/
│   │       └── page.tsx        # Artículo individual
│   ├── reservar/
│   │   └── page.tsx            # Reservar llamada de asesoría (Calendly + pago)
│   └── contacto/
│       └── page.tsx            # Contacto
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ComoFunciona.tsx
│   │   ├── Planes.tsx
│   │   ├── Testimonios.tsx
│   │   ├── SobreMi.tsx
│   │   └── BlogPreview.tsx
│   ├── blog/
│   │   ├── ArticleCard.tsx
│   │   └── ArticleLayout.tsx
│   ├── planes/
│   │   └── PlanCard.tsx
│   ├── reservar/
│   │   └── CalendlyEmbed.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── SectionHeader.tsx
├── lib/
│   ├── blog.ts                 # Funciones para leer archivos MDX
│   └── constants.ts            # Constantes globales (WhatsApp, precios, etc.)
├── content/
│   └── blog/                   # Archivos .mdx de los artículos
└── public/
    ├── images/
    │   ├── andy.jpg            # Foto de Andy (placeholder por ahora)
    │   └── og-image.jpg        # Open Graph image
    └── logo.svg                # Logo de Viajar Mejor
```

## Archivo constants.ts a crear

Creá `src/lib/constants.ts` con el siguiente contenido:

```typescript
export const SITE = {
  name: "Viajar Mejor",
  tagline: "Viajá con inteligencia. Aprovechá cada destino.",
  description: "Asesoría de viajes personalizada para personas de Argentina y Latinoamérica. Más de 55 países de experiencia real.",
  url: "https://viajarmejor.travel",
  locale: "es-AR",
};

export const CONTACT = {
  whatsapp: "+5493417424395",
  whatsappUrl: "https://wa.me/5493417424395",
  whatsappMessage: "Hola Andy, me gustaría conocer más sobre el servicio de asesoría de viajes.",
};

export const PLANES = {
  basico: {
    nombre: "Plan Básico",
    precio: 25,
    precioMax: 30,
    moneda: "USD",
    descripcion: "Planificación completa de tu viaje con itinerario personalizado.",
    incluye: [
      "Llamada inicial de 30–40 minutos",
      "Travel Blueprint personalizado (documento completo)",
      "Itinerario día a día",
      "Qué no perderse por destino",
      "Reservas con anticipación",
      "Transporte dentro y entre ciudades",
      "Seguridad y estafas por destino",
      "Checklist de equipaje",
    ],
  },
  avanzado: {
    nombre: "Plan Avanzado",
    precio: 40,
    precioMax: 50,
    moneda: "USD",
    descripcion: "Todo lo del Plan Básico más asesoría para trámites y documentación.",
    incluye: [
      "Todo lo del Plan Básico",
      "Asesoría para visa americana y ESTA",
      "Revisión de formularios de documentación",
      "Consejos sobre seguros de viaje",
      "Advertencias sobre errores comunes en trámites",
    ],
  },
  premium: {
    nombre: "Plan Premium",
    precio: 65,
    precioMax: 80,
    moneda: "USD",
    descripcion: "Acompañamiento completo antes, durante y ante cualquier imprevisto.",
    incluye: [
      "Todo lo del Plan Avanzado",
      "Soporte por WhatsApp durante el viaje (10 días)",
      "Asesoría ante imprevistos: vuelos cancelados, equipaje perdido, overbooking",
      "Derechos del pasajero y alternativas",
      "Disponible lunes a viernes, respuesta en 24 hs",
    ],
  },
};
```

## Variables de entorno

Creá `.env.local` con la siguiente estructura (sin valores reales, solo las keys):

```env
# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/TU_USUARIO

# Stripe (opcional, para pago online de la llamada)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://viajarmejor.travel
```

## Verificación final

Al terminar, ejecutá `npm run dev` y confirmá que:
- El servidor levanta en `localhost:3000`
- No hay errores de TypeScript
- Tailwind está funcionando
- La estructura de carpetas está completa
