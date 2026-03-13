import { createMetadata } from "@/lib/metadata";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ReservaFlow } from "@/components/reservar/ReservaFlow";
import { Accordion } from "@/components/ui/Accordion";
import { Lock, MessageCircle, CheckCircle } from "lucide-react";

export const metadata = createMetadata({
  title: "Reservar llamada de asesoría — Viajar Mejor",
  description:
    "Reservá tu llamada de asesoría de viaje personalizada. Elegí tu plan, pagá y agendá tu turno en minutos.",
  path: "/reservar",
});

const FAQ_ITEMS = [
  {
    question: "¿Qué pasa si necesito cancelar la llamada?",
    answer: "Podés reprogramar hasta 24 horas antes sin problema.",
  },
  {
    question: "¿El pago lo hago antes o después de la llamada?",
    answer:
      "El pago es previo — se confirma la llamada una vez acreditado.",
  },
  {
    question: "¿Cómo puedo pagar?",
    answer:
      "Podés pagar por Mercado Pago o transferencia bancaria. El pago es en pesos argentinos.",
  },
];

export default function ReservarPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeader
            badge="Reservar asesoría"
            title="Empezá a planificar tu viaje"
            subtitle="30–40 minutos de llamada para transformar tu próximo viaje."
          />
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-2">
              🔒 Pago seguro
            </span>
            <span className="flex items-center gap-2">
              ✈️ Respuesta en 24 hs
            </span>
            <span className="flex items-center gap-2">
              ⭐ Satisfacción garantizada
            </span>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="section bg-stone-50">
        <div className="container-site">
          <ReservaFlow />
        </div>
      </section>

      {/* Garantías */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Pago seguro</h3>
              <p className="text-sm text-stone-600">
                Tu pago está protegido. Si algo falla, lo resolvemos juntos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Respuesta garantizada
              </h3>
              <p className="text-sm text-stone-600">
                Confirmamos tu llamada en menos de 24 horas hábiles.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Sin letra chica
              </h3>
              <p className="text-sm text-stone-600">
                El precio que ves es lo que pagás. Sin costos ocultos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-stone-50">
        <div className="container-site max-w-2xl">
          <h2 className="text-display-md text-stone-900 text-center mb-8">
            Preguntas frecuentes
          </h2>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>
    </main>
  );
}
