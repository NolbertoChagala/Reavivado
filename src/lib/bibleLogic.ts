import { librosBiblicos } from "@/data/plan";
import {
  differenceInCalendarDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";
import { es } from "date-fns/locale";

const FECHA_INICIO_PLAN = new Date(2026, 0, 1);
const CAPITULO_INICIAL = 24;

export function obtenerLecturaPorFecha(fecha: Date) {
  const fechaConsulta = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate()
  );

  const diasTranscurridos = differenceInCalendarDays(
    fechaConsulta,
    FECHA_INICIO_PLAN
  );

  let capituloGlobal = CAPITULO_INICIAL + diasTranscurridos;

  if (capituloGlobal < 1) {
    return {
      libro: "Plan aún no iniciado",
      capitulo: 0,
      fecha: fechaConsulta,
    };
  }

  for (const libro of librosBiblicos) {
    if (capituloGlobal <= libro.capitulos) {
      return {
        libro: libro.nombre,
        capitulo: capituloGlobal,
        fecha: fechaConsulta,
      };
    }
    capituloGlobal -= libro.capitulos;
  }

  return {
    libro: "Fin del plan",
    capitulo: 0,
    fecha: fechaConsulta,
  };
}

export function obtenerSemanaActual(fecha: Date) {
  const inicio = startOfWeek(fecha, { weekStartsOn: 0 });
  const fin = endOfWeek(fecha, { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: inicio, end: fin });

  return dias.map((dia) => {
    const lectura = obtenerLecturaPorFecha(dia);
    const nombreBruto = format(dia, "EEEE", { locale: es });
    const diaNombre =
      nombreBruto.charAt(0).toUpperCase() + nombreBruto.slice(1).toLowerCase();

    return {
      diaNombre,
      numeroDia: dia.getDate(),
      libro: lectura.libro,
      capitulo: lectura.capitulo,
      fecha: dia,
    };
  });
}