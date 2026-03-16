"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ReservasList } from "@/components/admin/ReservasList";

export default function AdminPage() {
  const { user, isAdmin, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      router.push("/admin/login?error=unauthorized");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-stone-500">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <Suspense fallback={<div className="animate-pulse py-16">Cargando...</div>}>
        <AdminLogin />
      </Suspense>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">
          No tenés acceso. Solo cuentas autorizadas pueden ingresar.
        </p>
      </div>
    );
  }

  return <ReservasList />;
}
