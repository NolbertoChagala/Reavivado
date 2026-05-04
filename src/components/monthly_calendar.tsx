"use client";

import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { LABELS } from "@/constants/app";
import CultoJoven from "@/assets/img/CultoJoven.webp";

export default function CalendarioMensual({ fecha }: { fecha: Date }) {
  const [mesActual, setMesActual] = useState(fecha);

  const inicioMes = startOfMonth(mesActual);
  const finMes = endOfMonth(mesActual);
  const semanaInicio = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(finMes, { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: semanaInicio, end: semanaFin });

  const hoy = new Date();

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900">
      
      {/* HEADER INSTITUCIONAL */}
      <header className="w-full border-b-[8px] md:border-b-[12px] border-slate-900 py-10 md:py-16 bg-[#003366] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border-4 border-white/10">
              <Image
                src={CultoJoven}
                alt="Logo JA"
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300">
                <CalendarIcon size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Plan de Lectura 2026</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-white">
                Reavivados
              </h1>
              <p className="text-sm md:text-lg font-light text-slate-200 italic">
                Sociedad de Jóvenes • Villas Otoch 4
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-10">
        
        {/* SELECTOR DE MES */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-4 order-2 md:order-1">
            <button
              onClick={() => setMesActual(subMonths(mesActual, 1))}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 min-w-[150px] text-center">
              {format(mesActual, "MMMM", { locale: es })}
            </h2>
            <button
              onClick={() => setMesActual(addMonths(mesActual, 1))}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* CALENDARIO / AGENDA */}
        <div className="bg-white md:rounded-3xl md:border md:border-slate-200 md:shadow-xl md:overflow-hidden">
          
          {/* Header Días PC */}
          <div className="hidden md:grid grid-cols-7 bg-slate-900 text-white border-b border-slate-800">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
              <div key={d} className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center opacity-60">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-px md:bg-slate-200">
            {dias.map((dia) => {
              const esDiaDelMes = isSameMonth(dia, inicioMes);
              const esHoy = isSameDay(dia, hoy);
              const lectura = obtenerLecturaPorFecha(dia);

              if (!esDiaDelMes && typeof window !== "undefined" && window.innerWidth < 768) return null;

              return (
                <div
                  key={dia.toString()}
                  className={`
                    relative flex flex-row md:flex-col min-h-0 md:min-h-[140px] p-5 md:p-4 transition-all
                    ${esDiaDelMes ? "bg-white" : "bg-slate-50 md:opacity-40"}
                    ${esHoy ? "border-l-[6px] border-[#003366] md:border-l-0 md:bg-blue-50/40" : ""}
                    border-b md:border-b-0 border-slate-100
                  `}
                >
                  {/* Fecha y Indicador de HOY */}
                  <div className="flex flex-col items-center justify-center md:items-start md:justify-between mb-0 md:mb-4 mr-6 md:mr-0 w-12 md:w-full border-r md:border-r-0 border-slate-100 pr-4 md:pr-0">
                    <span className={`text-2xl md:text-xl font-black italic tabular-nums leading-none ${esHoy ? "text-[#003366]" : "text-slate-900"}`}>
                      {format(dia, "d")}
                    </span>
                    {esHoy ? (
                      <span className="text-[9px] font-black uppercase tracking-tighter text-[#003366] mt-1 italic">Hoy</span>
                    ) : (
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mt-1">
                        {format(dia, "EEE", { locale: es })}
                      </span>
                    )}
                  </div>

                  {/* Contenido Lectura (Limpio) */}
                  {esDiaDelMes && (
                    <div className="flex-1 flex flex-col justify-center space-y-1">
                      <p className="text-base md:text-sm font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                        {lectura.libro}
                      </p>
                      <p className="text-xs md:text-[11px] font-bold text-[#003366] opacity-70">
                        {LABELS.capitulo} {lectura.capitulo}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ACCIONES FOOTER */}
        <div className="flex flex-col items-center gap-6 pt-10 border-t border-slate-100">
          <button className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#003366] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
            <Download size={16} />
            Descargar Guía
          </button>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] text-center">
            Ministerio Juvenil • Cancún
          </p>
        </div>
      </main>
    </div>
  );
}