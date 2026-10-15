"use client";
import { Home, Users, Calendar, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type Vista = "dia" | "semana" | "mes";

interface NavigationBarProps {
  vistaActual: Vista;
  onChangeVista: (vista: Vista) => void;
}

export default function NavigationBar({
  vistaActual,
  onChangeVista,
}: NavigationBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCambioVista = (id: Vista) => {
    onChangeVista(id);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };

  const navItems = [
    { id: "dia" as Vista, label: "Inicio", icon: <Home size={17} /> },
    { id: "semana" as Vista, label: "Unidades", icon: <Users size={17} /> },
    { id: "mes" as Vista, label: "Calendario", icon: <Calendar size={17} /> },
  ];

  return (
    <>
      {/* Halo de desvanecido inferior para fundir el fondo suavemente */}
      <div
        className="fixed bottom-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-t from-slate-900/10 via-slate-900/5 to-transparent z-40"
        aria-hidden="true"
      />

      {/* Dock flotante rellenito en blanco transparente de alta gama */}
      <nav
        className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 select-none"
        aria-label="Navegación móvil"
      >
        <div className="flex items-center gap-1.5 p-2 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_16px_40px_rgba(13,43,86,0.16)] ring-1 ring-slate-900/5 min-w-[310px] max-w-[350px]">
          {navItems.map(({ id, label, icon }) => {
            const isActive = vistaActual === id && !pathname.includes("/admin");

            return (
              <button
                key={id}
                onClick={() => handleCambioVista(id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[#0d2b56] text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/70"
                }`}
              >
                <div className="transition-transform duration-200">
                  {icon}
                </div>
                <span
                  className={`text-[10px] tracking-tight leading-none mt-1 transition-all ${
                    isActive ? "font-bold text-white" : "font-medium text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}

          {/* Separador vertical sutil */}
          <span className="h-7 w-px bg-slate-200/80 my-auto" aria-hidden="true" />

          {/* Botón de acceso al panel administrativo */}
          <button
            onClick={() => {
              router.push("/admin");
            }}
            className={`relative flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
              pathname.includes("/admin")
                ? "bg-[#0d2b56] text-white shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/70"
            }`}
          >
            <div className="transition-transform duration-200">
              <Settings size={17} />
            </div>
            <span
              className={`text-[10px] tracking-tight leading-none mt-1 transition-all ${
                pathname.includes("/admin") ? "font-bold text-white" : "font-medium text-slate-500"
              }`}
            >
              Panel
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

