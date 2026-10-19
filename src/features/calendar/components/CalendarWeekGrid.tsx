import React from "react";
import { format, isSameDay, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";
import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";

interface CalendarWeekGridProps {
  diasSemana: Date[];
  hoy: Date;
  diaSeleccionado: Date;
  lecturasCompletadas: Record<string, boolean>;
  onToggleLectura: (fechaKey: string) => void;
}

export default function CalendarWeekGrid({
  diasSemana,
  hoy,
  diaSeleccionado,
  lecturasCompletadas,
  onToggleLectura,
}: CalendarWeekGridProps) {
  return (
    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-7 gap-3">
      {diasSemana.map((dia) => {
        const esHoy = isSameDay(dia, hoy);
        const esSeleccionado = isSameDay(dia, diaSeleccionado);
        const esSabado = getDay(dia) === 6;
        const lectura = obtenerLecturaPorFecha(dia);
        const fKey = format(dia, "yyyy-MM-dd");
        const estaLeido = !!lecturasCompletadas[fKey];

        return (
          <div
            key={dia.toString()}
            className={`rounded-xl border p-3.5 text-left flex flex-col justify-between min-h-[140px] transition-all ${
              esHoy
                ? "border-[#0d2b56] border-2 bg-blue-50/20 shadow-xs"
                : esSeleccionado
                ? "border-amber-400 border-2 bg-amber-50/30"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 capitalize block">
                    {format(dia, "EEEE", { locale: es }).substring(0, 3)}
                  </span>
                  <span className="text-sm font-black text-slate-900 tabular-nums">
                    {format(dia, "d")}
                  </span>
                </div>
                {esSabado ? (
                  <span className="text-[9px] bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.5 rounded">
                    Culto joven
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400">
                    Estudio
                  </span>
                )}
              </div>

              <div className="mt-2 space-y-0.5">
                <span className="text-xs font-bold text-slate-800 block truncate font-serif">
                  {lectura.libro}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Capítulo {lectura.capitulo}
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onToggleLectura(fKey)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-all ${
                  estaLeido
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <CheckCircle2 size={11} className={estaLeido ? "text-emerald-700" : "text-slate-400"} />
                <span>{estaLeido ? "Leído" : "Check"}</span>
              </button>

              {esHoy && (
                <span className="rounded-md bg-[#0d2b56] px-1.5 py-0.5 text-[9px] font-bold text-white">
                  Hoy
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}