import { librosBiblicos } from "@/data/plan";
import { differenceInDays, startOfDay, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import { es } from "date-fns/locale";

export function obtenerLecturaPorFecha(fecha: Date) {

    const fechaIniciPlan = startOfDay(new Date(2026, 0, 1));
    const fechaConsulta = startOfDay(fecha);
    const diasTranscurridos = differenceInDays(fechaConsulta, fechaIniciPlan);
  
    let capituloGlobal = 24 + diasTranscurridos;
    let libroIndex = 0;

    while (libroIndex < librosBiblicos.length) {
        const libro = librosBiblicos[libroIndex];
        
        if (capituloGlobal <= libro.capitulos) {
            return {
                libro: libro.nombre,
                capitulo: capituloGlobal,
                fecha: fechaConsulta
            }
        }
        
        capituloGlobal -= libro.capitulos;
        libroIndex++;
    }
    
    return {libro: "Fin del plan", capitulo: 0, fecha: fechaConsulta};
}

export function obtenerSemanaActual(fecha: Date) {
    const inicio = startOfWeek(fecha, { weekStartsOn: 0 });
    const fin = endOfWeek(fecha, { weekStartsOn: 0 });
    const dias = eachDayOfInterval({ start: inicio, end: fin });
    
    return dias.map(dia => {
        const lectura = obtenerLecturaPorFecha(dia);
        return {
            diaNombre: format(dia, 'EEEE', { locale: es }).toUpperCase(),
            numeroDia: dia.getDate(),
            libro: lectura.libro,
            capitulo: lectura.capitulo,
            fecha: dia
        };
    });
}
