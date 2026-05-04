// src/app/page.tsx
import prisma from "@/lib/db";
import ReavivadoAppClient from "@/components/ReavivadoAppClient";

export default async function Page() {
  const unidadesDB = await prisma.unidad.findMany({
    orderBy: { puntos: "desc" },
  });

  const unidades = unidadesDB.map((u) => ({
    nombre: u.nombreGrupo,
    lider: u.lider,
    puntos: u.puntos,
  }));

  return <ReavivadoAppClient unidades={unidades} />;
}