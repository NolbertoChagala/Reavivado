import React from "react";
import { format, isSameMonth, isSameDay, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";

interface CalendarMonthGridProps {
  diasMes: Date[];
  inicioMes: Date;
  hoy: Date;
  diaSeleccionado: Date;
  lecturasCompletadas: Record<string, boolean>;
  onSeleccionarDia: (dia: Date) => void;
  onToggleLectura: (fechaKey: string) => void;
  onIrAInicio: (dia: Date) => void;
}

export default function CalendarMonthGrid({
  diasMes,
  inicioMes,
  hoy,
  diaSeleccionado,
  lecturasCompletadas,
  onSeleccionarDia,
  onToggleLectura,
  onIrAInicio,
}: CalendarMonthGridProps) {
  const lecturaDiaSeleccionado = obtenerLecturaPorFecha(diaSeleccionado);
  const esSabadoDiaSeleccionado = getDay(diaSeleccionado) === 6;
  const fechaKeySeleccionada = format(diaSeleccionado, "yyyy-MM-dd");
  const diaSeleccionadoLeido = !!lecturasCompletadas[fechaKeySeleccionada];

  return (
    <div>
      {/* ESCRITORIO */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-600 text-center">
          {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
            (diaNombre, idx) => (
              <div
                key={diaNombre}
                className={`py-3.5 ${idx === 6 ? "bg-amber-100/50 text-amber-900 font-bold" : ""}`}
              >
                {diaNombre}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200">
          {diasMes.map((dia) => {
            const esDiaDelMes = isSameMonth(dia, inicioMes);
            const esHoy = isSameDay(dia, hoy);
            const esSeleccionado = isSameDay(dia, diaSeleccionado);
            const esSabado = getDay(dia) === 6;
            const lectura = obtenerLecturaPorFecha(dia);
            const fKey = format(dia, "yyyy-MM-dd");
            const estaLeido = !!lecturasCompletadas[fKey];

            return (
              <button
                type="button"
                key={dia.toString()}
                onClick={() => onSeleccionarDia(dia)}
                className={`relative flex flex-col p-3.5 transition-all min-h-[115px] text-left w-full cursor-pointer ${
                  esDiaDelMes ? "bg-white hover:bg-slate-50/80" : "bg-slate-50/60 text-slate-300"
                } ${esHoy ? "bg-blue-50/40 font-bold" : ""} ${
                  esSeleccionado ? "ring-2 ring-[#0d2b56] ring-inset z-10 bg-amber-50/40" : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      esHoy
                        ? "h-5 w-5 rounded-full bg-[#0d2b56] text-white flex items-center justify-center text-[11px] font-black shadow-xs"
                        : esDiaDelMes
                        ? "text-slate-900"
                        : "text-slate-300"
                    }`}
                  >
                    {format(dia, "d")}
                  </span>

                  <div className="flex items-center gap-1">
                    {estaLeido && <CheckCircle2 size={13} className="text-emerald-600" />}
                    {esSabado && esDiaDelMes && (
                      <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-300/60 font-semibold px-1.5 py-0.5 rounded shadow-2xs">
                        Culto joven
                      </span>
                    )}
                  </div>
                </div>

                {esDiaDelMes && (
                  <div className="mt-2.5 space-y-0.5 min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate block font-serif">
                      {lectura.libro}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Capítulo {lectura.capitulo}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MÓVIL */}
      <div className="block md:hidden p-3.5 sm:p-4 space-y-3.5">
        <div className="grid grid-cols-7 border-b border-slate-100 pb-2 mb-1 text-center text-xs font-bold text-slate-400">
          {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
            <div key={idx} className={idx === 6 ? "text-amber-800 font-bold" : ""}>
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1.5 place-items-center">
          {diasMes.map((dia) => {
            const esDiaDelMes = isSameMonth(dia, inicioMes);
            const esHoy = isSameDay(dia, hoy);
            const esSeleccionado = isSameDay(dia, diaSeleccionado);
            const esSabado = getDay(dia) === 6;
            const fKey = format(dia, "yyyy-MM-dd");
            const estaLeido = !!lecturasCompletadas[fKey];

            if (!esDiaDelMes) {
              return <div key={dia.toString()} className="h-8 w-8 sm:h-9 sm:w-9" />;
            }

            return (
              <div key={dia.toString()} className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => onSeleccionarDia(dia)}
                  className={`relative h-8 w-8 sm:h-9 sm:w-9 rounded-full flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                    esHoy ? "bg-[#0d2b56] text-white shadow-xs font-black" : ""
                  } ${
                    esSeleccionado && !esHoy
                      ? "border-2 border-[#0d2b56] bg-amber-50 text-slate-900 font-bold"
                      : ""
                  } ${!esSeleccionado && !esHoy ? "text-slate-800 hover:bg-slate-100" : ""}`}
                >
                  <span>{format(dia, "d")}</span>
                  {estaLeido && !esHoy && (
                    <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                  {esSabado && (
                    <span
                      className={`absolute bottom-0.5 h-1.5 w-1.5 rounded-full ${
                        esHoy ? "bg-amber-300" : "bg-amber-500"
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Tarjeta del día seleccionado móvil */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:p-3.5 space-y-2.5 mt-2">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs font-bold text-slate-900 capitalize">
              {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
            </span>
            {esSabadoDiaSeleccionado && (
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-300/60">
                Culto joven 4:30 p. m.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <BookOpen size={18} className="text-[#0d2b56]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-slate-500 block">Lectura asignada</span>
              <p className="text-sm font-bold text-slate-900 font-serif truncate">
                {lecturaDiaSeleccionado.libro} capítulo {lecturaDiaSeleccionado.capitulo}
              </p>
            </div>
          </div>

          <div className="pt-1 flex gap-2">
            <button
              type="button"
              onClick={() => onToggleLectura(fechaKeySeleccionada)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                diaSeleccionadoLeido
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <CheckCircle2 size={13} className={diaSeleccionadoLeido ? "text-emerald-700" : "text-slate-400"} />
              <span>{diaSeleccionadoLeido ? "Leído" : "Marcar como leído"}</span>
            </button>

            <button
              type="button"
              onClick={() => onIrAInicio(diaSeleccionado)}
              className="py-2 px-3.5 bg-[#0d2b56] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
            >
              <span>Ver en inicio</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}