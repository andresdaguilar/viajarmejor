"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const WHATSAPP_URL = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

const trustItems = [
  "Asesoría 100% personalizada",
  "Experiencia en 55+ países",
  "Respuesta en menos de 24 hs",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center -mt-16 md:-mt-20 pt-16 md:pt-20 overflow-hidden">
      {/* Background image - extends slightly beyond to avoid white gap at top */}
      <div className="absolute inset-0 -top-1 bg-primary-950">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920"
          alt=""
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-900/60 to-primary-900/40"
          aria-hidden
        />
      </div>

      <div className="relative container-site z-10 py-20">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-xl font-display text-white leading-tight"
          >
            Viajá con inteligencia.
            <br />
            <span className="text-sand-200">Aprovechá cada destino.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg text-white/80 max-w-2xl"
          >
            Asesoría de viajes personalizada para que no desperdicies ni un día,
            ni un peso, ni una experiencia. Más de 55 países de experiencia real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/reservar"
              className="btn-primary bg-white text-primary-700 hover:bg-white/90 hover:text-primary-800 px-8 py-4 text-lg justify-center"
            >
              Reservar llamada de asesoría
            </Link>
            <Link
              href="/#como-funciona"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all duration-200"
            >
              Ver cómo funciona
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm text-white/90"
          >
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-sand-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="/#como-funciona"
          className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
