"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { assertAdmin, Role } from "@/lib/session";
import { CrearUsuarioSchema, EliminarUsuarioSchema } from "@/lib/validations";
import type { ActionResult } from "@/types";
import { Prisma } from "@prisma/client";

export async function crearUsuario(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await assertAdmin();

    const rawData = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationResult = CrearUsuarioSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0]?.message || "Datos de usuario inválidos.",
      };
    }

    const { nombre, email, password } = validationResult.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: Role.ADMIN,
      },
    });

    revalidatePath("/admin/usuarios");
    return { success: true, message: "Usuario creado correctamente" };
  } catch (error: unknown) {
    console.error("Error al crear usuario:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        success: false,
        message: "Error: El correo electrónico ya se encuentra registrado.",
      };
    }
    const msg = error instanceof Error ? error.message : "";
    return {
      success: false,
      message: msg.includes("Acceso denegado")
        ? msg
        : "Error al registrar usuario.",
    };
  }
}

export async function eliminarUsuario(usuarioId: string): Promise<ActionResult> {
  try {
    const session = await assertAdmin();

    const validationResult = EliminarUsuarioSchema.safeParse(usuarioId);
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0]?.message || "Identificador inválido.",
      };
    }

    const validId = validationResult.data;

    if (session.userId === validId) {
      return {
        success: false,
        message: "Operación rechazada: No puedes eliminar tu propia cuenta activa.",
      };
    }

    await prisma.usuario.delete({
      where: { id: validId },
    });

    revalidatePath("/admin/usuarios");
    return {
      success: true,
      message: "Cuenta de acceso eliminada correctamente.",
    };
  } catch (error: unknown) {
    console.error("Error al eliminar usuario:", error);
    const msg = error instanceof Error ? error.message : "";
    return {
      success: false,
      message: msg.includes("Acceso denegado")
        ? msg
        : "Error al intentar revocar la cuenta.",
    };
  }
}