"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Calendar,
  Clock,
  Users,
  Sparkles,
  Wallet,
  Plane,
  Building2,
  Star,
  Utensils,
  MessageSquare,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  getViajePreparar,
  saveViajePrepararFormData,
  type ViajePrepararData,
} from "@/lib/firebase";
import { toTitleCase } from "@/lib/utils";
import {
  CardRadioGroup,
  PillCheckboxGroup,
  GrupoSelector,
  WizardStep,
  SCHEMA,
} from "./ViajeFormFields";

type ViajeFormData = Record<string, unknown>;

function applyFormData(
  data: ViajeFormData | undefined,
  setters: {
    setClienteEmail: (v: string) => void;
    setDestinoRegion: (v: string) => void;
    setPaisCiudad: (v: string) => void;
    setFechaOpcion: (v: string) => void;
    setFechaSalida: (v: string) => void;
    setFechaRegreso: (v: string) => void;
    setFlexibilidadFechas: (v: string) => void;
    setGrupo: (v: string[]) => void;
    setNumViajeros: (v: string) => void;
    setEdadesAprox: (v: string) => void;
    setPerfilViajero: (v: string) => void;
    setTipoExperiencia: (v: string[]) => void;
    setPresupuesto: (v: string) => void;
    setPresupuestoTotal: (v: string) => void;
    setVuelos: (v: string) => void;
    setTransporte: (v: string[]) => void;
    setIntereses: (v: string[]) => void;
    setAccesibilidad: (v: string) => void;
    setExperienciaPrevia: (v: string) => void;
    setRitmo: (v: string) => void;
    setAlojamiento: (v: string) => void;
    setCategoriaAlojamiento: (v: string) => void;
    setPrioridades: (v: string[]) => void;
    setPreocupaciones: (v: string[]) => void;
    setRestriccionesAlimentarias: (v: string) => void;
    setOtrasPreferencias: (v: string) => void;
  }
) {
  if (!data) return;
  const d = data as Record<string, unknown>;
  if (d.clienteEmail) setters.setClienteEmail(String(d.clienteEmail));
  const destino = d.destino as Record<string, unknown> | undefined;
  if (destino) {
    if (destino.region) setters.setDestinoRegion(String(destino.region));
    if (destino.paisCiudad) setters.setPaisCiudad(String(destino.paisCiudad));
  }
  const fecha = d.fecha as Record<string, unknown> | undefined;
  if (fecha) {
    if (fecha.opcion) setters.setFechaOpcion(String(fecha.opcion));
    if (fecha.salida) setters.setFechaSalida(String(fecha.salida));
    if (fecha.regreso) setters.setFechaRegreso(String(fecha.regreso));
    if (fecha.flexibilidad) setters.setFlexibilidadFechas(String(fecha.flexibilidad));
  }
  if (d.grupo) {
    const g = d.grupo;
    setters.setGrupo(Array.isArray(g) ? (g as string[]) : [String(g)].filter(Boolean));
  }
  if (d.numViajeros) setters.setNumViajeros(String(d.numViajeros));
  if (d.edadesAprox) setters.setEdadesAprox(String(d.edadesAprox));
  if (d.perfilViajero) setters.setPerfilViajero(String(d.perfilViajero));
  if (Array.isArray(d.tipoExperiencia)) setters.setTipoExperiencia(d.tipoExperiencia as string[]);
  const presupuesto = d.presupuesto as Record<string, unknown> | undefined;
  if (presupuesto) {
    if (presupuesto.nivel) setters.setPresupuesto(String(presupuesto.nivel));
    if (presupuesto.total) setters.setPresupuestoTotal(String(presupuesto.total));
  }
  if (d.vuelos) setters.setVuelos(String(d.vuelos));
  if (Array.isArray(d.transporte)) setters.setTransporte(d.transporte as string[]);
  if (Array.isArray(d.intereses)) setters.setIntereses(d.intereses as string[]);
  if (d.accesibilidad) setters.setAccesibilidad(String(d.accesibilidad));
  if (d.experienciaPrevia) setters.setExperienciaPrevia(String(d.experienciaPrevia));
  if (d.ritmo) setters.setRitmo(String(d.ritmo));
  const alojamiento = d.alojamiento as Record<string, unknown> | undefined;
  if (alojamiento) {
    if (alojamiento.tipo) setters.setAlojamiento(String(alojamiento.tipo));
    if (alojamiento.categoria) setters.setCategoriaAlojamiento(String(alojamiento.categoria));
  }
  if (Array.isArray(d.prioridades)) setters.setPrioridades(d.prioridades as string[]);
  if (Array.isArray(d.preocupaciones)) setters.setPreocupaciones(d.preocupaciones as string[]);
  if (d.restriccionesAlimentarias) setters.setRestriccionesAlimentarias(String(d.restriccionesAlimentarias));
  if (d.otrasPreferencias) setters.setOtrasPreferencias(String(d.otrasPreferencias));
}

function buildFormData(state: Record<string, unknown>): Record<string, unknown> {
  return {
    clienteEmail: state.clienteEmail || null,
    destino: {
      region: state.destinoRegion,
      paisCiudad: state.paisCiudad || null,
    },
    fecha: {
      opcion: state.fechaOpcion,
      salida: state.fechaSalida || null,
      regreso: state.fechaRegreso || null,
      flexibilidad: state.flexibilidadFechas || null,
    },
    duracion: state.duracion,
    grupo: Array.isArray(state.grupo) ? state.grupo : (state.grupo ? [state.grupo] : []),
    numViajeros: state.numViajeros || null,
    edadesAprox: state.edadesAprox || null,
    perfilViajero: state.perfilViajero,
    tipoExperiencia: state.tipoExperiencia,
    presupuesto: {
      nivel: state.presupuesto,
      total: state.presupuestoTotal || null,
    },
    vuelos: state.vuelos,
    transporte: state.transporte,
    intereses: state.intereses,
    accesibilidad: state.accesibilidad,
    experienciaPrevia: state.experienciaPrevia,
    ritmo: state.ritmo,
    alojamiento: {
      tipo: state.alojamiento,
      categoria: state.categoriaAlojamiento || null,
    },
    prioridades: state.prioridades,
    preocupaciones: state.preocupaciones,
    restriccionesAlimentarias: state.restriccionesAlimentarias,
    otrasPreferencias: state.otrasPreferencias || null,
  };
}

const STEPS = [
  { id: 1, label: "Destino", icon: MapPin },
  { id: 2, label: "Fechas", icon: Calendar },
  { id: 3, label: "Grupo", icon: Users },
  { id: 4, label: "Intereses", icon: Sparkles },
  { id: 5, label: "Presupuesto", icon: Wallet },
  { id: 6, label: "Estilo", icon: Building2 },
  { id: 7, label: "Extras", icon: Star },
] as const;

const inputStyles =
  "w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all";

interface ViajePrepararFormProps {
  token: string;
}

export function ViajePrepararForm({ token }: ViajePrepararFormProps) {
  const [data, setData] = useState<ViajePrepararData | null>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const [clienteEmail, setClienteEmail] = useState("");
  const [destinoRegion, setDestinoRegion] = useState("");
  const [paisCiudad, setPaisCiudad] = useState("");
  const [fechaOpcion, setFechaOpcion] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [fechaRegreso, setFechaRegreso] = useState("");
  const [flexibilidadFechas, setFlexibilidadFechas] = useState("");
  const [duracion, setDuracion] = useState("");
  const [grupo, setGrupo] = useState<string[]>([]);
  const [numViajeros, setNumViajeros] = useState("");
  const [edadesAprox, setEdadesAprox] = useState("");
  const [perfilViajero, setPerfilViajero] = useState("");
  const [tipoExperiencia, setTipoExperiencia] = useState<string[]>([]);
  const [presupuesto, setPresupuesto] = useState("");
  const [presupuestoTotal, setPresupuestoTotal] = useState("");
  const [vuelos, setVuelos] = useState("");
  const [transporte, setTransporte] = useState<string[]>([]);
  const [intereses, setIntereses] = useState<string[]>([]);
  const [accesibilidad, setAccesibilidad] = useState("");
  const [experienciaPrevia, setExperienciaPrevia] = useState("");
  const [ritmo, setRitmo] = useState("");
  const [alojamiento, setAlojamiento] = useState("");
  const [categoriaAlojamiento, setCategoriaAlojamiento] = useState("");
  const [prioridades, setPrioridades] = useState<string[]>([]);
  const [preocupaciones, setPreocupaciones] = useState<string[]>([]);
  const [restriccionesAlimentarias, setRestriccionesAlimentarias] = useState("");
  const [otrasPreferencias, setOtrasPreferencias] = useState("");

  useEffect(() => {
    getViajePreparar(token)
      .then((res) => {
        setData(res);
        if (res?.formData) {
          applyFormData(res.formData as ViajeFormData, {
            setClienteEmail,
            setDestinoRegion,
            setPaisCiudad,
            setFechaOpcion,
            setFechaSalida,
            setFechaRegreso,
            setFlexibilidadFechas,
            setGrupo,
            setNumViajeros,
            setEdadesAprox,
            setPerfilViajero,
            setTipoExperiencia,
            setPresupuesto,
            setPresupuestoTotal,
            setVuelos,
            setTransporte,
            setIntereses,
            setAccesibilidad,
            setExperienciaPrevia,
            setRitmo,
            setAlojamiento,
            setCategoriaAlojamiento,
            setPrioridades,
            setPreocupaciones,
            setRestriccionesAlimentarias,
            setOtrasPreferencias,
          });
        }
      })
      .catch(() => setError("No se pudo cargar el formulario."))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const formData = buildFormData({
        clienteEmail,
        destinoRegion,
        paisCiudad,
        fechaOpcion,
        fechaSalida,
        fechaRegreso,
        flexibilidadFechas,
        duracion,
        grupo,
        numViajeros,
        edadesAprox,
        perfilViajero,
        tipoExperiencia,
        presupuesto,
        presupuestoTotal,
        vuelos,
        transporte,
        intereses,
        accesibilidad,
        experienciaPrevia,
        ritmo,
        alojamiento,
        categoriaAlojamiento,
        prioridades,
        preocupaciones,
        restriccionesAlimentarias,
        otrasPreferencias,
      });
      await saveViajePrepararFormData(token, formData);
      setGuardado(true);
    } catch {
      setError("No se pudo guardar. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary-500 mb-4" />
        <p className="text-stone-500">Cargando formulario...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-700 font-medium">{error || "Link inválido o expirado."}</p>
      </div>
    );
  }

  if (guardado) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center max-w-lg mx-auto">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-green-800 font-semibold text-lg mb-2">¡Listo! Tus datos quedaron guardados.</p>
        <p className="text-green-700 text-sm">Te esperamos en la llamada para seguir conversando.</p>
      </div>
    );
  }

  const schema = SCHEMA;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Welcome banner */}
      <div className="mb-8 flex items-start gap-4 rounded-2xl border border-primary-100 bg-primary-50 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100">
          <Mail className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <p className="font-medium text-primary-900">
            Hola <span className="font-semibold">{data.reserva.nombre}</span>
          </p>
          <p className="mt-1 text-sm text-primary-700">
            Completá este formulario antes de tu llamada para que Andy pueda prepararse mejor.
          </p>
          <label className="mt-3 block text-sm font-medium text-primary-800">Tu email</label>
          <input
            type="email"
            value={clienteEmail}
            onChange={(e) => setClienteEmail(e.target.value)}
            placeholder="tu@email.com"
            className={`mt-1 max-w-xs ${inputStyles}`}
          />
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-10">
        <div className="flex items-center gap-1 sm:gap-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center min-w-0">
              <button
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-lg py-2.5 px-1.5 sm:px-2 text-xs sm:text-sm font-medium transition-all ${
                  step === s.id
                    ? "bg-primary-600 text-white shadow-md"
                    : step > s.id
                      ? "bg-primary-100 text-primary-700"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {step > s.id ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> : <s.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />}
                <span className="hidden sm:inline truncate">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 min-w-2 shrink mx-0.5 rounded ${step > s.id ? "bg-primary-300" : "bg-stone-200"}`}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-stone-400">Paso {step} de 7</p>
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        {step === 1 && (
          <WizardStep icon={MapPin} title="Destino" subtitle="¿Adónde querés viajar?">
            <label className="block text-sm font-medium text-stone-700 mb-2">Región de interés</label>
            <CardRadioGroup options={schema.DESTINO_OPCIONES} value={destinoRegion} onChange={setDestinoRegion} name="destino" columns={4} formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">País o ciudad específica</label>
            <input
              type="text"
              value={paisCiudad}
              onChange={(e) => setPaisCiudad(e.target.value)}
              placeholder="Ej: París, Roma, Tokio"
              className={inputStyles}
            />
          </WizardStep>
        )}

        {step === 2 && (
          <WizardStep icon={Calendar} title="Fechas y duración" subtitle="¿Cuándo y por cuánto tiempo?">
            <label className="block text-sm font-medium text-stone-700 mb-2">¿Tenés fechas definidas?</label>
            <CardRadioGroup options={schema.FECHA_OPCIONES} value={fechaOpcion} onChange={setFechaOpcion} name="fecha" columns={3} formatLabel={toTitleCase} />
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Fecha de salida</label>
                <input type="date" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} className={inputStyles} />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Fecha de regreso</label>
                <input type="date" value={fechaRegreso} onChange={(e) => setFechaRegreso(e.target.value)} className={inputStyles} />
              </div>
            </div>
            <label className="mt-4 block text-sm font-medium text-stone-700 mb-2">Flexibilidad de fechas</label>
            <input type="text" value={flexibilidadFechas} onChange={(e) => setFlexibilidadFechas(e.target.value)} placeholder="Ej: flexible en marzo" className={inputStyles} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Duración del viaje</label>
            <CardRadioGroup options={schema.DURACION_OPCIONES} value={duracion} onChange={setDuracion} name="duracion" columns={3} formatLabel={toTitleCase} />
          </WizardStep>
        )}

        {step === 3 && (
          <WizardStep icon={Users} title="Quién viaja" subtitle="Composición del grupo">
            <label className="block text-sm font-medium text-stone-700 mb-2">¿Con quién viajás?</label>
            <GrupoSelector value={grupo} onChange={setGrupo} name="grupo" formatLabel={toTitleCase} />
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Número de viajeros</label>
                <input type="text" value={numViajeros} onChange={(e) => setNumViajeros(e.target.value)} placeholder="Ej: 2" className={inputStyles} />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Edades aproximadas</label>
                <input type="text" value={edadesAprox} onChange={(e) => setEdadesAprox(e.target.value)} placeholder="Ej: 35, 38" className={inputStyles} />
              </div>
            </div>
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Perfil del viajero</label>
            <CardRadioGroup options={schema.PERFIL_VIAJERO_OPCIONES} value={perfilViajero} onChange={setPerfilViajero} name="perfil" columns={2} formatLabel={toTitleCase} />
          </WizardStep>
        )}

        {step === 4 && (
          <WizardStep icon={Sparkles} title="Experiencias e intereses" subtitle="¿Qué tipo de viaje buscás?">
            <label className="block text-sm font-medium text-stone-700 mb-2">Tipo de experiencia</label>
            <PillCheckboxGroup options={schema.TIPO_EXPERIENCIA_OPCIONES} value={tipoExperiencia} onChange={setTipoExperiencia} name="exp" formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Intereses específicos</label>
            <PillCheckboxGroup options={schema.INTERESES_OPCIONES} value={intereses} onChange={setIntereses} name="intereses" formatLabel={toTitleCase} />
          </WizardStep>
        )}

        {step === 5 && (
          <WizardStep icon={Wallet} title="Presupuesto y logística" subtitle="Vuelos y transporte">
            <label className="block text-sm font-medium text-stone-700 mb-2">Presupuesto por persona</label>
            <CardRadioGroup options={schema.PRESUPUESTO_OPCIONES} value={presupuesto} onChange={setPresupuesto} name="presupuesto" columns={4} formatLabel={toTitleCase} />
            <label className="mt-4 block text-sm font-medium text-stone-700 mb-2">Presupuesto total estimado</label>
            <input type="text" value={presupuestoTotal} onChange={(e) => setPresupuestoTotal(e.target.value)} placeholder="Ej: USD 5000" className={inputStyles} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Preferencia de vuelos</label>
            <CardRadioGroup options={schema.VUELOS_OPCIONES} value={vuelos} onChange={setVuelos} name="vuelos" columns={3} formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Transporte entre ciudades</label>
            <PillCheckboxGroup options={schema.TRANSPORTE_OPCIONES} value={transporte} onChange={setTransporte} name="transporte" formatLabel={toTitleCase} />
          </WizardStep>
        )}

        {step === 6 && (
          <WizardStep icon={Building2} title="Estilo de viaje" subtitle="Ritmo, accesibilidad y alojamiento">
            <label className="block text-sm font-medium text-stone-700 mb-2">Accesibilidad y necesidades</label>
            <CardRadioGroup options={schema.ACCESIBILIDAD_OPCIONES} value={accesibilidad} onChange={setAccesibilidad} name="acc" columns={2} formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Experiencia viajando</label>
            <CardRadioGroup options={schema.EXPERIENCIA_PREVIA_OPCIONES} value={experienciaPrevia} onChange={setExperienciaPrevia} name="expP" columns={4} formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Ritmo preferido</label>
            <CardRadioGroup options={schema.RITMO_OPCIONES} value={ritmo} onChange={setRitmo} name="ritmo" columns={3} formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Tipo de alojamiento</label>
            <CardRadioGroup options={schema.ALOJAMIENTO_OPCIONES} value={alojamiento} onChange={setAlojamiento} name="aloj" columns={3} formatLabel={toTitleCase} />
            <label className="mt-4 block text-sm font-medium text-stone-700 mb-2">Categoría preferida</label>
            <CardRadioGroup options={schema.CATEGORIA_OPCIONES} value={categoriaAlojamiento} onChange={setCategoriaAlojamiento} name="cat" columns={3} formatLabel={toTitleCase} />
          </WizardStep>
        )}

        {step === 7 && (
          <WizardStep icon={Star} title="Prioridades y preferencias" subtitle="Últimos detalles">
            <label className="block text-sm font-medium text-stone-700 mb-2">Prioridades del viaje</label>
            <PillCheckboxGroup options={schema.PRIORIDADES_OPCIONES} value={prioridades} onChange={setPrioridades} name="prior" formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Preocupaciones o temores</label>
            <PillCheckboxGroup options={schema.PREOCUPACIONES_OPCIONES} value={preocupaciones} onChange={setPreocupaciones} name="preoc" formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Restricciones alimentarias</label>
            <CardRadioGroup options={schema.RESTRICCIONES_ALIMENTARIAS_OPCIONES} value={restriccionesAlimentarias} onChange={setRestriccionesAlimentarias} name="rest" columns={2} formatLabel={toTitleCase} />
            <label className="mt-6 block text-sm font-medium text-stone-700 mb-2">Otras preferencias</label>
            <textarea
              value={otrasPreferencias}
              onChange={(e) => setOtrasPreferencias(e.target.value)}
              rows={4}
              placeholder="Lugares que querés visitar, experiencias soñadas, celebraciones..."
              className={`${inputStyles} resize-none`}
            />
          </WizardStep>
        )}
      </div>

      {/* Navigation & Submit */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="btn-secondary inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
          Anterior
        </button>
        {step < 7 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(7, s + 1))}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Siguiente
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : (
          <button type="submit" disabled={guardando} className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50">
            {guardando ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
            {guardando ? "Guardando..." : "Guardar mis respuestas"}
          </button>
        )}
      </div>
    </form>
  );
}
