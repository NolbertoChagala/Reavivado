"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/session";
import { RegistrarPuntajeSchema } from "@/lib/validations";

export async function registrarPuntaje(prevState: any, formData: FormData) {
  try {
    await assertAdmin();

    const rawData = {
      unidadId: formData.get("unidadId"),
      cantidad: formData.get("cantidad"),
      tipoOperacion: formData.get("tipoOperacion"),
    };

    const validationResult = RegistrarPuntajeSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0]?.message || "Datos no válidos.",
      };
    }

    const { unidadId, cantidad, tipoOperacion } = validationResult.data;

    if (tipoOperacion === "fijar") {
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: Math.max(0, cantidad) },
      });
    } else {
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: { increment: cantidad } },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/puntos");

    return { success: true, message: "¡Puntos actualizados correctamente!" };
  } catch (error: any) {
    console.error("Error al actualizar puntos:", error);
    return {
      success: false,
      message: error?.message?.includes("Acceso denegado")
        ? error.message
        : "Error al guardar. Intenta de nuevo.",
    };
  }
}