"use client";

import React from "react";
import { Search, X, Plus, Minus, Pencil } from "lucide-react";
import type { Unidad, TipoOperacionPuntos } from "@/types/models";

interface PointsTableProps {
  unidades: Unidad[];
  posiciones: Map<string, number>;
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  onAbrirModal: (unidad: Unidad, tipo: TipoOperacionPuntos) => void;
}

export default function PointsTable({
  unidades,
  posiciones,
  busqueda,
  onBusquedaChange,
  onAbrirModal,
}: PointsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Listado de Unidades</span>
          <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
            {unidades.length} {unidades.length === 1 ? "grupo" : "grupos"}
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar unidad o líder..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-7 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d2b56] transition-colors"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => onBusquedaChange("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 w-14 text-center">#</th>
              <th className="py-3 px-4">Unidad y Líder</th>
              <th className="py-3 px-4 text-center w-36">Puntos Actuales</th>
              <th className="py-3 px-4 text-right pr-6 w-44">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {unidades.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  No se encontraron unidades con esa búsqueda.
                </td>
              </tr>
            ) : (
              unidades.map((unidad) => {
                const pos = posiciones.get(unidad.id) ?? 0;
                const esPrimero = pos === 1;

                return (
                  <tr key={unidad.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`w-6 h-6 rounded-md inline-flex items-center justify-center font-bold text-xs ${
                          esPrimero
                            ? "bg-amber-100 text-amber-900 font-black"
                            : "text-slate-500 font-semibold bg-slate-100"
                        }`}
                      >
                        {pos}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {unidad.nombreGrupo}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          Líder: {unidad.lider}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-extrabold text-[#0d2b56] text-sm sm:text-base tabular-nums block">
                        {unidad.puntos.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 block leading-none font-medium">
                        pts
                      </span>
                    </td>

                    <td className="py-3.5 px-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onAbrirModal(unidad, "sumar")}
                          className="w-8 h-8 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                          title={`Sumar puntos a ${unidad.nombreGrupo}`}
                          aria-label={`Sumar puntos a ${unidad.nombreGrupo}`}
                        >
                          <Plus size={16} strokeWidth={2.8} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onAbrirModal(unidad, "restar")}
                          className="w-8 h-8 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                          title={`Descontar puntos a ${unidad.nombreGrupo}`}
                          aria-label={`Descontar puntos a ${unidad.nombreGrupo}`}
                        >
                          <Minus size={16} strokeWidth={2.8} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onAbrirModal(unidad, "fijar")}
                          className="w-8 h-8 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                          title={`Editar total de puntos de ${unidad.nombreGrupo}`}
                          aria-label={`Editar total de puntos de ${unidad.nombreGrupo}`}
                        >
                          <Pencil size={14} strokeWidth={2.2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}