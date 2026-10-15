"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Trophy,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import JA from "@/assets/img/JA.webp";

type Tab = "inicio" | "puntos" | "usuarios";

interface AdminLayoutProps {
  children: ReactNode;
  adminName?: string;
  activeTab: Tab;
}

const GRUPOS: {
  titulo: string;
  items: { id: Tab; href: string; label: string; icon: ReactNode }[];
}[] = [
  {
    titulo: "General",
    items: [
      { id: "inicio", href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={19} /> },
    ],
  },
  {
    titulo: "Gestión",
    items: [
      { id: "puntos", href: "/admin/puntos", label: "Gestión de puntos", icon: <Trophy size={19} /> },
      { id: "usuarios", href: "/admin/usuarios", label: "Gestión de usuarios", icon: <Users size={19} /> },
    ],
  },
];

const TITULOS: Record<Tab, string> = {
  inicio: "Dashboard",
  puntos: "Gestión de puntos",
  usuarios: "Gestión de usuarios",
};

const STORAGE_KEY = "admin-sidebar-expandido";

/* ───────── Contenido del menú lateral (Perfectamente centrado, sin saltos) ───────── */
function MenuLateral({
  expandido,
  activeTab,
  onNavegar,
  onCerrarMovil,
  isMounted = true,
}: {
  expandido: boolean;
  activeTab: Tab;
  onNavegar?: () => void;
  onCerrarMovil?: () => void;
  isMounted?: boolean;
}) {

  return (
    <div
      className={`flex h-full flex-col justify-between py-3 select-none ${
        expandido ? "overflow-y-auto overflow-x-hidden scrollbar-none" : "overflow-visible"
      }`}
    >
      <div className="space-y-4">
        {/* Marca Institucional: Emblema oficial JA */}
        <div className="flex h-16 items-center justify-between px-3 border-b border-white/10 shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-white/10 p-1.5 border border-white/10 overflow-hidden shadow-2xs">
              <Image
                src={JA}
                alt="JA"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                priority
              />
            </div>
            <div
              className={`overflow-hidden whitespace-nowrap ${
                isMounted ? "transition-all duration-300 ease-in-out" : ""
              } ${
                expandido
                  ? "opacity-100 max-w-[170px] ml-3"
                  : "opacity-0 max-w-0 ml-0 pointer-events-none"
              }`}
            >
              <p className="truncate text-sm font-black leading-tight text-white tracking-tight">Reavivado JA</p>
              <p className="truncate text-[10px] font-semibold text-brand-gold">Panel de Gestión</p>
            </div>
          </div>

          {onCerrarMovil && (
            <button
              type="button"
              onClick={onCerrarMovil}
              aria-label="Cerrar menú"
              className="cursor-pointer rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navegación por grupos */}
        <nav aria-label="Navegación del panel" className="space-y-3 px-2">
          {GRUPOS.map((g) => (
            <div key={g.titulo} className="space-y-1">
              {/* Encabezado del grupo */}
              <div
                className={`overflow-hidden whitespace-nowrap px-3 ${
                  isMounted ? "transition-all duration-300 ease-in-out" : ""
                } ${
                  expandido ? "h-5 opacity-100 max-w-[170px]" : "h-0 opacity-0 max-w-0 pointer-events-none"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                  {g.titulo}
                </p>
              </div>

              {g.items.map((it) => {
                const activo = activeTab === it.id;
                return (
                  <Link
                    key={it.id}
                    href={it.href}
                    onClick={onNavegar}
                    aria-current={activo ? "page" : undefined}
                    className={`group relative flex items-center h-11 rounded-lg text-sm font-semibold transition-colors duration-200 active:scale-[0.98] ${
                      activo
                        ? "bg-white/10 text-white shadow-xs"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {/* Indicador activo lateral */}
                    {activo && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    )}

                    {/* Icono siempre fijo en el centro horizontal */}
                    <span
                      className={`w-12 h-11 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        activo ? "text-brand-gold" : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {it.icon}
                    </span>

                    {/* Texto con desvanecimiento limpio sin envolturas de línea */}
                    <span
                      className={`truncate whitespace-nowrap overflow-hidden ${
                        isMounted ? "transition-all duration-300 ease-in-out" : ""
                      } ${
                        expandido
                          ? "opacity-100 max-w-[170px] pr-2"
                          : "opacity-0 max-w-0 pointer-events-none"
                      }`}
                    >
                      {it.label}
                    </span>

                    {/* Tooltip flotante (solo cuando está achicado) */}
                    {!expandido && (
                      <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center z-50">
                        <div className="relative bg-[#0d213d] text-white text-xs font-semibold py-1.5 px-3 rounded-md shadow-xl border border-white/15 whitespace-nowrap">
                          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#0d213d] border-l border-b border-white/15" />
                          <span className="relative z-10">{it.label}</span>
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Pie del menú: app pública */}
      <div className="px-2 pt-2 border-t border-white/5">
        {/* Acceso a la app pública */}
        <Link
          href="/"
          className="group relative flex items-center h-10 rounded-lg border border-white/10 text-sm font-semibold text-white/70 transition-colors duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <span className="w-12 h-10 flex items-center justify-center shrink-0 text-white/50 group-hover:text-white">
            <ExternalLink size={17} />
          </span>
          <span
            className={`truncate whitespace-nowrap overflow-hidden ${
              isMounted ? "transition-all duration-300 ease-in-out" : ""
            } ${
              expandido
                ? "opacity-100 max-w-[160px] pr-2"
                : "opacity-0 max-w-0 pointer-events-none"
            }`}
          >
            Ver app pública
          </span>

          {!expandido && (
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center z-50">
              <div className="relative bg-[#0d213d] text-white text-xs font-semibold py-1.5 px-3 rounded-md shadow-xl border border-white/15 whitespace-nowrap">
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#0d213d] border-l border-b border-white/15" />
                <span className="relative z-10">Ver app pública</span>
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

/* ───────── Layout Principal ───────── */
export default function AdminLayout({ children, adminName, activeTab }: AdminLayoutProps) {
  const [menuMovil, setMenuMovil] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Inicializar directamente leyendo localStorage para evitar el pantallazo al cambiar de ruta
  const [expandido, setExpandido] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const guardado = localStorage.getItem(STORAGE_KEY);
        if (guardado !== null) return guardado === "1";
      } catch {
        /* sin acceso a localStorage */
      }
    }
    return true;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const alternarExpandido = () => {
    setExpandido((prev) => {
      const siguiente = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, siguiente ? "1" : "0");
      } catch {
        /* ignorar */
      }
      return siguiente;
    });
  };

  // Cerrar menú móvil con Esc y bloquear scroll de fondo
  useEffect(() => {
    if (!menuMovil) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuMovil(false);
    window.addEventListener("keydown", onKey);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previo;
    };
  }, [menuMovil]);

  return (
    <div className="flex min-h-screen w-full bg-[#f4f6fa] font-sans text-slate-800 antialiased">
      {/* ═════════ Barra lateral de escritorio (Sticky h-screen, sin desfase) ═════════ */}
      <aside
        className={`hidden md:flex flex-col shrink-0 h-screen sticky top-0 z-40 select-none border-r border-slate-800/80 bg-[#081528] text-white ${
          isMounted ? "transition-[width] duration-300 ease-in-out" : ""
        } ${expandido ? "w-64" : "w-16"}`}
      >
        <MenuLateral expandido={expandido} activeTab={activeTab} isMounted={isMounted} />
      </aside>

      {/* ═════════ Menú lateral para dispositivos móviles ═════════ */}
      {menuMovil && (
        <div
          aria-hidden="true"
          onClick={() => setMenuMovil(false)}
          className="fixed inset-0 z-40 cursor-default bg-[#050d1c]/70 backdrop-blur-xs md:hidden"
        />
      )}
      <aside
        aria-hidden={!menuMovil}
        className={`fixed inset-y-0 left-0 z-50 w-72 select-none border-r border-slate-800/80 bg-[#081528] text-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuMovil ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          <MenuLateral
            expandido
            activeTab={activeTab}
            onNavegar={() => setMenuMovil(false)}
            onCerrarMovil={() => setMenuMovil(false)}
          />
        </div>
      </aside>

      {/* ═════════ Área de contenido principal ═════════ */}
      <div className="flex flex-1 min-w-0 flex-col">
        {/* Cabecera superior sticky */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-2xs">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Botón único para alternar menú (móvil y escritorio) */}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setMenuMovil(true);
                } else {
                  alternarExpandido();
                }
              }}
              aria-label={expandido ? "Colapsar menú" : "Expandir menú"}
              title={expandido ? "Colapsar menú" : "Expandir menú"}
              className="cursor-pointer rounded-lg border border-slate-200/80 p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors active:scale-95"
            >
              <Menu size={19} />
            </button>

            {/* Ruta de navegación */}
            <nav aria-label="Ruta" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
              <span className="hidden sm:inline text-slate-400">Admin</span>
              <ChevronRight size={14} className="hidden sm:inline text-slate-300" />
              <span className="font-bold text-[#0d2b56]">{TITULOS[activeTab]}</span>
            </nav>
          </div>

          {/* Perfil del operador y Cerrar sesión */}
          <div className="flex shrink-0 items-center gap-2">
            {adminName && (
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/80 bg-slate-50 py-1 pl-1.5 pr-3 shadow-2xs">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-gold text-xs font-black text-[#0a1931] shadow-2xs">
                  {adminName.charAt(0).toUpperCase()}
                </span>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">{adminName}</span>
                  <span className="text-[10px] text-slate-400 font-semibold leading-tight">Operador JA</span>
                </div>
              </div>
            )}

            {/* Botón Cerrar Sesión */}
            <form action={logout}>
              <button
                type="submit"
                title="Cerrar sesión"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200/80 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-700 transition-colors text-xs font-semibold cursor-pointer shadow-2xs active:scale-95"
              >
                <LogOut size={14} className="shrink-0" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </form>
          </div>
        </header>

        {/* Contenedor central fluido y sin desajustes */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}