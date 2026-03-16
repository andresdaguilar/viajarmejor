"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SobreMiPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="sobre-mi" className="section bg-white">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-md mx-auto lg:mx-0"
          >
            <Image
              src="/images/andy.jpg"
              alt="Andy - Asesor de viajes"
              fill
              className="object-cover rounded-full lg:rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-display-md text-stone-900 mb-6">
              Hola, soy Andy
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Más de 150 viajes organizados. Safari en África, auroras boreales
              en Noruega, surf en Hawaii, maratones en distintos continentes.
            </p>
            <p className="mt-4 text-stone-600 text-lg leading-relaxed">
              Pero lo que más me apasiona no es viajar — es ayudar a otros a
              viajar mejor. Durante años amigos y familia me consultaron sobre
              sus viajes, y noté que siempre podía ahorrarles tiempo, plata y
              dolores de cabeza.
            </p>
            <p className="mt-4 text-stone-600 text-lg leading-relaxed">
              Por eso creé Viajar Mejor.
            </p>
            <Link href="/sobre-mi" className="btn-primary mt-10 inline-flex">
              Conocer más sobre mí
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
