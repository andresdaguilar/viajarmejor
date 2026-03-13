import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress — Iniciar sesión",
  robots: "noindex, nofollow",
};

export default function WpAdminPage() {
  return (
    <main className="min-h-screen bg-[#23282d] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Fake WordPress logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">viajarmejor</h1>
          <p className="text-[#a0a5aa] text-sm">.travel</p>
        </div>

        {/* Fake login form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Acceso restringido
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Este sitio no usa WordPress. Estás en el lugar equivocado.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Usuario o correo electrónico
              </label>
              <input
                type="text"
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-50 text-gray-400 cursor-not-allowed"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-50 text-gray-400 cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full py-2 bg-[#0073aa] text-white rounded opacity-50 cursor-not-allowed"
            >
              Iniciar sesión
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            🤷 No hay nada que hackear aquí. Probá con otro sitio.
          </p>
        </div>

        <p className="mt-6 text-center text-[#a0a5aa] text-sm">
          <a href="/" className="hover:text-white transition-colors">
            ← Volver a viajarmejor.travel
          </a>
        </p>
      </div>
    </main>
  );
}
