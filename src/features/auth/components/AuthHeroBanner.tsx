import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import JA from "@/assets/img/JA.webp";

export default function AuthHeroBanner() {
  const router = useRouter();

  return (
    <>
      {/* Vista Móvil: Banner con Imagen Superior (< lg) */}
      <div className="lg:hidden relative h-64 sm:h-72 w-full overflow-hidden bg-[#081528] shrink-0 text-white flex flex-col justify-between p-5 pb-9">
        <Image
          src="/img/login_hero.jpg"
          alt="Ministerio Juvenil Reavivado JA"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081528] via-[#081528]/60 to-black/40" />

        <div className="relative z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Volver</span>
          </button>
          <span className="text-[10px] font-bold text-amber-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            1 Timoteo 4:12
          </span>
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 p-1.5 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-md shrink-0">
              <Image src={JA} alt="JA" width={24} height={24} className="w-6 h-6 object-contain" priority />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-tight">Reavivado JA</p>
              <p className="text-[10px] font-semibold text-amber-400">Ministerio Juvenil</p>
            </div>
          </div>
          <p className="text-xs text-slate-200/95 font-medium leading-relaxed italic line-clamp-2">
            Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.
          </p>
        </div>
      </div>

      {/* Columna Izquierda Desktop (50% Exacto) */}
      <div className="hidden lg:flex relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-[#081528] text-white h-full">
        <Image
          src="/img/login_hero.jpg"
          alt="Ministerio Juvenil Reavivado JA"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#081528] via-[#081528]/50 to-[#081528]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#081528]/50" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 p-1.5 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Image
              src={JA}
              alt="JA"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-black text-white leading-tight tracking-tight">Reavivado JA</p>
            <p className="text-[11px] font-semibold text-brand-gold">Ministerio Juvenil</p>
          </div>
        </div>

        <div className="relative z-10 space-y-3 max-w-md">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-brand-gold border border-white/15 backdrop-blur-md">
            1 Timoteo 4:12
          </span>
          <blockquote className="text-xl xl:text-2xl font-bold text-white leading-snug tracking-tight">
            Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.
          </blockquote>
          <p className="text-xs text-slate-300 font-medium">
            Reavivado JA • Ministerio Juvenil
          </p>
        </div>
      </div>
    </>
  );
}