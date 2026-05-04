import { useState, useEffect } from "react";
import { DAILY_UPDATE_INTERVAL } from "@/constants/app";

export function useCurrentDate() {
  const [hoy, setHoy] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHoy(new Date());
    }, DAILY_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return hoy;
}
