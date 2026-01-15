// src/components/CalendarioMensual.tsx
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
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LABELS } from "@/constants/app";

export default function CalendarioMensual({ fecha, onVerDia }: { fecha: Date; onVerDia?: () => void }) {
  const [mesActual, setMesActual] = useState(fecha);

  const inicio = startOfMonth(mesActual);
  const fin = endOfMonth(mesActual);
  const semanaInicio = startOfWeek(inicio, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(fin, { weekStartsOn: 0 });

  const dias = eachDayOfInterval({ start: semanaInicio, end: semanaFin });
  const semanas: Date[][] = [];

  // Agrupar días por semanas
  for (let i = 0; i < dias.length; i += 7) {
    semanas.push(dias.slice(i, i + 7));
  }

  const irAlMesAnterior = () => setMesActual(subMonths(mesActual, 1));
  const irAlProximoMes = () => setMesActual(addMonths(mesActual, 1));

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      {/* Header con mes y año + Navegación */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 md:p-8">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <button
            onClick={irAlMesAnterior}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Mes anterior"
            title="Mes anterior"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <div className="text-center flex-1">
            <h2 className="text-white font-black text-lg md:text-4xl tracking-wider">
              {format(inicio, "MMMM", { locale: es }).toUpperCase()}
            </h2>
            <p className="text-slate-400 font-semibold text-xs md:text-base">
              {format(inicio, "yyyy")}
            </p>
          </div>

          <button
            onClick={irAlProximoMes}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Próximo mes"
            title="Próximo mes"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Contenedor responsivo */}
      <div className="p-2 md:p-6">
        {/* Vista móvil: Lista de días */}
        <div className="md:hidden space-y-2">
          {dias.map((dia) => {
            const esDiaDelMes = dia.getMonth() === inicio.getMonth();
            const esHoy = dia.toDateString() === new Date().toDateString();

            if (!esDiaDelMes) return null;

            const lectura = obtenerLecturaPorFecha(dia);

            return (
              <div
                key={dia.toString()}
                className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                  esHoy
                    ? "bg-teal-50 border-teal-500 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {format(dia, "EEEE", { locale: es })} {format(dia, "d")}
                  </span>
                  <div>
                    <span className="text-slate-800 font-bold text-sm block">
                      {lectura.libro}
                    </span>
                    <span className="text-teal-600 font-semibold text-xs">
                      {LABELS.capitulo} {lectura.capitulo}
                    </span>
                  </div>
                </div>
                {esHoy && (
                  <span className="text-xs font-bold text-white px-3 py-1 bg-teal-500 rounded-full">
                    {LABELS.hoy}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Vista desktop: Grilla */}
        <div className="hidden md:block">
          {semanas.map((semana, semanaIdx) => (
            <div key={semanaIdx} className="mb-4">
              {/* Headers de días solo en la primera semana */}
              {semanaIdx === 0 && (
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
                    (d) => (
                      <div
                        key={d}
                        className="text-center font-bold text-slate-600 text-sm py-2 border-b-2 border-slate-200"
                      >
                        {d.slice(0, 3)}
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Fila de días */}
              <div className="grid grid-cols-7 gap-2">
                {semana.map((dia) => {
                  const esDiaDelMes = dia.getMonth() === inicio.getMonth();
                  const esHoy = dia.toDateString() === new Date().toDateString();

                  if (!esDiaDelMes) {
                    return (
                      <div
                        key={dia.toString()}
                        className="bg-slate-50 rounded-xl min-h-[130px]"
                      ></div>
                    );
                  }

                  const lectura = obtenerLecturaPorFecha(dia);

                  return (
                    <div
                      key={dia.toString()}
                      className={`border-2 p-4 rounded-xl flex flex-col justify-between min-h-[130px] transition-all ${
                        esHoy
                          ? "bg-teal-50 border-teal-500 shadow-md"
                          : "bg-white border-slate-200 hover:shadow-md hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-600 block">
                          {format(dia, "d")}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-slate-800 font-bold text-sm">{lectura.libro}</p>
                        <p className="text-teal-600 font-semibold text-sm">
                          {LABELS.capitulo} {lectura.capitulo}
                        </p>
                      </div>

                      {esHoy && (
                        <span className="text-xs font-bold text-white px-2 py-1 bg-teal-500 rounded-full text-center">
                          {LABELS.hoy}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón "Ver día" solo en móvil */}
      {onVerDia && (
        <div className="md:hidden p-4 border-t border-slate-200">
          <button
            onClick={onVerDia}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Ver día actual
          </button>
        </div>
      )}
    </div>
  );
}