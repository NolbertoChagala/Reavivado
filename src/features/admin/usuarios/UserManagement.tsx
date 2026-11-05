"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { eliminarUsuario } from "@/app/actions/usuarios";
import { useToast } from "@/hooks";
import type { Usuario } from "@/types";
import {
  UserHeader,
  UserKpiGrid,
  UserTable,
  DeleteUserModal,
  CreateUserModal,
} from "./components";


interface UserManagementProps {
  usuarios: Usuario[];
  currentAdminId?: string;
}

export function UserManagement({ usuarios, currentAdminId }: UserManagementProps) {
  const [busqueda, setBusqueda] = useState("");
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; nombre: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast, showToast, clearToast } = useToast({duration: 4500});

  /* Métricas */
  const totalCuentas = usuarios.length;
  const totalAdmins = usuarios.filter((u) => u.rol === "ADMIN").length;

  /* Búsqueda */
  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return usuarios;
    return usuarios.filter(
      (u) => u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [usuarios, busqueda]);

  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      const res = await eliminarUsuario(confirmDelete.id);
      if (res.success) {
        setConfirmDelete(null);
        showToast("success", res.message || "Acceso revocado correctamente.");
      } else {
        showToast("error", res.message || "No se pudo eliminar el usuario.");
      }
    } catch {
      showToast("error", "Error de red al intentar eliminar.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full space-y-6 select-none font-sans text-slate-800">
      <UserHeader />

      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          className={`flex items-center justify-between gap-3 p-3.5 rounded-lg border text-xs font-semibold shadow-xs transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{toast.text}</span>
          </div>
          <button
            type="button"
            onClick={() => clearToast()}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <UserKpiGrid
        totalCuentas={totalCuentas}
        totalAdmins={totalAdmins}
      />

      <UserTable
        usuarios={usuariosFiltrados}
        busqueda={busqueda}
        currentAdminId={currentAdminId}
        onBusquedaChange={setBusqueda}
        onCrearUsuario={() => setModalCrearAbierto(true)}
        onSolicitarEliminar={setConfirmDelete}
      />

      <CreateUserModal
        isOpen={modalCrearAbierto}
        onClose={() => setModalCrearAbierto(false)}
        onSuccess={(msg) => showToast("success", msg)}
      />

      {confirmDelete && (
        <DeleteUserModal
          usuario={confirmDelete}
          isDeleting={isDeleting}
          onClose={() => setConfirmDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default UserManagement;