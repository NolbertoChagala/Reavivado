"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/session";

export async function crearUsuario(prevState: any, formData: FormData) {
  try {
    await assertAdmin();

    const nombre = (formData.get("nombre") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;
    const rol = (formData.get("rol") as string) || "ADMIN";

    if (!nombre || !email || !password) {
      return { success: false, message: "Todos los campos son obligatorios." };
    }

    if (password.length < 6) {
      return { success: false, message: "La contraseña debe tener al menos 6 caracteres." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol,
      },
    });

    revalidatePath("/admin/usuarios");
    return { success: true, message: "Usuario creado correctamente" };
  } catch (error: any) {
    console.error("Error al crear usuario:", error);
    if (error?.code === "P2002") {
      return { success: false, message: "Error: El correo electrónico ya se encuentra registrado." };
    }
    return { 
      success: false, 
      message: error?.message?.includes("Acceso denegado") 
        ? error.message 
        : "Error al registrar usuario." 
    };
  }
}

export async function eliminarUsuario(usuarioId: string) {
  try {
    const session = await assertAdmin();

    if (session.userId === usuarioId) {
      return { 
        success: false, 
        message: "Operación rechazada: No puedes eliminar tu propia cuenta activa." 
      };
    }

    await prisma.usuario.delete({
      where: { id: usuarioId },
    });

    revalidatePath("/admin/usuarios");
    return { success: true, message: "Cuenta de acceso eliminada correctamente." };
  } catch (error: any) {
    console.error("Error al eliminar usuario:", error);
    return { 
      success: false, 
      message: error?.message?.includes("Acceso denegado") 
        ? error.message 
        : "Error al intentar revocar la cuenta." 
    };
  }
}