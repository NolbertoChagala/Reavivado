"use client";

import React from "react";
import { Search, X, UserPlus, Shield, Users, Trash2 } from "lucide-react";
import type { Usuario } from "@/types";

interface UserTableProps {
  usuarios: Usuario[];
  busqueda: string;
  currentAdminId?: string;
  onBusquedaChange: (valor: string) => void;
  onCrearUsuario: () => void;
  onSolicitarEliminar: (usuario: { id: string; nombre: string }) => void;
}

export default function UserTable({
  usuarios,
  busqueda,
  currentAdminId,
  onBusquedaChange,
  onCrearUsuario,
  onSolicitarEliminar,
}: UserTableProps) {
  const getIniciales = (nombre: string) => {
    const partes = nombre.trim().split(" ");
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return (nombre.slice(0, 2) || "AD").toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-lg border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#0d2b56] focus:bg-white rounded-lg pl-9 pr-8 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => onBusquedaChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onCrearUsuario}
          className="flex items-center justify-center gap-2 bg-[#0d2b56] hover:bg-[#091f3e] text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <UserPlus size={16} strokeWidth={2.2} />
          <span>Crear nuevo usuario</span>
        </button>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#0d2b56]" />
            <h2 className="text-xs font-bold text-slate-800">Cuentas con acceso administrativo</h2>
          </div>
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-bold border border-slate-200/60">
            {usuarios.length} {usuarios.length === 1 ? "usuario" : "usuarios"}
          </span>
        </div>

        {/* Desktop / Tablet Grid */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Administrador</th>
                <th className="py-3 px-4">Correo Electrónico</th>
                <th className="py-3 px-4 text-center">Privilegios</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 pr-6 text-right w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Users size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="font-semibold text-slate-600 text-xs">No se encontraron usuarios</p>
                    <p className="text-[11px] mt-0.5">Intenta con otro término de búsqueda</p>
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => {
                  const isCurrentUser = u.id === currentAdminId;
                  const iniciales = getIniciales(u.nombre);

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0d2b56] border border-sky-100 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                            {iniciales}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">
                              {u.nombre}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium sm:hidden">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-medium select-all">
                        {u.email}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {u.rol === "ADMIN" ? "Administrador total" : u.rol}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Activo</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 pr-6 text-right">
                        {isCurrentUser ? (
                          <span className="inline-block text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 tracking-wider">
                            Tú
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onSolicitarEliminar({ id: u.id, nombre: u.nombre })}
                            className="w-8 h-8 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 inline-flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                            title={`Revocar acceso a ${u.nombre}`}
                            aria-label={`Revocar acceso a ${u.nombre}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Vista Móvil */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {usuarios.length === 0 ? (
            <div className="py-10 text-center text-slate-400 p-4">
              <Users size={28} className="mx-auto mb-2 opacity-30" />
              <p className="font-semibold text-slate-600 text-xs">No se encontraron usuarios</p>
            </div>
          ) : (
            usuarios.map((u) => {
              const isCurrentUser = u.id === currentAdminId;
              const iniciales = getIniciales(u.nombre);

              return (
                <div key={u.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0d2b56] border border-sky-100 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                      {iniciales}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-xs truncate">{u.nombre}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{u.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        Administrador
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCurrentUser ? (
                      <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                        Tú
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSolicitarEliminar({ id: u.id, nombre: u.nombre })}
                        className="w-8 h-8 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                        title="Revocar acceso"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}