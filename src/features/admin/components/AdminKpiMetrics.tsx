import React from "react";
import { TrendingUp, Crown, Users, Shield } from "lucide-react";

interface UnidadLider {
  nombreGrupo: string;
  lider: string;
  puntos: number;
}

interface AdminKpiMetricsProps {
  totalPuntos: number;
  promedioPuntos: number;
  totalUnidades: number;
  totalUsuarios: number;
  lider?: UnidadLider;
}

export default function AdminKpiMetrics({
  totalPuntos,
  promedioPuntos,
  totalUnidades,
  totalUsuarios,
  lider,
}: AdminKpiMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* Puntos Globales */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Puntos Globales</span>
          <span className="text-[10px] font-bold bg-[#0d2b56]/10 text-[#0d2b56] px-2 py-0.5 rounded-md border border-[#0d2b56]/15">
            Oficial
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tracking-tight tabular-nums block">
              {totalPuntos.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Puntos acumulados
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-[#0d2b56]/10 text-[#0d2b56] border border-[#0d2b56]/15 shadow-2xs">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[#0d2b56] font-bold flex items-center gap-1">
            ↑ Promedio
          </span>
          <span className="text-slate-500 font-medium">
            {promedioPuntos.toLocaleString()} pts / unidad
          </span>
        </div>
      </div>

      {/* Unidad 1° Lugar */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Unidad en 1° Lugar</span>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
            1° Puesto
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="min-w-0 pr-2">
            <span className="text-xl sm:text-2xl font-extrabold text-amber-900 tracking-tight truncate block">
              {lider?.nombreGrupo ?? "Sin datos"}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 truncate block">
              Líder: {lider?.lider ?? "—"}
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs">
            <Crown size={20} className="text-amber-500" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-amber-600 font-bold flex items-center gap-1">
            Puntaje líder
          </span>
          <span className="text-slate-600 font-semibold truncate">
            {lider ? `${lider.puntos.toLocaleString()} pts` : "—"}
          </span>
        </div>
      </div>

      {/* Unidades Activas */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Unidades Juveniles</span>
          <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
            Activas
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tracking-tight tabular-nums block">
              {totalUnidades}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Grupos en competencia
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-sky-50 text-sky-700 border border-sky-100 shadow-2xs">
            <Users size={20} />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-sky-700 font-bold flex items-center gap-1">
            Participación
          </span>
          <span className="text-slate-500 font-medium">
            Padrón completo
          </span>
        </div>
      </div>

      {/* Administradores */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Operadores del Panel</span>
          <span className="text-[10px] font-bold bg-rose-50 text-[#b71c1c] px-2 py-0.5 rounded-md border border-rose-100">
            Seguridad
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tracking-tight tabular-nums block">
              {totalUsuarios || 1}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Cuentas activas
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-rose-50 text-[#b71c1c] border border-rose-100 shadow-2xs">
            <Shield size={20} />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[#b71c1c] font-bold flex items-center gap-1">
            Acceso verificado
          </span>
          <span className="text-slate-500 font-medium">
            Roles asignados
          </span>
        </div>
      </div>
    </div>
  );
}