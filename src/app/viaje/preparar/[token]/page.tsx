import { createMetadata } from "@/lib/metadata";
import { ViajePrepararForm } from "@/components/viaje/ViajePrepararForm";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata = createMetadata({
  title: "Preparar tu viaje — Viajar Mejor",
  description: "Completá los datos de tu viaje antes de la llamada de asesoría.",
  path: "/viaje/preparar",
});

export default async function ViajePrepararPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <div className="container-site py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900">
                Preparar tu viaje
              </h1>
              <p className="text-stone-600 mt-0.5">
                Completá antes de tu llamada para aprovechar mejor el tiempo
              </p>
            </div>
          </div>
          <ViajePrepararForm token={token} />
        </div>
      </div>
    </main>
  );
}
