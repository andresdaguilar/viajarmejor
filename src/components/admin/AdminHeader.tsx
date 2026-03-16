"use client";

import Link from "next/link";
import { useAdminAuth } from "./AdminAuthProvider";

export function AdminHeader() {
  const { user, isAdmin, signOut } = useAdminAuth();

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-display font-semibold text-stone-900">
          Panel Admin — Viajar Mejor
        </Link>
        {user && isAdmin && (
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/admin" className="text-stone-600 hover:text-stone-900">
              Reservas
            </Link>
            <Link
              href="/admin/viajes/nuevo"
              className="text-stone-600 hover:text-stone-900"
            >
              Nuevo viaje
            </Link>
            <span className="text-stone-400">{user.email}</span>
            <button
              onClick={signOut}
              className="text-stone-500 hover:text-stone-700"
            >
              Cerrar sesión
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
