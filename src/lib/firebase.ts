import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

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

function getDb(): Firestore | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFirestore(app);
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
