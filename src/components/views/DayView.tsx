"use client";

import React, { useMemo } from "react";
import { Trophy, Clock, Calendar, User, BookOpen, Quote, MapPin } from "lucide-react";
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

  const rolMinisterios = [
    { fecha: "02 May", ministerio: "Jóvenes", encargado: "Directiva JA" },
    { fecha: "09 May", ministerio: "Mujer", encargado: "Director de Diáconos" },
    { fecha: "16 May", ministerio: "No hay culto joven", encargado: "N/A" },
    { fecha: "23 May", ministerio: "Escuela Sabática", encargado: "Directora de ES" },
    { fecha: "30 May", ministerio: "Club de Aventureros", encargado: "Directora de Aventureros" },
  ];

  const programaHoy = [
    { hora: "16:50", actividad: "Ejercicio de Canto", responsable: "Dir. de Canto" },
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

  const saludoDia = format(hoy, "EEEE", { locale: es });

  return (
    <div className="space-y-8 w-full">
      
      {/* 1. BIENVENIDA MINIMALISTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-brand-primary">
            <MapPin size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Sede Cancún • Villas Otoch 4
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight capitalize">
            ¡Feliz {saludoDia}!
          </h2>
          <p className="text-sm text-slate-400">
            Qué alegría encontrarnos este sábado en la Sociedad de Jóvenes.
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-3 border-l border-slate-200 pl-6 py-2">
          <Quote size={20} className="text-slate-300 shrink-0" />
          <p className="text-xs italic text-slate-400 max-w-[200px] leading-relaxed">
            "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
          </p>
        </div>
      </div>

      {/* 2. GRID PRINCIPAL (12 Columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LADO IZQUIERDO: Lectura y Programa (Col-span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Lectura Bíblica */}
          <div className="p-6 bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <BookOpen size={18} className="text-brand-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">Lectura de Hoy</span>
              </div>
              <span className="text-[10px] bg-red-50 text-brand-primary font-bold px-2 py-0.5 rounded">
                Reavivados por su Palabra
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                {lecturaHoy.libro}
              </span>
              <span className="text-lg md:text-xl font-medium text-slate-400">
                Capítulo {lecturaHoy.capitulo}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Mantén el hábito diario de estudiar la palabra de Dios. Al finalizar la lectura de hoy, registra tus puntos.
            </p>
          </div>

          {/* Programa de Culto */}
          <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Clock size={18} className="text-slate-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Programa de Culto Joven
              </h3>
            </div>
            
            <div className="divide-y divide-slate-100">
              {programaHoy.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 hover:bg-slate-50/40 btn-transition"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-brand-primary tabular-nums w-10 shrink-0">
                      {p.hora}
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {p.actividad}
                    </span>
                  </div>
                  {p.responsable !== "---" && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-550 rounded-lg border border-slate-100">
                      <User size={10} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">
                        {p.responsable}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* LADO DERECHO: Ranking y Horarios (Col-span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Lider de Puntos */}
          <div className="p-6 bg-white border border-slate-200/60 border-t-4 border-t-brand-gold rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-500 pb-3 border-b border-slate-100">
              <Trophy size={18} className="text-brand-gold" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Líder de la Semana
              </h3>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Grupo con mayor puntaje
              </span>
              <h4 className="text-xl font-extrabold text-slate-900 truncate">
                {liderPuntos.nombre}
              </h4>
              <p className="text-xs text-slate-400">
                Líder: {liderPuntos.lider}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-3xl font-black text-slate-900 tabular-nums">
                {liderPuntos.puntos.toLocaleString()}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Puntos Totales
              </span>
            </div>
          </div>

          {/* Horario General */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-500 pb-3 border-b border-slate-100">
              <Clock size={18} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Horario de Inicio
              </h3>
            </div>
            
            <div className="space-y-1">
              <span className="text-3xl font-black text-slate-900 italic">
                4:50 PM
              </span>
              <p className="text-xs text-slate-400 leading-normal">
                Puntualidad en el inicio del programa sabático de Culto Joven.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 3. ROLES MENSUALES */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-slate-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Calendario de Roles de Culto Joven
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {rolMinisterios.map((rol, i) => (
            <div
              key={i}
              className="p-5 bg-white border border-slate-200/60 rounded-xl shadow-sm space-y-2 hover:border-slate-300 btn-transition"
            >
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                {rol.fecha}
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                {rol.ministerio}
              </h4>
              <p className="text-xs text-slate-400">
                {rol.encargado}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
