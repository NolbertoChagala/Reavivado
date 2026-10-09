"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, Role } from "@/lib/session";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    return { error: "Credenciales inválidas" };
  }

  const passwordMatch = await bcrypt.compare(password, usuario.password);
  if (!passwordMatch) {
    return { error: "Credenciales inválidas" };
  }

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

  redirect("/admin/puntos");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  redirect("/");
}
