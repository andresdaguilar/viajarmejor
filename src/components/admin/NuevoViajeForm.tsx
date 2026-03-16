"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  saveViaje,
  getViajePrepararByReservaId,
  getReservaById,
  reservaToViajeFormData,
} from "@/lib/firebase";
import {
  DESTINO_OPCIONES,
  FECHA_OPCIONES,
  DURACION_OPCIONES,
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
import { GrupoSelector } from "@/components/viaje/ViajeFormFields";

function FormSection({
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

function CheckboxGroup({
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

function RadioGroup({
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

export function NuevoViajeForm() {
  const searchParams = useSearchParams();
  const reservaId = searchParams.get("reservaId");

  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [cargandoPreparar, setCargandoPreparar] = useState(!!reservaId);
  const [hasPreloadedData, setHasPreloadedData] = useState(false);
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
    const rid = reservaId;
    if (!rid) return;
    const reservaIdStr: string = rid;
    let cancelled = false;
    async function load() {
      const preparar = await getViajePrepararByReservaId(reservaIdStr);
      if (cancelled) return;
      let data: ViajeFormData | undefined;
      if (preparar?.formData) {
        data = preparar.formData as ViajeFormData;
      } else {
        const r = await getReservaById(reservaIdStr);
        data = r ? (reservaToViajeFormData(r) as ViajeFormData) : undefined;
      }
      if (cancelled) return;
      if (data) setHasPreloadedData(true);
      applyFormData(data, {
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
      setCargandoPreparar(false);
    }
    load();
    return () => { cancelled = true; };
  }, [reservaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Record<string, unknown> = {
      ...(reservaId && { reservaId }),
      clienteEmail: clienteEmail.trim() || null,
      destino: { region: destinoRegion, paisCiudad: paisCiudad.trim() || null },
      fecha: {
        opcion: fechaOpcion,
        salida: fechaSalida || null,
        regreso: fechaRegreso || null,
        flexibilidad: flexibilidadFechas.trim() || null,
      },
      duracion,
      grupo: grupo.length ? grupo : null,
      numViajeros: numViajeros.trim() || null,
      edadesAprox: edadesAprox.trim() || null,
      perfilViajero,
      tipoExperiencia,
      presupuesto: { nivel: presupuesto, total: presupuestoTotal.trim() || null },
      vuelos,
      transporte,
      intereses,
      accesibilidad,
      experienciaPrevia,
      ritmo,
      alojamiento: {
        tipo: alojamiento,
        categoria: categoriaAlojamiento || null,
      },
      prioridades,
      preocupaciones,
      restriccionesAlimentarias,
      otrasPreferencias: otrasPreferencias.trim() || null,
    };
    setGuardando(true);
    try {
      const id = await saveViaje(data);
      if (id) setGuardado(true);
    } catch {
      setGuardando(false);
    }
    setGuardando(false);
  };

  if (cargandoPreparar) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse text-stone-500">Cargando datos de la reserva...</div>
      </div>
    );
  }

  if (guardado) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-green-800 font-medium mb-4">Viaje guardado correctamente.</p>
        <Link href="/admin" className="text-primary-600 hover:underline">
          Volver al panel
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-semibold text-stone-900">
          {hasPreloadedData ? "Ver datos de viaje" : "Crear nuevo viaje"}
          {reservaId && (
            <span className="ml-2 text-base font-normal text-stone-500">
              (asociado a reserva)
            </span>
          )}
        </h1>
        <Link href="/admin" className="text-sm text-stone-500 hover:text-stone-700">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <FormSection title="Cliente">
          <label className="block text-sm text-stone-600 mb-2">
            Email del usuario
          </label>
          <input
            type="email"
            value={clienteEmail}
            onChange={(e) => setClienteEmail(e.target.value)}
            placeholder="cliente@email.com"
            className="w-full max-w-md px-4 py-2 rounded-lg border border-stone-200"
          />
        </FormSection>

        <FormSection title="1. Destino">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Qué destino o región te interesa visitar?
          </label>
          <RadioGroup
            options={DESTINO_OPCIONES}
            value={destinoRegion}
            onChange={setDestinoRegion}
            name="destino"
          />
          <label className="block text-sm text-stone-600 mt-4 mb-2">
            País o ciudad específica
          </label>
          <input
            type="text"
            value={paisCiudad}
            onChange={(e) => setPaisCiudad(e.target.value)}
            placeholder="Ej: París, Roma, Tokio"
            className="w-full max-w-md px-4 py-2 rounded-lg border border-stone-200"
          />
        </FormSection>

        <FormSection title="2. Fecha del viaje">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Cuándo te gustaría viajar?
          </label>
          <RadioGroup
            options={FECHA_OPCIONES}
            value={fechaOpcion}
            onChange={setFechaOpcion}
            name="fecha"
          />
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-stone-600 mb-1">Fecha de salida</label>
              <input
                type="date"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-sm text-stone-600 mb-1">Fecha de regreso</label>
              <input
                type="date"
                value={fechaRegreso}
                onChange={(e) => setFechaRegreso(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-200"
              />
            </div>
          </div>
          <label className="block text-sm text-stone-600 mt-4 mb-2">
            Flexibilidad de fechas
          </label>
          <input
            type="text"
            value={flexibilidadFechas}
            onChange={(e) => setFlexibilidadFechas(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-stone-200"
          />
        </FormSection>

        <FormSection title="3. Duración del viaje">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Cuántos días durará el viaje?
          </label>
          <RadioGroup
            options={DURACION_OPCIONES}
            value={duracion}
            onChange={setDuracion}
            name="duracion"
          />
        </FormSection>

        <FormSection title="4. Grupo de viaje">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Con quién viajás?
          </label>
          <GrupoSelector value={grupo} onChange={setGrupo} name="grupo" />
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-stone-600 mb-1">Número total de viajeros</label>
              <input
                type="text"
                value={numViajeros}
                onChange={(e) => setNumViajeros(e.target.value)}
                placeholder="Ej: 2"
                className="w-full px-4 py-2 rounded-lg border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-sm text-stone-600 mb-1">Edades aproximadas</label>
              <input
                type="text"
                value={edadesAprox}
                onChange={(e) => setEdadesAprox(e.target.value)}
                placeholder="Ej: 35, 38"
                className="w-full px-4 py-2 rounded-lg border border-stone-200"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="5. Perfil del viajero">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Qué tipo de viajero te describiría mejor?
          </label>
          <RadioGroup
            options={PERFIL_VIAJERO_OPCIONES}
            value={perfilViajero}
            onChange={setPerfilViajero}
            name="perfil"
          />
        </FormSection>

        <FormSection title="6. Tipo de experiencia que buscás">
          <label className="block text-sm text-stone-600 mb-2">
            (Podés elegir varias)
          </label>
          <CheckboxGroup
            options={TIPO_EXPERIENCIA_OPCIONES}
            value={tipoExperiencia}
            onChange={setTipoExperiencia}
            name="experiencia"
          />
        </FormSection>

        <FormSection title="7. Presupuesto aproximado">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Cuál es tu presupuesto aproximado por persona?
          </label>
          <RadioGroup
            options={PRESUPUESTO_OPCIONES}
            value={presupuesto}
            onChange={setPresupuesto}
            name="presupuesto"
          />
          <label className="block text-sm text-stone-600 mt-4 mb-2">
            Presupuesto total estimado
          </label>
          <input
            type="text"
            value={presupuestoTotal}
            onChange={(e) => setPresupuestoTotal(e.target.value)}
            placeholder="Ej: USD 5000"
            className="w-full max-w-md px-4 py-2 rounded-lg border border-stone-200"
          />
        </FormSection>

        <FormSection title="8. Preferencias logísticas">
          <label className="block text-sm text-stone-600 mb-2">Sobre los vuelos</label>
          <RadioGroup
            options={VUELOS_OPCIONES}
            value={vuelos}
            onChange={setVuelos}
            name="vuelos"
          />
          <label className="block text-sm text-stone-600 mt-4 mb-2">
            Sobre transporte entre ciudades
          </label>
          <CheckboxGroup
            options={TRANSPORTE_OPCIONES}
            value={transporte}
            onChange={setTransporte}
            name="transporte"
          />
        </FormSection>

        <FormSection title="9. Intereses específicos">
          <label className="block text-sm text-stone-600 mb-2">
            (Podés elegir varios)
          </label>
          <CheckboxGroup
            options={INTERESES_OPCIONES}
            value={intereses}
            onChange={setIntereses}
            name="intereses"
          />
        </FormSection>

        <FormSection title="10. Accesibilidad y necesidades especiales">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Hay alguna necesidad especial que debamos considerar?
          </label>
          <RadioGroup
            options={ACCESIBILIDAD_OPCIONES}
            value={accesibilidad}
            onChange={setAccesibilidad}
            name="accesibilidad"
          />
        </FormSection>

        <FormSection title="11. Experiencia previa viajando">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Cuántos viajes internacionales hiciste?
          </label>
          <RadioGroup
            options={EXPERIENCIA_PREVIA_OPCIONES}
            value={experienciaPrevia}
            onChange={setExperienciaPrevia}
            name="expPrevia"
          />
        </FormSection>

        <FormSection title="12. Ritmo del viaje">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Qué ritmo preferís?
          </label>
          <RadioGroup
            options={RITMO_OPCIONES}
            value={ritmo}
            onChange={setRitmo}
            name="ritmo"
          />
        </FormSection>

        <FormSection title="13. Tipo de alojamiento preferido">
          <label className="block text-sm text-stone-600 mb-2">
            Tipo de alojamiento
          </label>
          <RadioGroup
            options={ALOJAMIENTO_OPCIONES}
            value={alojamiento}
            onChange={setAlojamiento}
            name="alojamiento"
          />
          <label className="block text-sm text-stone-600 mt-4 mb-2">
            Categoría preferida
          </label>
          <RadioGroup
            options={CATEGORIA_OPCIONES}
            value={categoriaAlojamiento}
            onChange={setCategoriaAlojamiento}
            name="categoria"
          />
        </FormSection>

        <FormSection title="14. Prioridades del viaje">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Qué es lo más importante para vos?
          </label>
          <CheckboxGroup
            options={PRIORIDADES_OPCIONES}
            value={prioridades}
            onChange={setPrioridades}
            name="prioridades"
          />
        </FormSection>

        <FormSection title="15. Preocupaciones o temores">
          <label className="block text-sm text-stone-600 mb-2">
            ¿Hay algo que te preocupe sobre el viaje?
          </label>
          <CheckboxGroup
            options={PREOCUPACIONES_OPCIONES}
            value={preocupaciones}
            onChange={setPreocupaciones}
            name="preocupaciones"
          />
        </FormSection>

        <FormSection title="16. Restricciones alimentarias">
          <label className="block text-sm text-stone-600 mb-2">
            Restricciones
          </label>
          <RadioGroup
            options={RESTRICCIONES_ALIMENTARIAS_OPCIONES}
            value={restriccionesAlimentarias}
            onChange={setRestriccionesAlimentarias}
            name="restricciones"
          />
        </FormSection>

        <FormSection title="17. Otras preferencias importantes">
          <label className="block text-sm text-stone-600 mb-2">
            Campo abierto (lugares que quiere visitar, experiencias soñadas, celebraciones)
          </label>
          <textarea
            value={otrasPreferencias}
            onChange={(e) => setOtrasPreferencias(e.target.value)}
            rows={4}
            placeholder="Ej: lugares que sí o sí quiere visitar, experiencias soñadas, celebraciones especiales"
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </FormSection>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={guardando}
            className="btn-primary disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar viaje"}
          </button>
          <Link href="/admin" className="btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
