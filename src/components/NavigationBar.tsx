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
    { id: "dia" as Vista, label: "Inicio", icon: <Home size={20} /> },
    { id: "semana" as Vista, label: "Unidades", icon: <Users size={20} /> },
    { id: "mes" as Vista, label: "Lectura", icon: <Calendar size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 cursor-pointer right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 px-2 pb-6 pt-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        
        {navItems.map(({ id, label, icon }) => {
          const isActive = vistaActual === id && !pathname.includes('/admin');
          
          return (
            <button
              key={id}
              onClick={() => handleCambioVista(id)} 
              className={`flex flex-col items-center gap-1 group transition-all duration-300 min-w-[64px] ${
                isActive ? "text-[#003366]" : "text-slate-400"
              }`}
            >
              <div className={`transition-all duration-300 p-2.5 rounded-xl ${
                isActive 
                  ? "bg-[#003366] text-white shadow-lg shadow-blue-900/20 scale-110" 
                  : "bg-transparent active:scale-90"
              }`}>
                {icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${
                isActive ? "opacity-100" : "opacity-40"
              }`}>
                {label}
              </span>
            </button>
          );
        })}

        {/* BOTÓN DE PANEL */}
        <button
          onClick={() => router.push('/admin/puntos')}
          className={`flex flex-col items-center gap-1 group transition-all duration-300 min-w-[64px] ${
            pathname.includes('/admin') ? "text-[#003366]" : "text-slate-400"
          }`}
        >
          <div className={`transition-all duration-300 p-2.5 rounded-xl ${
            pathname.includes('/admin') 
              ? "bg-[#003366] text-white shadow-lg shadow-blue-900/20 scale-110" 
              : "bg-transparent active:scale-90"
          }`}>
            <Settings size={20} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-tighter ${
            pathname.includes('/admin') ? "opacity-100" : "opacity-40"
          }`}>
            Panel
          </span>
        </button>

      </div>
    </nav>
  );
}