"use client";

import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  BookOpen,
  Target,
  ArrowRight,
  Users,
  Calendar,
  Shield,
  Heart,
  Compass,
  Trophy,
} from "lucide-react";
import { VERSE_OF_DAY } from "@/constants/app";

interface Lectura {
  libro: string;
  capitulo: number;
}

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

interface DayViewProps {
  hoy: Date;
  lecturaHoy: Lectura;
  /** Texto oficial del Voto JA */
  voto?: string;
  fondoUrl?: string;
  unidades?: Unidad[];
  onCambiarVista?: (vista: "dia" | "semana" | "mes") => void;
}

/* ───────── Configuración ───────── */
const CULTO_JOVEN = "4:30 – 6:20 p. m.";
const VOTO_JA_POR_DEFECTO =
  "Por amor al Señor Jesús, prometo tomar parte activa en la obra de los Ministerios Juveniles Adventistas, haciendo cuanto pueda para ayudar a otros, y para terminar la obra del evangelio en todo el mundo";

/* ───────── Adorno de Excelencia JA (Dorado) ───────── */
function AdornoJA() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-16 md:w-28 bg-amber-400/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-amber-400 shadow-xs" />
      <span className="h-px w-16 md:w-28 bg-amber-400/50" />
    </div>
  );
}

export default function DayView({
  hoy,
  lecturaHoy,
  voto = VOTO_JA_POR_DEFECTO,
  onCambiarVista,
}: DayViewProps) {
  const dia = format(hoy, "EEEE", { locale: es });
  const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
  const fechaLarga = format(hoy, "d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      {/* ════════ I. CABECERA INSTITUCIONAL JA: AZUL, ROJO, BLANCO Y DORADO ════════ */}
      <header
        className="relative bg-[#0a1931] bg-cover bg-center text-white w-full overflow-hidden"
        style={{
          backgroundImage: `url('/img/bg_home.jpg')`,
          backgroundPosition: "center 38%",
        }}
      >
        {/* Degradado armónico oficial JA: Azul Lealtad base con auras suaves de Rojo Redención y Dorado Excelencia */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1931]/80 via-[#0d2b56]/60 to-[#0a1931]/90" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 80% 25%, rgba(183, 28, 28, 0.45) 0%, transparent 60%), radial-gradient(circle at 20% 75%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)",
          }}
        />

        {/* Contenido amplio y espacioso de la cabecera (SIN cajas que tapen o corten la Biblia en la foto) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-36 text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif drop-shadow-md">
              Sistema de gestión JA
            </h1>

            <div className="pt-0.5 sm:pt-1">
              <AdornoJA />
            </div>

            <p className="text-sm sm:text-lg md:text-xl text-amber-300 font-medium tracking-wide">
              Sociedad de Jóvenes Adventistas
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs px-2 sm:px-0">
              Plataforma para consultar el cronograma de lecturas y llevar el registro de puntos de cada grupo.
            </p>

            <div className="pt-1 sm:pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 sm:px-5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md shadow-sm">
                <span>{diaCapitalizado}, {fechaLarga}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ════════ II. PUENTE DE INDICADORES FLOTANTE (SIN CORTAR LA IMAGEN) ════════ */}
      <div className="relative -mt-10 sm:-mt-14 md:-mt-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-10 z-20">
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xl p-2 sm:p-4">
          <dl className="grid grid-cols-1 md:grid-cols-3 divide-y divide-slate-100 md:divide-x md:divide-y-0">
            {/* 1. Programa general (Horario sabatino) */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Programa general JA</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">{CULTO_JOVEN}</dd>
              <dd className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">Culto joven sabatino</dd>
            </div>

            {/* 2. Meta diaria de estudio */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Meta diaria</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">
                1 capítulo al día
              </dd>
              <dd className="text-[11px] sm:text-xs text-amber-700 font-semibold mt-0.5 sm:mt-1">Reavivados por su palabra</dd>
            </div>

            {/* 3. Ciclo de preparación */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Ciclo de preparación</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">Domingo a sábado</dd>
              <dd className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">Preparación continua</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ════════ II. ¿CUÁL ES EL PROPÓSITO DE ESTE SISTEMA? (FULL-WIDTH SLATE-50) ════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="text-center space-y-1.5 mb-10">
          <p className="text-xs font-semibold text-slate-500">
            Información general
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
            ¿Cuál es el propósito de este sistema?
          </h2>
          <div className="pt-1">
            <AdornoJA />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-1">
            Su objetivo es organizar el cronograma de lecturas y llevar el registro de puntos por cada grupo:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* 1. Registro de puntos */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200/80 p-2.5 text-[#0d2b56] mb-4">
                <Trophy size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Registro de puntos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Se registran los puntos obtenidos por cada grupo en la conexión bíblica del culto joven.
              </p>
            </div>
            {onCambiarVista && (
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onCambiarVista("semana")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0d2b56] hover:text-[#091f3e] transition-colors cursor-pointer group"
                >
                  <span>Ver tabla de posiciones</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* 2. Calendario de lectura */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-300/80 p-2.5 text-amber-900 mb-4">
                <Calendar size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Calendario de lecturas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Se consulta el cronograma de lecturas para saber qué cita bíblica corresponde a cada día.
              </p>
            </div>
            {onCambiarVista && (
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onCambiarVista("mes")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors cursor-pointer group"
                >
                  <span>Ver calendario de lecturas</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════ III. LECTURA DE HOY (CENTRO DEVOCIONAL FULL-WIDTH BLANCO) ════════ */}
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

            {/* Versículo de inspiración del día (formato compacto) */}
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

      {/* ════════ IV. IDEALES DE LOS JÓVENES ADVENTISTAS (FULL-WIDTH SLATE-50) ════════ */}
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

          {/* 1. Voto JA (Tarjeta destacada superior) */}
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

          {/* Fila intermedia: 2. Blanco, 3. Lema y 4. Misión en 3 columnas */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2. Blanco JA */}
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

            {/* 3. Lema JA */}
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

            {/* 4. Misión JA */}
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

          {/* 5. Voto a la Biblia (Tarjeta destacada inferior) */}
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

      {/* ════════ V. LIDERAZGO JUVENIL ════════ */}
      <footer className="relative overflow-hidden bg-[#0a1931] px-6 py-10 text-white md:px-12 border-t border-slate-900">
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-slate-400">Liderazgo juvenil</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-base font-bold text-white font-serif">Perla Ivon Gomez Cruz</p>
              <div className="mx-auto mt-1.5 h-px w-28 bg-amber-400/50" />
              <p className="mt-1 text-xs text-slate-400">Director</p>
            </div>
            <div>
              <p className="text-base font-bold text-white font-serif">Nolberto Coto Chagala</p>
              <div className="mx-auto mt-1.5 h-px w-28 bg-amber-400/50" />
              <p className="mt-1 text-xs text-slate-400">Subdirector</p>
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-400">
            JA 2026 · Asociación de Quintana Roo · Unión Mexicana del Sureste
          </p>
        </div>
      </footer>
    </div>
  );
}