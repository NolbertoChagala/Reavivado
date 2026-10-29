import React from "react";
import { BookOpen } from "lucide-react";
import { JA_SCORING_RULES } from "@/constants/app";

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
          <span className="text-xs font-bold text-slate-800">{JA_SCORING_RULES.CRITERION_LABEL}</span>
          <span className="font-bold text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            + {JA_SCORING_RULES.POINTS_PER_QUESTION} pts
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
        {JA_SCORING_RULES.CRITERION_DESCRIPTION}
        </p>
      </div>
    </div>
  );
}