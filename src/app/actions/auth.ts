"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  const cookieStore = await cookies();

  cookieStore.set("session_user", usuario.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("user_role", usuario.rol, {
    httpOnly: true,
    path: "/",
  });

  redirect("/admin/puntos");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user");
  cookieStore.delete("user_role");
  redirect("/");
}