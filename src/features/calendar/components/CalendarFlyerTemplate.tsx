import React from "react";
import Image from "next/image";
import { format, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";
import { LABELS } from "@/constants/app";
import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

interface CalendarFlyerTemplateProps {
  fechaFoco: Date;
  inicioMes: Date;
  diasMes: Date[];
}

export default function CalendarFlyerTemplate({
  fechaFoco,
  inicioMes,
  diasMes,
}: CalendarFlyerTemplateProps) {
  return (
    <div
      style={{ position: "absolute", top: "-9999px", left: "-9999px", width: "1050px" }}
      aria-hidden="true"
    >
      <div
        id="calendario-flyer-descargable"
        className="w-[1024px] bg-white p-8 space-y-6 flex flex-col border border-slate-100 font-sans"
      >
        <div className="bg-[#0a1931] p-8 rounded-3xl text-white flex justify-between items-center shadow-md gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={logoadventista}
              alt="Iglesia Adventista"
              width={64}
              height={64}
              className="w-16 h-16 object-contain shrink-0"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold tracking-tight">
                Reavivados por su palabra
              </h1>
              <p className="text-xs text-amber-300 mt-1 font-semibold">
                Sociedad JA · Villas Otoch 4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div className="flex flex-col justify-center">
              <span className="text-xs font-medium text-white/80 block">
                Plan de lectura
              </span>
              <span className="text-xl font-bold capitalize mt-1 block">
                {format(fechaFoco, "MMMM yyyy", { locale: es })}
              </span>
            </div>
            <Image
              src={JA}
              alt="Logo JA"
              width={64}
              height={64}
              className="w-16 h-16 object-contain shrink-0"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
            {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
              (diaNombre) => (
                <div
                  key={diaNombre}
                  className="py-3 text-xs font-bold text-slate-600 text-center"
                >
                  {diaNombre}
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-200">
            {diasMes.map((dia) => {
              const esDiaDelMes = isSameMonth(dia, inicioMes);
              const lectura = obtenerLecturaPorFecha(dia);

              return (
                <div
                  key={dia.toString()}
                  className={`relative flex flex-col p-3 min-h-[145px] text-center bg-white justify-center items-center border border-slate-50 ${
                    esDiaDelMes ? "" : "bg-slate-50/40 opacity-30"
                  }`}
                >
                  {esDiaDelMes ? (
                    <div className="flex flex-col items-center justify-center space-y-2 w-full">
                      <span className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                        {format(dia, "d")}
                      </span>
                      <div className="w-8 h-0.5 bg-slate-400 rounded" />
                      <div className="w-full px-1 min-w-0">
                        <span className="text-sm font-bold text-slate-800 block truncate font-serif">
                          {lectura.libro}
                        </span>
                        <span className="text-xs text-slate-500 font-medium block mt-1 leading-none">
                          {LABELS.capitulo} {lectura.capitulo}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-slate-300 tabular-nums">
                      {format(dia, "d")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
          <span>Generado por la aplicación Reavivado por su palabra</span>
          <span>Iglesia Adventista del Séptimo Día</span>
        </div>
      </div>
    </div>
  );
}