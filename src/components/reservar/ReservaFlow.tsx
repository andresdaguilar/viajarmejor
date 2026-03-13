"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Lock, MessageCircle, CheckCircle } from "lucide-react";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { PLANES, CONTACT } from "@/lib/constants";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(8, "Ingresá tu WhatsApp"),
  destino: z.string().min(2, "Ingresá el destino"),
  fechas: z.string().min(2, "Ingresá las fechas aproximadas"),
  grupo: z.enum(["solo", "pareja", "amigos", "familia"]),
  consulta: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PLAN_OPTIONS = [
  {
    id: "basico" as const,
    ...PLANES.basico,
    tagline: "Planificación completa",
  },
  {
    id: "avanzado" as const,
    ...PLANES.avanzado,
    tagline: "+ Trámites y documentación",
  },
  {
    id: "premium" as const,
    ...PLANES.premium,
    tagline: "+ Soporte durante el viaje",
  },
];

const STEP_LABELS = ["Plan", "Tus datos", "Pago", "Agendar"];

function ReservaFlowInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const initialPlan =
    planParam === "basico" || planParam === "avanzado" || planParam === "premium"
      ? planParam
      : null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPlan, setSelectedPlan] = useState<
    "basico" | "avanzado" | "premium" | null
  >(initialPlan);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      email: "",
      whatsapp: "",
      destino: "",
      fechas: "",
      grupo: "solo",
      consulta: "",
    },
  });

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/viajarmejor-travel/30min";

  const plan = selectedPlan ? PLANES[selectedPlan] : null;

  const getComprobanteUrl = () => {
    if (!plan) return CONTACT.whatsappUrl;
    const data = form.getValues();
    const msg = `Hola Andy, acabo de pagar el ${plan.nombre} para asesoría de viaje. Mi nombre es ${data.nombre} y mi destino es ${data.destino}. Te mando el comprobante.`;
    return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-12">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step > i + 1
                  ? "bg-primary-600 text-white"
                  : step === i + 1
                    ? "bg-primary-600 text-white"
                    : "bg-stone-200 text-stone-500"
              }`}
            >
              {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
            </div>
            <span
              className={`hidden sm:inline ml-2 text-sm font-medium ${
                step >= i + 1 ? "text-stone-900" : "text-stone-400"
              }`}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  step > i + 1 ? "bg-primary-600" : "bg-stone-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold text-stone-900 mb-6">
            Elegí tu plan
          </h3>
          <div className="space-y-4">
            {PLAN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedPlan(opt.id)}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                  selectedPlan === opt.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-stone-900">{opt.nombre}</h4>
                    <p className="text-sm text-stone-500">{opt.tagline}</p>
                    <p className="mt-2 font-display text-2xl text-primary-600">
                      USD {opt.precio}–{opt.precioMax}
                    </p>
                  </div>
                  {selectedPlan === opt.id && (
                    <Check className="w-6 h-6 text-primary-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!selectedPlan}
            className="btn-primary mt-8 w-full justify-center disabled:opacity-50"
          >
            Continuar
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <form
          onSubmit={form.handleSubmit(() => setStep(3))}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-stone-900 mb-6">
            Contame sobre tu viaje
          </h3>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Nombre completo
            </label>
            <input
              {...form.register("nombre")}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500"
              placeholder="Tu nombre"
            />
            {form.formState.errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              {...form.register("email")}
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500"
              placeholder="tu@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              WhatsApp
            </label>
            <input
              {...form.register("whatsapp")}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500"
              placeholder="+54 9 11 xxxx-xxxx"
            />
            {form.formState.errors.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.whatsapp.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Destino(s) del viaje
            </label>
            <input
              {...form.register("destino")}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500"
              placeholder="Ej: París, Roma, Barcelona"
            />
            {form.formState.errors.destino && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.destino.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Fechas aproximadas
            </label>
            <input
              {...form.register("fechas")}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500"
              placeholder="Ej: Junio 2025"
            />
            {form.formState.errors.fechas && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.fechas.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              ¿Con quién viajás?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["solo", "pareja", "amigos", "familia"] as const).map((g) => (
                <label
                  key={g}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    form.watch("grupo") === g
                      ? "border-primary-500 bg-primary-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <input
                    {...form.register("grupo")}
                    type="radio"
                    value={g}
                    className="sr-only"
                  />
                  <span className="capitalize text-sm font-medium">
                    {g === "solo" ? "Solo" : g === "pareja" ? "Pareja" : g === "amigos" ? "Amigos" : "Familia"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              ¿Algo más que quieras contarme? (opcional)
            </label>
            <textarea
              {...form.register("consulta")}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500"
              placeholder="..."
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary flex-1"
            >
              Volver
            </button>
            <button type="submit" className="btn-primary flex-1">
              Continuar al pago
            </button>
          </div>
        </form>
      )}

      {/* Step 3 */}
      {step === 3 && plan && (
        <div className="space-y-8">
          <div className="card p-6">
            <h4 className="font-semibold text-stone-900">Resumen del pedido</h4>
            <div className="mt-4 space-y-2">
              <p>
                Plan: <strong>{plan.nombre}</strong>
              </p>
              <p className="text-stone-600">
                Precio: USD {plan.precio}–{plan.precioMax}
              </p>
              <div className="border-t border-stone-200 pt-4 mt-4">
                <p className="font-semibold">
                  Total: USD {Math.round((plan.precio + plan.precioMax) / 2)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4">
              Opciones de pago
            </h4>
            <div className="space-y-6">
              <div className="card p-6">
                <h5 className="font-medium text-stone-900 mb-2">
                  Transferencia / Wise
                </h5>
                <p className="text-sm text-stone-600 mb-4">
                  Realizá el pago a Wise: andy@viajarmejor.travel o por
                  transferencia bancaria (te envío los datos por WhatsApp).
                </p>
                <p className="text-sm text-stone-600 mb-4">
                  Monto: USD {Math.round((plan.precio + plan.precioMax) / 2)}{" "}
                  o equivalente en ARS al cambio del día.
                </p>
                <a
                  href={getComprobanteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex mb-4"
                >
                  Enviar comprobante por WhatsApp
                </a>
                <button
                  onClick={() => {
                    setPagoConfirmado(true);
                    setStep(4);
                  }}
                  className="btn-primary w-full"
                >
                  Ya pagué, agendar llamada
                </button>
              </div>

              <div className="card p-6 bg-stone-50">
                <h5 className="font-medium text-stone-900 mb-2">
                  Mercado Pago (pesos)
                </h5>
                <p className="text-sm text-stone-600 mb-4">
                  Próximamente disponible el pago en pesos.
                </p>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="text-stone-500 hover:text-stone-700"
          >
            ← Volver a tus datos
          </button>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <h3 className="text-xl font-semibold text-stone-900 mb-6">
            Elegí tu horario
          </h3>
          <CalendlyEmbed
            url={calendlyUrl}
            prefill={{
              name: form.getValues("nombre"),
              email: form.getValues("email"),
            }}
          />
        </div>
      )}
    </div>
  );
}

export function ReservaFlow() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-stone-100 rounded-2xl" />}>
      <ReservaFlowInner />
    </Suspense>
  );
}
