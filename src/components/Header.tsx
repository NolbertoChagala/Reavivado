"use client";

import Image from "next/image";
import { APP_NAME, APP_SUBTITLE } from "@/constants/app";
import logoadventista from "@/assets/img/logoadventista.webp"; 
import JA from "@/assets/img/JA.webp";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200/60 sticky top-0 z-50 transition-all text-slate-900 select-none">
      <div className="px-5 py-3 flex items-center justify-between">
        
        {/* Identidad */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
            <Image
              src={logoadventista}
              alt="IASD"
              priority
              width={26}
              height={26}
              className="object-contain"
            />
            <Image
              src={JA}
              alt="JA"
              priority
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-slate-900 tracking-tight uppercase leading-none">
              {APP_NAME}
            </h1>
            <p className="text-[8px] font-semibold text-brand-primary uppercase tracking-widest leading-none mt-1">
              {APP_SUBTITLE}
            </p>
          </div>
        </div>

        {/* Emblema / Texto Secundario */}
        <div className="text-right">
          <span className="text-[9px] font-bold text-brand-primary uppercase tracking-wider">
            Villas Otoch 4
          </span>
        </div>
      </div>
    </header>
  );
}
