import React from "react";
import { Search } from "lucide-react";

export interface GrupoProcesado {
  nombre: string;
  lider: string;
  puntos: number;
  posicion: number;
  aciertos: number;
  diferenciaAdelante: number;
  nombreAdelante: string;
}

interface UnitsRankingTableProps {
  busqueda: string;
  onBusquedaChange: (val: string) => void;
  grupos: GrupoProcesado[];
}

export default function UnitsRankingTable({
  busqueda,
  onBusquedaChange,
  grupos,
}: UnitsRankingTableProps) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Clasificación general
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Puntaje acumulado por respuestas correctas en la conexión bíblica
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar unidad o líder..."
              value={busqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#0d2b56] focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {grupos.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="hidden md:grid grid-cols-12 items-center border-b border-slate-200 bg-slate-50 px-6 py-3.5 text-xs font-bold text-slate-600">
              <div className="col-span-1 text-center">Puesto</div>
              <div className="col-span-5">Unidad y líder</div>
              <div className="col-span-2 text-center">Preguntas acertadas</div>
              <div className="col-span-2 text-center">Diferencia al anterior</div>
              <div className="col-span-2 text-right">Puntos totales</div>
            </div>

            <div className="divide-y divide-slate-100">
              {grupos.map((grupo) => {
                const esPrimero = grupo.posicion === 1;

                return (
                  <div
                    key={grupo.nombre}
                    className="p-3.5 sm:p-4 md:px-6 md:py-4 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Vista móvil */}
                    <div className="flex md:hidden items-center justify-between gap-3 w-full">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border ${
                            esPrimero
                              ? "bg-amber-100 text-amber-900 border-amber-300 font-black shadow-2xs"
                              : grupo.posicion === 2
                              ? "bg-slate-100 text-slate-700 border-slate-300"
                              : grupo.posicion === 3
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-white text-slate-500 border-slate-200"
                          }`}
                        >
                          {grupo.posicion}°
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                            {grupo.nombre}
                          </h3>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Líder: <span className="text-slate-700">{grupo.lider}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-slate-900 tabular-nums block leading-tight">
                          {grupo.puntos.toLocaleString()} pts
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                          {grupo.aciertos} acertadas
                        </span>
                        {!esPrimero && (
                          <span className="text-[10px] font-bold text-red-600 block mt-0.5">
                            {grupo.diferenciaAdelante === 0
                              ? "Empatado"
                              : `-${grupo.diferenciaAdelante} pts`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Vista escritorio */}
                    <div className="hidden md:grid md:grid-cols-12 items-center">
                      <div className="md:col-span-1 flex items-center justify-center">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
                            esPrimero
                              ? "bg-amber-100 text-amber-900 border-amber-300 font-black"
                              : grupo.posicion === 2
                              ? "bg-slate-100 text-slate-700 border-slate-300"
                              : grupo.posicion === 3
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-white text-slate-500 border-slate-200"
                          }`}
                        >
                          {grupo.posicion}°
                        </div>
                      </div>

                      <div className="md:col-span-5">
                        <h3 className="text-sm font-bold text-slate-900">
                          {grupo.nombre}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Líder: <span className="text-slate-700">{grupo.lider}</span>
                        </p>
                      </div>

                      <div className="md:col-span-2 text-center text-xs">
                        <span className="font-semibold text-slate-800">
                          {grupo.aciertos} acertadas
                        </span>
                      </div>

                      <div className="md:col-span-2 text-center text-xs">
                        {esPrimero ? (
                          <span className="inline-block rounded-md bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                            Líder
                          </span>
                        ) : grupo.diferenciaAdelante === 0 ? (
                          <span className="inline-block rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            Empatado con {grupo.nombreAdelante}
                          </span>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-red-600 tabular-nums">
                              -{grupo.diferenciaAdelante} pts
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              de {grupo.nombreAdelante}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2 text-right">
                        <span className="text-lg font-black text-slate-900 tabular-nums">
                          {grupo.puntos.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
            No se encontraron unidades que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </section>
  );
}