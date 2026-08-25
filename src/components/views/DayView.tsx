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
  // Obtener el líder de unidades
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
    if (act.includes("canto")) return <Music size={14} className="text-brand-primary animate-pulse" />;
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
    <div className="w-full select-none">
      
      {/* CONTENEDOR INTEGRAL DE PANTALLA ÚNICA */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* COLUMNA IZQUIERDA: BIENVENIDA, ALERTA Y TIMELINE */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col space-y-6">
          
          {/* Cabecera interna */}
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-1.5 text-brand-primary">
              <MapPin size={12} className="shrink-0" />
              <span className="text-[8px] font-bold uppercase tracking-wider">
                Sede Cancún • Villas Otoch 4
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-800 capitalize leading-tight">
              ¡Feliz {saludoDia}!
            </h2>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">
              {format(hoy, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
          </div>

          {/* Banner de Tolerancia integrado */}
          <div className="p-3.5 bg-amber-50/50 border border-brand-gold/15 rounded-2xl flex items-start gap-2.5">
            <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-left">
              <span className="text-[8px] font-black text-amber-800 uppercase tracking-wide block">Tolerancia de asistencia</span>
              <p className="text-[9px] text-amber-800 leading-normal font-semibold mt-0.5">
                Margen de <strong>10 minutos</strong> para el registro en unidades (17:00 - 17:10 hrs). Preludio de canto inicia a las 17:10 hrs.
              </p>
            </div>
          </div>

          {/* Línea de tiempo */}
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Itinerario oficial</span>
              <span className="text-[8px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-lg uppercase">
                17:00 HRS
              </span>
            </div>

            {/* Listado de Actividades */}
            <div className="relative pl-5 border-l border-slate-100 space-y-2">
              {programaHoy.map((p, i) => (
                <div key={i} className="relative group">
                  {/* Punto del timeline */}
                  <div className="absolute -left-[25px] top-[14px] w-2.5 h-2.5 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary transition-all">
                    <div className="w-0.5 h-0.5 rounded-full bg-brand-primary group-hover:bg-white" />
                  </div>

                  {/* Actividad */}
                  <div className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-550 shrink-0">
                        {getIconForActividad(p.actividad)}
                      </div>
                      <div className="text-left">
                        <span className="text-[8px] font-bold text-brand-primary uppercase block leading-none mb-0.5">
                          {p.hora}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">
                          {p.actividad}
                        </h4>
                      </div>
                    </div>

                    {p.responsable !== "---" && (
                      <span className="text-[8px] bg-slate-50 text-slate-550 border border-slate-200/40 px-2 py-0.5 rounded-md font-bold uppercase shrink-0">
                        {p.responsable}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: ESTADÍSTICAS, LIDERAZGO, IDEALES Y DIRECCIÓN */}
        <div className="lg:col-span-5 bg-slate-50/30 lg:border-l lg:border-slate-100 p-6 md:p-8 flex flex-col justify-between gap-5">
          
          {/* 1. LECTURA BÍBLICA DIARIA */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-brand-primary" />
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Lectura de hoy</span>
              </div>
              <span className="text-[8px] bg-red-50 text-brand-primary border border-red-100/50 font-bold px-2 py-0.5 rounded-md uppercase">
                RPSP
              </span>
            </div>
            <div className="text-left p-3.5 bg-white border border-slate-200/60 rounded-2xl shadow-xs">
              <h3 className="text-base font-black text-slate-800 leading-none">
                {lecturaHoy.libro}
              </h3>
              <p className="text-[11px] font-black text-brand-gold mt-1.5 leading-none">
                Capítulo {lecturaHoy.capitulo}
              </p>
            </div>
          </div>

          {/* 2. LIBRO DE LA CONEXIÓN BÍBLICA */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-brand-gold" />
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Conexión bíblica</span>
              </div>
              <span className="text-[8px] bg-amber-50 text-brand-gold border border-brand-gold/15 font-bold px-2 py-0.5 rounded-md uppercase">
                Estudio 2026
              </span>
            </div>
            <div className="text-left p-3.5 bg-white border border-slate-200/60 rounded-2xl shadow-xs">
              <h3 className="text-base font-black text-slate-800 leading-none">
                Evangelio de Salmos
              </h3>
              <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-none">
                Libro oficial de estudio juvenil
              </p>
            </div>
          </div>

          {/* 3. LÍDER DE LA SEMANA */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <Trophy size={13} className="text-brand-gold" />
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Líder de la semana</span>
              </div>
              <span className="text-[8px] bg-amber-50 text-brand-gold border border-brand-gold/15 font-bold px-2 py-0.5 rounded-md uppercase">
                Top 1
              </span>
            </div>

            <div className="p-3 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-amber-50 border border-brand-gold/20 rounded-xl flex items-center justify-center shrink-0 text-brand-gold">
                  <Trophy size={14} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black text-slate-800 truncate max-w-[140px]">{liderPuntos.nombre}</span>
                  <span className="text-[8px] text-slate-400 font-bold leading-none mt-0.5">Líder: {liderPuntos.lider}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-855">{liderPuntos.puntos.toLocaleString()}</span>
                <span className="text-[7px] text-slate-405 font-bold uppercase tracking-wider mt-0.5">puntos</span>
              </div>
            </div>
          </div>

          {/* 4. IDEALES JA */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 select-none">
              <Compass size={13} className="text-brand-primary" />
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Ideales JA</span>
            </div>
            <div className="p-3.5 bg-white border border-slate-200/60 rounded-2xl space-y-2.5 text-left">
              <div className="space-y-0.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Blanco</span>
                <p className="text-[10px] font-bold text-slate-700 leading-normal">
                  "El mensaje del advenimiento a todo el mundo en mi generación."
                </p>
              </div>
              <div className="space-y-0.5 pt-2 border-t border-slate-100">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Lema</span>
                <p className="text-[10px] font-bold text-slate-700 leading-normal">
                  "El amor de Cristo nos constriñe."
                </p>
              </div>
            </div>
          </div>

          {/* 5. UBICACIÓN Y SEDE DE LA IGLESIA */}
          <div className="pt-4 border-t border-slate-100 space-y-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 select-none">
              <MapPin size={14} className="text-brand-primary" />
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Ubicación y sede</span>
            </div>
            <div className="space-y-1 text-left select-none">
              <h5 className="text-[10px] font-black text-slate-800">Iglesia Adventista del Séptimo Día</h5>
              <p className="text-[9.5px] text-slate-450 leading-normal font-semibold">
                Sede Villas Otoch 4, Cancún Quintana Roo.<br />
                Asociación de Quintana Roo • Unión Mexicana del Sureste.
              </p>
            </div>
            
            <div className="pt-2 border-t border-slate-100 space-y-1.5 select-none">
              <div className="flex justify-between text-[9px] font-semibold text-slate-400 text-left">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-700">Perla Ivon Gomez Cruz</span>
                  <span>Director</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-slate-700">Nolberto Coto Chagala</span>
                  <span>Subdirector</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-400 font-bold uppercase mt-1">
                <span>Sociedad de Jóvenes</span>
                <span className="text-brand-primary">JA 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
