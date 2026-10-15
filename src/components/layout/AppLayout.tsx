"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Calendar, Settings } from "lucide-react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import { BrandLogo } from "./BrandLogo";

type Vista = "dia" | "semana" | "mes";

interface AppLayoutProps {
  children: React.ReactNode;
  vistaActual: Vista;
  onChangeVista: (vista: Vista) => void;
}

export default function AppLayout({
  children,
  vistaActual,
  onChangeVista,
}: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "dia" as Vista, label: "Inicio", icon: <Home size={15} /> },
    { id: "semana" as Vista, label: "Unidades", icon: <Users size={15} /> },
    { id: "mes" as Vista, label: "Calendario", icon: <Calendar size={15} /> },
  ];

  const isHomeSection = pathname === "/";
  const activeIndex = isHomeSection
    ? menuItems.findIndex((item) => item.id === vistaActual)
    : -1;

  const handleCambioVista = (id: Vista) => {
    onChangeVista(id);
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased font-medium w-full">
      {/* ── Barra superior flotante (Completamente transparente sin marco en el hero, dock blanco al hacer scroll) ── */}
      <header
        className={`hidden md:flex items-center justify-between fixed top-3.5 left-1/2 -translate-x-1/2 z-50 w-auto min-w-[560px] max-w-2xl px-5 py-2.5 rounded-2xl transition-all duration-300 select-none gap-4 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl border border-slate-300/90 shadow-[0_16px_40px_rgba(13,43,86,0.16),0_4px_12px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/10 text-slate-900"
            : "bg-transparent border-transparent shadow-none ring-0 text-white"
        }`}
      >
        {/* Solo las imágenes / logos oficiales, adaptables */}
        <BrandLogo size={32} isDark={!scrolled} />

        {/* Menú de navegación tipo switch / traspaso fluido */}
        <nav
          className={`relative flex items-center p-1 rounded-xl shadow-inner w-[330px] transition-all duration-300 ${
            scrolled
              ? "bg-slate-100/90 backdrop-blur-md border border-slate-200/80"
              : "bg-black/30 backdrop-blur-md border border-white/15"
          }`}
        >
          {/* Indicador deslizante de switch activo ("traspaso") */}
          {activeIndex >= 0 && (
            <div
              className={`absolute top-1 bottom-1 left-1 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                scrolled
                  ? "bg-[#0d2b56] shadow-xs"
                  : "bg-white shadow-md"
              }`}
              style={{
                width: "calc((100% - 8px) / 3)",
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          )}

          {menuItems.map(({ id, label, icon }) => {
            const isActive = vistaActual === id && isHomeSection;
            return (
              <button
                key={id}
                onClick={() => handleCambioVista(id)}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 cursor-pointer active:scale-95 select-none ${
                  isActive
                    ? scrolled
                      ? "text-white"
                      : "text-[#0d2b56]"
                    : scrolled
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Acceso al panel administrativo */}
        <button
          onClick={() => router.push("/admin")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
            scrolled
              ? "bg-[#0d2b56] hover:bg-[#0a1e3d] text-white"
              : "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-sm"
          }`}
        >
          <Settings size={14} />
          <span>Panel admin</span>
        </button>
      </header>

      {/* Header móvil flotante */}
      <div className="block md:hidden">
        <Header scrolled={scrolled} />
      </div>

      {/* Área de contenido principal (Fondo #0a1931 para evitar flashes al alternar vistas) */}
      <main className="w-full flex-1 overflow-x-hidden min-w-0 bg-[#0a1931] pb-32 md:pb-0">
        {children}
      </main>

      {/* Barra de navegación inferior móvil */}
      <div className="block md:hidden">
        <NavigationBar vistaActual={vistaActual} onChangeVista={onChangeVista} />
      </div>
    </div>
  );
}