"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { obtenerLecturaPorFecha } from "@/lib/bibleLogic";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { LABELS } from "@/constants/app";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

interface CalendarioMensualProps {
  fecha: Date;
  onSeleccionarFecha: (fecha: Date) => void;
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

export default function CalendarioMensual({ fecha, onSeleccionarFecha }: CalendarioMensualProps) {
  const [tipoVista, setTipoVista] = useState<"mes" | "semana">("mes");
  const [fechaFoco, setFechaFoco] = useState<Date>(fecha || new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(fecha || new Date());
  const [descargando, setDescargando] = useState(false);
  const [lecturasCompletadas, setLecturasCompletadas] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const checksGuardados = localStorage.getItem("reavivado_lecturas_check");
      if (checksGuardados) {
        setLecturasCompletadas(JSON.parse(checksGuardados));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggleLectura = (fechaKey: string) => {
    setLecturasCompletadas((prev) => {
      const actualizado = { ...prev, [fechaKey]: !prev[fechaKey] };
      try {
        localStorage.setItem("reavivado_lecturas_check", JSON.stringify(actualizado));
      } catch {
        // ignore
      }
      return actualizado;
    });
  };

  const hoy = new Date();

  // Calcular días de la vista mensual (semana empieza en Domingo = 0)
  const inicioMes = startOfMonth(fechaFoco);
  const finMes = endOfMonth(fechaFoco);
  const semanaInicio = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(finMes, { weekStartsOn: 0 });

  const diasMes = useMemo(() => {
    return eachDayOfInterval({ start: semanaInicio, end: semanaFin });
  }, [semanaInicio, semanaFin]);

  // Calcular días de la vista semanal (Domingo a Sábado)
  const inicioSemana = startOfWeek(fechaFoco, { weekStartsOn: 0 });
  const finSemana = endOfWeek(fechaFoco, { weekStartsOn: 0 });

  const diasSemana = useMemo(() => {
    return eachDayOfInterval({ start: inicioSemana, end: finSemana });
  }, [inicioSemana, finSemana]);

  // Navegación temporal
  const handleAnterior = () => {
    if (tipoVista === "mes") {
      setFechaFoco(subMonths(fechaFoco, 1));
    } else {
      setFechaFoco(subWeeks(fechaFoco, 1));
    }
  };

  const handleSiguiente = () => {
    if (tipoVista === "mes") {
      setFechaFoco(addMonths(fechaFoco, 1));
    } else {
      setFechaFoco(addWeeks(fechaFoco, 1));
    }
  };

  const handleHoy = () => {
    const d = new Date();
    setFechaFoco(d);
    setDiaSeleccionado(d);
  };

  // Lectura del día seleccionado
  const lecturaDiaSeleccionado = useMemo(() => {
    return obtenerLecturaPorFecha(diaSeleccionado);
  }, [diaSeleccionado]);

  const esSabadoDiaSeleccionado = getDay(diaSeleccionado) === 6;
  const fechaKeySeleccionada = format(diaSeleccionado, "yyyy-MM-dd");
  const diaSeleccionadoLeido = !!lecturasCompletadas[fechaKeySeleccionada];

  // Descarga flyer
  const handleDescargarImagen = async () => {
    if (descargando) return;
    setDescargando(true);
    try {
      const { toPng } = await import("html-to-image");
      const node = document.getElementById("calendario-flyer-descargable");
      if (!node) {
        console.error("No se encontró el elemento para descargar");
        setDescargando(false);
        return;
      }

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      const nombreMes = format(fechaFoco, "MMMM_yyyy", { locale: es });
      link.download = `Cronograma_Lecturas_${nombreMes}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error al exportar calendario como imagen:", error);
      alert("Hubo un error al generar la imagen. Intenta de nuevo.");
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      {/* ════════ I. CABECERA INSTITUCIONAL JA: AZUL, ROJO, BLANCO Y DORADO ════════ */}
      <header
        className="relative bg-[#0a1931] bg-cover bg-center text-white w-full overflow-hidden"
        style={{
          backgroundImage: `url('/img/bg_calendario.jpg')`,
          backgroundPosition: "center 35%",
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

        {/* Contenido amplio y espacioso de la cabecera (SIN cajas que tapen o corten el escritorio bíblico) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-36 text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif drop-shadow-md">
              Calendario de lecturas
            </h1>

            <div className="pt-0.5 sm:pt-1">
              <AdornoJA />
            </div>

            <p className="text-sm sm:text-lg md:text-xl text-amber-300 font-medium tracking-wide">
              Distribución diaria de citas bíblicas
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs px-2 sm:px-0">
              La programación de capítulos por fecha orienta el estudio personal y la preparación semanal de cada unidad.
            </p>

            <div className="pt-1 sm:pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 sm:px-5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md shadow-sm">
                <span>Sociedad JA · Villas Otoch 4</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ════════ II. PUENTE DE INDICADORES FLOTANTE (SIN CORTAR LA IMAGEN) ════════ */}
      <div className="relative -mt-10 sm:-mt-14 md:-mt-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-10 z-20">
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xl p-2 sm:p-4">
          <dl className="grid grid-cols-1 md:grid-cols-3 divide-y divide-slate-100 md:divide-x md:divide-y-0">
            {/* 1. Cita bíblica diaria */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Cita bíblica diaria</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">Capítulo del día</dd>
              <dd className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">Revisa qué lectura corresponde a cada fecha</dd>
            </div>

            {/* 2. Meta de estudio */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Meta de estudio</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">1 capítulo diario</dd>
              <dd className="text-[11px] sm:text-xs text-amber-700 font-semibold mt-0.5 sm:mt-1">Lectura individual y preparación</dd>
            </div>

            {/* 3. Programa general y preguntas */}
            <div className="p-3 sm:p-5 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold text-slate-500">Programa sabatino</dt>
              <dd className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-[#0d2b56]">4:30 – 6:20 p. m.</dd>
              <dd className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">Preguntas dentro del culto joven</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ════════ II. PANEL DE CALENDARIO Y CONTROLES FULL-WIDTH ════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="space-y-6">
          {/* Barra de controles y navegación */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
            {/* Selector de modo mensual / semanal */}
            <div className="flex w-full sm:w-auto bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setTipoVista("mes")}
                className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tipoVista === "mes"
                    ? "bg-[#0d2b56] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Vista mensual
              </button>
              <button
                onClick={() => setTipoVista("semana")}
                className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tipoVista === "semana"
                    ? "bg-[#0d2b56] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Vista semanal
              </button>
            </div>

            {/* Navegador temporal */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1 sm:gap-2">
              <button
                onClick={handleAnterior}
                className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={handleHoy}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl hover:bg-slate-100 transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                Hoy
              </button>

              <span className="flex-1 sm:flex-none sm:min-w-[150px] text-center font-bold capitalize text-slate-900 text-xs sm:text-sm px-1 truncate">
                {tipoVista === "mes"
                  ? format(fechaFoco, "MMMM yyyy", { locale: es })
                  : `Semana ${format(inicioSemana, "d MMM", { locale: es })}`}
              </span>

              <button
                onClick={handleSiguiente}
                className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Botón descargar flyer */}
            <button
              onClick={handleDescargarImagen}
              disabled={descargando}
              className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Download size={14} className="text-slate-500" />
              <span>{descargando ? "Generando..." : "Descargar flyer"}</span>
            </button>
          </div>

          {/* Cuadrícula de calendario extendida */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {tipoVista === "mes" ? (
              <div>
                {/* DESKTOP GRID */}
                <div className="hidden md:block">
                  {/* Cabecera días de la semana (Domingo a Sábado) */}
                  <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-600 text-center">
                    {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
                      (diaNombre, idx) => (
                        <div
                          key={diaNombre}
                          className={`py-3.5 ${idx === 6 ? "bg-amber-100/50 text-amber-900 font-bold" : ""}`}
                        >
                          {diaNombre}
                        </div>
                      )
                    )}
                  </div>

                  {/* Celdas del calendario extendidas */}
                  <div className="grid grid-cols-7 gap-px bg-slate-200">
                    {diasMes.map((dia) => {
                      const esDiaDelMes = isSameMonth(dia, inicioMes);
                      const esHoy = isSameDay(dia, hoy);
                      const esSeleccionado = isSameDay(dia, diaSeleccionado);
                      const esSabado = getDay(dia) === 6;
                      const lectura = obtenerLecturaPorFecha(dia);
                      const fKey = format(dia, "yyyy-MM-dd");
                      const estaLeido = !!lecturasCompletadas[fKey];

                      return (
                        <button
                          key={dia.toString()}
                          onClick={() => {
                            setDiaSeleccionado(dia);
                            onSeleccionarFecha(dia);
                          }}
                          className={`relative flex flex-col p-3.5 transition-all min-h-[115px] text-left w-full cursor-pointer ${
                            esDiaDelMes ? "bg-white hover:bg-slate-50/80" : "bg-slate-50/60 text-slate-300"
                          } ${esHoy ? "bg-blue-50/40 font-bold" : ""} ${
                            esSeleccionado ? "ring-2 ring-[#0d2b56] ring-inset z-10 bg-amber-50/40" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={`text-xs font-bold tabular-nums ${
                                esHoy
                                  ? "h-5 w-5 rounded-full bg-[#0d2b56] text-white flex items-center justify-center text-[11px] font-black shadow-xs"
                                  : esDiaDelMes
                                  ? "text-slate-900"
                                  : "text-slate-300"
                              }`}
                            >
                              {format(dia, "d")}
                            </span>

                            <div className="flex items-center gap-1">
                              {estaLeido && (
                                <CheckCircle2 size={13} className="text-emerald-600" />
                              )}
                              {esSabado && esDiaDelMes && (
                                <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-300/60 font-semibold px-1.5 py-0.5 rounded shadow-2xs">
                                  Culto joven
                                </span>
                              )}
                            </div>
                          </div>

                          {esDiaDelMes && (
                            <div className="mt-2.5 space-y-0.5 min-w-0">
                              <span className="text-xs font-bold text-slate-800 truncate block font-serif">
                                {lectura.libro}
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                Capítulo {lectura.capitulo}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MÓVIL: GRID COMPACTO + TARJETA DEL DÍA SELECCIONADO */}
                <div className="block md:hidden p-3.5 sm:p-4 space-y-3.5">
                  <div className="grid grid-cols-7 border-b border-slate-100 pb-2 mb-1 text-center text-xs font-bold text-slate-400">
                    {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
                      <div key={idx} className={idx === 6 ? "text-amber-800 font-bold" : ""}>
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-y-1.5 place-items-center">
                    {diasMes.map((dia) => {
                      const esDiaDelMes = isSameMonth(dia, inicioMes);
                      const esHoy = isSameDay(dia, hoy);
                      const esSeleccionado = isSameDay(dia, diaSeleccionado);
                      const esSabado = getDay(dia) === 6;
                      const fKey = format(dia, "yyyy-MM-dd");
                      const estaLeido = !!lecturasCompletadas[fKey];

                      if (!esDiaDelMes) {
                        return <div key={dia.toString()} className="h-8 w-8 sm:h-9 sm:w-9" />;
                      }

                      return (
                        <div key={dia.toString()} className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              setDiaSeleccionado(dia);
                              onSeleccionarFecha(dia);
                            }}
                            className={`relative h-8 w-8 sm:h-9 sm:w-9 rounded-full flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                              esHoy ? "bg-[#0d2b56] text-white shadow-xs font-black" : ""
                            } ${
                              esSeleccionado && !esHoy
                                ? "border-2 border-[#0d2b56] bg-amber-50 text-slate-900 font-bold"
                                : ""
                            } ${!esSeleccionado && !esHoy ? "text-slate-800 hover:bg-slate-100" : ""}`}
                          >
                            <span>{format(dia, "d")}</span>
                            {estaLeido && !esHoy && (
                              <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            )}
                            {esSabado && (
                              <span
                                className={`absolute bottom-0.5 h-1.5 w-1.5 rounded-full ${
                                  esHoy ? "bg-amber-300" : "bg-amber-500"
                                }`}
                              />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tarjeta móvil del día seleccionado */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:p-3.5 space-y-2.5 mt-2">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="text-xs font-bold text-slate-900 capitalize">
                        {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
                      </span>
                      {esSabadoDiaSeleccionado && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-300/60">
                          Culto joven 4:30 p. m.
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
                        <BookOpen size={18} className="text-[#0d2b56]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] text-slate-500 block">Lectura asignada</span>
                        <p className="text-sm font-bold text-slate-900 font-serif truncate">
                          {lecturaDiaSeleccionado.libro} capítulo {lecturaDiaSeleccionado.capitulo}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleLectura(fechaKeySeleccionada)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          diaSeleccionadoLeido
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <CheckCircle2 size={13} className={diaSeleccionadoLeido ? "text-emerald-700" : "text-slate-400"} />
                        <span>{diaSeleccionadoLeido ? "Leído" : "Marcar como leído"}</span>
                      </button>

                      <button
                        onClick={() => onSeleccionarFecha(diaSeleccionado)}
                        className="py-2 px-3.5 bg-[#0d2b56] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
                      >
                        <span>Ver en inicio</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* VISTA SEMANAL (DOMINGO A SÁBADO) */
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-7 gap-3">
                {diasSemana.map((dia) => {
                  const esHoy = isSameDay(dia, hoy);
                  const esSeleccionado = isSameDay(dia, diaSeleccionado);
                  const esSabado = getDay(dia) === 6;
                  const lectura = obtenerLecturaPorFecha(dia);
                  const fKey = format(dia, "yyyy-MM-dd");
                  const estaLeido = !!lecturasCompletadas[fKey];

                  return (
                    <div
                      key={dia.toString()}
                      className={`rounded-xl border p-3.5 text-left flex flex-col justify-between min-h-[140px] transition-all ${
                        esHoy
                          ? "border-[#0d2b56] border-2 bg-blue-50/20 shadow-xs"
                          : esSeleccionado
                          ? "border-amber-400 border-2 bg-amber-50/30"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <div>
                            <span className="text-[11px] font-medium text-slate-400 capitalize block">
                              {format(dia, "EEEE", { locale: es }).substring(0, 3)}
                            </span>
                            <span className="text-sm font-black text-slate-900 tabular-nums">
                              {format(dia, "d")}
                            </span>
                          </div>
                          {esSabado ? (
                            <span className="text-[9px] bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.5 rounded">
                              Culto joven
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-400">
                              Estudio
                            </span>
                          )}
                        </div>

                        <div className="mt-2 space-y-0.5">
                          <span className="text-xs font-bold text-slate-800 block truncate font-serif">
                            {lectura.libro}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            Capítulo {lectura.capitulo}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleToggleLectura(fKey)}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-all ${
                            estaLeido
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <CheckCircle2 size={11} className={estaLeido ? "text-emerald-700" : "text-slate-400"} />
                          <span>{estaLeido ? "Leído" : "Check"}</span>
                        </button>

                        {esHoy && (
                          <span className="rounded-md bg-[#0d2b56] px-1.5 py-0.5 text-[9px] font-bold text-white">
                            Hoy
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════ III. PIE DE PÁGINA INSTITUCIONAL ════════ */}
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

      {/* ── PLANTILLA OCULTA PARA DESCARGA DE FLYER PNG ── */}
      <div
        style={{ position: "absolute", top: "-9999px", left: "-9999px", width: "1050px" }}
        aria-hidden="true"
      >
        <div
          id="calendario-flyer-descargable"
          className="w-[1024px] bg-white p-8 space-y-6 flex flex-col border border-slate-100 font-sans"
        >
          <div className="bg-[#0a1931] p-8 rounded-3xl text-white flex justify-between items-center shadow-md gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={logoadventista}
                alt="Iglesia Adventista"
                width={64}
                height={64}
                className="w-16 h-16 object-contain shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-xl font-bold tracking-tight">
                  Reavivados por su palabra
                </h1>
                <p className="text-xs text-amber-300 mt-1 font-semibold">
                  Sociedad JA · Villas Otoch 4
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col justify-center">
                <span className="text-xs font-medium text-white/80 block">
                  Plan de lectura
                </span>
                <span className="text-xl font-bold capitalize mt-1 block">
                  {format(fechaFoco, "MMMM yyyy", { locale: es })}
                </span>
              </div>
              <Image
                src={JA}
                alt="Logo JA"
                width={64}
                height={64}
                className="w-16 h-16 object-contain shrink-0"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
                (diaNombre) => (
                  <div
                    key={diaNombre}
                    className="py-3 text-xs font-bold text-slate-600 text-center"
                  >
                    {diaNombre}
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-200">
              {diasMes.map((dia) => {
                const esDiaDelMes = isSameMonth(dia, inicioMes);
                const lectura = obtenerLecturaPorFecha(dia);

                return (
                  <div
                    key={dia.toString()}
                    className={`relative flex flex-col p-3 min-h-[145px] text-center bg-white justify-center items-center border border-slate-50 ${
                      esDiaDelMes ? "" : "bg-slate-50/40 opacity-30"
                    }`}
                  >
                    {esDiaDelMes ? (
                      <div className="flex flex-col items-center justify-center space-y-2 w-full">
                        <span className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                          {format(dia, "d")}
                        </span>
                        <div className="w-8 h-0.5 bg-slate-400 rounded" />
                        <div className="w-full px-1 min-w-0">
                          <span className="text-sm font-bold text-slate-800 block truncate font-serif">
                            {lectura.libro}
                          </span>
                          <span className="text-xs text-slate-500 font-medium block mt-1 leading-none">
                            {LABELS.capitulo} {lectura.capitulo}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-300 tabular-nums">
                        {format(dia, "d")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
            <span>Generado por la aplicación Reavivado por su palabra</span>
            <span>Iglesia Adventista del Séptimo Día</span>
          </div>
        </div>
      </div>
    </div>
  );
}