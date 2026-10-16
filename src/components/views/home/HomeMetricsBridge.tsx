import React from "react";

const CULTO_JOVEN = "4:30 – 6:20 p. m.";

export default function HomeMetricsBridge() {
  return (
    <div className="relative -mt-10 sm:-mt-14 md:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 z-20">
      <div className="rounded-2xl border border-slate-300 bg-white shadow-xl p-2 sm:p-4">
        <dl className="grid grid-cols-1 md:grid-cols-3 divide-y divide-slate-300 md:divide-y-0 md:divide-x">
          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Programa general JA</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">{CULTO_JOVEN}</dd>
            <dd className="text-xs text-slate-500 font-medium mt-1">Culto joven sabatino</dd>
          </div>

          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Meta diaria</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">
              1 capítulo al día
            </dd>
            <dd className="text-xs text-amber-700 font-semibold mt-1">Reavivados por su palabra</dd>
          </div>

          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Ciclo de preparación</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">Domingo a sábado</dd>
            <dd className="text-xs text-slate-500 font-medium mt-1">Preparación continua</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}