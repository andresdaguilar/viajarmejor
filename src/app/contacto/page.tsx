import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contacto — Viajar Mejor",
  description: "Contactá a Andy para asesoría de viajes personalizada. WhatsApp, email o reservá tu llamada.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <main className="min-h-screen py-16">
      <h1 className="text-2xl font-bold">Contacto</h1>
    </main>
  );
}
