interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Limpieza periódica cada 10 minutos para prevenir acumulación de memoria
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }, 1000 * 60 * 10);
}

interface CheckRateLimitOptions {
  key: string;
  maxAttempts?: number;
  windowMs?: number;
}

export function checkRateLimit({
  key,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000,
}: CheckRateLimitOptions): { isBlocked: boolean; remainingMinutes: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || record.resetAt <= now) {
    return { isBlocked: false, remainingMinutes: 0 };
  }

  if (record.count >= maxAttempts) {
    const remainingMs = record.resetAt - now;
    const remainingMinutes = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));
    return { isBlocked: true, remainingMinutes };
  }

  return { isBlocked: false, remainingMinutes: 0 };
}

export function recordFailedAttempt({
  key,
  windowMs = 15 * 60 * 1000,
}: {
  key: string;
  windowMs?: number;
}): void {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || record.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
  } else {
    record.count += 1;
  }
}

export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}