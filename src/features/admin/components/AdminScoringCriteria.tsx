import React from "react";
import { BookOpen } from "lucide-react";

export default function AdminScoringCriteria() {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-3.5">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <BookOpen size={16} className="text-[#0d2b56]" />
        <h2 className="text-sm font-bold text-[#0d2b56]">
          Criterio de Puntuación JA
        </h2>
      </div>

      <div className="p-3 bg-slate-50 rounded-md border border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Acierto por pregunta contestada</span>
          <span className="font-bold text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            +10 pts
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Cada pregunta respondida correctamente por la unidad suma 10 puntos al acumulado oficial.
        </p>
      </div>
    </div>
  );
}