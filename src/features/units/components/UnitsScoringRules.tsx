import React from "react";
import { BookOpen, Award, CheckCircle2 } from "lucide-react";
import AdornoJA from "@/components/ui/AdornoJA";

export default function UnitsScoringRules() {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/80 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center space-y-2 mb-10">
          <p className="text-xs font-semibold text-slate-500">
            Dinámica semanal
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            ¿Cómo se suman los puntos?
          </h2>
          <div className="pt-1">
            <AdornoJA />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            El avance de cada grupo sigue un ciclo continuo de preparación, participación sabatina y registro semanal:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200/80 p-2.5 text-[#0d2b56] mb-2">
                <BookOpen size={18} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                1. Lectura en la semana
              </h3>
              <p className="text-slate-600 leading-relaxed mt-1.5">
                Los miembros leen los capítulos asignados en el calendario de domingo a sábado para llegar preparados con el contenido bíblico.
              </p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-brand-primary bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 w-fit">
              Domingo a sábado
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-red-300 transition-all flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200/80 p-2.5 text-[#b71c1c] mb-2">
                <Award size={18} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                2. Preguntas en el culto
              </h3>
              <p className="text-slate-600 leading-relaxed mt-1.5">
                En el programa del culto joven, después de la dinámica se hace la conexión bíblica, dependiendo de cómo el director organice las preguntas para sumar puntos con tu grupo.
              </p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-[#b71c1c] bg-red-50/70 px-2.5 py-1 rounded-md border border-red-200/60 w-fit">
              Culto joven sabatino
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-300/80 p-2.5 text-amber-900 mb-2">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                3. Registro cada domingo
              </h3>
              <p className="text-slate-600 leading-relaxed mt-1.5">
                Cada domingo se registran oficialmente los puntos en el sistema y se actualiza la tabla de posiciones con el nuevo orden de los grupos.
              </p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300/60 w-fit">
              Actualización domingos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}