"use client";

import React, { useMemo } from "react";
import {
  Trophy,
  Clock,
  Calendar,
  MapPin,
  Quote,
  User,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DayView({
  hoy,
  lecturaHoy,
  onLeerCapitulo,
  unidades = [],
}: any) {
  const unidadLider = useMemo(() => {
    if (unidades.length === 0) return { nombre: "Sin Datos", puntos: 0 };
    return [...unidades].sort((a, b) => b.puntos - a.puntos)[0];
  }, [unidades]);

  const rolMinisterios = [
    { fecha: "02 May", ministerio: "Jóvenes", encargado: "Directiva JA" },
    { fecha: "09 May", ministerio: "Mujer", encargado: "Director de Diaconos" },
    { fecha: "16 May", ministerio: "No hay culto joven", encargado: "N/A" },
    {
      fecha: "23 May",
      ministerio: "Escuela Sabática",
      encargado: "Directora de ES",
    },
    {
      fecha: "30 May",
      ministerio: "Club de Aventureros",
      encargado: "Directora de Aventureros",
    },
  ];

  const programaHoy = [
    {
      hora: "16:50",
      actividad: "Ejercicio de Canto",
      responsable: "Dir. de Canto",
    },
    { hora: "17:05", actividad: "Bienvenida", responsable: "---" },
    { hora: "17:10", actividad: "Canto Tema", responsable: "---" },
    { hora: "17:15", actividad: "Ideales", responsable: "---" },
    { hora: "17:20", actividad: "Lectura Bíblica", responsable: "---" },
    { hora: "17:25", actividad: "Oración", responsable: "---" },
    { hora: "17:30", actividad: "Tema", responsable: "---" },
    { hora: "18:00", actividad: "Dinámica", responsable: "---" },
    { hora: "18:10", actividad: "Pase de lista", responsable: "---" },
    { hora: "18:15", actividad: "Conexión Bíblica", responsable: "---" },
    { hora: "18:30", actividad: "Bando de Oración", responsable: "---" },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900">
      {/* 1. SECCIÓN: BIENVENIDA */}
      <header className="w-full border-b-[8px] md:border-b-[12px] border-slate-900 py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#C5A059]">
              <MapPin size={14} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Sede Cancún • Villas Otoch 4
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none text-slate-900">
              ¡Feliz {format(hoy, "EEEE", { locale: es })}!
            </h1>
            <p className="text-lg md:text-xl font-light text-slate-400">
              Es un gusto{" "}
              <span className="text-slate-900 font-bold underline decoration-[#C5A059] decoration-2 underline-offset-4">
                saludarte
              </span>
            </p>

            <div className="flex md:hidden items-center justify-center gap-2 pt-4 text-slate-300">
              <Quote size={14} fill="currentColor" className="opacity-20" />
              <p className="text-[10px] font-medium italic text-slate-400 leading-none">
                Tu palabra es una lámpara a mis pies.
              </p>
            </div>
          </div>

          <div className="hidden md:block border-l border-slate-100 pl-6">
            <Quote size={30} className="text-slate-100 mb-2" />
            <p className="text-[10px] font-medium italic text-slate-400 max-w-[150px]">
              Tu palabra es una lámpara a mis pies.
            </p>
          </div>
        </div>
      </header>

      {/* 2. SECCIÓN: RPSP */}
      <section
        className="w-full bg-slate-900 text-white py-12 md:py-16 cursor-pointer active:bg-slate-800 transition-colors"
        onClick={onLeerCapitulo}
      >
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 border-b border-[#C5A059] pb-1">
            <Sparkles size={16} className="text-[#C5A059]" />
            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">
              Lectura del día
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-6">
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
              {lecturaHoy.libro}
            </h3>
            <span className="text-3xl md:text-5xl lg:text-6xl font-light text-[#C5A059] uppercase tracking-tighter italic">
              Cap. {lecturaHoy.capitulo}
            </span>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN: DASHBOARD */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* BLOQUE IZQUIERDO: RANKING (Sticky para PC) */}
          <div className="lg:col-span-4 order-1 md:sticky md:top-8 space-y-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Trophy size={18} className="text-[#C5A059]" />
                <h3 className="text-md md:text-lg font-black tracking-[0.2em] uppercase text-slate-900 italic whitespace-nowrap">
                  Ranking Actual
                </h3>
              </div>
              <div className="h-1 w-full bg-slate-900" />
            </div>

            <div className="bg-slate-50 border-b-4 md:border-b-8 border-slate-900 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 text-center md:text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#A68A56] mb-1">
                  Grupo con mas puntos
                </p>
                <h4 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter italic mb-4 leading-none">
                  {unidadLider.nombre}
                </h4>
                <div className="pt-4 border-t border-slate-200">
                  <span className="text-3xl md:text-4xl font-black text-slate-900">
                    {unidadLider.puntos.toLocaleString()}
                  </span>
                  <p className="text-[12px] font-black text-slate-400 tracking-widest mt-1">
                    Puntos Acumulados
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 md:p-8 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#C5A059] mb-2">
                  <Clock size={14} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Horario Culto Joven
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                    Sábado Actual
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                    4:50 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE DERECHO: ITINERARIO */}
          <div className="lg:col-span-8 order-2 space-y-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-slate-900" />
                <h3 className="text-md md:text-lg font-black tracking-[0.2em] uppercase text-slate-900 italic whitespace-nowrap">
                  Programa de Culto Joven
                </h3>
              </div>
              <div className="h-1 w-full bg-slate-900" />
            </div>

            <div className="space-y-0 border-t border-slate-50">
              {programaHoy.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-slate-100 active:bg-slate-50 px-2 md:px-4 transition-colors"
                >
                  <div className="flex items-center gap-4 md:gap-10">
                    <span className="text-xs font-black text-[#C5A059] tabular-nums w-10 md:w-12 italic leading-none">
                      {p.hora}
                    </span>
                    <p className="text-sm md:text-md font-black tracking-tight text-slate-900 italic leading-none">
                      {p.actividad}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 text-white min-w-[100px] justify-center">
                    <User size={10} className="text-[#C5A059]" />
                    <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                      {p.responsable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 4. SECCIÓN: ROLES MENSUALES */}
      <section className="w-full py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <Calendar size={20} className="text-slate-900" />
              <h3 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-slate-900 italic text-center">
                Rol de Culto Joven
              </h3>
            </div>
            <div className="h-1 w-32 md:w-48 bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-slate-100">
            {rolMinisterios.map((rol, i) => (
              <div
                key={i}
                className="p-6 md:p-10 border-r border-b border-slate-100 active:bg-slate-900 active:text-white group transition-all duration-300 text-center md:text-left"
              >
                <p className="text-[12px] font-black text-[#C5A059] mb-4 md:mb-6 tracking-widest leading-none">
                  {rol.fecha}
                </p>
                <h5 className="text-md md:text-lg font-black tracking-tighter italic leading-none group-active:text-[#C5A059]">
                  {rol.ministerio}
                </h5>
                <p className="text-[12px] font-bold text-slate-400 tracking-[0.2em] mt-2 leading-none">
                  {rol.encargado}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 bg-slate-900 flex flex-col items-center gap-4 text-center">
        <div className="h-1 w-10 bg-[#C5A059]" />
        <p className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.8em]">
          Ministerio Juvenil • Villas Otoch 4
        </p>
      </footer>
    </div>
  );
}
