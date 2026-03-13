"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { XCircle, Target, Sparkles } from "lucide-react";

const EJEMPLO_VIAJE = [
  { item: "Vuelos", antes: "USD 950", despues: "USD 720" },
  { item: "Hotel (7 noches)", antes: "USD 1400", despues: "USD 1100" },
  { item: "Traslados y trenes", antes: "USD 250", despues: "USD 180" },
];

const ERRORES_CAROS = [
  "Reservar hoteles en barrios mal conectados",
  "Elegir aeropuertos equivocados",
  "Comprar trenes o vuelos en horarios poco eficientes",
  "Perder tiempo en traslados innecesarios",
  "Pagar más por actividades que se consiguen más baratas",
];

const OPTIMIZACIONES = [
  "Elección de aeropuertos",
  "Combinaciones de vuelos",
  "Barrios donde alojarse",
  "Transporte entre ciudades",
  "Distribución del itinerario",
  "Actividades que realmente valen la pena",
];

export function ValorROI() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-site">
        <SectionHeader
          badge="Retorno de inversión"
          title="La asesoría se paga sola"
          subtitle="Una buena planificación puede ahorrarte mucho más de lo que cuesta la asesoría."
        />

        {/* Ejemplo de viaje típico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <p className="text-sm font-medium text-stone-500 mb-4">
            Ejemplo de viaje típico a Europa:
          </p>
          <div className="rounded-2xl border border-stone-200 overflow-hidden">
            <div className="divide-y divide-stone-100">
              {EJEMPLO_VIAJE.map((row) => (
                <div
                  key={row.item}
                  className="flex justify-between items-center px-6 py-4 bg-stone-50/50"
                >
                  <span className="text-stone-700 font-medium">{row.item}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-400 line-through text-sm">
                      {row.antes}
                    </span>
                    <span className="text-primary-600 font-semibold">
                      {row.despues}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center px-6 py-5 bg-primary-50 border-t-2 border-primary-100">
              <span className="font-semibold text-stone-900">
                Ahorro potencial:
              </span>
              <span className="text-xl font-bold text-primary-600">
                USD 600+
              </span>
            </div>
            <div className="flex justify-between items-center px-6 py-4 bg-stone-50">
              <span className="text-stone-600">Costo de la asesoría:</span>
              <span className="font-semibold text-stone-900">Desde AR$ 35.000</span>
            </div>
          </div>
          <p className="mt-6 text-center text-lg text-stone-700 font-medium">
            Un pequeño ajuste en tu planificación puede pagar la asesoría varias
            veces.
          </p>
        </motion.div>

        {/* Errores caros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-display font-semibold text-stone-900 text-center mb-8">
            Errores que pueden arruinar o encarecer un viaje
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ERRORES_CAROS.map((error, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-50/50 border border-red-100"
              >
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700">{error}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-stone-600">
            Optimizar estos detalles puede ahorrarte tiempo, dinero y estrés.
          </p>
        </motion.div>

        {/* Qué optimizamos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-display font-semibold text-stone-900 text-center mb-8">
            Dónde podemos optimizar tu viaje
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {OPTIMIZACIONES.map((opt, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.03 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-800 text-sm font-medium"
              >
                <Target className="w-4 h-4 text-primary-600" />
                {opt}
              </motion.span>
            ))}
          </div>
          <p className="mt-8 text-center text-stone-600 max-w-xl mx-auto">
            Pequeñas decisiones pueden cambiar completamente el costo y la
            experiencia del viaje.
          </p>
        </motion.div>

        {/* Marco mental + cierre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary-50 to-stone-50 border border-primary-100"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-stone-700 text-lg leading-relaxed">
              La mayoría de los viajeros gasta entre{" "}
              <strong className="text-stone-900">USD 3000 y USD 8000</strong> en
              un viaje internacional. Optimizarlo correctamente puede ahorrar
              cientos de dólares.
            </p>
            <div className="flex justify-center">
              <Sparkles className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-xl font-display font-semibold text-stone-900 leading-relaxed">
              No vendo destinos. Te ayudo a optimizar un viaje que probablemente
              sea una de las experiencias más importantes del año.
            </p>
            <Link href="/planes" className="btn-primary mt-6 inline-flex">
              Ver planes y precios
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
