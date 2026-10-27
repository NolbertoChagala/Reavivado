import React from "react";
import { Calendar } from "lucide-react";

interface AdminWelcomeHeaderProps {
  adminName?: string;
}

export default function AdminWelcomeHeader({ adminName }: AdminWelcomeHeaderProps) {
  const fechaHoy = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const fechaCapitalizada = fechaHoy.charAt(0).toUpperCase() + fechaHoy.slice(1);

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Panel Central · Sociedad JA
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sistema activo
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#0d2b56] tracking-tight">
            ¡Bienvenido al Panel de Control{adminName ? `, ${adminName}` : ""}! 👋
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Supervisa las métricas globales del ministerio juvenil, consulta el balance de méritos y administra los accesos oficiales del sistema.
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 rounded-lg self-start sm:self-center shrink-0">
          <Calendar size={15} className="text-[#0d2b56] shrink-0" />
          <span>{fechaCapitalizada}</span>
        </div>
      </div>
    </div>
  );
}