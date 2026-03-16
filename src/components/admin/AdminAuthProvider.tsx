"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getFirebaseAuth, isAdminEmail } from "@/lib/firebase";
import type { User } from "firebase/auth";

type AdminAuthContext = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Context = createContext<AdminAuthContext | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signOut = async () => {
    const auth = getFirebaseAuth();
    if (auth) await auth.signOut();
  };

  const isAdmin = user != null && isAdminEmail(user.email ?? null);

  return (
    <Context.Provider value={{ user, isAdmin, loading, signOut }}>
      {children}
    </Context.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
