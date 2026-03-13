# Prompt 05 — Página de Planes y Precios

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). Esta página explica en detalle los 3 planes del servicio y lleva al usuario a reservar.

---

## Página: `/planes`

**Archivo:** `src/app/planes/page.tsx`

```tsx
export const metadata = {
  title: "Planes y Precios",
  description: "Elegí el plan de asesoría de viaje que mejor se adapta a vos. Desde planificación básica hasta acompañamiento completo antes y durante el viaje.",
};
```

---

## Estructura de la página

### Hero de la página (no full screen)
```
Fondo: bg-gradient-hero con overlay sutil
Altura: py-24 md:py-32

Badge: "Planes y precios"
Título: "El plan perfecto para tu próximo viaje"
Subtítulo: "Elegí según tu destino, tu tipo de viaje y cuánto acompañamiento necesitás."

No tiene CTA — el usuario bajará a ver los planes
```

---

### Sección 1 — Cards de Planes

Las 3 cards en grilla 1→3 columnas. El plan Avanzado es el destacado (más grande visualmente, borde de color, badge "Más elegido").

Datos de los planes: importar de `src/lib/constants.ts` → `PLANES`.

**Estructura de cada PlanCard:**

```tsx
// src/components/planes/PlanCard.tsx

interface PlanCardProps {
  nombre: string;
  precio: number;
  precioMax: number;
  moneda: string;
  descripcion: string;
  incluye: string[];
  highlighted?: boolean;   // Para el plan Avanzado
  badge?: string;          // "Más elegido"
}
```

**Diseño de la card:**
```
┌─────────────────────────┐
│  [Badge "Más elegido"]  │  ← solo si highlighted
│  Nombre del plan        │
│  Descripción            │
│─────────────────────────│
│  Desde USD XX           │
│  (precio rango)         │
│─────────────────────────│
│  ✓ Feature 1            │
│  ✓ Feature 2            │
│  ✓ Feature 3            │
│  ✓ Feature 4            │
│  ...                    │
│─────────────────────────│
│  [Reservar este plan]   │  → /reservar?plan=basico
└─────────────────────────┘
```

**Estilos:**
- Card normal: fondo blanco, borde `border-stone-200`
- Card highlighted: fondo blanco, borde `border-primary-500 border-2`, ring de color, scale-105 en desktop
- El precio usa `font-serif text-4xl` para el número
- Los checkmarks usan ícono `Check` de lucide-react en `text-primary-600`
- Features que NO incluye el plan: mostrar en `text-stone-300` con ícono `Minus`

---

### Sección 2 — Tabla comparativa

Debajo de las cards, una tabla completa comparando los 3 planes.

```tsx
// Columnas: Feature | Básico | Avanzado | Premium
// Filas:
const COMPARATIVA = [
  { categoria: "Planificación", features: [
    { nombre: "Llamada inicial de 30–40 minutos",         basico: true,  avanzado: true,  premium: true },
    { nombre: "Travel Blueprint personalizado",            basico: true,  avanzado: true,  premium: true },
    { nombre: "Itinerario día a día",                      basico: true,  avanzado: true,  premium: true },
    { nombre: "Qué reservar con anticipación",             basico: true,  avanzado: true,  premium: true },
    { nombre: "Transporte dentro y entre ciudades",        basico: true,  avanzado: true,  premium: true },
    { nombre: "Seguridad y estafas por destino",           basico: true,  avanzado: true,  premium: true },
    { nombre: "Checklist de equipaje",                     basico: true,  avanzado: true,  premium: true },
  ]},
  { categoria: "Trámites", features: [
    { nombre: "Asesoría para visa americana y ESTA",       basico: false, avanzado: true,  premium: true },
    { nombre: "Revisión de formularios",                   basico: false, avanzado: true,  premium: true },
    { nombre: "Consejos sobre seguros de viaje",           basico: false, avanzado: true,  premium: true },
  ]},
  { categoria: "Soporte durante el viaje", features: [
    { nombre: "Soporte por WhatsApp (10 días)",            basico: false, avanzado: false, premium: true },
    { nombre: "Asesoría ante imprevistos",                 basico: false, avanzado: false, premium: true },
    { nombre: "Derechos del pasajero y alternativas",      basico: false, avanzado: false, premium: true },
  ]},
];
```

Sticky header con los nombres de los planes. En mobile: scroll horizontal con la tabla.

---

### Sección 3 — FAQ de precios

```
Preguntas frecuentes:

P: ¿Cómo se paga?
R: Podés pagar en USD por transferencia bancaria, Wise o Payoneer, o en pesos argentinos por Mercado Pago.
   El pago se realiza antes de la llamada al reservar tu turno.

P: ¿Qué pasa si no quedo conforme?
R: Si después de la llamada sentís que el servicio no fue lo que esperabas, lo hablamos.
   Mi objetivo es que te vayas con todo lo que necesitás para viajar mejor.

P: ¿Cuánto tiempo tarda en estar listo el documento?
R: Generalmente entre 24 y 48 horas después de la llamada.

P: ¿Puedo cambiar de plan después de reservar?
R: Sí, podés upgradear tu plan en cualquier momento antes de la llamada.

P: ¿El soporte de WhatsApp del Premium está disponible las 24 hs?
R: El soporte está disponible de lunes a viernes con respuesta garantizada en menos de 24 hs.
   Para emergencias urgentes podés escribir igual — hago lo posible por responder a tiempo.

P: ¿Cuántos destinos incluye la asesoría?
R: No hay límite de destinos. Si tu viaje incluye 5 países, los cubrimos todos.
```

Usá un componente `Accordion` para el FAQ. Implementarlo con estado local (no instalar librería extra).

---

### Sección 4 — CTA final

```
"¿Todavía tenés dudas?"

Dos opciones:
→ "Reservar llamada" → /reservar (btn-primary)
→ "Preguntá por WhatsApp" → wa.me link (btn-whatsapp)

Texto: "Sin compromiso. Contame adónde querés ir y empezamos."
```

---

## Notas
- El link "Reservar este plan" de cada card debe pasar el plan como query param: `/reservar?plan=basico`
- La página de reservar usará ese parámetro para pre-seleccionar el plan en el formulario
- Usá `useSearchParams` o simplemente pasá el plan como parámetro en el link
