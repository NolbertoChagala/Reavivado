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
import { ChevronLeft, ChevronRight, Download, Calendar as CalendarIcon, Info } from "lucide-react";
import { useState } from "react";
import { LABELS } from "@/constants/app";

export default function CalendarioMensual({ fecha }: { fecha: Date }) {
  const [mesActual, setMesActual] = useState(fecha);

  const inicioMes = startOfMonth(mesActual);
  const finMes = endOfMonth(mesActual);
  const semanaInicio = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(finMes, { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: semanaInicio, end: semanaFin });

  const hoy = new Date();

  return (
    <div className="space-y-6 w-full">
      
      {/* Selector de Mes & Controles Minimalistas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-brand-primary" size={20} />
          <div>
            <h2 className="text-base font-bold tracking-tight">Cronograma de Lecturas</h2>
            <p className="text-xs text-slate-400">Plan diario Reavivados por su Palabra.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMesActual(subMonths(mesActual, 1))}
            className="p-2 bg-white border border-slate-200/60 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 btn-transition active:scale-95 shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-bold uppercase tracking-wide min-w-[100px] text-center capitalize">
            {format(mesActual, "MMMM yyyy", { locale: es })}
          </span>
          <button
            onClick={() => setMesActual(addMonths(mesActual, 1))}
            className="p-2 bg-white border border-slate-200/60 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 btn-transition active:scale-95 shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Grid del Calendario Grid */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden w-full">
        
        {/* Encabezado de los Días de la Semana (Desktop) */}
        <div className="hidden md:grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((diaNombre) => (
            <div key={diaNombre} className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
              {diaNombre}
            </div>
          ))}
        </div>

        {/* Celdas del Calendario */}
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-px md:bg-slate-200/60">
          {dias.map((dia) => {
            const esDiaDelMes = isSameMonth(dia, inicioMes);
            const esHoy = isSameDay(dia, hoy);
            const lectura = obtenerLecturaPorFecha(dia);

            // En móvil, no mostrar días del mes anterior/siguiente para ahorrar espacio vertical
            if (!esDiaDelMes && typeof window !== "undefined" && window.innerWidth < 768) {
              return null;
            }

            return (
              <div
                key={dia.toString()}
                className={`
                  relative flex flex-row md:flex-col p-4 md:p-3 transition-all min-h-[70px] md:min-h-[110px]
                  ${esDiaDelMes ? "bg-white" : "bg-slate-50/40 text-slate-400"}
                  ${esHoy ? "bg-red-50/30 border-l-4 border-brand-primary md:border-l-0" : ""}
                  border-b md:border-b-0 border-slate-100
                `}
              >
                {/* Indicador de Fecha */}
                <div className="flex flex-col items-center justify-center md:items-start md:justify-between mr-4 md:mr-0 w-8 md:w-full shrink-0">
                  <span className={`text-base md:text-sm font-extrabold tabular-nums leading-none ${
                    esHoy ? "text-brand-primary font-black" : "text-slate-900"
                  }`}>
                    {format(dia, "d")}
                  </span>
                  
                  {/* Etiqueta Hoy / Nombre de Día Corto */}
                  {esHoy ? (
                    <span className="text-[8px] font-bold uppercase tracking-wider text-brand-primary mt-1">Hoy</span>
                  ) : (
                    <span className="text-[8px] font-semibold text-slate-400/80 uppercase mt-1 md:hidden">
                      {format(dia, "EEEE", { locale: es })}
                    </span>
                  )}
                </div>

                {/* Contenido de Lectura */}
                {esDiaDelMes && (
                  <div className="flex-1 flex flex-col justify-center mt-0 md:mt-2.5 min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate block">
                      {lectura.libro}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 leading-none">
                      {LABELS.capitulo} {lectura.capitulo}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Acciones de Calendario y Descarga */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info size={14} />
          <span>El plan se actualiza automáticamente cada día.</span>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 btn-transition active:scale-95 flex items-center justify-center gap-2 shadow-sm">
          <Download size={14} />
          Descargar Guía de Lectura
        </button>
      </div>

    </div>
  );
}