import React from "react";

interface GrupoLider {
  nombre: string;
  puntos: number;
}

interface UnitsMetricsBridgeProps {
  liderActual?: GrupoLider;
  totalUnidades: number;
  puntosTotales: number;
}

export default function UnitsMetricsBridge({
  liderActual,
  totalUnidades,
  puntosTotales,
}: UnitsMetricsBridgeProps) {
  return (
    <div className="relative -mt-10 sm:-mt-14 md:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 z-20">
      <div className="rounded-2xl border border-slate-300 bg-white shadow-xl p-2 sm:p-4">
        <dl className="grid grid-cols-1 md:grid-cols-3 divide-y divide-slate-300 md:divide-y-0 md:divide-x">
          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Unidad líder actual</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">
              {liderActual ? liderActual.nombre : "Sin registrar"}
            </dd>
            <dd className="text-xs text-amber-700 font-semibold mt-1">
              {liderActual ? `${liderActual.puntos.toLocaleString()} pts` : "0 pts"}
            </dd>
          </div>

          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">En competencia</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">
              {totalUnidades} unidades
            </dd>
            <dd className="text-xs text-slate-500 font-medium mt-1">Grupos activos en Villas Otoch</dd>
          </div>

          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Puntuación acumulada</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">
              {puntosTotales.toLocaleString()} pts
            </dd>
            <dd className="text-xs text-[#b71c1c] font-semibold mt-1">Acumulados en culto joven</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}