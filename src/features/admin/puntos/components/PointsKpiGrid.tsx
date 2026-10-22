import React from "react";
import { TrendingUp, Users } from "lucide-react";

interface PointsKpiGridProps {
  totalPuntos: number;
  totalUnidades: number;
}

export default function PointsKpiGrid({ totalPuntos, totalUnidades }: PointsKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500">Puntos Totales Repartidos</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tabular-nums">
              {totalPuntos.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-400">pts acumulados</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#0d2b56]/10 text-[#0d2b56] border border-[#0d2b56]/15 shrink-0">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500">Unidades en Competencia</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2b56] tabular-nums">
              {totalUnidades}
            </span>
            <span className="text-xs font-semibold text-slate-400">grupos registrados</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
          <Users size={20} />
        </div>
      </div>
    </div>
  );
}