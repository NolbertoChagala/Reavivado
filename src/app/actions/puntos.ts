'use server'
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function registrarPuntaje(prevState: any, formData: FormData) {
  const unidadId = formData.get("unidadId") as string;
  const cantidadStr = formData.get("cantidad") as string;
  const tipoOperacion = formData.get("tipoOperacion") as string; // "sumar" o "fijar"

  const cantidad = parseInt(cantidadStr);

  if (isNaN(cantidad)) {
    return { success: false, message: "La cantidad debe ser un número válido." };
  }

  try {
    if (tipoOperacion === "fijar") {
      // SOBRESCRIBE EL TOTAL DIRECTAMENTE (EDICIÓN EXACTA)
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: cantidad }
      });
    } else {
      // SUMA O RESTA AL TOTAL (OPERACIÓN INCREMENTAL)
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: { increment: cantidad } }
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/puntos");

    return { success: true, message: "¡Puntos actualizados correctamente!" };
  } catch (error) {
    console.error("Error al actualizar puntos:", error);
    return { success: false, message: "Error al guardar. Intenta de nuevo." };
  }
}