import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

export const ADMIN_EMAILS = [
  "viajarmejor.travel@gmail.com",
  "andresd.aguilar@gmail.com",
] as const;

export function isAdminEmail(email: string | null): boolean {
  return email != null && ADMIN_EMAILS.includes(email as (typeof ADMIN_EMAILS)[number]);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp(): FirebaseApp | null {
  if (getApps().length === 0) {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      return null;
    }
    return initializeApp(firebaseConfig);
  }
  return getApps()[0] as FirebaseApp;
}

export function getDb(): Firestore | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFirestore(app);
}

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

export interface ReservaData {
  nombre: string;
  email: string;
  whatsapp: string;
  destino: string;
  fechas: string;
  grupo: "solo" | "pareja" | "amigos" | "familia";
  consulta?: string;
  plan: string;
  planPrecio: number;
}

export async function saveReserva(data: ReservaData): Promise<string | null> {
  const db = getDb();
  if (!db) {
    console.error("[Firebase] No se pudo inicializar: verificar NEXT_PUBLIC_FIREBASE_* en .env.local");
    return null;
  }

  const { addDoc, collection, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const payload: Record<string, unknown> = {
    nombre: data.nombre,
    email: data.email,
    whatsapp: data.whatsapp,
    destino: data.destino,
    fechas: data.fechas,
    grupo: data.grupo,
    plan: data.plan,
    planPrecio: data.planPrecio,
    createdAt: serverTimestamp(),
  };
  if (data.consulta?.trim()) payload.consulta = data.consulta.trim();

  try {
    const docRef = await addDoc(collection(db, "reservas"), payload);
    return docRef.id;
  } catch (err) {
    console.error("[Firebase] Error al guardar reserva:", err);
    throw err;
  }
}

export async function getReservaById(reservaId: string): Promise<ReservaData | null> {
  const db = getDb();
  if (!db) return null;

  const { getDoc, doc } = await import("firebase/firestore");
  const snap = await getDoc(doc(db, "reservas", reservaId));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    nombre: d.nombre,
    email: d.email,
    whatsapp: d.whatsapp,
    destino: d.destino,
    fechas: d.fechas,
    grupo: d.grupo,
    plan: d.plan,
    planPrecio: d.planPrecio,
    consulta: d.consulta,
  } as ReservaData;
}

export async function saveViaje(data: Record<string, unknown>): Promise<string | null> {
  const db = getDb();
  if (!db) return null;

  const { addDoc, collection, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const payload = { ...data, createdAt: serverTimestamp() };
  const docRef = await addDoc(collection(db, "viajes"), payload);
  return docRef.id;
}

// --- Viaje preparar (link para que el usuario precargue antes de la call) ---

export interface ViajePrepararData {
  reservaId: string;
  reserva: ReservaData;
  formData?: Record<string, unknown>;
  createdAt?: unknown;
}

function generateToken(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  }
  return Math.random().toString(36).slice(2, 18);
}

export async function createViajePreparar(
  reservaId: string,
  reserva: ReservaData
): Promise<{ token: string; url: string } | null> {
  const db = getDb();
  if (!db) return null;

  const { setDoc, doc, collection, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const token = generateToken();
  const payload: ViajePrepararData = {
    reservaId,
    reserva,
    formData: reservaToViajeFormData(reserva),
    createdAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, "viajePreparar", token), payload);
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "https://viajarmejor.travel";
    return { token, url: `${baseUrl}/viaje/preparar/${token}` };
  } catch (err) {
    console.error("[Firebase] Error al crear viajePreparar:", err);
    throw err;
  }
}

export async function getViajePreparar(
  token: string
): Promise<ViajePrepararData | null> {
  const db = getDb();
  if (!db) return null;

  const { getDoc, doc } = await import("firebase/firestore");
  const snap = await getDoc(doc(db, "viajePreparar", token));
  return snap.exists() ? (snap.data() as ViajePrepararData) : null;
}

export async function saveViajePrepararFormData(
  token: string,
  formData: Record<string, unknown>
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase no inicializado");

  const { updateDoc, doc } = await import("firebase/firestore");
  await updateDoc(doc(db, "viajePreparar", token), { formData });
}

export async function getViajePrepararByReservaId(
  reservaId: string
): Promise<ViajePrepararData | null> {
  const db = getDb();
  if (!db) return null;

  const { collection, query, where, orderBy, getDocs, limit } = await import(
    "firebase/firestore"
  );
  try {
    const q = query(
      collection(db, "viajePreparar"),
      where("reservaId", "==", reservaId),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const snap = await getDocs(q);
    const first = snap.docs[0];
    return first ? (first.data() as ViajePrepararData) : null;
  } catch {
    const q = query(
      collection(db, "viajePreparar"),
      where("reservaId", "==", reservaId),
      limit(1)
    );
    const snap = await getDocs(q);
    const first = snap.docs[0];
    return first ? (first.data() as ViajePrepararData) : null;
  }
}

/** Mapea datos de reserva a valores iniciales del formulario de viaje */
export function reservaToViajeFormData(reserva: ReservaData): Record<string, unknown> {
  const grupoMap: Record<string, string> = {
    solo: "Solo",
    pareja: "En pareja",
    amigos: "Con amigos",
    familia: "Con familia",
  };
  return {
    clienteEmail: reserva.email,
    destino: { region: "", paisCiudad: reserva.destino },
    fecha: {
      opcion: "",
      salida: null,
      regreso: null,
      flexibilidad: reserva.fechas,
    },
    grupo: [grupoMap[reserva.grupo] || reserva.grupo].filter(Boolean),
    otrasPreferencias: reserva.consulta || null,
  };
}
