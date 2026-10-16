import React from "react";

export default function LeadershipFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0a1931] px-6 py-10 text-white md:px-12 border-t border-slate-900">
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold text-slate-400">Liderazgo juvenil</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-base font-bold text-white font-serif">Perla Ivon Gomez Cruz</p>
            <div className="mx-auto mt-1.5 h-px w-28 bg-amber-400/50" />
            <p className="mt-1 text-xs text-slate-400">Directora</p>
          </div>
          <div>
            <p className="text-base font-bold text-white font-serif">Nolberto Coto Chagala</p>
            <div className="mx-auto mt-1.5 h-px w-28 bg-amber-400/50" />
            <p className="mt-1 text-xs text-slate-400">Subdirector</p>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          JA 2026 · Asociación de Quintana Roo · Unión Mexicana del Sureste
        </p>
      </div>
    </footer>
  );
}