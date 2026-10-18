import React from "react";
import { Crown, Medal, Award } from "lucide-react";
import AdornoJA from "@/components/ui/AdornoJA";

export interface GrupoPodio {
  nombre: string;
  lider: string;
  puntos: number;
  aciertos: number;
}

interface UnitsPodiumSectionProps {
  primerLugar?: GrupoPodio;
  segundoLugar?: GrupoPodio;
  tercerLugar?: GrupoPodio;
  tieneUnidades: boolean;
}

export default function UnitsPodiumSection({
  primerLugar,
  segundoLugar,
  tercerLugar,
  tieneUnidades,
}: UnitsPodiumSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
      <div className="text-center space-y-1.5 mb-10">
        <p className="text-xs font-semibold text-slate-500">
          Cuadro de honor
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
          Primeros lugares
        </h2>
        <div className="pt-1">
          <AdornoJA />
        </div>
      </div>

      {tieneUnidades ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* 2° Lugar (Plata) */}
          <div className="order-2 md:order-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between text-center hover:border-slate-300 transition-all">
            <div>
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Medal size={22} className="text-slate-500" />
              </div>
              <span className="inline-block rounded-full bg-slate-100 border border-slate-200 px-3.5 py-0.5 text-xs font-semibold text-slate-700">
                2° lugar · Plata
              </span>
              <h3 className="mt-3.5 text-xl font-bold text-slate-900 leading-tight font-serif">
                {segundoLugar ? segundoLugar.nombre : "—"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Líder: {segundoLugar ? segundoLugar.lider : "Disponible"}
              </p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <span className="text-2xl font-black text-slate-900 tabular-nums block">
                {segundoLugar ? segundoLugar.puntos.toLocaleString() : "0"} pts
              </span>
              <span className="text-xs text-slate-500 block font-medium mt-0.5">
                {segundoLugar ? `${segundoLugar.aciertos} preguntas acertadas` : "0 aciertos"}
              </span>
            </div>
          </div>

          {/* 1° Lugar (Oro JA / Campeón) */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 rounded-2xl border-2 border-amber-400 p-7 shadow-sm flex flex-col justify-between text-center md:-translate-y-1">
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <Crown size={26} className="text-[#d4af37]" />
              </div>
              <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-3.5 py-0.5 text-xs font-bold text-amber-900">
                1° lugar · Oro
              </span>
              <h3 className="mt-3.5 text-2xl font-extrabold text-slate-900 leading-tight font-serif">
                {primerLugar ? primerLugar.nombre : "—"}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Líder: {primerLugar ? primerLugar.lider : "Disponible"}
              </p>
            </div>
            <div className="mt-5 border-t border-amber-200/80 pt-4">
              <span className="text-3xl font-black text-slate-900 tabular-nums block">
                {primerLugar ? primerLugar.puntos.toLocaleString() : "0"} pts
              </span>
              <span className="text-xs text-slate-600 font-semibold block mt-0.5">
                {primerLugar ? `${primerLugar.aciertos} preguntas acertadas` : "0 aciertos"}
              </span>
              <span className="mt-2.5 inline-block rounded-md bg-amber-100 border border-amber-300 px-3 py-0.5 text-xs font-bold text-amber-900">
                Líder de la temporada
              </span>
            </div>
          </div>

          {/* 3° Lugar (Bronce) */}
          <div className="order-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between text-center hover:border-slate-300 transition-all">
            <div>
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                <Award size={22} className="text-amber-700" />
              </div>
              <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-3.5 py-0.5 text-xs font-semibold text-amber-800">
                3° lugar · Bronce
              </span>
              <h3 className="mt-3.5 text-xl font-bold text-slate-900 leading-tight font-serif">
                {tercerLugar ? primerLugar ? tercerLugar.nombre : "—" : "—"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Líder: {tercerLugar ? tercerLugar.lider : "Disponible"}
              </p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <span className="text-2xl font-black text-slate-900 tabular-nums block">
                {tercerLugar ? tercerLugar.puntos.toLocaleString() : "0"} pts
              </span>
              <span className="text-xs text-slate-500 block font-medium mt-0.5">
                {tercerLugar ? `${tercerLugar.aciertos} preguntas acertadas` : "0 aciertos"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
          Aún no hay unidades registradas.
        </div>
      )}
    </section>
  );
}