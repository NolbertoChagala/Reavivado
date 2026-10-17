import React from "react";
import AdornoJA from "@/components/ui/AdornoJA";

interface UnitsHeaderProps {
  totalUnidades: number;
}

export default function UnitsHeader({ totalUnidades }: UnitsHeaderProps) {
  return (
    <header
      className="relative bg-[#0a1931] bg-cover bg-center text-white w-full overflow-hidden"
      style={{
        backgroundImage: `url('/img/bg_unidades.jpg')`,
        backgroundPosition: "center 30%",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1931]/80 via-[#0d2b56]/60 to-[#0a1931]/90" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 80% 25%, rgba(183, 28, 28, 0.45) 0%, transparent 60%), radial-gradient(circle at 20% 75%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-36 text-center">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif drop-shadow-md">
            Tabla de posiciones
          </h1>

          <div className="pt-0.5 sm:pt-1">
            <AdornoJA />
          </div>

          <p className="text-sm sm:text-lg md:text-xl text-amber-300 font-medium tracking-wide">
            Clasificación general de unidades
          </p>

          <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs px-2 sm:px-0">
            El puntaje acumulado refleja los puntos obtenidos por cada grupo en las preguntas del culto joven.
          </p>

          <div className="pt-1 sm:pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 sm:px-5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md shadow-sm">
              <span>{totalUnidades} unidades en competencia</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}