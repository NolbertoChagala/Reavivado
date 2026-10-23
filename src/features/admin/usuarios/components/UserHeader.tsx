import React from "react";

export default function UserHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#0d2b56] tracking-tight">
          Gestión de Usuarios
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Administración de credenciales y roles para el panel del Ministerio Juvenil
        </p>
      </div>

      <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
        <span>Admin</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-bold">Gestión de usuarios</span>
      </div>
    </div>
  );
}