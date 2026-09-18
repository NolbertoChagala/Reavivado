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
      behavior: "smooth" 
    });
  };

  const navItems = [
    { id: "dia" as Vista, label: "Inicio", icon: <Home size={18} /> },
    { id: "semana" as Vista, label: "Unidades", icon: <Users size={18} /> },
    { id: "mes" as Vista, label: "Calendario", icon: <Calendar size={18} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 cursor-pointer bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800/80 px-2 pb-4 pt-2.5 z-50 select-none">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        
        {navItems.map(({ id, label, icon }) => {
          const isActive = vistaActual === id && !pathname.includes('/admin');
          
          return (
            <button
              key={id}
              onClick={() => handleCambioVista(id)} 
              className={`flex flex-col items-center gap-1 group btn-transition min-w-[60px] ${
                isActive 
                  ? "text-brand-primary" 
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              <div className="p-1">
                {icon}
              </div>
              <span className="text-[9px] font-medium tracking-wide">
                {label}
              </span>
            </button>
          );
        })}

        {/* BOTÓN DE PANEL ADMIN */}
        <button
          onClick={() => {
            const isLoggedIn = typeof window !== "undefined" && document.cookie.includes("is_logged_in=true");
            if (isLoggedIn) {
              router.push('/admin/puntos');
            } else {
              router.push('/login');
            }
          }}
          className={`flex flex-col items-center gap-1 group btn-transition min-w-[60px] ${
            pathname.includes('/admin') 
              ? "text-brand-primary" 
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          <div className="p-1">
            <Settings size={18} />
          </div>
          <span className="text-[9px] font-medium tracking-wide">
            Panel
          </span>
        </button>

      </div>
    </nav>
  );
}
