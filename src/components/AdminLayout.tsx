"use client";

import { ReactNode, useState } from "react";
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/app/actions/auth";
import logoadventista from "@/assets/img/logoadventista.webp";
import JA from "@/assets/img/JA.webp";

interface AdminLayoutProps {
  children: ReactNode;
  adminName?: string;
  activeTab: "puntos" | "usuarios";
}

export default function AdminLayout({ children, adminName, activeTab }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row font-sans">
      
      {/* BARRA SUPERIOR MÓVIL OSCURA (ESTILO DASHBOARD SEGURO) */}
      <div className="md:hidden bg-slate-950 text-white p-4 flex justify-between items-center sticky top-0 z-[60] shadow-md select-none border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#003366] p-1.5 rounded-lg text-white">
            <LayoutDashboard size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-black italic text-[11px] tracking-wide text-white uppercase leading-none">Dashboard</span>
            <span className="text-[7px] text-brand-gold font-bold uppercase tracking-widest mt-0.5">Control</span>
          </div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 bg-white/10 border border-white/5 text-white rounded-xl active:scale-95 transition-all focus:outline-none focus:ring-0"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Backdrop para cerrar el menú móvil al hacer clic fuera */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* SIDEBAR OSCURO PROFESIONAL (ESTILO CENTRO DE CONTROL) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 md:relative md:flex w-3/4 sm:w-80 md:w-64 bg-slate-950 text-white p-6 flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out border-r border-white/5
        ${isMobileMenuOpen ? "translate-x-0 pt-20" : "-translate-x-full md:translate-x-0 md:pt-8"}
      `}>
        <div className="space-y-8">
          {/* HEADER SIDEBAR */}
          <div className="hidden md:flex items-center gap-3 px-2 select-none">
            <div className="bg-[#003366] p-2 rounded-xl shadow-lg shadow-blue-900/20 text-white">
              <LayoutDashboard size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm text-white uppercase tracking-wider leading-none">Dashboard</span>
              <span className="text-[8px] text-brand-gold font-bold uppercase tracking-widest mt-1">Administración</span>
            </div>
          </div>
          
          {/* NAVEGACIÓN */}
          <nav className="space-y-1.5 select-none">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Sistemas</p>
            
            <Link href="/admin/puntos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 p-3 px-4 rounded-2xl text-xs font-bold border transition-all active:scale-[0.98] ${
                activeTab === "puntos" 
                  ? "bg-white/10 text-white border-white/5 shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
              }`}>
              <Activity size={16} className={activeTab === "puntos" ? "text-brand-gold" : "text-slate-500"} /> 
              <span>Gestión de puntos</span>
            </Link>
            
            <Link href="/admin/usuarios" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 p-3 px-4 rounded-2xl text-xs font-bold border transition-all active:scale-[0.98] ${
                activeTab === "usuarios" 
                  ? "bg-white/10 text-white border-white/5 shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
              }`}>
              <Users size={16} className={activeTab === "usuarios" ? "text-brand-gold" : "text-slate-500"} /> 
              <span>Control de usuarios</span>
            </Link>

            <div className="pt-6 mt-6 border-t border-white/5">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Navegación</p>
              <Link href="/" 
                className="flex items-center gap-3 p-3 px-4 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all">
                <ExternalLink size={16} className="text-slate-500" /> 
                <span>Página principal</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* PERFIL OPERADOR Y CERRAR SESIÓN */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl select-none">
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-1">Operador activo</p>
            <p className="text-xs font-black text-slate-200 truncate">{adminName}</p>
          </div>
          <form action={logout}>
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 border border-red-550/15 text-red-400 hover:text-white py-3.5 rounded-2xl text-[9px] font-bold uppercase tracking-wider transition-all w-full cursor-pointer focus:outline-none focus:ring-0"
            >
              <LogOut size={13} /> 
              <span>Cerrar sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DE TRABAJO (FONDO GRIS PLATA CLARO Y CABECERA BLANCA) */}
      <main className="flex-1 p-5 md:p-10 space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center bg-white p-4 px-6 rounded-3xl shadow-sm border border-slate-200/80 select-none">
          <div className="flex items-center gap-4">
            <Image src={logoadventista} alt="IASD" width={28} height={28} className="object-contain" priority />
            <div className="h-5 w-[1px] bg-slate-200" />
            <Image src={JA} alt="JA" width={28} height={28} className="object-contain" priority />
          </div>
          
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-black text-[#003366] uppercase italic">Ministerio Juvenil</div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}