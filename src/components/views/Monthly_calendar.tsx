"use client";

import React, { useState, useMemo } from "react";
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
  Calendar as CalendarIcon,
  Info,
  BookOpen,
} from "lucide-react";
import { LABELS } from "@/constants/app";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

interface CalendarioMensualProps {
  fecha: Date;
  onSeleccionarFecha: (fecha: Date) => void;
}

export default function CalendarioMensual({ fecha, onSeleccionarFecha }: CalendarioMensualProps) {
  const [tipoVista, setTipoVista] = useState<"mes" | "semana">("mes");
  const [fechaFoco, setFechaFoco] = useState<Date>(fecha || new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(fecha || new Date());

  const hoy = new Date();

  // Calcular días de la vista mensual
  const inicioMes = startOfMonth(fechaFoco);
  const finMes = endOfMonth(fechaFoco);
  const semanaInicio = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const semanaFin = endOfWeek(finMes, { weekStartsOn: 0 });

  const diasMes = useMemo(() => {
    return eachDayOfInterval({ start: semanaInicio, end: semanaFin });
  }, [semanaInicio, semanaFin]);

  // Calcular días de la vista semanal
  const inicioSemana = startOfWeek(fechaFoco, { weekStartsOn: 0 });
  const finSemana = endOfWeek(fechaFoco, { weekStartsOn: 0 });

  const diasSemana = useMemo(() => {
    return eachDayOfInterval({ start: inicioSemana, end: finSemana });
  }, [inicioSemana, finSemana]);

  // Navegación Temporal
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

  // Lectura del día seleccionado (para el panel inferior móvil)
  const lecturaDiaSeleccionado = useMemo(() => {
    return obtenerLecturaPorFecha(diaSeleccionado);
  }, [diaSeleccionado]);

  const esSabadoDiaSeleccionado = getDay(diaSeleccionado) === 6;

  const [descargando, setDescargando] = useState(false);

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
        pixelRatio: 2, // Imagen Retina nítida para compartir e imprimir
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
    <div className="space-y-6 w-full animate-in fade-in duration-300">

      {/* Selector de Mes & Controles Minimalistas */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-white border border-slate-200/60 border-t-4 border-t-brand-primary rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-brand-primary shrink-0" size={24} />
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Cronograma General</h2>
            <p className="text-xs text-slate-400">Plan diario de estudio y actividades especiales JA.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          {/* Selector de Vista (Mensual/Semanal) */}
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/40">
            <button
              onClick={() => setTipoVista("mes")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider btn-transition ${tipoVista === "mes"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
                }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setTipoVista("semana")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider btn-transition ${tipoVista === "semana"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
                }`}
            >
              Semanal
            </button>
          </div>

          {/* Navegación Temporal */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAnterior}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-55 btn-transition active:scale-95 shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={handleHoy}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 btn-transition active:scale-95 shadow-sm"
            >
              Hoy
            </button>

            <span className="text-xs font-black uppercase tracking-wider min-w-[125px] text-center capitalize text-slate-800">
              {tipoVista === "mes"
                ? format(fechaFoco, "MMMM yyyy", { locale: es })
                : `Sem. ${format(inicioSemana, "d MMM", { locale: es })}`}
            </span>

            <button
              onClick={handleSiguiente}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-55 btn-transition active:scale-95 shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* CONTENIDO DE VISTAS */}

      {tipoVista === "mes" ? (
        /* VISTA MENSUAL */
        <div className="space-y-6">
          {/* CUADRÍCULA DE ESCRITORIO (Desktop Grid) */}
          <div className="hidden md:block bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden w-full">
            {/* Cabecera Días */}
            <div className="grid grid-cols-7 border-b border-slate-150 bg-slate-50/50">
              {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((diaNombre) => (
                <div key={diaNombre} className="py-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 text-center">
                  {diaNombre}
                </div>
              ))}
            </div>

            {/* Celdas */}
            <div className="grid grid-cols-7 gap-px bg-slate-150">
              {diasMes.map((dia) => {
                const esDiaDelMes = isSameMonth(dia, inicioMes);
                const esHoy = isSameDay(dia, hoy);
                const esSeleccionado = isSameDay(dia, diaSeleccionado);
                const esSabado = getDay(dia) === 6;
                const lectura = obtenerLecturaPorFecha(dia);

                return (
                  <button
                    key={dia.toString()}
                    onClick={() => setDiaSeleccionado(dia)}
                    className={`
                      relative flex flex-col p-3 transition-all min-h-[115px] text-left w-full hover:bg-slate-55/80 group
                      ${esDiaDelMes ? "bg-white" : "bg-slate-55/30 text-slate-355"}
                      ${esHoy ? "bg-red-50/20" : ""}
                      ${esSeleccionado ? "ring-2 ring-brand-primary ring-inset z-10" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-sm font-extrabold tabular-nums ${esHoy
                        ? "w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-xs"
                        : esDiaDelMes ? "text-slate-900" : "text-slate-300"
                        }`}>
                        {format(dia, "d")}
                      </span>

                      {/* Marcador de Sábado */}
                      {esSabado && esDiaDelMes && (
                        <span className="text-[8px] bg-amber-50 text-brand-gold border border-amber-200/60 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                          Conexión Bíblica
                        </span>
                      )}
                    </div>

                    {/* Lectura */}
                    {esDiaDelMes && (
                      <div className="mt-3 space-y-0.5 min-w-0">
                        <span className="text-[11px] font-bold text-slate-800 truncate block group-hover:text-brand-primary transition-colors">
                          {lectura.libro}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {LABELS.capitulo} {lectura.capitulo}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CUADRÍCULA MÓVIL COMPACTA (Mobile Grid) */}
          <div className="block md:hidden space-y-4">
            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-4">
              {/* Cabecera Días Cortos */}
              <div className="grid grid-cols-7 border-b border-slate-100 pb-2 mb-2">
                {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
                  <div key={idx} className="text-[9px] font-black text-slate-400 text-center uppercase">
                    {d}
                  </div>
                ))}
              </div>

              {/* Celdas Circulares Compactas */}
              <div className="grid grid-cols-7 gap-y-3">
                {diasMes.map((dia) => {
                  const esDiaDelMes = isSameMonth(dia, inicioMes);
                  const esHoy = isSameDay(dia, hoy);
                  const esSeleccionado = isSameDay(dia, diaSeleccionado);
                  const esSabado = getDay(dia) === 6;

                  // No renderizar días fuera de mes en móvil para evitar cluttering
                  if (!esDiaDelMes) {
                    return <div key={dia.toString()} className="h-9 w-9" />;
                  }

                  return (
                    <div key={dia.toString()} className="flex justify-center items-center">
                      <button
                        onClick={() => setDiaSeleccionado(dia)}
                        className={`
                          relative h-9 w-9 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all
                          ${esHoy ? "bg-brand-primary text-white" : ""}
                          ${esSeleccionado && !esHoy ? "border-2 border-brand-primary bg-slate-50 text-slate-900" : ""}
                          ${!esSeleccionado && !esHoy ? "text-slate-800 hover:bg-slate-100" : ""}
                        `}
                      >
                        <span>{format(dia, "d")}</span>

                        {/* Puntos Indicadores */}
                        {esSabado ? (
                          <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${esHoy ? "bg-amber-350" : "bg-brand-gold"
                            }`} />
                        ) : (
                          <span className={`absolute bottom-1 w-1 h-1 rounded-full ${esHoy ? "bg-white/70" : "bg-slate-355"
                            }`} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tarjeta Detalle de Celular (Cuadro de abajo de lectura) */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-wider capitalize">
                  {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
                </span>
                {esSabadoDiaSeleccionado && (
                  <span className="text-[8px] bg-amber-50 text-brand-gold border border-amber-200/60 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    Conexión Bíblica
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <BookOpen size={16} className="text-slate-500" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold leading-none">Lectura Oficial</span>
                  <span className="text-sm font-extrabold text-slate-900 mt-1 block">
                    {lecturaDiaSeleccionado.libro} {lecturaDiaSeleccionado.capitulo}
                  </span>
                </div>
              </div>

              {esSabadoDiaSeleccionado && (
                <div className="p-3 bg-amber-50/40 border border-amber-100/50 rounded-xl space-y-1">
                  <span className="block text-[9px] font-bold text-brand-gold uppercase tracking-wider">Conexión Bíblica e Itinerario</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Reunión oficial a las 17:00 hrs. Preludio musical a las 17:10 hrs con los directores.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* VISTA SEMANAL */
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {diasSemana.map((dia) => {
            const esHoy = isSameDay(dia, hoy);
            const esSeleccionado = isSameDay(dia, diaSeleccionado);
            const esSabado = getDay(dia) === 6;
            const lectura = obtenerLecturaPorFecha(dia);

            return (
              <button
                key={dia.toString()}
                onClick={() => setDiaSeleccionado(dia)}
                className={`
                  bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[140px] relative group border-slate-200/60 hover:border-brand-primary/40
                  ${esHoy ? "border-brand-primary border-2 bg-red-50/10 shadow-sm" : ""}
                  ${esSeleccionado && !esHoy ? "border-slate-450 border-2" : ""}
                `}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider capitalize">
                        {format(dia, "EEEE", { locale: es }).substring(0, 3)}
                      </span>
                      <span className="text-base font-black text-slate-900 tabular-nums">
                        {format(dia, "d")}
                      </span>
                    </div>

                    {esSabado && (
                      <span className="text-[8px] bg-amber-50 text-brand-gold border border-amber-200/60 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Conexión Bíblica
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-1">
                    <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-brand-primary transition-colors">
                      {lectura.libro}
                    </span>
                    <span className="text-[10px] text-slate-400 block leading-none">
                      {LABELS.capitulo} {lectura.capitulo}
                    </span>
                  </div>
                </div>

                {esHoy && (
                  <span className="absolute bottom-2 right-2 text-[8px] bg-brand-primary text-white font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
                    Hoy
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Acciones de Calendario y Descarga */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info size={14} />
          <span>Haz clic en "DESCARGAR CALENDARIO DEL MES" si deseas tener el calendario mensual en imagen.</span>
        </div>
        <button
          onClick={handleDescargarImagen}
          disabled={descargando}
          className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-55 btn-transition active:scale-95 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={14} />
          {descargando ? "Generando Imagen..." : "Descargar Calendario del Mes"}
        </button>
      </div>

      {/* Plantilla Oculta para Exportación (Alta Resolución) */}
      <div
        style={{ position: "absolute", top: "-9999px", left: "-9999px", width: "1050px" }}
        aria-hidden="true"
      >
        <div
          id="calendario-flyer-descargable"
          className="w-[1024px] bg-white p-8 space-y-6 flex flex-col border border-slate-100"
        >
          {/* Cabecera del Flyer con Logos Oficiales */}
          <div className="bg-slate-800 p-8 rounded-3xl text-white flex justify-between items-center shadow-md gap-4">

            {/* Lado Izquierdo: Logo Iglesia + Títulos */}
            <div className="flex items-center gap-4">
              <img
                src={logoadventista.src}
                alt="Iglesia Adventista"
                className="w-16 h-16 object-contain shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-xl font-black tracking-wider uppercase leading-none">
                  Reavivados por su Palabra
                </h1>
                <p className="text-xs text-slate-300 uppercase tracking-widest mt-2 font-bold leading-none">
                  Villas Otoch 4
                </p>
              </div>
            </div>

            {/* Lado Derecho: Mes de Estudio + Logo JA */}
            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block leading-none">
                  Plan de Lectura
                </span>
                <span className="text-xl font-black uppercase capitalize mt-2 block leading-none">
                  {format(fechaFoco, "MMMM yyyy", { locale: es })}
                </span>
              </div>
              <img
                src={JA.src}
                alt="JA"
                className="w-16 h-16 object-contain shrink-0"
              />
            </div>
          </div>

          {/* Cuadrícula Completa de 7 Columnas Desktop */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((diaNombre) => (
                <div key={diaNombre} className="py-4 text-xs font-black uppercase tracking-widest text-slate-500 text-center">
                  {diaNombre}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-200">
              {diasMes.map((dia) => {
                const esDiaDelMes = isSameMonth(dia, inicioMes);
                const lectura = obtenerLecturaPorFecha(dia);

                return (
                  <div
                    key={dia.toString()}
                    className={`
                      relative flex flex-col p-3 min-h-[145px] text-center bg-white justify-center items-center border border-slate-50
                      ${esDiaDelMes ? "" : "bg-slate-50/40 opacity-30"}
                    `}
                  >
                    {esDiaDelMes ? (
                      <div className="flex flex-col items-center justify-center space-y-2 w-full">
                        {/* Número del Día */}
                        <span className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                          {format(dia, "d")}
                        </span>

                        {/* Divisor Corto y Elegante */}
                        <div className="w-8 h-0.5 bg-brand-primary/20 rounded" />

                        {/* Libro y Capítulo */}
                        <div className="w-full px-1 min-w-0">
                          <span className="text-sm font-extrabold text-slate-800 block truncate uppercase tracking-tight">
                            {lectura.libro}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold block mt-1 leading-none">
                            {LABELS.capitulo} {lectura.capitulo}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Día fuera de mes: solo número tenue */
                      <span className="text-sm font-bold text-slate-300 tabular-nums">
                        {format(dia, "d")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pie de Página del Flyer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
            <span>Generado digitalmente por la aplicación Reavivado • Conexión Bíblica 2026</span>
            <span className="uppercase tracking-wider">Iglesia Adventista del Séptimo Día</span>
          </div>
        </div>
      </div>

    </div>
  );
}