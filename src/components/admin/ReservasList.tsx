"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Plus, Link2 } from "lucide-react";
import { getFirebaseAuth, getDb, createViajePreparar, type ReservaData } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ReservaDoc extends DocumentData {
  nombre: string;
  email: string;
  whatsapp: string;
  destino: string;
  fechas: string;
  grupo: string;
  plan: string;
  planPrecio: number;
  consulta?: string;
  createdAt?: { toDate: () => Date };
}

export function ReservasList() {
  const [linkCopiado, setLinkCopiado] = useState<string | null>(null);
  const [generandoLink, setGenerandoLink] = useState<string | null>(null);
  const [reservas, setReservas] = useState<
    { id: string; data: ReservaDoc }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const db = getDb();
      if (!db) {
        setError("Firebase no inicializado. Verificá las variables de entorno.");
        setLoading(false);
        return;
      }
      try {
        let snap;
        try {
          const q = query(
            collection(db, "reservas"),
            orderBy("createdAt", "desc"),
            limit(100)
          );
          snap = await getDocs(q);
        } catch {
          const col = collection(db, "reservas");
          snap = await getDocs(col);
        }
        const items = snap.docs.map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          data: doc.data() as ReservaDoc,
        }));
        const sorted = items.sort((a, b) => {
          const at = (a.data.createdAt as { toDate?: () => Date })?.toDate?.();
          const bt = (b.data.createdAt as { toDate?: () => Date })?.toDate?.();
          if (!at && !bt) return 0;
          if (!at) return 1;
          if (!bt) return -1;
          return bt.getTime() - at.getTime();
        });
        setReservas(sorted);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const code = (err as { code?: string })?.code ?? "";
        console.error("[ReservasList] Error al cargar:", err);
        const isPermError = code === "permission-denied" || /permission|PERMISSION_DENIED/i.test(msg);
        setError(isPermError
          ? "Sin permisos. Verificá que estés logueado con viajarmejor.travel@gmail.com o andresd.aguilar@gmail.com y que las reglas de Firestore permitan lectura a admins."
          : msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse text-stone-500">Cargando reservas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        {error}
        <p className="text-sm mt-2">
          Verificá las reglas de Firestore para permitir lectura a admins.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-stone-900 mb-8">
          Reservas y formularios
        </h1>

      {reservas.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500">
          No hay reservas registradas aún.
        </div>
      ) : (
        <div className="space-y-4">
          {reservas.map(({ id, data }) => (
            <div
              key={id}
              className="bg-white rounded-xl border border-stone-200 p-6 hover:border-stone-300 transition-colors"
            >
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="font-medium text-stone-900">{data.nombre}</span>
                <span className="text-stone-500">{data.email}</span>
                <span className="text-stone-500">{data.whatsapp}</span>
                <span className="badge-primary text-xs">{data.plan}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-stone-600">
                <span>
                  <strong>Destino:</strong> {data.destino}
                </span>
                <span>
                  <strong>Fechas:</strong> {data.fechas}
                </span>
                <span>
                  <strong>Grupo:</strong> {data.grupo}
                </span>
                <span>
                  <strong>AR$</strong> {data.planPrecio?.toLocaleString("es-AR")}
                </span>
              </div>
              {data.consulta && (
                <p className="mt-3 text-sm text-stone-600 italic">
                  {data.consulta}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/admin/viajes/nuevo?reservaId=${id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Crear viaje
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setGenerandoLink(id);
                    try {
                      const result = await createViajePreparar(id, data as ReservaData);
                      if (result) {
                        await navigator.clipboard.writeText(result.url);
                        setLinkCopiado(id);
                        setTimeout(() => setLinkCopiado(null), 2500);
                      }
                    } catch {
                      // ignore
                    } finally {
                      setGenerandoLink(null);
                    }
                  }}
                  disabled={generandoLink === id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {generandoLink === id ? (
                    <>Generando...</>
                  ) : linkCopiado === id ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Link copiado
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Generar link
                    </>
                  )}
                </button>
              </div>
              {data.createdAt &&
                typeof (data.createdAt as { toDate?: () => Date }).toDate ===
                  "function" && (
                  <p className="mt-2 text-xs text-stone-400">
                    {format(
                      (data.createdAt as { toDate: () => Date }).toDate(),
                      "d MMM yyyy, HH:mm",
                      { locale: es }
                    )}
                  </p>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
