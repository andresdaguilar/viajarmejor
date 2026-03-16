import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-stone-50">
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </div>
    </AdminAuthProvider>
  );
}
