import React from "react";
import { Trophy, Calendar, ArrowRight } from "lucide-react";
import AdornoJA from "@/components/ui/AdornoJA";

interface HomePurposeSectionProps {
  onCambiarVista?: (vista: "dia" | "semana" | "mes") => void;
}

export default function HomePurposeSection({ onCambiarVista }: HomePurposeSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
      <div className="text-center space-y-1.5 mb-10">
        <p className="text-xs font-semibold text-slate-500">
          Información general
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
          ¿Cuál es el propósito de este sistema?
        </h2>
        <div className="pt-1">
          <AdornoJA />
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-1">
          Su objetivo es organizar el cronograma de lecturas y llevar el registro de puntos por cada grupo:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200/80 p-2.5 text-[#0d2b56] mb-4">
              <Trophy size={18} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Registro de puntos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Se registran los puntos obtenidos por cada grupo en la conexión bíblica del culto joven.
            </p>
          </div>
          {onCambiarVista && (
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onCambiarVista("semana")}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0d2b56] hover:text-[#091f3e] transition-colors cursor-pointer group"
              >
                <span>Ver tabla de posiciones</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-300/80 p-2.5 text-amber-900 mb-4">
              <Calendar size={18} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Calendario de lecturas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Se consulta el cronograma de lecturas para saber qué cita bíblica corresponde a cada día.
            </p>
          </div>
          {onCambiarVista && (
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onCambiarVista("mes")}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors cursor-pointer group"
              >
                <span>Ver calendario de lecturas</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}