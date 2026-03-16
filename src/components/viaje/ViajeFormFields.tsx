"use client";

import {
  DESTINO_OPCIONES,
  FECHA_OPCIONES,
  DURACION_OPCIONES,
  GRUPO_OPCIONES,
  PERFIL_VIAJERO_OPCIONES,
  TIPO_EXPERIENCIA_OPCIONES,
  PRESUPUESTO_OPCIONES,
  VUELOS_OPCIONES,
  TRANSPORTE_OPCIONES,
  INTERESES_OPCIONES,
  ACCESIBILIDAD_OPCIONES,
  EXPERIENCIA_PREVIA_OPCIONES,
  RITMO_OPCIONES,
  ALOJAMIENTO_OPCIONES,
  CATEGORIA_OPCIONES,
  PRIORIDADES_OPCIONES,
  PREOCUPACIONES_OPCIONES,
  RESTRICCIONES_ALIMENTARIAS_OPCIONES,
} from "@/lib/viajeSchema";

/** Selector tipo card para opciones de radio - una selección */
export function CardRadioGroup({
  options,
  value,
  onChange,
  name,
  columns = 2,
  formatLabel,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
  columns?: 2 | 3 | 4;
  formatLabel?: (s: string) => string;
}) {
  const gridCols = { 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-3", 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const display = formatLabel ?? ((s: string) => s);
  return (
    <div className={`grid gap-3 ${gridCols}`}>
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all duration-200 ${
            value === opt
              ? "border-primary-500 bg-primary-50 text-primary-800 shadow-sm"
              : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          <span className="text-sm font-medium">{display(opt)}</span>
        </label>
      ))}
    </div>
  );
}

/** Selector tipo pill para opciones múltiples */
export function PillCheckboxGroup({
  options,
  value,
  onChange,
  name,
  formatLabel,
}: {
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  name: string;
  formatLabel?: (s: string) => string;
}) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((x) => x !== opt));
    } else {
      onChange([...value, opt]);
    }
  };
  const display = formatLabel ?? ((s: string) => s);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`cursor-pointer select-none rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            value.includes(opt)
              ? "bg-primary-600 text-white shadow-sm"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          <input
            type="checkbox"
            name={name}
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            className="sr-only"
          />
          {display(opt)}
        </label>
      ))}
    </div>
  );
}

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-stone-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function CheckboxGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  name: string;
}) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((x) => x !== opt));
    } else {
      onChange([...value, opt]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input
            type="checkbox"
            name={name}
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            className="rounded border-stone-300"
          />
          <span className="text-sm text-stone-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="border-stone-300"
          />
          <span className="text-sm text-stone-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

/** Sección de wizard con ícono y título */
export function WizardStep({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">{title}</h2>
          {subtitle && <p className="text-sm text-stone-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

const GRUPO_EXCLUSIVE = ["Solo", "En pareja"];
const GRUPO_COMBO = ["Con amigos", "Con familia", "Con niños"];
const GRUPO_ADDON = "Con adultos mayores";

/** Selector de grupo con lógica: Con niños/adultos mayores combinables con amigos/familia */
export function GrupoSelector({
  value,
  onChange,
  name,
  formatLabel,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  name: string;
  formatLabel?: (s: string) => string;
}) {
  const display = formatLabel ?? ((s: string) => s);
  const hasAddon = value.includes(GRUPO_ADDON);

  const toggle = (opt: string) => {
    if (opt === GRUPO_ADDON) {
      if (value.includes(opt)) {
        onChange(value.filter((x) => x !== opt));
      } else {
        onChange([...value, opt]);
      }
      return;
    }
    if (GRUPO_EXCLUSIVE.includes(opt)) {
      if (value.includes(opt)) {
        onChange(value.filter((x) => x !== opt));
      } else {
        onChange(hasAddon ? [opt, GRUPO_ADDON] : [opt]);
      }
      return;
    }
    if (GRUPO_COMBO.includes(opt)) {
      const withoutExclusive = value.filter((x) => !GRUPO_EXCLUSIVE.includes(x));
      if (withoutExclusive.includes(opt)) {
        onChange(value.filter((x) => x !== opt));
      } else {
        onChange([...withoutExclusive, opt]);
      }
      return;
    }
  };

  const allOpts = [...GRUPO_EXCLUSIVE, ...GRUPO_COMBO, GRUPO_ADDON];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {allOpts.map((opt) => (
          <label
            key={opt}
            className={`cursor-pointer select-none rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              value.includes(opt)
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="sr-only"
            />
            {display(opt)}
          </label>
        ))}
      </div>
      <p className="text-xs text-stone-500">
        Con amigos, familia y niños se pueden combinar. Con adultos mayores puede sumarse a cualquier opción.
      </p>
    </div>
  );
}

export const SCHEMA = {
  DESTINO_OPCIONES,
  FECHA_OPCIONES,
  DURACION_OPCIONES,
  GRUPO_OPCIONES,
  PERFIL_VIAJERO_OPCIONES,
  TIPO_EXPERIENCIA_OPCIONES,
  PRESUPUESTO_OPCIONES,
  VUELOS_OPCIONES,
  TRANSPORTE_OPCIONES,
  INTERESES_OPCIONES,
  ACCESIBILIDAD_OPCIONES,
  EXPERIENCIA_PREVIA_OPCIONES,
  RITMO_OPCIONES,
  ALOJAMIENTO_OPCIONES,
  CATEGORIA_OPCIONES,
  PRIORIDADES_OPCIONES,
  PREOCUPACIONES_OPCIONES,
  RESTRICCIONES_ALIMENTARIAS_OPCIONES,
};
