"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type ToastType = "success" | "error";

export interface ToastState {
  type: ToastType;
  text: string;
}

interface UseToastOptions {
  duration?: number;
}

export function useToast({ duration = 4500 }: UseToastOptions = {}) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (type: ToastType, text: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setToast({ type, text });

      timerRef.current = setTimeout(() => {
        setToast(null);
        timerRef.current = null;
      }, duration);
    },
    [duration]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    toast,
    showToast,
    clearToast,
  };
}