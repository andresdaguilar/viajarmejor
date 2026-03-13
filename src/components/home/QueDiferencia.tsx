"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Check } from "lucide-react";

const DIFERENCIALES = [
  "Experiencia real en +50 países — no información de internet",
  "Asesoría ante imprevistos: vuelos cancelados, equipaje perdido, overbooking",
  "Soporte durante el viaje (Plan Premium): estás acompañado aunque estés lejos",
  "Contenido adaptado a vos: tu destino, tu presupuesto, tu grupo de viaje",
  "Asesoría para trámites: visa, ESTA, seguros — sin bloqueos ni confusión",
];

export function QueDiferencia() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section bg-stone-50">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              badge="Por qué Viajar Mejor"
              title="No es una agencia. Es un asesor que ya estuvo ahí."
              centered={false}
            />
            <p className="mt-6 text-stone-600 text-lg leading-relaxed">
              Las agencias te venden vuelos y hoteles. Los influencers te muestran
              fotos. Yo te digo exactamente qué hacer, qué evitar y cómo
              aprovechar cada hora de tu viaje.
            </p>
            <ul className="mt-8 space-y-4">
              {DIFERENCIALES.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/planes"
              className="btn-primary mt-10 inline-flex"
            >
              Conocé los planes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card"
          >
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
              alt="Destino de viaje"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
