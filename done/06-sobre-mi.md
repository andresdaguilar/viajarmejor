# Prompt 06 — Página "Sobre mí"

## Contexto
Sitio de **Viajar Mejor** (`viajarmejor.travel`). Esta página construye la confianza del visitante presentando a Andy: su experiencia real, su historia y por qué creó el servicio.

Es una de las páginas más importantes para convertir — la gente compra asesoría de una persona, no de una marca.

---

## Página: `/sobre-mi`

**Archivo:** `src/app/sobre-mi/page.tsx`

```tsx
export const metadata = {
  title: "Sobre mí — Andy",
  description: "Conocé a Andy, asesor de viajes con experiencia en más de 55 países y 200 ciudades. La persona detrás de Viajar Mejor.",
};
```

---

## Estructura de la página

### Sección 1 — Hero personal

```
Layout: dos columnas (foto izquierda, texto derecha) en desktop
        stack (foto arriba, texto abajo) en mobile

Foto: /public/images/andy.jpg
      → Forma: rounded-2xl o circular con borde de color
      → Agregar un badge superpuesto en la esquina inferior: "55+ países ✈️"

Nombre: "Andy"
Rol: "Asesor de viajes y fundador de Viajar Mejor"

Texto introductorio:
"Viajé a más de 55 países y 200 ciudades. No como influencer — sino como alguien
que necesitaba entender cada destino antes de llegar.

Con el tiempo empecé a ayudar a amigos y familia a planificar sus viajes.
Siempre había algo que podía mejorar: una reserva que no sabían que debían hacer,
una estafa que podían evitar, una experiencia que no encontraban en internet.

Eso me llevó a crear Viajar Mejor."

Stats debajo del texto (pequeños, en fila):
55+ países | 200+ ciudades | 10+ años viajando
```

---

### Sección 2 — Mi historia

Texto largo en columna centrada (max-w-2xl). Separado en párrafos con subtítulos.

```
H3: "Cómo empecé a viajar"
Texto sobre los primeros viajes, aprender a moverse por el mundo.

H3: "Lo que me enseñaron 55 países"
La diferencia entre ser turista y ser viajero. La importancia de la planificación.
Los errores que cometí y lo que aprendí de cada uno.

H3: "Por qué creé Viajar Mejor"
La historia de ayudar a amigos. Darme cuenta de que ese conocimiento tenía valor.
El momento en que decidí formalizarlo como servicio.
```

**Nota:** Usar texto placeholder convincente y coherente con el tono del proyecto. El cliente lo reemplazará con su texto real.

---

### Sección 3 — Experiencias destacadas

Grilla de tarjetas con experiencias personales que construyen credencial:

```
Card 1: Safaris en África
        "Kenya, Tanzania, Sudáfrica. Aprendí que un safari bien planificado es
        completamente distinto a uno improvisado."
        Ícono o emoji: 🦁

Card 2: Auroras boreales
        "Islandia, Noruega, Finlandia. La magia de estar en el lugar correcto
        en el momento exacto."
        Ícono o emoji: 🌌

Card 3: Maratones internacionales
        "Corrí maratones en distintos continentes. Viajar para correr requiere
        una logística completamente diferente."
        Ícono o emoji: 🏃

Card 4: Viajes de surf
        "Costa Rica, Portugal, Sudáfrica. Saber dónde están las olas no es
        suficiente — hay que saber cómo llegar a ellas."
        Ícono o emoji: 🏄

Card 5: Road trips
        "Miles de kilómetros en auto por distintos países. Aprendés a leer
        un destino diferente cuando lo recorrés desde adentro."
        Ícono o emoji: 🚗

Card 6: Viajes en tren por Europa y Asia
        "El tren es otra forma de viajar. Hay rutas que transforman el trayecto
        en parte de la experiencia."
        Ícono o emoji: 🚂
```

Grilla: 2 columnas en mobile, 3 en desktop.

---

### Sección 4 — Mapa de países (visual)

Una visualización simple de los países visitados. Opciones:

**Opción A (recomendada para MVP):** Lista de regiones con número de países:
```
Europa        → 25+ países
América       → 15+ países
Asia          → 8+ países
África        → 5+ países
Oceanía       → 2+ países
```

Cada región con barra de progreso visual y lista de países visitados.

**Opción B (más visual):** Usar `react-simple-maps` para mostrar un mapa del mundo con países coloreados.

Instalación si se elige Opción B: `npm install react-simple-maps`

---

### Sección 5 — Mis valores como asesor

```
Badge: "Cómo trabajo"

3 columnas con ícono + título + texto:

1. "Experiencia real, no información de internet"
   Cada consejo que doy viene de haber estado ahí.
   No de copiar guías o leer blogs.
   Ícono: MapPin

2. "Tu viaje, no el mío"
   No te vendo destinos ni experiencias porque me gusten a mí.
   Te pregunto qué querés vos y lo optimizo.
   Ícono: User

3. "Honestidad ante todo"
   Si un destino no es para vos, te lo digo.
   Si algo no vale la pena, también.
   Ícono: ShieldCheck
```

---

### Sección 6 — CTA

```
Fondo: bg-primary-50, borde redondeado

"¿Querés que te ayude a planificar tu próximo viaje?"

CTAs:
→ "Reservar llamada" → /reservar
→ "Escribime por WhatsApp" → wa.me link
```

---

## Notas
- La foto de Andy (`/public/images/andy.jpg`) debe cargarse con `next/image` con buena optimización
- El tono de la página es personal y cálido — no corporativo
- Usar animaciones de entrada suaves con framer-motion (fade-up al entrar al viewport)
- Mobile first
