"use client";
import type { Unidad, Usuario } from "@/types";
import {
  AdminWelcomeHeader,
  AdminKpiMetrics,
  AdminBarChart,
  AdminScoringCriteria,
  AdminOperatorsList,
} from "./components";

interface AdminDashboardProps {
  adminName?: string;
  unidades: Unidad[];
  usuarios: Usuario[];
  currentAdminId?: string;
}

export default function AdminDashboard({
  adminName,
  unidades,
  usuarios,
  currentAdminId,
}: AdminDashboardProps) {
  const totalPuntos = unidades.reduce((acc, u) => acc + u.puntos, 0);
  const unidadesOrdenadas = [...unidades].sort((a, b) => b.puntos - a.puntos);
  const lider = unidadesOrdenadas[0];
  const maxPuntos = Math.max(1, lider?.puntos ?? 1);
  const promedioPuntos = unidades.length > 0 ? Math.round(totalPuntos / unidades.length) : 0;

  // Escala del gráfico vertical
  const chartMax = Math.ceil((maxPuntos * 1.15) / 500) * 500 || 2000;
  const chartSteps = [
    chartMax,
    Math.round(chartMax * 0.75),
    Math.round(chartMax * 0.5),
    Math.round(chartMax * 0.25),
    0,
  ];

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      <AdminWelcomeHeader adminName={adminName} />

      <AdminKpiMetrics
        totalPuntos={totalPuntos}
        promedioPuntos={promedioPuntos}
        totalUnidades={unidades.length}
        totalUsuarios={usuarios.length}
        lider={lider}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <AdminBarChart
            unidadesOrdenadas={unidadesOrdenadas}
            chartMax={chartMax}
            chartSteps={chartSteps}
          />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <AdminScoringCriteria />
          <AdminOperatorsList
            usuarios={usuarios}
            currentAdminId={currentAdminId}
          />
        </div>
      </div>
    </div>
  );
}