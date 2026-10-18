import React from "react";
import { BookOpen } from "lucide-react";
import AdornoJA from "@/components/ui/AdornoJA";
import { VERSE_OF_DAY } from "@/constants/app";

interface Lectura {
  libro: string;
  capitulo: number;
}

interface HomeReadingSectionProps {
  lecturaHoy: Lectura;
}

export default function HomeReadingSection({ lecturaHoy }: HomeReadingSectionProps) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center space-y-1.5 mb-8">
          <p className="text-xs font-semibold text-slate-500">
            Lectura bíblica diaria
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
            Lectura de hoy
          </h2>
          <div className="pt-1">
            <AdornoJA />
          </div>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-10 shadow-xs text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-semibold text-[#0d2b56]">
            <BookOpen size={14} className="text-[#0d2b56]" />
            <span>Reavivados por su palabra · Capítulo asignado</span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-1 font-serif tracking-tight">
              {lecturaHoy.libro} capítulo {lecturaHoy.capitulo}
            </h3>
          </div>

          <div className="rounded-xl bg-white border border-slate-200/90 px-4 py-3 sm:px-6 sm:py-4 text-center max-w-xl mx-auto shadow-2xs">
            <p className="text-xs sm:text-sm italic text-slate-700 font-serif leading-relaxed">
              «{VERSE_OF_DAY.text}»
            </p>
            <span className="block mt-1.5 text-[11px] sm:text-xs font-bold text-[#b71c1c]">
              {VERSE_OF_DAY.reference}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}