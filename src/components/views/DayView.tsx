"use client";

import React, { useMemo } from "react";
import { Trophy, Clock, Calendar, User, BookOpen, Quote, MapPin, Music, Heart, Compass, Mic, Users, Sparkles, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

interface Lectura {
  libro: string;
  capitulo: number;
}

interface DayViewProps {
  hoy: Date;
  lecturaHoy: Lectura;
  unidades?: Unidad[];
}

export default function DayView({ hoy, lecturaHoy, unidades = [] }: DayViewProps) {
  const liderPuntos = useMemo(() => {
    if (unidades.length === 0) return { nombre: "Sin Datos", puntos: 0, lider: "---" };
    return [...unidades].sort((a, b) => b.puntos - a.puntos)[0];
  }, [unidades]);

  const programaHoy = [
    { hora: "17:00", actividad: "Ejercicio de Canto", responsable: "Dir. de Canto" },
    { hora: "17:10", actividad: "Bienvenida", responsable: "---" },
    { hora: "17:15", actividad: "Canto Tema e Ideales", responsable: "---" },
    { hora: "17:20", actividad: "Lectura Bíblica", responsable: "---" },
    { hora: "17:25", actividad: "Oración", responsable: "---" },
    { hora: "17:30", actividad: "Tema / Actividad Especial", responsable: "Tema JA" },
    { hora: "18:00", actividad: "Dinámica Grupal", responsable: "---" },
    { hora: "18:10", actividad: "Pase de lista", responsable: "---" },
    { hora: "18:15", actividad: "Conexión Bíblica", responsable: "---" },
    { hora: "18:30", actividad: "Bando de Oración y Cierre", responsable: "---" },
  ];

  const getIconForActividad = (actividad: string) => {
    const act = actividad.toLowerCase();
    if (act.includes("canto")) return <Music size={14} className="text-brand-primary" />;
    if (act.includes("bienvenida")) return <Heart size={14} className="text-red-500" />;
    if (act.includes("ideales")) return <Compass size={14} className="text-amber-500" />;
    if (act.includes("lectura")) return <BookOpen size={14} className="text-brand-primary" />;
    if (act.includes("oración")) return <Sparkles size={14} className="text-purple-500" />;
    if (act.includes("tema") || act.includes("actividad")) return <Mic size={14} className="text-blue-500" />;
    if (act.includes("dinámica")) return <Trophy size={14} className="text-brand-gold" />;
    if (act.includes("pase") || act.includes("lista")) return <Users size={14} className="text-slate-500" />;
    if (act.includes("conexión")) return <Sparkles size={14} className="text-brand-gold" />;
    return <Clock size={14} className="text-slate-400" />;
  };

  const saludoDia = format(hoy, "EEEE", { locale: es });

  return (
    <div className="space-y-8 w-full">

      {/* 1. CABECERA CON BIENVENIDA Y FECHA EXTENDIDA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-brand-primary">
            <MapPin size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Sede Cancún • Villas Otoch 4
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 capitalize">
            ¡Feliz {saludoDia}!
          </h2>
          <p className="text-xs text-slate-400">
            Hoy es {format(hoy, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })} • Te invitamos a estudiar con alegría.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 border-l border-slate-200 pl-6 py-2 shrink-0">
          <Quote size={20} className="text-slate-300 shrink-0" />
          <p className="text-xs italic text-slate-400 max-w-[220px] leading-relaxed">
            "Todo lo puedo en Cristo que me fortalece"
          </p>
        </div>
      </div>

      {/* 2. GRID DE INDICADORES / MÉTRICAS CLAVE (3 Columnas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Tarjeta 1: Lectura de Hoy */}
        <div className="p-5 bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md hover:border-slate-300/40 btn-transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900">
              <BookOpen size={16} className="text-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Lectura de Hoy</span>
            </div>
            <span className="text-[8px] bg-red-50 text-brand-primary font-bold px-1.5 py-0.5 rounded">
              RPSP
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              {lecturaHoy.libro}
            </h3>
            <p className="text-xs font-semibold text-slate-455 mt-1">
              Capítulo {lecturaHoy.capitulo}
            </p>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal mt-2.5">
            Mantén el hábito diario de estudiar la palabra de Dios.
          </p>
        </div>

        {/* Tarjeta 2: Líder de la Semana */}
        <div className="p-5 bg-white border border-slate-200/60 border-t-4 border-t-brand-gold rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md hover:border-slate-300/40 btn-transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900">
              <Trophy size={16} className="text-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Líder Semanal</span>
            </div>
            <span className="text-[8px] bg-amber-50 text-brand-gold font-bold px-1.5 py-0.5 rounded uppercase">
              Top 1
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none truncate">
              {liderPuntos.nombre}
            </h3>
            <p className="text-xs font-semibold text-slate-455 mt-1">
              Líder: {liderPuntos.lider}
            </p>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-sm font-black text-slate-900 tabular-nums">
              {liderPuntos.puntos.toLocaleString()}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Puntos</span>
          </div>
        </div>

        {/* Tarjeta 3: Conexión Bíblica */}
        <div className="p-5 bg-white border border-slate-200/60 border-t-4 border-t-slate-400 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md hover:border-slate-300/40 btn-transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900">
              <Sparkles size={16} className="text-slate-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Conexión Bíblica</span>
            </div>
            <span className="text-[8px] bg-slate-100 text-slate-655 font-bold px-1.5 py-0.5 rounded uppercase">
              Estudio 2026
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              Evangelio de Salmos
            </h3>
            <p className="text-xs font-semibold text-slate-455 mt-1">
              Libro oficial de la conexión bíblica
            </p>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal mt-2.5">
            Lee y medita en el evangelio oficial para sumar puntos.
          </p>
        </div>

      </div>

      {/* 3. PANEL DIVIDIDO DE DETALLES (12 Columnas en Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ================= TARJETA DE HORARIO & TOLERANCIA - SÓLO MÓVIL ================= */}
        <div className="block lg:hidden order-1 p-5 bg-white border border-slate-200/60 border-t-4 border-t-amber-500 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Clock size={16} className="text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Horario oficial</h4>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-black text-slate-900 tracking-tight">17:00 HRS</span>
            <p className="text-xs text-slate-400">Inicio formal del programa sabático de la Sociedad de Jóvenes.</p>
          </div>
          <div className="flex items-start gap-2.5 p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
            <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 leading-relaxed">
              <strong>Tolerancia:</strong> Se cuenta con un margen de <strong>10 minutos</strong> de tolerancia para el registro de asistencia a las unidades. Los directores de canto inician preludio a las 17:10 hrs.
            </p>
          </div>
        </div>

        {/* ================= COLUMNA PRINCIPAL (Itinerario del Culto - col-span-8) ================= */}
        <div className="order-2 lg:order-1 lg:col-span-8 bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden p-4 md:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-brand-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Programa de Culto Joven
              </h3>
            </div>
          </div>

          <div className="mt-6 relative pl-6 border-l border-slate-100 space-y-4">
            {programaHoy.map((p, i) => (
              <div key={i} className="relative group">

                {/* Nodo de la línea de tiempo */}
                <div className="absolute -left-[30px] top-[18px] w-2.5 h-2.5 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary btn-transition">
                  <div className="w-1 h-1 rounded-full bg-brand-primary group-hover:bg-white" />
                </div>

                {/* Bloque de Contenido de Actividad */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl hover:bg-slate-55/40 btn-transition border border-transparent hover:border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-55 rounded-lg text-slate-500 shrink-0 mt-0.5 group-hover:bg-white group-hover:shadow-sm btn-transition">
                      {getIconForActividad(p.actividad)}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-brand-primary tracking-wider uppercase tabular-nums block">
                        {p.hora}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">
                        {p.actividad}
                      </h4>
                    </div>
                  </div>

                  {p.responsable !== "---" && (
                    <div className="flex items-center gap-1.5 self-start sm:self-center px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-550 shrink-0">
                      <User size={10} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">
                        {p.responsable}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ================= TARJETA DE UBICACIÓN - SÓLO MÓVIL ================= */}
        <div className="block lg:hidden order-3 p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin size={16} className="text-brand-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Ubicación y Sede</h4>
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-slate-800">Iglesia Adventista del Séptimo Día</h5>
            <p className="text-xs text-slate-455 leading-relaxed">
              Sede Villas Otoch 4, Cancún Quintana Roo.<br />
              Asociación de Quintana Roo • Unión Mexicana del Sureste.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Director:</span>
              <span className="font-semibold text-slate-700">Perla Ivon Gomez Cruz</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Subdirector:</span>
              <span className="font-semibold text-slate-700">Nolberto Coto Chagala</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Sociedad de Jóvenes</span>
            <span className="font-bold text-brand-primary">JA 2026</span>
          </div>
        </div>

        {/* ================= COLUMNA LATERAL (SÓLO ESCRITORIO - col-span-4) ================= */}
        <div className="hidden lg:flex flex-col gap-6 lg:col-span-4 lg:order-2">

          {/* Tarjeta de Horario & Tolerancia */}
          <div className="p-5 bg-white border border-slate-200/60 border-t-4 border-t-amber-500 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Clock size={16} className="text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Horario oficial</h4>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">17:00 HRS</span>
              <p className="text-xs text-slate-400">Inicio formal del programa sabático de la Sociedad de Jóvenes.</p>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 leading-relaxed">
                <strong>Tolerancia:</strong> Se cuenta con un margen de <strong>10 minutos</strong> de tolerancia para el registro de asistencia a las unidades. Los directores de canto inician preludio a las 17:10 hrs.
              </p>
            </div>
          </div>

          {/* Tarjeta de Ubicación */}
          <div className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin size={16} className="text-brand-primary" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Ubicación y Sede</h4>
            </div>
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-slate-800">Iglesia Adventista del Séptimo Día</h5>
              <p className="text-xs text-slate-455 leading-relaxed">
                Sede Villas Otoch 4, Cancún Quintana Roo.<br />
                Asociación de Quintana Roo • Unión Mexicana del Sureste.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">Director:</span>
                <span className="font-semibold text-slate-700">Perla Ivon Gomez Cruz</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">Subdirector:</span>
                <span className="font-semibold text-slate-700">Nolberto Coto Chagala</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Sociedad de Jóvenes</span>
              <span className="font-bold text-brand-primary">JA 2026</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
