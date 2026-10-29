export const APP_NAME = "REAVIVADO";
export const APP_SUBTITLE = "por su palabra";
export const DAILY_UPDATE_INTERVAL = 60000;

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
  text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas",
  reference: "Josué 1:9",
} as const;

export const JA_SCORING_RULES = {
  POINTS_PER_QUESTION: 10,
  STEP_INTERVAL: 10,
  QUICK_PRESETS: [10, 20, 30, 50] as const,
  CRITERION_LABEL: "Acierto por pregunta contestada",
  CRITERION_BADGE: "+10 pts por pregunta respondida",
  CRITERION_DESCRIPTION:
    "Cada pregunta respondida correctamente por la unidad suma 10 puntos al acumulado oficial.",
} as const;