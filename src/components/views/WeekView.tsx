// Vista de la Semana - Muestra la lectura de los 7 días de la semana actual
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LABELS } from "@/constants/app";

/**
 * Estructura de datos para cada día de la semana
 */
interface DiaSemana {
  diaNombre: string;
  numeroDia: number;
  libro: string;
  capitulo: number;
}

interface WeekViewProps {
  hoy: Date;
  semana: DiaSemana[];
  refDiaActual?: React.RefObject<HTMLDivElement | null>;
}

export default function WeekView({
  hoy,
  semana,
  refDiaActual,
}: WeekViewProps) {
  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      {/* Encabezado con título y fecha actual */}
      <div>
        <h2 className="text-2xl font-black text-slate-800">
          {LABELS.semanaActual}
        </h2>
        <p className="text-slate-500 text-sm">
          {format(hoy, "d 'de' MMMM 'de' yyyy", { locale: es })}
        </p>
      </div>

      {/* Lista de días de la semana */}
      <div className="space-y-3">
        {semana.map((dia, index) => (
          <DiaCard
            key={index}
            dia={dia}
            esHoy={dia.numeroDia === hoy.getDate()}
            ref={dia.numeroDia === hoy.getDate() ? refDiaActual : null}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Componente para mostrar un día individual de la semana
 * @param dia - Información del día (nombre, número, libro, capítulo)
 * @param esHoy - Booleano indicando si es el día actual
 */
interface DiaCardProps {
  dia: DiaSemana;
  esHoy: boolean;
}

const DiaCard = React.forwardRef<HTMLDivElement, DiaCardProps>(
  ({ dia, esHoy }, ref) => (
    <div
      ref={ref}
      className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
        esHoy
          ? "bg-teal-50 border-teal-500 ring-2 ring-teal-200 shadow-lg"
          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Información del Día */}
        <div className="flex-1">
          <p
            className={`font-bold uppercase tracking-wide text-xs mb-1 ${
              esHoy ? "text-teal-700" : "text-slate-500"
            }`}
          >
            {dia.diaNombre.slice(0, 3)} • {dia.numeroDia}
          </p>
          <p className="text-slate-800 font-bold text-lg">{dia.libro}</p>
          <p className="text-teal-600 font-semibold text-sm">
            {LABELS.capitulo} {dia.capitulo}
          </p>
        </div>

        {/* Badge de "HOY" */}
        {esHoy && (
          <div className="bg-teal-500 text-white px-4 py-2 rounded-full">
            <span className="text-xs font-bold">{LABELS.hoy}</span>
          </div>
        )}
      </div>
    </div>
  )
);

DiaCard.displayName = "DiaCard";
