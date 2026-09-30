"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/session";

export async function registrarPuntaje(prevState: any, formData: FormData) {
  try {
    await assertAdmin();

    const unidadId = formData.get("unidadId") as string;
    const cantidadStr = formData.get("cantidad") as string;
    const tipoOperacion = formData.get("tipoOperacion") as string;

    const cantidad = parseInt(cantidadStr, 10);

    if (isNaN(cantidad)) {
      return { success: false, message: "La cantidad debe ser un número válido." };
    }

    if (!unidadId) {
      return { success: false, message: "Identificador de unidad no válido." };
    }

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
        : "Error al guardar. Intenta de nuevo." 
    };
  }
}