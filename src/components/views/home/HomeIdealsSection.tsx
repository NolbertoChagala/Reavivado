import React from "react";
import { Shield, Target, Heart, Compass, BookOpen } from "lucide-react";
import AdornoJA from "@/components/ui/AdornoJA";

interface HomeIdealsSectionProps {
  voto: string;
}

export default function HomeIdealsSection({ voto }: HomeIdealsSectionProps) {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/80 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center space-y-1.5 mb-10">
          <p className="text-xs font-semibold text-slate-500">
            Identidad y principios espirituales
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
            Ideales JA
          </h2>
          <div className="pt-1">
            <AdornoJA />
          </div>
        </div>

        {/* 1. Voto JA */}
        <div className="rounded-2xl border-2 border-amber-300/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0 mb-3.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-300 px-3.5 py-1 text-xs font-bold text-amber-900 w-fit">
                <Shield size={14} />
                <span>1. Voto JA</span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Compromiso personal de consagración</span>
            </div>
            <p className="text-base sm:text-lg italic font-serif text-slate-800 leading-relaxed">
              «{voto}»
            </p>
          </div>
          <p className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Recitado con devoción en cada culto de la tarde.
          </p>
        </div>

        {/* Fila intermedia: 2. Blanco, 3. Lema y 4. Misión */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-blue-200/80 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#0d2b56] mb-3.5">
                <Target size={14} />
                <span>2. Blanco JA</span>
              </div>
              <p className="text-base sm:text-lg italic font-serif text-slate-800 leading-relaxed">
                «El mensaje del advenimiento a todo el mundo en mi generación»
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Propósito de evangelización y testimonio global
            </p>
          </div>

          <div className="rounded-2xl border border-red-200/80 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-red-300 transition-all">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-[#b71c1c] mb-3.5">
                <Heart size={14} />
                <span>3. Lema JA</span>
              </div>
              <p className="text-base sm:text-lg italic font-serif text-slate-800 leading-relaxed">
                «El amor de Cristo me motiva»
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              El motor espiritual de nuestra vida cristiana · 2 Corintios 5:14
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900 mb-3.5">
                <Compass size={14} />
                <span>4. Misión JA</span>
              </div>
              <p className="text-base sm:text-lg italic font-serif text-slate-800 leading-relaxed">
                «Guiar a los jóvenes a una experiencia con Jesús y ayudarlos a aceptar su llamado al discipulado»
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              El llamado al discipulado activo de cada joven
            </p>
          </div>
        </div>

        {/* 5. Voto a la Biblia */}
        <div className="mt-6 rounded-2xl border-2 border-blue-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0 mb-3.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold text-[#0d2b56] w-fit">
                <BookOpen size={14} />
                <span>5. Voto a la Biblia</span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Fidelidad a la santa palabra de Dios</span>
            </div>
            <p className="text-base sm:text-lg italic font-serif text-slate-800 leading-relaxed">
              «Prometo lealtad a la Biblia, la santa palabra de Dios; haré de ella una lámpara a mis pies y una luz a mi camino; y guardaré sus palabras en mi corazón para no pecar contra Dios»
            </p>
          </div>
          <p className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Cimiento espiritual y lealtad a la palabra de Dios · Salmos 119:105
          </p>
        </div>
      </div>
    </section>
  );
}