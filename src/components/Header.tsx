"use client";

import Image from "next/image";
import { APP_NAME } from "@/constants/app";
import logoadventista from "@/assets/img/logoadventista.webp"; 
import JA from "@/assets/img/JA.webp";

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b-2 border-slate-900 sticky top-0 z-50 shadow-sm">
      {/* Línea de acento institucional superior */}
      <div className="h-1.5 w-full bg-[#003366]" />
      
      <div className="max-w-6xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
        
        {/* LADO IZQUIERDO: IDENTIDAD Y LEMA */}
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-slate-100 rounded-full scale-95 group-hover:scale-105 transition-transform duration-300" />
            <Image
              src={logoadventista}
              alt="Logo Adventista"
              priority
              width={44}
              height={44}
              className="relative w-11 h-11 md:w-12 md:h-12 object-contain"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              {APP_NAME}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-4 bg-[#003366]" />
              <p className="text-[10px] md:text-[11px] font-black text-[#003366] uppercase tracking-[0.2em] italic">
                Conexión Bíblica
              </p>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: EMBLEMA JA */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Sociedad de Jóvenes</p>
             <p className="text-[10px] font-black text-slate-900 uppercase italic">Liderazgo 2026</p>
          </div>
          <div className="w-12 h-12 md:w-14 md:h-14 p-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner">
            <Image
              src={JA}
              alt="Logo Jóvenes Adventistas"
              width={48}
              height={48}
              className="w-full h-full object-contain hover:rotate-6 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}