import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { unidadId, cantidad, motivo } = body;

  try {
    const resultado = await prisma.unidad.update({
      where: { id: unidadId },
      data: {
        puntos: { increment: cantidad },
        puntosLog: {
          create: {
            cantidad,
            motivo,
          },
        },
      },
    });

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Error en la API de unidades:", error);
    return NextResponse.json(
      { error: "Error al sumar puntos" },
      { status: 500 },
    );
  }
}
