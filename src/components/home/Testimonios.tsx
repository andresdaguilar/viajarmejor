"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Star } from "lucide-react";

const TESTIMONIOS = [
  {
    quote:
      "Andy nos armó el viaje a Europa más organizado que tuvimos. Llegamos a París y todo estaba planificado al detalle. Ni una cola, ni un lugar cerrado por falta de reserva.",
    author: "María y Javier",
    location: "Buenos Aires",
    trip: "París + Londres, 10 días",
  },
  {
    quote:
      "Nunca había viajado solo al exterior y tenía muchísimas dudas. Con el Travel Blueprint me sentí seguro desde el primer día. Vale cada peso.",
    author: "Sebastián",
    location: "Córdoba",
    trip: "Roma + Barcelona, 8 días",
  },
  {
    quote:
      "El tema de la visa americana me tenía loco. Andy me explicó todo el proceso, revisó mi formulario y no tuve ningún problema. Increíble.",
    author: "Laura",
    location: "Rosario",
    trip: "Nueva York, 7 días",
  },
];

export function Testimonios() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section bg-stone-50">
      <div className="container-site">
        <SectionHeader
          badge="Qué dicen los viajeros"
          title="Historias reales de personas que viajaron mejor"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
          {TESTIMONIOS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 shrink-0 md:shrink min-w-[300px] md:min-w-0"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 fill-sand-400 text-sand-400"
                  />
                ))}
              </div>
              <blockquote className="font-display text-stone-700 text-lg leading-relaxed">
                "{t.quote}"
              </blockquote>
              <p className="mt-6 font-semibold text-stone-900">
                — {t.author}, {t.location}
              </p>
              <p className="text-sm text-stone-500">{t.trip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
