"use client";

import React, { useMemo } from "react";
import { Trophy, User, ChevronRight, Activity } from "lucide-react";
import { RefObject } from "react";

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

export interface WeekViewProps {
  unidades: Unidad[]; 
  hoy?: Date;
  semana?: any[];
  refDiaActual?: RefObject<HTMLDivElement | null>;
}

export default function WeekView({ unidades = [] }: WeekViewProps) {
  const gruposProcesados = useMemo(() => {
    const ordenados = [...unidades].sort((a, b) => b.puntos - a.puntos);
    return ordenados.map((grupo, index) => {
      const diferencia =
        index === 0 ? 0 : ordenados[index - 1].puntos - grupo.puntos;
      return { ...grupo, diferencia, posicion: index + 1 };
    });
  }, [unidades]);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900">
      
      {/* HEADER */}
      <div className="w-full border-b-[8px] md:border-b-[12px] border-slate-900 py-12 md:py-20 bg-[#003366] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Trophy size={16} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Estadísticas de Unidades</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] text-white">
              Tabla de Posiciones
            </h1>
            <p className="text-lg md:text-xl font-light text-slate-200 italic">
              Villas Otoch 4 • Cancún
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        
        {/* SECCIÓN 1: DESEMPEÑO GENERAL */}
        <div className="space-y-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-[#003366]" />
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 italic">Desempeño General</h2>
            </div>
            <div className="h-1.5 w-full bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {gruposProcesados.length > 0 ? (
              gruposProcesados.map((grupo) => (
                <div
                  key={grupo.nombre}
                  className="flex items-center justify-between p-6 border border-slate-100 bg-slate-50/50 rounded-sm active:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-3xl font-black italic tabular-nums w-8 ${grupo.posicion === 1 ? "text-[#003366]" : "text-slate-200"}`}>
                      {grupo.posicion}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                        {grupo.nombre}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400">
                        <User size={12} strokeWidth={3} />
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{grupo.lider}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right border-l-2 border-slate-200 pl-8">
                    <span className="text-3xl font-black text-slate-900 tabular-nums leading-none">
                      {grupo.puntos.toLocaleString()}
                    </span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pts</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center border border-slate-100 italic text-slate-300 uppercase font-black tracking-widest">
                Sin datos registrados
              </div>
            )}
          </div>
        </div>

        {/* SECCIÓN 2: ANÁLISIS DE BRECHA (Ahora con el mismo diseño de tarjetas) */}
        <div className="space-y-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <ChevronRight size={20} className="text-[#003366]" />
              <h3 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 italic">Análisis de Brecha</h3>
            </div>
            <div className="h-1.5 w-full bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {gruposProcesados.map((grupo) => (
              <div
                key={`brecha-${grupo.nombre}`}
                className="flex items-center justify-between p-6 border border-slate-100 bg-white rounded-sm active:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-black italic text-lg ${grupo.posicion === 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>
                    #{grupo.posicion}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                      {grupo.nombre}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {grupo.posicion === 1 ? "Liderazgo actual" : "Unidad en persecución"}
                    </p>
                  </div>
                </div>

                <div className="text-right border-l-2 border-slate-200 pl-8 min-w-[120px]">
                  {grupo.posicion === 1 ? (
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-[#003366] uppercase italic">Victorioso</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end">
                      <span className="text-3xl font-black text-[#003366] tabular-nums leading-none">
                        -{grupo.diferencia.toLocaleString()}
                      </span>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-1">Diferencia</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-16 bg-slate-900 flex flex-col items-center gap-6 text-center px-6">
        <div className="h-1 w-12 bg-white/10" />
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.8em]">
          Ministerio Juvenil • Villas Otoch 4
        </p>
      </footer>
    </div>
  );
}