import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface CalendarControlsProps {
  tipoVista: "mes" | "semana";
  onTipoVistaChange: (vista: "mes" | "semana") => void;
  fechaFoco: Date;
  inicioSemana: Date;
  onAnterior: () => void;
  onSiguiente: () => void;
  onHoy: () => void;
  onDescargarFlyer: () => void;
  descargando: boolean;
}

export default function CalendarControls({
  tipoVista,
  onTipoVistaChange,
  fechaFoco,
  inicioSemana,
  onAnterior,
  onSiguiente,
  onHoy,
  onDescargarFlyer,
  descargando,
}: CalendarControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
      <div className="flex w-full sm:w-auto bg-slate-100 p-1 rounded-xl border border-slate-200/60">
        <button
          type="button"
          onClick={() => onTipoVistaChange("mes")}
          className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            tipoVista === "mes"
              ? "bg-[#0d2b56] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Vista mensual
        </button>
        <button
          type="button"
          onClick={() => onTipoVistaChange("semana")}
          className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            tipoVista === "semana"
              ? "bg-[#0d2b56] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Vista semanal
        </button>
      </div>

      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1 sm:gap-2">
        <button
          type="button"
          onClick={onAnterior}
          className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-xs cursor-pointer"
          aria-label="Anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          onClick={onHoy}
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl hover:bg-slate-100 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          Hoy
        </button>

        <span className="flex-1 sm:flex-none sm:min-w-[150px] text-center font-bold capitalize text-slate-900 text-xs sm:text-sm px-1 truncate">
          {tipoVista === "mes"
            ? format(fechaFoco, "MMMM yyyy", { locale: es })
            : `Semana ${format(inicioSemana, "d MMM", { locale: es })}`}
        </span>

        <button
          type="button"
          onClick={onSiguiente}
          className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-xs cursor-pointer"
          aria-label="Siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <button
        type="button"
        onClick={onDescargarFlyer}
        disabled={descargando}
        className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
      >
        <Download size={14} className="text-slate-500" />
        <span>{descargando ? "Generando..." : "Descargar flyer"}</span>
      </button>
    </div>
  );
}