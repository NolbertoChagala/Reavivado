"use client";

import React, { useMemo } from "react";
import { Trophy, User, Activity, AlertCircle, Compass } from "lucide-react";

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
      return { ...grupo, diferencia, diferenciaLider, posicion: index + 1 };
    });
  }, [unidades]);

  return (
    <div className="space-y-8 w-full">
      
      {/* Resumen del Liderazgo */}
      <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-brand-primary">
            <Trophy size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Estado de Unidades
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Tabla General de Puntos
          </h2>
          <p className="text-xs text-slate-400">
            Puntuación acumulada de las unidades en base al cumplimiento de lecturas y participación.
          </p>
        </div>

        {gruposProcesados.length > 0 && (
          <div className="flex items-center gap-3 bg-brand-primary text-white px-4 py-3 rounded-xl shrink-0 shadow-sm shadow-red-500/10">
            <Trophy className="text-white shrink-0" size={20} />
            <div>
              <span className="block text-[8px] font-bold text-red-200 uppercase tracking-wider leading-none">Líder Actual</span>
              <span className="text-sm font-black leading-none mt-1.5 block">
                {gruposProcesados[0].nombre}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Grid del Dashboard (2 Columnas en desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* COLUMNA 1: DESEMPEÑO GENERAL */}
        <div className="bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Activity size={18} className="text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Clasificación General
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {gruposProcesados.length > 0 ? (
              gruposProcesados.map((grupo) => (
                <div
                  key={grupo.nombre}
                  className="flex items-center justify-between p-5 hover:bg-slate-50/40 btn-transition"
                >
                  <div className="flex items-center gap-4">
                    {/* Badge de Posición */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border ${
                      grupo.posicion === 1
                        ? "bg-red-50 text-brand-primary border-red-100"
                        : grupo.posicion === 2
                        ? "bg-slate-50 text-slate-600 border-slate-100"
                        : "bg-white text-slate-400 border-slate-100"
                    }`}>
                      {grupo.posicion}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-slate-900">
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
        <div className="bg-white border border-slate-200/60 border-t-4 border-t-brand-gold rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Compass size={18} className="text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Análisis de Brecha (Diferencia)
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {gruposProcesados.length > 0 ? (
              gruposProcesados.map((grupo) => (
                <div
                  key={`brecha-${grupo.nombre}`}
                  className="flex items-center justify-between p-5 hover:bg-slate-50/40 btn-transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-8">
                      #{grupo.posicion}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {grupo.nombre}
                    </span>
                  </div>

                  <div className="text-right">
                    {grupo.posicion === 1 ? (
                      <span className="text-[10px] bg-red-50 text-brand-primary border border-red-100 font-bold px-2 py-0.5 rounded">
                        Líder del Tablero
                      </span>
                    ) : (
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-red-500 tabular-nums">
                          -{grupo.diferenciaLider.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter mt-0.5">
                          Para alcanzar al líder
                        </span>
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