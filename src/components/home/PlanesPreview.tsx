"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PLANES, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

const planKeys = ["basico", "avanzado", "premium"] as const;

export function PlanesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="planes" className="section bg-white">
      <div className="container-site">
        <SectionHeader
          badge="Planes"
          title="Elegí el plan que mejor se adapte a "
          titleHighlight="tu viaje"
          subtitle="Desde planificación completa hasta acompañamiento durante tu travesía."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {planKeys.map((key, i) => {
            const plan = PLANES[key];
            const isPopular = key === "avanzado";
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "card p-8 flex flex-col",
                  isPopular && "border-2 border-primary-500 scale-105 md:scale-105"
                )}
              >
                {isPopular && (
                  <span className="badge-primary w-fit mb-4">Más popular</span>
                )}
                <h3 className="text-xl font-semibold text-stone-900">
                  {plan.nombre}
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary-600">
                  Desde USD {plan.precio}
                </p>
                <p className="mt-1 text-sm text-stone-500">{plan.descripcion}</p>
                <ul className="mt-6 space-y-2 flex-1">
                  {plan.incluye.slice(0, 4).map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="text-primary-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/reservar"
                  className="btn-primary mt-8 w-full justify-center"
                >
                  Reservar este plan
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-stone-500"
        >
          ¿No sabés qué plan elegir?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Escribime y te ayudo a decidir
          </a>
        </motion.p>
      </div>
    </section>
  );
}
