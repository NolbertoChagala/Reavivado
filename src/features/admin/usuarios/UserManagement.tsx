"use client";

import { useState, useMemo } from "react";
import {
  Shield,
  Users,
  ShieldAlert,
  UserPlus,
  Search,
  X,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { eliminarUsuario } from "@/app/actions/usuarios";
import { CreateUserModal } from "./CreateUserModal";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface UserManagementProps {
  usuarios: Usuario[];
  currentAdminId?: string;
}

export function UserManagement({ usuarios, currentAdminId }: UserManagementProps) {
  const [busqueda, setBusqueda] = useState("");
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; nombre: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  /* ───── Métricas ───── */
  const totalCuentas = usuarios.length;
  const totalAdmins = usuarios.filter((u) => u.rol === "ADMIN").length;

  /* ───── Filtro de Búsqueda ───── */
  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return usuarios;
    return usuarios.filter(
      (u) => u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [usuarios, busqueda]);

  /* ───── Iniciales de Nombre ───── */
  const getIniciales = (nombre: string) => {
    const partes = nombre.trim().split(" ");
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return (nombre.slice(0, 2) || "AD").toUpperCase();
  };

  /* ───── Eliminar Usuario ───── */
  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      const res = await eliminarUsuario(confirmDelete.id);
      if (res.success) {
        setConfirmDelete(null);
        mostrarToast("success", res.message || "Acceso revocado correctamente.");
      } else {
        mostrarToast("error", res.message || "No se pudo eliminar el usuario.");
      }
    } catch {
      mostrarToast("error", "Error de red al intentar eliminar.");
    } finally {
      setIsDeleting(false);
    }
  }

  function mostrarToast(type: "success" | "error", text: string) {
    setToastMsg({ type, text });
    setTimeout(() => {
      setToastMsg((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  }

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      {/* ───── Encabezado y Breadcrumb ───── */}
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

      {/* ───── Toast de Notificación ───── */}
      {toastMsg && (
        <div
          role="status"
          className={`flex items-center justify-between gap-3 p-3.5 rounded-lg border text-xs font-semibold shadow-xs transition-all ${
            toastMsg.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMsg.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{toastMsg.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ───── 3 Tarjetas KPI ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Cuentas */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cuentas Registradas</span>
            <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
              Padrón
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums block">
                {totalCuentas}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                Administradores en total
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-sky-50 text-sky-600 border border-sky-100 shadow-2xs">
              <Users size={20} />
            </div>
          </div>
        </div>

        {/* Acceso Total */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Acceso Total</span>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100">
              Privilegios
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums block">
                {totalAdmins}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                Superadministradores
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs">
              <Shield size={20} />
            </div>
          </div>
        </div>

        {/* Estado del Sistema */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Estado de Seguridad</span>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block">
                Protegido
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                Auto-eliminación bloqueada
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
              <ShieldAlert size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ───── Barra de Acciones y Búsqueda ───── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-lg border border-slate-200/80 shadow-xs">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#0d2b56] focus:bg-white rounded-lg pl-9 pr-8 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Botón Principal: Crear Nuevo Usuario */}
        <button
          type="button"
          onClick={() => setModalCrearAbierto(true)}
          className="flex items-center justify-center gap-2 bg-[#0d2b56] hover:bg-[#091f3e] text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <UserPlus size={16} strokeWidth={2.2} />
          <span>Crear nuevo usuario</span>
        </button>
      </div>

      {/* ───── Tabla Principal de Usuarios ───── */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Cabecera de la tabla */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#0d2b56]" />
            <h2 className="text-xs font-bold text-slate-800">Cuentas con acceso administrativo</h2>
          </div>
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-bold border border-slate-200/60">
            {usuariosFiltrados.length} {usuariosFiltrados.length === 1 ? "usuario" : "usuarios"}
          </span>
        </div>

        {/* Tabla para Escritorio / Tablet */}
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
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Users size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="font-semibold text-slate-600 text-xs">No se encontraron usuarios</p>
                    <p className="text-[11px] mt-0.5">Intenta con otro término de búsqueda</p>
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((u) => {
                  const isCurrentUser = u.id === currentAdminId;
                  const iniciales = getIniciales(u.nombre);

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Administrador con avatar de iniciales */}
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

                      {/* Correo */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium select-all">
                        {u.email}
                      </td>

                      {/* Privilegios */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {u.rol === "ADMIN" ? "Administrador total" : u.rol}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Activo</span>
                        </span>
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 pr-6 text-right">
                        {isCurrentUser ? (
                          <span className="inline-block text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 tracking-wider">
                            Tú
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDelete({ id: u.id, nombre: u.nombre })}
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

        {/* Vista Móvil: Tarjetas individuales */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {usuariosFiltrados.length === 0 ? (
            <div className="py-10 text-center text-slate-400 p-4">
              <Users size={28} className="mx-auto mb-2 opacity-30" />
              <p className="font-semibold text-slate-600 text-xs">No se encontraron usuarios</p>
            </div>
          ) : (
            usuariosFiltrados.map((u) => {
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
                        onClick={() => setConfirmDelete({ id: u.id, nombre: u.nombre })}
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

      {/* ───── Modal para Crear Nuevo Usuario ───── */}
      <CreateUserModal
        isOpen={modalCrearAbierto}
        onClose={() => setModalCrearAbierto(false)}
        onSuccess={(msg) => mostrarToast("success", msg)}
      />

      {/* ───── Modal de Confirmación de Eliminación ───── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 select-none">
          {/* Fondo oscuro */}
          <button
            type="button"
            aria-label="Cerrar ventana"
            onClick={() => setConfirmDelete(null)}
            className="fixed inset-0 cursor-default bg-slate-900/60 backdrop-blur-xs"
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-center"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">¿Revocar acceso?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Estás a punto de eliminar la cuenta de{" "}
                <span className="font-bold text-slate-800">{confirmDelete.nombre}</span>. Esta
                persona ya no podrá iniciar sesión en el panel.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-md text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-md text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer shadow-xs disabled:opacity-60 flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <span>Revocar Acceso</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
