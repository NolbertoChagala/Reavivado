// Componente NavigationBar - Barra de navegación inferior
import { BookOpen, List, Calendar } from "lucide-react";
import { NAVIGATION_TABS } from "@/constants/app";

type Vista = "dia" | "semana" | "mes";

interface NavigationBarProps {
  vistaActual: Vista;
  onChangeVista: (vista: Vista) => void;
}

export default function NavigationBar({
  vistaActual,
  onChangeVista,
}: NavigationBarProps) {
  const navItems: Array<{
    id: Vista;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "dia",
      label: NAVIGATION_TABS.dia,
      icon: <BookOpen size={24} />,
    },
    {
      id: "semana",
      label: NAVIGATION_TABS.semana,
      icon: <List size={24} />,
    },
    {
      id: "mes",
      label: NAVIGATION_TABS.mes,
      icon: <Calendar size={24} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl">
      <div className="max-w-4xl mx-auto flex justify-around px-4 py-3">
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onChangeVista(id)}
            className={`flex flex-col items-center gap-2 px-6 py-2 rounded-xl transition-all duration-200 ${
              vistaActual === id
                ? "bg-teal-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label={`Ver ${label}`}
            aria-pressed={vistaActual === id}
          >
            {icon}
            <span className="text-xs font-bold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
