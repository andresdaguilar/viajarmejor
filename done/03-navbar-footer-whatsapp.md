# Prompt 03 — Navbar, Footer y Botón de WhatsApp

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). Asesoría de viajes personalizada para Argentina y Latinoamérica. Andy tiene experiencia en 55+ países.

El diseño es moderno, tipo revista de viajes. Los estilos globales y la paleta ya están definidos en el prompt anterior.

---

## 1. Navbar

Creá `src/components/layout/Navbar.tsx`.

**Comportamiento:**
- Desktop: logo a la izquierda, links en el centro, CTA "Reservar llamada" a la derecha
- Mobile: logo + hamburger menu, menú desplegable con animación suave
- Al hacer scroll hacia abajo: navbar se vuelve con fondo blanco y sombra sutil (glassmorphism)
- Al estar en el top de la página: navbar transparente sobre el hero
- Link activo debe resaltarse visualmente

**Links del menú:**
```typescript
const NAV_LINKS = [
  { label: "Inicio",           href: "/" },
  { label: "Cómo funciona",    href: "/#como-funciona" },
  { label: "Planes",           href: "/planes" },
  { label: "Blog",             href: "/blog" },
  { label: "Sobre mí",         href: "/sobre-mi" },
];
```

**CTA principal:** "Reservar llamada" → `/reservar` → usar `btn-primary` en desktop, visible también en el menú mobile

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Implementar con:
// - useScrollPosition hook para detectar scroll
// - AnimatePresence de framer-motion para el menú mobile
// - Clases condicionales según scroll y pathname
// - Logo: /public/logo.svg con next/image
// - Altura: h-16 en mobile, h-20 en desktop
// - Z-index: z-50
```

---

## 2. Footer

Creá `src/components/layout/Footer.tsx`.

**Estructura (4 columnas en desktop, stack en mobile):**

```
Col 1 — Marca:
  Logo + tagline
  "Viajá con inteligencia. Aprovechá cada destino."
  Botón de WhatsApp directo

Col 2 — Servicio:
  Cómo funciona
  Plan Básico
  Plan Avanzado
  Plan Premium
  Reservar llamada

Col 3 — Recursos:
  Blog
  Artículos de viaje
  Guías de destinos
  Preguntas frecuentes

Col 4 — Contacto:
  WhatsApp: +54 9 341 742-4395
  Instagram: @viajarmejor (placeholder)
  viajarmejor.travel
```

**Footer bottom bar:**
```
© 2025 Viajar Mejor. Todos los derechos reservados.
Hecho con ✈️ en Argentina.
```

**Estilo:**
- Fondo: `bg-stone-900` con texto `text-stone-400`
- Links: hover `text-white` con transición
- Separador superior: gradiente sutil
- Mobile: 2 columnas en la grilla

---

## 3. Botón flotante de WhatsApp

Creá `src/components/layout/WhatsAppButton.tsx`.

**Comportamiento:**
- Flotante en la esquina inferior derecha en TODAS las páginas
- Siempre visible, con z-index alto (z-50)
- Al hacer hover: se expande mostrando "¿Necesitás ayuda?" con animación
- Al hacer click: abre WhatsApp con mensaje predefinido
- En mobile: solo ícono (sin texto expandible)
- Aparece con animación de entrada después de 2 segundos de carga

**Datos:**
```typescript
const WHATSAPP_NUMBER = "5493417424395";
const WHATSAPP_MESSAGE = "Hola Andy, me gustaría conocer más sobre el servicio de asesoría de viajes.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
```

**Implementación:**

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip "¿Necesitás ayuda?" visible en hover, solo desktop */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hidden md:block bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg whitespace-nowrap"
              >
                ¿Necesitás ayuda?
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Contactar por WhatsApp"
          >
            {/* SVG del logo de WhatsApp */}
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Verificación final
- Navbar se vuelve opaco al hacer scroll en todas las páginas
- El menú mobile abre y cierra con animación
- El botón de WhatsApp aparece a los 2 segundos con animación de entrada
- El tooltip de WhatsApp aparece en hover solo en desktop
- El footer se ve bien en mobile (2 columnas) y desktop (4 columnas)
- Todos los links del footer son `<Link>` de Next.js excepto el de WhatsApp que es `<a target="_blank">`
