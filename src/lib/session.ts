import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_SECRET = process.env.AUTH_SECRET || "reavivado-secret-key-super-secure-change-in-production";

interface SessionPayload {
  userId: string;
  role: string;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function createSessionToken(payload: SessionPayload): string {
  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString("base64url");
  const signature = sign(base64);
  return `${base64}.${signature}`;
}

export function verifySessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const [base64, signature] = token.split(".");
  if (!base64 || !signature) return null;

  const expectedSignature = sign(base64);
  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  try {
    const json = Buffer.from(base64, "base64url").toString("utf-8");
    return JSON.parse(json) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session")?.value;
  return verifySessionToken(token);
}

export async function assertAdmin(): Promise<SessionPayload> {
  const session = await getCurrentSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Acceso denegado: Se requieren permisos de administrador.");
  }
  return session;
}