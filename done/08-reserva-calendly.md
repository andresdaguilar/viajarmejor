# Prompt 08 — Página de Reserva de Llamada (Calendly + Pago)

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). Esta página es la más importante del sitio: donde el visitante se convierte en cliente. El flujo es: elegir plan → pagar → agendar llamada en Calendly.

---

## Página: `/reservar`

**Archivo:** `src/app/reservar/page.tsx`

```tsx
export const metadata = {
  title: "Reservar llamada de asesoría",
  description: "Reservá tu llamada de asesoría de viaje. Elegí el plan, realizá el pago y agendá tu turno en menos de 5 minutos.",
};
```

---

## Flujo de la página

```
Paso 1: Elegir plan (si no viene pre-seleccionado desde /planes?plan=basico)
Paso 2: Datos de contacto + destino del viaje
Paso 3: Pago
Paso 4: Agendar en Calendly (embed o redirect)
```

Mostrar los 4 pasos como stepper visual en la parte superior.

---

## Sección 1 — Hero simple

```
Sin imagen de fondo. Fondo blanco.
py-12

Badge: "Reservar asesoría"
Título: "Empezá a planificar tu viaje"
Subtítulo: "30–40 minutos de llamada para transformar tu próximo viaje."

Indicadores de confianza (inline, pequeños):
🔒 Pago seguro   ✈️ Respuesta en 24 hs   ⭐ Satisfacción garantizada
```

---

## Sección 2 — Stepper + Formulario

Implementar como componente cliente con estado local para los pasos.

**Archivo:** `src/components/reservar/ReservaFlow.tsx`

### Paso 1: Selección de plan

Mostrar las 3 cards de planes en versión compacta (más pequeñas que en `/planes`).

```tsx
// Leer el plan de la URL si viene: ?plan=basico
// useSearchParams() para pre-seleccionar

interface PlanOption {
  id: "basico" | "avanzado" | "premium";
  nombre: string;
  precio: number;
  precioMax: number;
  tagline: string;  // versión ultra corta
}
```

Al hacer click en un plan, se marca como seleccionado (borde de color, checkmark) y aparece el botón "Continuar".

### Paso 2: Datos del viaje

Formulario con `react-hook-form` + `zod`:

```typescript
const schema = z.object({
  nombre:    z.string().min(2, "Ingresá tu nombre"),
  email:     z.string().email("Email inválido"),
  whatsapp:  z.string().min(8, "Ingresá tu WhatsApp"),
  destino:   z.string().min(2, "Ingresá el destino"),
  fechas:    z.string().min(2, "Ingresá las fechas aproximadas"),
  grupo:     z.enum(["solo", "pareja", "amigos", "familia"]),
  consulta:  z.string().optional(),
});
```

Campos:
- Nombre completo
- Email
- WhatsApp (con placeholder: +54 9 11 xxxx-xxxx)
- Destino(s) del viaje
- Fechas aproximadas (texto libre, no date picker)
- Grupo de viaje (radio buttons visuales: Solo / Pareja / Amigos / Familia)
- ¿Algo más que quieras contarme? (textarea, opcional)

Botón: "Continuar al pago"

### Paso 3: Pago

**Diseño:**

```
Resumen del pedido:
┌──────────────────────────────────┐
│  Plan seleccionado: Avanzado     │
│  Precio: USD 40–50               │
│  ──────────────────────────────  │
│  Total: USD 45                   │
└──────────────────────────────────┘
```

**Opciones de pago (tabs):**

**Tab 1 — Transferencia / Wise:**
```
Realizá el pago a:
• Wise: andy@viajarmejor.travel (placeholder)
• Transferencia bancaria: [datos bancarios placeholder]

Monto exacto: USD [precio del plan] o equivalente en ARS al cambio del día.

Una vez realizado el pago, enviame el comprobante por WhatsApp:
[Botón: Enviar comprobante por WhatsApp] → abre wa.me con mensaje pre-escrito

Después de confirmar el pago, podés agendar tu llamada.
[Botón: Ya pagué, agendar llamada] → avanza al paso 4
```

**Tab 2 — Mercado Pago (pesos):**
```
Próximamente disponible el pago en pesos.
Por ahora podés pagar por transferencia o contactarme por WhatsApp.
[Botón: Contactar por WhatsApp] → wa.me link
```

**Nota:** Stripe queda preparado pero comentado — el cliente puede activarlo después:
```tsx
{/* STRIPE - descomentar cuando esté configurado
<StripePaymentForm plan={selectedPlan} onSuccess={handlePaymentSuccess} />
*/}
```

### Paso 4: Agendar en Calendly

```tsx
// src/components/reservar/CalendlyEmbed.tsx
"use client";
import { useEffect } from "react";

interface CalendlyEmbedProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
  };
}

export function CalendlyEmbed({ url, prefill }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const params = new URLSearchParams({
    hide_landing_page_details: "1",
    hide_gdpr_banner: "1",
    ...(prefill?.name  && { name: prefill.name }),
    ...(prefill?.email && { email: prefill.email }),
  });

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={`${url}?${params}`}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
```

La URL de Calendly viene de `process.env.NEXT_PUBLIC_CALENDLY_URL`.

Pre-rellenar nombre y email con los datos del paso 2.

---

## Sección 3 — Garantías y confianza

Debajo del formulario/flow, mostrar:

```
3 columnas:

🔒 Pago seguro
"Tu pago está protegido. Si algo falla, lo resolvemos juntos."

💬 Respuesta garantizada
"Confirmamos tu llamada en menos de 24 horas hábiles."

✅ Sin letra chica
"El precio que ves es lo que pagás. Sin costos ocultos."
```

---

## Sección 4 — FAQ corto (solo 3 preguntas)

```
¿Qué pasa si necesito cancelar la llamada?
Podés reprogramar hasta 24 horas antes sin problema.

¿El pago lo hago antes o después de la llamada?
El pago es previo — se confirma la llamada una vez acreditado.

¿Puedo pagar en pesos?
Sí, podés pagar el equivalente en pesos argentinos al cambio del día.
```

---

## Estado global del formulario

Usar `useState` local en el componente padre `ReservaFlow.tsx`:

```typescript
interface ReservaState {
  step: 1 | 2 | 3 | 4;
  plan: "basico" | "avanzado" | "premium" | null;
  formData: {
    nombre: string;
    email: string;
    whatsapp: string;
    destino: string;
    fechas: string;
    grupo: string;
    consulta: string;
  } | null;
  pagoConfirmado: boolean;
}
```

---

## Notas importantes
- El componente `ReservaFlow` es `"use client"` completo
- Los datos del formulario se usan para pre-rellenar Calendly en el paso 4
- El WhatsApp del paso 3 (enviar comprobante) usa:
  ```typescript
  const msg = `Hola Andy, acabo de pagar el ${plan} para asesoría de viaje. Mi nombre es ${nombre} y mi destino es ${destino}. Te mando el comprobante.`;
  const url = `https://wa.me/5493417424395?text=${encodeURIComponent(msg)}`;
  ```
- Mobile first — el stepper en mobile muestra solo el número de paso activo
