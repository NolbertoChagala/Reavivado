import React from "react";

export default function CalendarMetricsBridge() {
  return (
    <div className="relative -mt-10 sm:-mt-14 md:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 z-20">
      <div className="rounded-2xl border border-slate-300 bg-white shadow-xl p-2 sm:p-4">
        <dl className="grid grid-cols-1 md:grid-cols-3 divide-y divide-slate-300 md:divide-y-0 md:divide-x">
          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Cita bíblica diaria</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">Capítulo del día</dd>
            <dd className="text-xs text-slate-500 font-medium mt-1">Revisa qué lectura corresponde a cada fecha</dd>
          </div>

          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Meta de estudio</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">1 capítulo diario</dd>
            <dd className="text-xs text-amber-700 font-semibold mt-1">Lectura individual y preparación</dd>
          </div>

          <div className="p-3 sm:p-5 text-center">
            <dt className="text-xs font-semibold text-slate-500">Programa sabatino</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-[#0d2b56]">4:30 – 6:20 p. m.</dd>
            <dd className="text-xs text-slate-500 font-medium mt-1">Preguntas dentro del culto joven</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}