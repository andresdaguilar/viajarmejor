import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { cn, formatPriceARS } from "@/lib/utils";

interface PlanCardProps {
  nombre: string;
  precio: number;
  precioMax: number;
  moneda: string;
  descripcion: string;
  incluye: string[];
  highlighted?: boolean;
  badge?: string;
  planSlug: string;
}

export function PlanCard({
  nombre,
  precio,
  precioMax,
  moneda,
  descripcion,
  incluye,
  highlighted,
  badge,
  planSlug,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "card p-8 flex flex-col",
        highlighted &&
          "border-2 border-primary-500 ring-2 ring-primary-100 scale-105"
      )}
    >
      {badge && (
        <span className="badge-primary w-fit mb-4">{badge}</span>
      )}
      <h3 className="text-xl font-semibold text-stone-900">{nombre}</h3>
      <p className="mt-2 text-sm text-stone-500">{descripcion}</p>
      <div className="mt-6 py-6 border-y border-stone-100">
        <p className="font-display text-4xl text-primary-600">
          {moneda} {formatPriceARS(precio)}
        </p>
        {precioMax > precio && (
          <p className="text-sm text-stone-500 mt-1">
            (hasta {moneda} {formatPriceARS(precioMax)})
          </p>
        )}
      </div>
      <ul className="mt-6 space-y-3 flex-1">
        {incluye.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-stone-700">
            <Check className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/reservar?plan=${planSlug}`}
        className="btn-primary mt-8 w-full justify-center"
      >
        Reservar este plan
      </Link>
    </div>
  );
}
