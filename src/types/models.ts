import type { Unidad as PrismaUnidad, Usuario as PrismaUsuario } from "@prisma/client";

//  Resumen de datos de la Unidad para vistas de clasificación y administración.
export type Unidad = Pick<PrismaUnidad, "id" | "nombreGrupo" | "lider" | "puntos">;

//  Datos públicos/seguros del usuario administrador para el panel.
export type Usuario = Pick<PrismaUsuario, "id" | "nombre" | "email" | "rol">;

//  Tipos Operativos de Dominio
export type TipoOperacionPuntos = "sumar" | "restar" | "fijar";

export interface ModalPuntosData {
  uId: string;
  nombreGrupo: string;
  puntos: number;
  tipo: TipoOperacionPuntos;
}