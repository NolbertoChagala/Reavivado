"use client";

import React, { useMemo, useState } from "react";
import {
  Trophy,
  Award,
  Medal,
  Crown,
  Search,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface Unidad {
  nombre: string;
  lider: string;
  puntos: number;
}

export interface WeekViewProps {
  unidades: Unidad[];
  hoy?: Date;
  semana?: any[];
  refDiaActual?: React.RefObject<HTMLDivElement | null>;
}

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

export default function WeekView({ unidades = [] }: WeekViewProps) {
  const [busqueda, setBusqueda] = useState("");

  const gruposProcesados = useMemo(() => {
    const ordenados = [...unidades].sort((a, b) => b.puntos - a.puntos);
    const maxPuntos = ordenados.length > 0 && ordenados[0].puntos > 0 ? ordenados[0].puntos : 1;

    return ordenados.map((grupo, index) => {
      const grupoAdelante = index > 0 ? ordenados[index - 1] : null;
      const diferenciaAdelante = grupoAdelante ? grupoAdelante.puntos - grupo.puntos : 0;
      const nombreAdelante = grupoAdelante ? grupoAdelante.nombre : "";
      const porcentaje = Math.round((grupo.puntos / maxPuntos) * 100);
      const aciertos = Math.floor(grupo.puntos / 10);

      return {
        ...grupo,
        diferenciaAdelante,
        nombreAdelante,
        posicion: index + 1,
        porcentaje,
        aciertos,
      };
    });
  }, [unidades]);

  const liderActual = gruposProcesados[0];
  const segundoLugar = gruposProcesados[1];
  const tercerLugar = gruposProcesados[2];

  const puntosTotales = useMemo(
    () => unidades.reduce((acc, u) => acc + (u.puntos || 0), 0),
    [unidades]
  );

  // Filtrado por buscador
  const gruposFiltrados = useMemo(() => {
    if (!busqueda.trim()) return gruposProcesados;
    const q = busqueda.toLowerCase().trim();
    return gruposProcesados.filter(
      (g) => g.nombre.toLowerCase().includes(q) || g.lider.toLowerCase().includes(q)
    );
  }, [gruposProcesados, busqueda]);

  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      {/* ════════ I. CABECERA INSTITUCIONAL JA: AZUL, ROJO, BLANCO Y DORADO ════════ */}
      <header
        className="relative bg-[#0a1931] bg-cover bg-center text-white w-full overflow-hidden"
        style={{
          backgroundImage: `url('/img/bg_unidades.jpg')`,
          backgroundPosition: "center 30%",
        }}
      >
        {/* Degradado oficial JA: Fondo Azul Lealtad con destellos de Rojo y Dorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1931]/80 via-[#0d2b56]/60 to-[#0a1931]/90" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 80% 25%, rgba(183, 28, 28, 0.45) 0%, transparent 60%), radial-gradient(circle at 20% 75%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)",
          }}
        />

        {/* Contenido amplio de la cabecera (SIN cajas que tapen o corten a los jóvenes en la foto) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-36 text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif drop-shadow-md">
              Tabla de posiciones
            </h1>

            <div className="pt-0.5 sm:pt-1">
              <AdornoJA />
            </div>

            <p className="text-sm sm:text-lg md:text-xl text-amber-300 font-medium tracking-wide">
              Clasificación general de unidades
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs px-2 sm:px-0">
              El puntaje acumulado refleja los puntos obtenidos por cada grupo en las preguntas del culto joven.
            </p>

            <div className="pt-1 sm:pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 sm:px-5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md shadow-sm">
                <span>{unidades.length} unidades en competencia</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ════════ II. PUENTE DE INDICADORES FLOTANTE (SIN CORTAR LA IMAGEN) ════════ */}
      <div className="relative -mt-10 sm:-mt-14 md:-mt-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-10 z-20">
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xl p-2 sm:p-4">
          <dl className="grid grid-cols-1 md:grid-cols-3 divide-y divide-slate-100 md:divide-x md:divide-y-0">
            {/* 1. Unidad Líder (Dorado JA) */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Unidad líder actual</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">
                {liderActual ? liderActual.nombre : "Sin registrar"}
              </dd>
              <dd className="text-[11px] sm:text-xs text-amber-700 font-semibold mt-0.5 sm:mt-1">
                {liderActual ? `${liderActual.puntos.toLocaleString()} pts` : "0 pts"}
              </dd>
            </div>

            {/* 2. En competencia (Azul JA) */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">En competencia</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">
                {unidades.length} unidades
              </dd>
              <dd className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">Grupos activos en Villas Otoch</dd>
            </div>

            {/* 3. Puntuación general acumulada (Rojo JA) */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Puntuación acumulada</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">
                {puntosTotales.toLocaleString()} pts
              </dd>
              <dd className="text-[11px] sm:text-xs text-[#b71c1c] font-semibold mt-0.5 sm:mt-1">Acumulados en culto joven</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ════════ II. PODIO DE HONOR (TOP 3) FULL-WIDTH ════════ */}
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

        {gruposProcesados.length > 0 ? (
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
                  {liderActual ? liderActual.nombre : "—"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Líder: {liderActual ? liderActual.lider : "Disponible"}
                </p>
              </div>
              <div className="mt-5 border-t border-amber-200/80 pt-4">
                <span className="text-3xl font-black text-slate-900 tabular-nums block">
                  {liderActual ? liderActual.puntos.toLocaleString() : "0"} pts
                </span>
                <span className="text-xs text-slate-600 font-semibold block mt-0.5">
                  {liderActual ? `${liderActual.aciertos} preguntas acertadas` : "0 aciertos"}
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
                  {tercerLugar ? tercerLugar.nombre : "—"}
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

      {/* ════════ III. CLASIFICACIÓN GENERAL FULL-WIDTH ════════ */}
      <section className="border-t border-slate-200/80 bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Clasificación general
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Puntaje acumulado por respuestas correctas en la conexión bíblica
              </p>
            </div>

            {/* Buscador de unidades */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar unidad o líder..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#0d2b56] focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {gruposFiltrados.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="hidden md:grid grid-cols-12 items-center border-b border-slate-200 bg-slate-50 px-6 py-3.5 text-xs font-bold text-slate-600">
                <div className="col-span-1 text-center">Puesto</div>
                <div className="col-span-5">Unidad y líder</div>
                <div className="col-span-2 text-center">Preguntas acertadas</div>
                <div className="col-span-2 text-center">Diferencia al anterior</div>
                <div className="col-span-2 text-right">Puntos totales</div>
              </div>

              <div className="divide-y divide-slate-100">
                {gruposFiltrados.map((grupo) => {
                  const esPrimero = grupo.posicion === 1;

                  return (
                    <div
                      key={grupo.nombre}
                      className="p-3.5 sm:p-4 md:px-6 md:py-4 hover:bg-slate-50/70 transition-colors"
                    >
                      {/* ── Vista móvil (< md) ── */}
                      <div className="flex md:hidden items-center justify-between gap-3 w-full">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border ${
                              esPrimero
                                ? "bg-amber-100 text-amber-900 border-amber-300 font-black shadow-2xs"
                                : grupo.posicion === 2
                                ? "bg-slate-100 text-slate-700 border-slate-300"
                                : grupo.posicion === 3
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-white text-slate-500 border-slate-200"
                            }`}
                          >
                            {grupo.posicion}°
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                                {grupo.nombre}
                              </h3>
                              {esPrimero && (
                                <span className="rounded-md bg-amber-100 border border-amber-300 px-1.5 py-0.2 text-[10px] font-bold text-amber-900">
                                  Líder
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              Líder: <span className="text-slate-700">{grupo.lider}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base font-black text-slate-900 tabular-nums block leading-tight">
                            {grupo.puntos.toLocaleString()} pts
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                            {grupo.aciertos} acertadas
                          </span>
                          {!esPrimero && (
                            <span className="text-[10px] font-bold text-red-600 block mt-0.5">
                              {grupo.diferenciaAdelante === 0
                                ? "Empatado"
                                : `-${grupo.diferenciaAdelante} pts`}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ── Vista escritorio (>= md) ── */}
                      <div className="hidden md:grid md:grid-cols-12 items-center">
                        {/* Puesto */}
                        <div className="md:col-span-1 flex items-center justify-center">
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
                              esPrimero
                                ? "bg-amber-100 text-amber-900 border-amber-300 font-black"
                                : grupo.posicion === 2
                                ? "bg-slate-100 text-slate-700 border-slate-300"
                                : grupo.posicion === 3
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-white text-slate-500 border-slate-200"
                            }`}
                          >
                            {grupo.posicion}°
                          </div>
                        </div>

                        {/* Unidad y Líder */}
                        <div className="md:col-span-5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              {grupo.nombre}
                            </h3>
                            {esPrimero && (
                              <span className="rounded-md bg-amber-100 border border-amber-300 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                                Líder
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Líder: <span className="text-slate-700">{grupo.lider}</span>
                          </p>
                        </div>

                        {/* Preguntas acertadas */}
                        <div className="md:col-span-2 text-center text-xs">
                          <span className="font-semibold text-slate-800">
                            {grupo.aciertos} acertadas
                          </span>
                        </div>

                        {/* Diferencia en puntos con el grupo de adelante */}
                        <div className="md:col-span-2 text-center text-xs">
                          {esPrimero ? (
                            <span className="inline-block rounded-md bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                              Líder
                            </span>
                          ) : grupo.diferenciaAdelante === 0 ? (
                            <span className="inline-block rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                              Empatado con {grupo.nombreAdelante}
                            </span>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="font-bold text-red-600 tabular-nums">
                                -{grupo.diferenciaAdelante} pts
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">
                                de {grupo.nombreAdelante}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Puntos Totales */}
                        <div className="md:col-span-2 text-right">
                          <span className="text-lg font-black text-slate-900 tabular-nums">
                            {grupo.puntos.toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
              No se encontraron unidades que coincidan con la búsqueda.
            </div>
          )}
        </div>
      </section>

      {/* ════════ IV. DINÁMICA DE PUNTUACIÓN Y REGISTRO ════════ */}
      <section className="border-t border-slate-200/80 bg-slate-50/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center space-y-2 mb-10">
            <p className="text-xs font-semibold text-slate-500">
              Dinámica semanal
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              ¿Cómo se suman los puntos?
            </h2>
            <div className="pt-1">
              <AdornoJA />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              El avance de cada grupo sigue un ciclo continuo de preparación, participación sabatina y registro semanal:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs max-w-5xl mx-auto">
            {/* 1. Lectura en la semana */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200/80 p-2.5 text-[#0d2b56] mb-2">
                  <BookOpen size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  1. Lectura en la semana
                </h3>
                <p className="text-slate-600 leading-relaxed mt-1.5">
                  Los miembros leen los capítulos asignados en el calendario de domingo a sábado para llegar preparados con el contenido bíblico.
                </p>
              </div>
              <span className="inline-block text-[11px] font-semibold text-brand-primary bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 w-fit">
                Domingo a sábado
              </span>
            </div>

            {/* 2. Preguntas en el culto joven */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-red-300 transition-all flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200/80 p-2.5 text-[#b71c1c] mb-2">
                  <Award size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  2. Preguntas en el culto
                </h3>
                <p className="text-slate-600 leading-relaxed mt-1.5">
                  En el programa del culto joven, después de la dinámica se hace la conexión bíblica, dependiendo de cómo el director organice las preguntas para sumar puntos con tu grupo.
                </p>
              </div>
              <span className="inline-block text-[11px] font-semibold text-[#b71c1c] bg-red-50/70 px-2.5 py-1 rounded-md border border-red-200/60 w-fit">
                Culto joven sabatino
              </span>
            </div>

            {/* 3. Registro cada domingo */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-300/80 p-2.5 text-amber-900 mb-2">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  3. Registro cada domingo
                </h3>
                <p className="text-slate-600 leading-relaxed mt-1.5">
                  Cada domingo se registran oficialmente los puntos en el sistema y se actualiza la tabla de posiciones con el nuevo orden de los grupos.
                </p>
              </div>
              <span className="inline-block text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300/60 w-fit">
                Actualización domingos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ V. PIE DE PÁGINA INSTITUCIONAL ════════ */}
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