import React from "react";
import { Award } from "lucide-react";

export default function PointsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0d2b56] tracking-tight">
          Gestión de Puntos
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Asigna o descuenta méritos a cada unidad participante según sus respuestas correctas.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 shadow-2xs self-start sm:self-auto">
        <Award size={16} className="text-amber-600 shrink-0" />
        <span>Criterio: +10 pts por pregunta respondida</span>
      </div>
    </div>
  );
}