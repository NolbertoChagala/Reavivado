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

    const unidad = await prisma.unidad.findUnique({ where: { id: unidadId } });
    if (!unidad) {
      return { success: false, message: "Unidad no encontrada en el sistema." };
    }

    let nuevoPuntaje = unidad.puntos;
    let mensaje = "";

    if (tipoOperacion === "fijar") {
      nuevoPuntaje = Math.max(0, cantidad);
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: nuevoPuntaje },
      });
      mensaje = `Puntaje actualizado: ${unidad.nombreGrupo} ahora tiene ${nuevoPuntaje.toLocaleString()} pts.`;
    } else if (tipoOperacion === "restar") {
      const cantidadAbs = Math.abs(cantidad);
      nuevoPuntaje = Math.max(0, (unidad.puntos || 0) - cantidadAbs);
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: nuevoPuntaje },
      });
      mensaje = `Se descontaron -${cantidadAbs.toLocaleString()} pts a ${unidad.nombreGrupo}. Nuevo total: ${nuevoPuntaje.toLocaleString()} pts.`;
    } else {
      const cantidadAbs = Math.abs(cantidad);
      nuevoPuntaje = (unidad.puntos || 0) + cantidadAbs;
      await prisma.unidad.update({
        where: { id: unidadId },
        data: { puntos: nuevoPuntaje },
      });
      mensaje = `Se sumaron +${cantidadAbs.toLocaleString()} pts a ${unidad.nombreGrupo}. Nuevo total: ${nuevoPuntaje.toLocaleString()} pts.`;
    }

    revalidatePath("/");
    revalidatePath("/admin/puntos");

    return { success: true, message: mensaje };
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