import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Unidad } from "@/types";

interface AdminBarChartProps {
  unidadesOrdenadas: Unidad[];
  chartMax: number;
  chartSteps: number[];
}

export default function AdminBarChart({
  unidadesOrdenadas,
  chartMax,
  chartSteps,
}: AdminBarChartProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0d2b56]">
            Resumen de Puntuación JA
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Comparativa de méritos acumulados entre las unidades en competencia.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>1° Lugar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d2b56]" />
            <span>Unidades JA</span>
          </div>
        </div>
      </div>

      {/* Gráfico de Columnas Verticales */}
      <div className="relative pt-6 pb-2">
        <div className="flex items-end gap-3 sm:gap-6 h-64 w-full pr-12 pl-2">
          {unidadesOrdenadas.map((u, i) => {
            const alturaPorcentaje = Math.round((u.puntos / chartMax) * 100);
            const pos = i + 1;
            const esLider = pos === 1;

            return (
              <div key={u.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className="text-[11px] font-bold text-slate-700 tabular-nums mb-1.5 group-hover:text-[#0d2b56] transition-colors">
                  {u.puntos.toLocaleString()}
                </span>

                <div className="w-full max-w-[48px] bg-slate-100 rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-700 ${
                      esLider
                        ? "bg-gradient-to-t from-[#c5a059] to-[#d4af37]"
                        : "bg-gradient-to-t from-[#0d2b56] to-[#0284c7]"
                    }`}
                    style={{ height: `${Math.max(6, alturaPorcentaje)}%` }}
                  />
                </div>

                <span className="text-xs font-semibold text-slate-700 truncate w-full text-center mt-3">
                  {u.nombreGrupo}
                </span>
              </div>
            );
          })}
        </div>

        {/* Escala Y */}
        <div className="absolute right-0 inset-y-6 flex flex-col justify-between items-end text-[10px] font-semibold text-slate-400 pointer-events-none pr-1">
          {chartSteps.map((s) => (
            <span key={s}>{s >= 1000 ? `${(s / 1000).toFixed(1)}k` : s}</span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>{unidadesOrdenadas.length} unidades registradas</span>
        <Link
          href="/admin/puntos"
          className="font-bold text-[#0d2b56] hover:text-blue-900 flex items-center gap-1 transition-colors"
        >
          <span>Ir al gestor de puntos</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}