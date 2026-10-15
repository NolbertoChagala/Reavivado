"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, Role } from "@/lib/session";
import { LoginSchema } from "@/lib/validations";
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from "@/lib/rate-limit";

export async function login(prevState: any, formData: FormData) {
  const rawEmail = (formData.get("email") as string) || "";
  const rawPassword = (formData.get("password") as string) || "";

  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";
  const rateLimitKey = `login:${clientIp}:${rawEmail.trim().toLowerCase()}`;

  const { isBlocked, remainingMinutes } = checkRateLimit({ key: rateLimitKey });
  if (isBlocked) {
    return {
      error: `Demasiados intentos fallidos. Por seguridad, espera ${remainingMinutes} minuto(s) antes de intentar nuevamente.`,
    };
  }

  const validationResult = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.issues[0]?.message || "Credenciales inválidas.",
    };
  }

  const { email, password } = validationResult.data;

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    recordFailedAttempt({ key: rateLimitKey });
    return { error: "Credenciales inválidas." };
  }

  const passwordMatch = await bcrypt.compare(password, usuario.password);
  if (!passwordMatch) {
    recordFailedAttempt({ key: rateLimitKey });
    return { error: "Credenciales inválidas." };
  }

  resetRateLimit(rateLimitKey);

  const sessionToken = await createSessionToken({
    userId: usuario.id,
    role: usuario.rol as Role,
  });

  const cookieStore = await cookies();

  cookieStore.set("auth_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  redirect("/");
}