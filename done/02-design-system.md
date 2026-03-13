# Prompt 02 — Design System y Estilos Globales

## Contexto
Estoy construyendo el sitio de **Viajar Mejor** (`viajarmejor.travel`), un servicio de asesoría de viajes personalizada. El estilo es **moderno, profesional, tipo revista de viajes de lujo accesible** — no genérico ni turístico barato. Inspiración visual: revistas como Condé Nast Traveler, National Geographic Travel, pero más limpio y digital.

## Paleta de colores

Implementá esta paleta en `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Primario — Azul profundo tipo océano
        primary: {
          50:  "#eef4ff",
          100: "#d9e7ff",
          200: "#bcd3fe",
          300: "#8eb6fc",
          400: "#598df8",
          500: "#3366f4",
          600: "#1a47e9",
          700: "#1535d0",
          800: "#172ca9",
          900: "#192b84",
          950: "#131c52",
        },
        // Acento — Arena cálida / dorado viajero
        sand: {
          50:  "#fdf8ef",
          100: "#faefd9",
          200: "#f4dcb2",
          300: "#ecc381",
          400: "#e4a24e",
          500: "#dc8829",
          600: "#cc6f1e",
          700: "#a8541b",
          800: "#87431d",
          900: "#6e391a",
          950: "#3b1c0b",
        },
        // Neutros
        stone: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
      },
      fontFamily: {
        serif:  ["var(--font-playfair)", "Georgia", "serif"],
        sans:   ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)",   { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card:    "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        glow:    "0 0 40px rgba(51, 102, 244, 0.15)",
      },
      backgroundImage: {
        "gradient-hero":   "linear-gradient(135deg, #131c52 0%, #1535d0 50%, #3366f4 100%)",
        "gradient-warm":   "linear-gradient(135deg, #3b1c0b 0%, #cc6f1e 100%)",
        "gradient-subtle": "linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease-out forwards",
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "slide-in":   "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideIn: { "0%": { opacity: "0", transform: "translateX(-20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

Instalá el plugin: `npm install @tailwindcss/typography`

## Estilos globales

Reemplazá `src/app/globals.css` con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-inter: 'Inter', system-ui, sans-serif;
    --font-playfair: 'Playfair Display', Georgia, serif;
  }

  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-white text-stone-800 font-sans antialiased;
  }

  h1, h2, h3 {
    @apply font-serif;
  }

  h4, h5, h6 {
    @apply font-sans font-semibold;
  }

  ::selection {
    @apply bg-primary-100 text-primary-900;
  }

  /* Scrollbar sutil */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { @apply bg-stone-100; }
  ::-webkit-scrollbar-thumb { @apply bg-stone-300 rounded-full; }
  ::-webkit-scrollbar-thumb:hover { @apply bg-stone-400; }
}

@layer components {
  /* Contenedor principal */
  .container-site {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  /* Secciones */
  .section {
    @apply py-section;
  }
  .section-sm {
    @apply py-section-sm;
  }

  /* Buttons */
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700
           text-white font-semibold px-6 py-3 rounded-xl
           transition-all duration-200 shadow-sm hover:shadow-md
           active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .btn-secondary {
    @apply inline-flex items-center gap-2 bg-white hover:bg-stone-50
           text-stone-800 font-semibold px-6 py-3 rounded-xl
           border border-stone-200 hover:border-stone-300
           transition-all duration-200 shadow-sm hover:shadow-md
           active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2;
  }

  .btn-ghost {
    @apply inline-flex items-center gap-2 text-primary-600 hover:text-primary-700
           font-semibold px-4 py-2 rounded-lg
           hover:bg-primary-50 transition-all duration-200;
  }

  .btn-whatsapp {
    @apply inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a]
           text-white font-semibold px-6 py-3 rounded-xl
           transition-all duration-200 shadow-sm hover:shadow-md active:scale-95;
  }

  /* Cards */
  .card {
    @apply bg-white rounded-2xl shadow-card border border-stone-100
           transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5;
  }

  /* Badges */
  .badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
  }
  .badge-primary {
    @apply badge bg-primary-50 text-primary-700;
  }
  .badge-sand {
    @apply badge bg-sand-50 text-sand-700;
  }

  /* Texto destacado en títulos */
  .text-highlight {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400;
  }
  .text-highlight-warm {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-sand-600 to-sand-400;
  }

  /* Divisor de sección */
  .section-divider {
    @apply h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent;
  }

  /* Prose para blog */
  .prose-viajarmejor {
    @apply prose prose-stone max-w-none
           prose-headings:font-serif prose-headings:text-stone-900
           prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
           prose-img:rounded-2xl prose-img:shadow-card
           prose-blockquote:border-primary-400 prose-blockquote:bg-primary-50 prose-blockquote:rounded-r-xl
           prose-code:bg-stone-100 prose-code:rounded prose-code:text-sm;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Layout raíz con fuentes

Actualizá `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
```

## Componente Button reutilizable

Creá `src/components/ui/Button.tsx`:

```tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variants = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  ghost:     "btn-ghost",
  whatsapp:  "btn-whatsapp",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
```

Creá también `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Instalá: `npm install clsx tailwind-merge`

## Componente SectionHeader reutilizable

Creá `src/components/ui/SectionHeader.tsx`:

```tsx
interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ badge, title, titleHighlight, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {badge && <span className="badge-primary mb-4 inline-block">{badge}</span>}
      <h2 className="text-display-md text-stone-900 mb-4">
        {title}{" "}
        {titleHighlight && <span className="text-highlight">{titleHighlight}</span>}
      </h2>
      {subtitle && <p className="text-lg text-stone-500 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
```

## Verificación
- Corrí `npm run dev` y verificá que los estilos se aplican correctamente
- Abrí en mobile (DevTools) y confirmá que las fuentes y colores están bien
- No debe haber errores de TypeScript ni de Tailwind
