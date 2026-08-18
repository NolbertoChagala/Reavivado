"use client";

import React, { useMemo } from "react";
import { Trophy, User, Activity, Compass } from "lucide-react";

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

export interface WeekViewProps {
  unidades: Unidad[];
  hoy?: Date;
  semana?: any[];
  refDiaActual?: React.RefObject<HTMLDivElement | null>;
}

export default function WeekView({ unidades = [] }: WeekViewProps) {
  const gruposProcesados = useMemo(() => {
    const ordenados = [...unidades].sort((a, b) => b.puntos - a.puntos);
    return ordenados.map((grupo, index) => {
      const diferencia =
        index === 0 ? 0 : ordenados[index - 1].puntos - grupo.puntos;
      const diferenciaLider =
        index === 0 ? 0 : ordenados[0].puntos - grupo.puntos;
      const unidadAnterior =
        index === 0 ? "" : ordenados[index - 1].nombre;
      return { ...grupo, diferencia, diferenciaLider, posicion: index + 1, unidadAnterior };
    });
  }, [unidades]);

  return (
    <div className="space-y-8 w-full animate-in fade-in duration-300">

      {/* Resumen del Liderazgo */}
      <div className="p-4 md:p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-brand-primary">
            <Trophy size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Estado de Grupos Pequeños
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Tabla General de Puntos
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Puntuación acumulada de los grupos en base al cumplimiento de estudio y participación.
          </p>
        </div>

        {gruposProcesados.length > 0 && (
          <div className="flex items-center gap-3 bg-brand-primary text-white px-4 py-3 rounded-xl shrink-0 shadow-sm shadow-red-500/10 self-start sm:self-center">
            <Trophy className="text-brand-gold shrink-0" size={20} />
            <div>
              <span className="block text-[8px] font-bold text-red-200 uppercase tracking-wider leading-none">Líder Actual</span>
              <span className="text-sm font-black leading-none mt-1.5 block">
                {gruposProcesados[0].nombre}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* VISTA DE ESCRITORIO */}
      <div className="hidden md:block bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <div className="flex items-center gap-2 pb-5 border-b border-slate-100 mb-6">
          <Activity size={20} className="text-slate-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Clasificación General y Análisis de Brecha
          </h3>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2 w-24">Puesto</th>
              <th className="pb-3">Grupo Pequeño</th>
              <th className="pb-3 w-56">Diferencia al 1°</th>
              <th className="pb-3 w-56">Diferencia anterior</th>
              <th className="pb-3 pr-2 text-right w-44">Puntos Totales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {gruposProcesados.map((grupo) => (
              <tr key={grupo.nombre} className="hover:bg-slate-50/50 btn-transition">
                <td className="py-5 pl-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm border ${grupo.posicion === 1
                    ? "bg-amber-50 text-brand-gold border-amber-200 shadow-sm"
                    : grupo.posicion === 2
                      ? "bg-slate-55 text-slate-600 border-slate-200"
                      : grupo.posicion === 3
                        ? "bg-red-50/50 text-brand-primary border-red-100"
                        : "bg-white text-slate-400 border-slate-100"
                    }`}>
                    {grupo.posicion}
                  </div>
                </td>
                <td className="py-5">
                  <h4 className="text-base font-extrabold text-slate-900 leading-none">
                    {grupo.nombre}
                  </h4>
                  <span className="text-xs text-slate-400 block mt-1.5 font-medium">
                    Líder: {grupo.lider}
                  </span>
                </td>
                <td className="py-5 text-sm font-semibold">
                  {grupo.posicion === 1 ? (
                    <span className="text-[10px] bg-red-50 text-brand-primary border border-red-100 font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Líder
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1 text-red-500">
                      <span className="font-black text-base">-{grupo.diferenciaLider.toLocaleString()}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">pts</span>
                    </div>
                  )}
                </td>
                <td className="py-5 text-sm font-semibold">
                  {grupo.posicion === 1 || grupo.posicion === 2 ? (
                    <span className="text-xs text-slate-455 italic">--</span>
                  ) : (
                    <div className="flex items-baseline gap-1.5 text-slate-700">
                      <span className="font-extrabold text-base">-{grupo.diferencia.toLocaleString()}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">de {grupo.unidadAnterior}</span>
                    </div>
                  )}
                </td>
                <td className="py-5 pr-2 text-right">
                  <span className="text-lg font-black text-slate-900 tabular-nums">
                    {grupo.puntos.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">Puntos</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VISTA MÓVIL */}
      <div className="block md:hidden space-y-8">

        {/* COLUMNA 1: DESEMPEÑO GENERAL */}
        <div className="bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm overflow-hidden p-4">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Activity size={18} className="text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Clasificación General
            </h3>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {gruposProcesados.length > 0 ? (
              gruposProcesados.map((grupo) => (
                <div
                  key={grupo.nombre}
                  className="flex items-center justify-between py-4 hover:bg-slate-55/40 rounded-xl px-2 btn-transition"
                >
                  <div className="flex items-center gap-4">
                    {/* Badge de Posición */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border ${grupo.posicion === 1
                      ? "bg-amber-50 text-brand-gold border-amber-200 shadow-sm"
                      : grupo.posicion === 2
                        ? "bg-slate-55 text-slate-600 border-slate-200"
                        : grupo.posicion === 3
                          ? "bg-red-50/50 text-brand-primary border-red-100"
                          : "bg-white text-slate-400 border-slate-100"
                      }`}>
                      {grupo.posicion}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {grupo.nombre}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <User size={10} />
                        <span>Líder: {grupo.lider}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 tabular-nums leading-none">
                      {grupo.puntos.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mt-0.5">Puntos</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-xs text-slate-400 italic">
                Sin datos de unidades registrados
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA 2: DIFERENCIA DE PUNTOS */}
        <div className="bg-white border border-slate-200/60 border-t-4 border-t-brand-gold rounded-2xl shadow-sm overflow-hidden p-4">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Compass size={18} className="text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Análisis de Brecha (Diferencia)
            </h3>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {gruposProcesados.length > 0 ? (
              gruposProcesados.map((grupo) => (
                <div
                  key={`brecha-${grupo.nombre}`}
                  className="flex items-center justify-between py-4 hover:bg-slate-55/40 rounded-xl px-2 btn-transition"
                >
                  <div className="flex items-center gap-4">
                    {/* Badge de Posición idéntico al de la tabla general para alinear filas */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border ${grupo.posicion === 1
                      ? "bg-amber-50 text-brand-gold border-amber-200 shadow-sm"
                      : grupo.posicion === 2
                        ? "bg-slate-55 text-slate-600 border-slate-200"
                        : grupo.posicion === 3
                          ? "bg-red-50/50 text-brand-primary border-red-100"
                          : "bg-white text-slate-400 border-slate-100"
                      }`}>
                      {grupo.posicion}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {grupo.nombre}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <User size={10} />
                        <span>Líder: {grupo.lider}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {grupo.posicion === 1 ? (
                      <div className="flex flex-col items-end justify-center min-h-[32px]">
                        <span className="text-[9px] bg-red-50 text-brand-primary border border-red-100 font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          Líder
                        </span>
                      </div>
                    ) : grupo.posicion === 2 ? (
                      <div className="flex flex-col items-end justify-center min-h-[32px]">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs font-extrabold text-red-500 tabular-nums leading-none">
                            -{grupo.diferenciaLider.toLocaleString()}
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">
                            del 1°
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-1">
                        {/* Diferencia contra el líder principal (Arriba) */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs font-extrabold text-red-500 tabular-nums leading-none">
                            -{grupo.diferenciaLider.toLocaleString()}
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">
                            del 1°
                          </span>
                        </div>

                        {/* Línea divisora horizontal clara y visible */}
                        <div className="w-16 border-t border-slate-200 my-0.5" />

                        {/* Diferencia contra el puesto anterior (Abajo) */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs font-semibold text-slate-655 tabular-nums leading-none">
                            -{grupo.diferencia.toLocaleString()}
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none truncate max-w-[55px]">
                            {grupo.unidadAnterior}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-xs text-slate-400 italic">
                Sin datos disponibles
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}