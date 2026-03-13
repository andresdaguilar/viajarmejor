"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClipboardList, Phone, MapPin } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Completás el formulario",
    description:
      "Contanos tu destino, fechas, con quién viajás y qué experiencias buscás.",
    number: 1,
  },
  {
    icon: Phone,
    title: "Tenemos una llamada de 30–40 min",
    description:
      "Te hacemos las preguntas clave para entender exactamente qué necesitás.",
    number: 2,
  },
  {
    icon: MapPin,
    title: "Recibís tu Travel Blueprint",
    description:
      "Un documento completo y personalizado con todo lo que necesitás para viajar mejor.",
    number: 3,
  },
];

export function ComoFunciona() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="como-funciona" className="section bg-white">
      <div ref={ref} className="container-site">
        <SectionHeader
          badge="El proceso"
          title="Simple, rápido y completamente "
          titleHighlight="personalizado"
          subtitle="En menos de 48 horas tenés tu plan de viaje listo."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connector line - desktop */}
          <div
            className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-stone-200"
            style={{ top: "6rem" }}
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-primary-600" />
              </div>
              <span className="absolute -top-2 -right-2 md:top-8 md:right-auto md:-right-4 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {step.title}
              </h3>
              <p className="text-stone-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
