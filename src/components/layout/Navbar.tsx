"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Planes", href: "/planes" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre mí", href: "/sobre-mi" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Solo transparente en home (hero oscuro); en otras páginas siempre visible
  const isTransparent = pathname === "/" && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
      )}
    >
      <nav className="container-site h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/Logo_ViajarMejor.png"
            alt=""
            width={140}
            height={44}
            className={cn(
              "h-8 w-auto md:h-10",
              isTransparent && "brightness-0 invert"
            )}
          />
          <span
            className={cn(
              "font-display font-semibold text-xl md:text-2xl whitespace-nowrap",
              isTransparent && "text-white"
            )}
          >
            {isTransparent ? (
              "Viajar Mejor"
            ) : (
              <>
                <span style={{ color: "#1d5590" }}>Viajar</span>{" "}
                <span style={{ color: "#4b9fda" }}>Mejor</span>
              </>
            )}
          </span>
        </Link>

        {/* Desktop Nav Links - Center */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname !== "/" && link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-stone-600 hover:text-stone-900",
                  isActive &&
                    (isTransparent ? "text-white font-semibold" : "text-primary-600 font-semibold")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block shrink-0">
          <Link
            href="/reservar"
            className={cn(
              "btn-primary",
              isTransparent &&
                "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
            )}
          >
            Reservar llamada
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            isTransparent ? "text-white" : "text-stone-700"
          )}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-b border-stone-100 shadow-lg"
          >
            <div className="container-site py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-medium py-2",
                      isActive ? "text-primary-600 font-semibold" : "text-stone-700"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/reservar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary mt-4 w-full justify-center"
              >
                Reservar llamada
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
