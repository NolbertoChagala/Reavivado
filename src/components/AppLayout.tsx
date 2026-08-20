"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Calendar, Settings, ChevronRight } from "lucide-react";
import { APP_NAME, APP_SUBTITLE } from "@/constants/app";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

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

  const menuItems = [
    { id: "dia" as Vista, label: "Inicio", icon: <Home size={18} />, titleText: "Resumen del Día" },
    { id: "semana" as Vista, label: "Unidades", icon: <Users size={18} />, titleText: "Tabla de Posiciones" },
    { id: "mes" as Vista, label: "Calendario", icon: <Calendar size={18} />, titleText: "Plan de Lectura Mensual" },
  ];

  const activeItem = menuItems.find(item => item.id === vistaActual);
  const pageTitle = pathname.includes("/admin") ? "Panel de Administración" : (activeItem?.titleText || "Reavivado");

  const handleCambioVista = (id: Vista) => {
    onChangeVista(id);
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col md:flex-row text-slate-900 font-sans antialiased font-medium font-medium">
      
      {/* SIDEBAR PARA DESKTOP - MINIMALISTA BLANCO Y ACCIONES JA */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/60 h-screen sticky top-0 shrink-0 justify-between select-none">
        <div className="flex flex-col">
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-slate-200/60 flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
              <Image
                src={logoadventista}
                alt="IASD"
                width={26}
                height={26}
                className="object-contain"
                priority
              />
              <Image
                src={JA}
                alt="JA"
                width={26}
                height={26}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase leading-none">
                {APP_NAME}
              </h1>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-1">
                {APP_SUBTITLE}
              </span>
            </div>
          </div>

          {/* Navegación */}
          <nav className="p-4 space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
              Menú Principal
            </span>
            
            {menuItems.map(({ id, label, icon }) => {
              const isActive = vistaActual === id && pathname === "/";
              return (
                <button
                  key={id}
                  onClick={() => handleCambioVista(id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium btn-transition ${
                    isActive
                      ? "bg-red-50/50 text-brand-primary border-l-4 border-brand-gold font-semibold shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? "text-brand-primary" : "text-slate-400"}`}>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-brand-gold" />}
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-200/60">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
                Herramientas
              </span>
              <button
                onClick={() => {
                  const isLoggedIn = typeof window !== "undefined" && document.cookie.includes("is_logged_in=true");
                  if (isLoggedIn) {
                    router.push("/admin/puntos");
                  } else {
                    router.push("/login");
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium btn-transition ${
                  pathname.includes("/admin")
                    ? "bg-red-50/50 text-brand-primary border-l-4 border-brand-gold font-semibold shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${pathname.includes("/admin") ? "text-brand-primary" : "text-slate-400"}`}>
                    <Settings size={18} />
                  </span>
                  <span>Panel Admin</span>
                </div>
                {pathname.includes("/admin") && <ChevronRight size={14} className="text-brand-gold" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-slate-200/60 text-[10px] text-slate-400">
          <p className="font-semibold uppercase tracking-wider text-slate-500">Villas Otoch 4</p>
          <p className="mt-0.5">Sociedad de Jóvenes JA</p>
        </div>
      </aside>

      {/* HEADER DE MÓVIL */}
      <div className="block md:hidden sticky top-0 z-50">
        <Header />
      </div>

      {/* ÁREA DE CONTENIDO */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER DE SECCIÓN EN DESKTOP */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200/60 sticky top-0 z-45">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            {pageTitle}
          </h2>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
            Conexión Bíblica 2026
          </div>
        </header>

        {/* CONTENEDOR ANCHO COMPLETAMENTE OPTIMIZADO */}
        <main className="flex-1 overflow-x-hidden p-4 md:p-10 w-full max-w-[1400px] mx-auto pb-24 md:pb-12 animate-in fade-in duration-300">
          {children}
        </main>
      </div>

      {/* BARRA DE NAVEGACIÓN MÓVIL */}
      <div className="block md:hidden">
        <NavigationBar vistaActual={vistaActual} onChangeVista={onChangeVista} />
      </div>

    </div>
  );
}
