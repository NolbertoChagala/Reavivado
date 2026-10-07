import { cookies } from "next/headers";

export const Role = {
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

function getSessionSecret(): string {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ERROR DE SEGURIDAD: La variable AUTH_SECRET no está definida en producción.");
    }
    return "dev-local-secret-key-reavivado-only-change-in-env";
  }

  return secret;
}

export interface SessionPayload {
  userId: string;
  role: Role;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getCryptoKey(): Promise<CryptoKey> {
  const secret = getSessionSecret();
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(value: string): Promise<string> {
  const key = await getCryptoKey();
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const json = JSON.stringify(payload);
  const enc = new TextEncoder();
  const base64Data = bytesToBase64Url(enc.encode(json));
  const signature = await sign(base64Data);
  return `${base64Data}.${signature}`;
}

export async function verifySessionToken(token?: string | null): Promise<SessionPayload | null> {
  if (!token) return null;
  const [base64Data, signature] = token.split(".");
  if (!base64Data || !signature) return null;

  try {
    const key = await getCryptoKey();
    const enc = new TextEncoder();
    const signatureBytes = base64UrlToBytes(signature);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as BufferSource,
      enc.encode(base64Data) as BufferSource
    );

    if (!isValid) return null;

    const dataBytes = base64UrlToBytes(base64Data);
    const dec = new TextDecoder();
    return JSON.parse(dec.decode(dataBytes)) as SessionPayload;
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
  if (!session || session.role !== Role.ADMIN) {
    throw new Error("Acceso denegado: Se requieren permisos de administrador.");
  }
  return session;
}