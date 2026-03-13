import { createMetadata } from "@/lib/metadata";
import { SITE, CONTACT } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Términos y Condiciones — Viajar Mejor",
  description:
    "Términos y condiciones de uso del sitio y del servicio de asesoría de viajes de Viajar Mejor.",
  path: "/terminos-y-condiciones",
});

export default function TerminosPage() {
  return (
    <main className="section">
      <div className="container-site max-w-3xl">
        <h1 className="text-display-lg text-stone-900 mb-2">
          Términos y Condiciones
        </h1>
        <p className="text-stone-500 text-sm mb-12">
          Última actualización: marzo 2025
        </p>

        <div className="prose prose-stone max-w-none space-y-10 text-stone-600">
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              1. Aceptación de los términos
            </h2>
            <p className="leading-relaxed">
              Al acceder y utilizar el sitio web {SITE.url} y los servicios de
              asesoría de viajes ofrecidos por Viajar Mejor, aceptás estos
              términos y condiciones en su totalidad. Si no estás de acuerdo con
              alguna parte, no debés utilizar el sitio ni contratar el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              2. Descripción del servicio
            </h2>
            <p className="leading-relaxed">
              Viajar Mejor ofrece asesoría de viajes personalizada mediante
              llamadas de consultoría, documentos de planificación (Travel
              Blueprint) y, según el plan contratado, soporte durante el viaje.
              El servicio es de asesoramiento e información; no vendemos paquetes
              turísticos, vuelos ni alojamientos directamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              3. Reserva, pago y cancelación
            </h2>
            <p className="leading-relaxed mb-4">
              La reserva de la llamada de asesoría se realiza a través del sitio
              y/o Calendly. El pago es previo a la realización de la llamada.
              Podés reprogramar o cancelar hasta 24 horas antes de la cita sin
              penalidad; después de ese plazo, el pago no se reintegra pero podés
              reagendar una vez.
            </p>
            <p className="leading-relaxed">
              Los métodos de pago aceptados son Mercado Pago o transferencia bancaria. El
              servicio se confirma una vez acreditado el pago.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              4. Uso del sitio web
            </h2>
            <p className="leading-relaxed">
              El sitio está destinado a uso personal e informativo. No podés
              copiar, modificar, distribuir o explotar comercialmente el contenido
              sin autorización. No está permitido usar el sitio para fines
              ilegales, fraudulentos o que puedan dañar o sobrecargar la
              infraestructura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              5. Propiedad intelectual
            </h2>
            <p className="leading-relaxed">
              El contenido del sitio (textos, logos, imágenes, diseño) es
              propiedad de Viajar Mejor o de sus licenciantes. Los documentos
              entregados como parte del servicio (Travel Blueprint, itinerarios)
              son para uso personal del cliente; no podés revenderlos ni
              redistribuirlos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              6. Privacidad y datos personales
            </h2>
            <p className="leading-relaxed">
              Los datos que proporcionás (nombre, email, WhatsApp, destino) se
              utilizan para prestar el servicio y comunicarnos con vos. No
              compartimos tu información con terceros para fines comerciales.
              Los datos de pago son manejados por los proveedores de pago
              (Mercado Pago, etc.) según sus propias políticas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              7. Limitación de responsabilidad
            </h2>
            <p className="leading-relaxed">
              La asesoría se basa en experiencia personal y conocimiento
              general; no constituye asesoramiento legal, migratorio ni médico.
              Para trámites oficiales (visas, etc.) recomendamos consultar a
              profesionales especializados. Viajar Mejor no se responsabiliza por
              cambios en normativas, condiciones de aerolíneas o destinos, ni por
              decisiones que el cliente tome en base a la información recibida.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              8. Modificaciones
            </h2>
            <p className="leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Los cambios se publicarán en esta página con la fecha de
              actualización. El uso continuado del sitio tras las modificaciones
              implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              9. Ley aplicable y jurisdicción
            </h2>
            <p className="leading-relaxed">
              Estos términos se rigen por las leyes de la República Argentina.
              Cualquier controversia será sometida a los tribunales competentes
              de la ciudad de Rosario, Santa Fe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              10. Contacto
            </h2>
            <p className="leading-relaxed">
              Para consultas sobre estos términos:{" "}
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                WhatsApp
              </a>{" "}
              o{" "}
              <Link href="/contacto" className="text-primary-600 hover:text-primary-700 font-medium">
                Contacto
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
