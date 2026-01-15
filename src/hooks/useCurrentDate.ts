// Hook para manejar la fecha en tiempo real
import { useState, useEffect } from "react";
import { DAILY_UPDATE_INTERVAL } from "@/constants/app";

export function useCurrentDate() {
  const [hoy, setHoy] = useState(new Date());

  useEffect(() => {
    // Actualizar la fecha cada minuto para reflejar cambios en tiempo real
    const interval = setInterval(() => {
      setHoy(new Date());
    }, DAILY_UPDATE_INTERVAL);

    // Limpiar intervalo al desmontar
    return () => clearInterval(interval);
  }, []);

  return hoy;
}
