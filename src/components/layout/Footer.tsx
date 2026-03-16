import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { SITE, CONTACT } from "@/lib/constants";

const FOOTER_SERVICIO = [
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Plan Básico", href: "/planes#basico" },
  { label: "Plan Avanzado", href: "/planes#avanzado" },
  { label: "Plan Premium", href: "/planes#premium" },
  { label: "Reservar llamada", href: "/reservar" },
];

const FOOTER_RECURSOS = [
  { label: "Blog", href: "/blog" },
  { label: "Artículos de viaje", href: "/blog" },
  { label: "Guías de destinos", href: "/blog" },
  { label: "Preguntas frecuentes", href: "/planes#faq" },
];

export function Footer() {
  const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <footer className="bg-stone-900 text-stone-400">
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent" />

      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1 — Marca */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/Logo_ViajarMejor.png"
                alt=""
                width={140}
                height={44}
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
              <span className="font-display font-semibold text-xl text-white">
                Viajar Mejor
              </span>
            </Link>
            <p className="text-stone-400 text-sm mb-6 max-w-xs">
              {SITE.tagline}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              WhatsApp
            </a>
          </div>

          {/* Col 2 — Servicio */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicio</h3>
            <ul className="space-y-2">
              {FOOTER_SERVICIO.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Recursos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              {FOOTER_RECURSOS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  WhatsApp: +54 9 341 742-4395
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/viajarmejor.travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Instagram @viajarmejor.travel"
                >
                  <Instagram className="w-5 h-5 shrink-0 text-white" />
                  @viajarmejor.travel
                </a>
              </li>
              <li className="text-stone-400">{SITE.url.replace("https://", "")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span>© 2025 {SITE.name}. Todos los derechos reservados.</span>
            <Link
              href="/terminos-y-condiciones"
              className="text-stone-500 hover:text-stone-400 transition-colors"
            >
              Términos y condiciones
            </Link>
          </p>
          <p>Hecho con ✈️ en Argentina.</p>
        </div>
      </div>
    </footer>
  );
}
