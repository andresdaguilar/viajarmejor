# Viajar Mejor — Prompts para Cursor

Estos son los prompts para generar el sitio completo de **viajarmejor.travel** usando Cursor.

Ejecutalos **en orden**. Cada uno asume que el anterior está completo.

---

## Orden de ejecución

| # | Archivo | Qué hace | Tiempo estimado |
|---|---------|----------|----------------|
| 01 | `01-setup-proyecto.md` | Crea el proyecto Next.js, instala dependencias, estructura de carpetas y constantes | 10 min |
| 02 | `02-design-system.md` | Paleta de colores, Tailwind config, estilos globales, componentes UI base | 15 min |
| 03 | `03-navbar-footer-whatsapp.md` | Navbar sticky, Footer y botón flotante de WhatsApp | 20 min |
| 04 | `04-landing-home.md` | Todas las secciones de la Home (Hero, Stats, Cómo funciona, Planes preview, Testimonios, etc.) | 30 min |
| 05 | `05-planes-precios.md` | Página de planes con cards, tabla comparativa y FAQ | 20 min |
| 06 | `06-sobre-mi.md` | Página personal de Andy con foto, historia y credenciales | 20 min |
| 07 | `07-blog-articulos.md` | Sistema de blog MDX + 4 artículos de ejemplo | 25 min |
| 08 | `08-reserva-calendly.md` | Flujo de reserva con Calendly, stepper y opciones de pago | 30 min |
| 09 | `09-seo-deploy.md` | SEO, sitemap, robots.txt, Schema.org y deploy en Vercel | 15 min |

**Tiempo total estimado: ~3 horas**

---

## Páginas del sitio

- `/` — Landing page
- `/planes` — Planes y precios
- `/sobre-mi` — Sobre Andy
- `/blog` — Lista de artículos
- `/blog/[slug]` — Artículo individual
- `/reservar` — Reservar llamada (flujo de pago + Calendly)
- `/contacto` — Contacto

---

## Variables de entorno necesarias

Antes de empezar el Prompt 08, tener listos:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/TU_USUARIO
NEXT_PUBLIC_SITE_URL=https://viajarmejor.travel
```

---

## Datos de contacto configurados

- **WhatsApp:** +5493417424395
- **Dominio:** viajarmejor.travel
- **Deploy:** Vercel

---

## Notas

- Todos los prompts son **mobile first**
- El botón de WhatsApp aparece en **todas las páginas**
- El blog usa archivos **MDX en el repo** (no CMS externo por ahora)
- Stripe está preparado pero **comentado** — se activa cuando el cliente lo configure
- Mercado Pago queda como "próximamente" en la página de reserva
