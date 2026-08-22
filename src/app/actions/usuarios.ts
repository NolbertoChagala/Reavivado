"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

// El primer argumento 'prevState' es obligatorio para usarlo con useActionState
export async function crearUsuario(prevState: any, formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rol = formData.get("rol") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
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
  } catch (error) {
    return { success: false, message: "Error: El correo ya existe." , error };
  }
}

export async function eliminarUsuario(usuarioId: string) {
  try {
    await prisma.usuario.delete({
      where: { id: usuarioId }
    });
    revalidatePath("/admin/usuarios");
    return { success: true, message: "Cuenta de acceso eliminada correctamente." };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { success: false, message: "Error al intentar revocar la cuenta." };
  }
}