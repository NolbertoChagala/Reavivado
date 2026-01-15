// Constantes de la aplicación
export const APP_NAME = "REAVIVADO";
export const APP_SUBTITLE = "por su palabra";
export const DAILY_UPDATE_INTERVAL = 60000; // 1 minuto

export const LABELS = {
  lecturaParaHoy: "Lectura para hoy",
  libro: "Libro",
  capitulo: "Capítulo",
  proximoDia: "Próximo día",
  versiculo: "Versículo del día",
  semanaActual: "Semana Actual",
  calendarioMensual: "Calendario Mensual",
  leerCapitulo: "Leer capítulo",
  hoy: "HOY",
} as const;

export const NAVIGATION_TABS = {
  dia: "DÍA",
  semana: "SEMANA",
  mes: "MES",
} as const;

export const VERSE_OF_DAY = {
  text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino",
  reference: "Salmos 119:105",
} as const;
