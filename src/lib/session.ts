import { cookies } from "next/headers";

const SESSION_SECRET =
  process.env.AUTH_SECRET || "reavivado-secret-key-super-secure-change-in-production";

export interface SessionPayload {
  userId: string;
  role: string;
}

// Codificación segura Base64URL compatible con Edge y Browser
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

// Obtener clave HMAC usando Web Crypto
async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Firmar datos con Web Crypto
async function sign(value: string): Promise<string> {
  const key = await getCryptoKey();
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

// Crear token firmado
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const json = JSON.stringify(payload);
  const enc = new TextEncoder();
  const base64Data = bytesToBase64Url(enc.encode(json));
  const signature = await sign(base64Data);
  return `${base64Data}.${signature}`;
}

// Verificar token firmado (timing-safe nativo de Web Crypto)
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
      signatureBytes,
      enc.encode(base64Data)
    );

    if (!isValid) return null;

    const dataBytes = base64UrlToBytes(base64Data);
    const dec = new TextDecoder();
    return JSON.parse(dec.decode(dataBytes)) as SessionPayload;
  } catch {
    return null;
  }
}

// Obtener sesión en Server Components y Server Actions
export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session")?.value;
  return verifySessionToken(token);
}

// Guardia de seguridad para Server Actions
export async function assertAdmin(): Promise<SessionPayload> {
  const session = await getCurrentSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Acceso denegado: Se requieren permisos de administrador.");
  }
  return session;
}