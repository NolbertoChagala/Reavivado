"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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
} from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarHeader,
  CalendarMetricsBridge,
  CalendarControls,
  CalendarMonthGrid,
  CalendarWeekGrid,
  CalendarFlyerTemplate,
} from "./components";
import LeadershipFooter from "@/components/layout/LeadershipFooter";

interface CalendarViewProps {
  fecha: Date;
  onSeleccionarFecha: (fecha: Date) => void;
}

const STORAGE_KEY_LECTURAS = "reavivado_lecturas_check";

export default function CalendarView({ fecha, onSeleccionarFecha }: CalendarViewProps) {
  const [tipoVista, setTipoVista] = useState<"mes" | "semana">("mes");
  const [fechaFoco, setFechaFoco] = useState<Date>(() => fecha || new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(() => fecha || new Date());
  const [descargando, setDescargando] = useState(false);
  const [mostrarFlyer, setMostrarFlyer] = useState(false);
  const [lecturasCompletadas, setLecturasCompletadas] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const checksGuardados = localStorage.getItem(STORAGE_KEY_LECTURAS);
      if (checksGuardados) {
        setLecturasCompletadas(JSON.parse(checksGuardados));
      }
    } catch {
    }
  }, []);

  const handleToggleLectura = useCallback((fechaKey: string) => {
    setLecturasCompletadas((prev) => {
      const actualizado = { ...prev, [fechaKey]: !prev[fechaKey] };
      try {
        localStorage.setItem(STORAGE_KEY_LECTURAS, JSON.stringify(actualizado));
      } catch {
      }
      return actualizado;
    });
  }, []);

  const hoy = useMemo(() => new Date(), []);

  // Rangos de fecha mensual memoizados
  const { inicioMes, diasMes } = useMemo(() => {
    const inicio = startOfMonth(fechaFoco);
    const fin = endOfMonth(fechaFoco);
    const semanaInicio = startOfWeek(inicio, { weekStartsOn: 0 });
    const semanaFin = endOfWeek(fin, { weekStartsOn: 0 });

    return {
      inicioMes: inicio,
      diasMes: eachDayOfInterval({ start: semanaInicio, end: semanaFin }),
    };
  }, [fechaFoco]);

  // Rangos de fecha semanal memoizados
  const { inicioSemana, diasSemana } = useMemo(() => {
    const inicio = startOfWeek(fechaFoco, { weekStartsOn: 0 });
    const fin = endOfWeek(fechaFoco, { weekStartsOn: 0 });

    return {
      inicioSemana: inicio,
      diasSemana: eachDayOfInterval({ start: inicio, end: fin }),
    };
  }, [fechaFoco]);

  const handleAnterior = () => {
    setFechaFoco((prev) => (tipoVista === "mes" ? subMonths(prev, 1) : subWeeks(prev, 1)));
  };

  const handleSiguiente = () => {
    setFechaFoco((prev) => (tipoVista === "mes" ? addMonths(prev, 1) : addWeeks(prev, 1)));
  };

  const handleHoy = () => {
    const d = new Date();
    setFechaFoco(d);
    setDiaSeleccionado(d);
  };

  const handleDescargarImagen = async () => {
    if (descargando) return;
    setDescargando(true);
    setMostrarFlyer(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const { toPng } = await import("html-to-image");
      const node = document.getElementById("calendario-flyer-descargable");
      if (!node) {
        throw new Error("Elemento del flyer no disponible en el DOM");
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
      setMostrarFlyer(false);
      setDescargando(false);
    }
  };

  return (
    <div className="w-full select-none bg-slate-50 font-sans text-slate-800">
      <CalendarHeader />
      <CalendarMetricsBridge />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="space-y-6">
          <CalendarControls
            tipoVista={tipoVista}
            onTipoVistaChange={setTipoVista}
            fechaFoco={fechaFoco}
            inicioSemana={inicioSemana}
            onAnterior={handleAnterior}
            onSiguiente={handleSiguiente}
            onHoy={handleHoy}
            onDescargarFlyer={handleDescargarImagen}
            descargando={descargando}
          />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {tipoVista === "mes" ? (
              <CalendarMonthGrid
                diasMes={diasMes}
                inicioMes={inicioMes}
                hoy={hoy}
                diaSeleccionado={diaSeleccionado}
                lecturasCompletadas={lecturasCompletadas}
                onSeleccionarDia={(dia) => {
                  setDiaSeleccionado(dia);
                  onSeleccionarFecha(dia);
                }}
                onToggleLectura={handleToggleLectura}
                onIrAInicio={(dia) => onSeleccionarFecha(dia)}
              />
            ) : (
              <CalendarWeekGrid
                diasSemana={diasSemana}
                hoy={hoy}
                diaSeleccionado={diaSeleccionado}
                lecturasCompletadas={lecturasCompletadas}
                onToggleLectura={handleToggleLectura}
              />
            )}
          </div>
        </div>
      </section>

      <LeadershipFooter />

      {mostrarFlyer && (
        <CalendarFlyerTemplate
          fechaFoco={fechaFoco}
          inicioMes={inicioMes}
          diasMes={diasMes}
        />
      )}
    </div>
  );
}