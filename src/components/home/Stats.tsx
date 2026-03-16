"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 50, suffix: "+", label: "Países" },
  { value: 200, suffix: "+", label: "Ciudades" },
  { value: 150, suffix: "+", label: "Viajes organizados" },
  { value: 100, suffix: "%", label: "Personalizado" },
];

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span className="font-display text-4xl md:text-5xl font-bold text-white">
      {displayValue}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-primary-950 py-12 md:py-16">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i > 0 ? "md:border-l md:border-white/20" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/20 pb-8 md:pb-0" : "pt-8 md:pt-0"}`}
            >
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                isInView={isInView}
              />
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
