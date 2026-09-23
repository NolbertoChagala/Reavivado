"use client";

import { useState } from "react";
import { eliminarUsuario } from "@/app/actions/usuarios";
import { Shield, Trash2, AlertTriangle, X } from "lucide-react";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface ListaUsuariosProps {
  usuarios: Usuario[];
  currentAdminId?: string;
}

export default function ListaUsuarios({ usuarios, currentAdminId }: ListaUsuariosProps) {
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; nombre: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    setIsPending(true);
    setErrorMsg(null);
    try {
      const result = await eliminarUsuario(confirmDelete.id);
      if (result.success) {
        setConfirmDelete(null);
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      setErrorMsg("Error de red: No se pudo conectar con el servidor.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] w-full">
      {/* CABECERA */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 select-none">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-brand-gold" />
          <h2 className="text-xs font-black text-slate-800 leading-none">Cuentas activas</h2>
        </div>
        <span className="text-[10px] bg-slate-100 text-slate-655 px-2.5 py-1 rounded-lg font-bold self-start sm:self-auto">
          Total: {usuarios.length}
        </span>
      </div>

      {/* ERROR FEEDBACK */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border-b border-red-100 text-red-655 text-xs font-semibold select-none flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-700 cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}

      {/* VISTA ESCRITORIO / TABLET: Tabla Formal (Oculta en Celulares) */}
      <div className="hidden sm:block overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[450px]">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-bold text-slate-450 tracking-wider select-none">
              <th className="px-6 py-4">Administrador</th>
              <th className="px-6 py-4 text-center">Privilegios</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center w-28">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usuarios.map((u) => {
              const isCurrentUser = u.id === currentAdminId;
              return (
                <tr key={u.id} className="hover:bg-slate-50/30 transition-all group">
                  {/* Administrador */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800 group-hover:text-brand-gold transition-colors leading-tight">
                        {u.nombre}
                      </span>
                      <span className="text-[9px] text-slate-455 font-semibold leading-none mt-1 select-all">
                        {u.email}
                      </span>
                    </div>
                  </td>
                  
                  {/* Rol */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {u.rol === "ADMIN" ? "Administrador total" : u.rol}
                    </span>
                  </td>
                  
                  {/* Estado */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 select-none">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-bold text-slate-450">Activo</span>
                    </div>
                  </td>
                  
                  {/* Acciones */}
                  <td className="px-6 py-4 text-center">
                    {isCurrentUser ? (
                      <span className="inline-block text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg tracking-wider select-none">
                        Tú
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete({ id: u.id, nombre: u.nombre })}
                        className="text-slate-400 hover:text-red-655 p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-95 cursor-pointer inline-flex items-center justify-center focus:outline-none focus:ring-0"
                        title="Revocar acceso"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VISTA MÓVIL: Tarjetas Compactas y Flexibles (Visible solo en Celulares) */}
      <div className="block sm:hidden divide-y divide-slate-100">
        {usuarios.map((u) => {
          const isCurrentUser = u.id === currentAdminId;
          return (
            <div key={u.id} className="p-4 flex flex-col gap-3 group">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 leading-tight group-hover:text-brand-gold transition-colors">
                    {u.nombre}
                  </span>
                  <span className="text-[9px] text-slate-450 font-semibold leading-none mt-1 select-all">
                    {u.email}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 shrink-0 select-none">
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {u.rol === "ADMIN" ? "Admin" : u.rol}
                  </span>
                  
                  {isCurrentUser ? (
                    <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md tracking-wider">
                      Tú
                    </span>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete({ id: u.id, nombre: u.nombre })}
                      className="text-slate-400 hover:text-red-655 p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-95 cursor-pointer focus:outline-none focus:ring-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL CONFIRMACIÓN DE ELIMINACIÓN */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 cursor-default" onClick={() => setConfirmDelete(null)} />
          
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 md:p-8 shadow-2xl border border-slate-150 relative z-10 animate-in zoom-in-95 duration-200 flex flex-col gap-6 text-center">
            <div className="mx-auto bg-red-50 p-4 rounded-full border border-red-100 flex items-center justify-center shrink-0 w-12 h-12">
              <AlertTriangle className="text-red-500 animate-pulse" size={24} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-800">¿Revocar acceso?</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Estás a punto de eliminar permanentemente la cuenta de <span className="font-bold text-slate-800">{confirmDelete.nombre}</span>.<br />
                Esta persona ya no podrá iniciar sesión en el panel.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 w-full">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3.5 rounded-xl font-bold text-[10px] active:scale-[0.98] transition-all cursor-pointer text-center focus:outline-none focus:ring-0"
              >
                Cancelar
              </button>
              
              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-slate-150 disabled:text-slate-400 text-white py-3.5 rounded-xl font-bold text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-200/30 focus:outline-none focus:ring-0"
              >
                {isPending ? (
                  <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Eliminar</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
