"use client";

import { useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSearchParams } from "next/navigation";

export function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const handleGoogleLogin = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setError("Firebase no está configurado");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const displayError =
    error ||
    (errorParam === "unauthorized"
      ? "Tu cuenta no está autorizada para acceder al panel."
      : null);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <h1 className="text-2xl font-display font-semibold text-stone-900 mb-2">
          Panel de administración
        </h1>
        <p className="text-stone-500 text-sm mb-8">
          Solo cuentas autorizadas pueden acceder.
        </p>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors disabled:opacity-50"
        >
          <span className="text-lg">G</span>
          {loading ? "Conectando..." : "Continuar con Google"}
        </button>
        {displayError && (
          <p className="mt-4 text-sm text-red-600">{displayError}</p>
        )}
      </div>
    </div>
  );
}
