import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PlanCard } from "@/components/planes/PlanCard";
import { Accordion } from "@/components/ui/Accordion";
import { PLANES, CONTACT } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Planes y Precios — Viajar Mejor",
  description:
    "Elegí el plan de asesoría de viaje ideal. Plan Básico desde AR$ 35.000, Avanzado desde AR$ 60.000, Premium desde AR$ 99.000. Incluye Travel Blueprint personalizado.",
  path: "/planes",
});

const COMPARATIVA = [
  {
    categoria: "Planificación",
    features: [
      { nombre: "Llamada inicial de 30–40 minutos", basico: true, avanzado: true, premium: true },
      { nombre: "Travel Blueprint personalizado", basico: true, avanzado: true, premium: true },
      { nombre: "Itinerario día a día", basico: true, avanzado: true, premium: true },
      { nombre: "Qué reservar con anticipación", basico: true, avanzado: true, premium: true },
      { nombre: "Transporte dentro y entre ciudades", basico: true, avanzado: true, premium: true },
      { nombre: "Seguridad y estafas por destino", basico: true, avanzado: true, premium: true },
      { nombre: "Checklist de equipaje", basico: true, avanzado: true, premium: true },
    ],
  },
  {
    categoria: "Trámites",
    features: [
      { nombre: "Asesoría para visa americana y ESTA", basico: false, avanzado: true, premium: true },
      { nombre: "Revisión de formularios", basico: false, avanzado: true, premium: true },
      { nombre: "Consejos sobre seguros de viaje", basico: false, avanzado: true, premium: true },
    ],
  },
  {
    categoria: "Soporte durante el viaje",
    features: [
      { nombre: "Soporte por WhatsApp (10 días)", basico: false, avanzado: false, premium: true },
      { nombre: "Asesoría ante imprevistos", basico: false, avanzado: false, premium: true },
      { nombre: "Derechos del pasajero y alternativas", basico: false, avanzado: false, premium: true },
    ],
  },
];

const FAQ_ITEMS = [
  {
    question: "¿Cómo se paga?",
    answer:
      "Podés pagar por Mercado Pago o transferencia bancaria. El pago se realiza antes de la llamada al reservar tu turno.",
  },
  {
    question: "¿Qué pasa si no quedo conforme?",
    answer:
      "Si después de la llamada sentís que el servicio no fue lo que esperabas, lo hablamos. Mi objetivo es que te vayas con todo lo que necesitás para viajar mejor.",
  },
  {
    question: "¿Cuánto tiempo tarda en estar listo el documento?",
    answer: "Generalmente entre 24 y 48 horas después de la llamada.",
  },
  {
    question: "¿Puedo cambiar de plan después de reservar?",
    answer: "Sí, podés upgradear tu plan en cualquier momento antes de la llamada.",
  },
  {
    question: "¿El soporte de WhatsApp del Premium está disponible las 24 hs?",
    answer:
      "El soporte está disponible de lunes a viernes con respuesta garantizada en menos de 24 hs. Para emergencias urgentes podés escribir igual — hago lo posible por responder a tiempo.",
  },
  {
    question: "¿Cuántos destinos incluye la asesoría?",
    answer:
      "No hay límite de destinos. Si tu viaje incluye 5 países, los cubrimos todos.",
  },
];

const WHATSAPP_URL = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

export default function PlanesPage() {
  return (
    <main>
      {/* Hero */}
      <section id="planes" className="py-24 md:py-32 bg-gradient-hero">
        <div className="container-site text-center text-white">
          <SectionHeader
            badge="Planes y precios"
            title="El plan perfecto para tu próximo viaje"
            subtitle="Elegí según tu destino, tu tipo de viaje y cuánto acompañamiento necesitás."
            centered={true}
            light={true}
          />
        </div>
      </section>

      {/* Plan Cards */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <PlanCard
              planSlug="basico"
              {...PLANES.basico}
              highlighted={false}
            />
            <PlanCard
              planSlug="avanzado"
              {...PLANES.avanzado}
              highlighted={true}
              badge="Más elegido"
            />
            <PlanCard
              planSlug="premium"
              {...PLANES.premium}
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* Tabla comparativa */}
      <section className="section bg-stone-50">
        <div className="container-site">
          <h2 className="text-display-md text-stone-900 text-center mb-12">
            Compará los planes
          </h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="min-w-[700px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-stone-200">
                    <th className="py-4 pr-4 font-semibold text-stone-500">
                      Incluido
                    </th>
                    <th className="py-4 px-4 font-semibold text-stone-900 text-center">
                      Básico
                    </th>
                    <th className="py-4 px-4 font-semibold text-stone-900 text-center">
                      Avanzado
                    </th>
                    <th className="py-4 px-4 font-semibold text-stone-900 text-center">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIVA.flatMap((cat, catIdx) => [
                    <tr key={`cat-${catIdx}`}>
                      <td
                        colSpan={4}
                        className="py-3 font-semibold text-stone-700 bg-stone-100/50"
                      >
                        {cat.categoria}
                      </td>
                    </tr>,
                    ...cat.features.map((f, fIdx) => (
                      <tr
                        key={`${catIdx}-${fIdx}`}
                        className="border-b border-stone-100"
                      >
                        <td className="py-3 pr-4 text-stone-600">{f.nombre}</td>
                        <td className="py-3 px-4 text-center">
                          {f.basico ? "✓" : "—"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {f.avanzado ? "✓" : "—"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {f.premium ? "✓" : "—"}
                        </td>
                      </tr>
                    )),
                  ])}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section bg-white">
        <div className="container-site max-w-3xl">
          <h2 className="text-display-md text-stone-900 text-center mb-12">
            Preguntas frecuentes
          </h2>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* CTA Final */}
      <section className="section bg-stone-50">
        <div className="container-site text-center">
          <h2 className="text-display-md text-stone-900 mb-6">
            ¿Todavía tenés dudas?
          </h2>
          <p className="text-stone-600 mb-8">
            Sin compromiso. Contame adónde querés ir y empezamos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservar" className="btn-primary inline-flex justify-center">
              Reservar llamada
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex justify-center"
            >
              Preguntá por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
