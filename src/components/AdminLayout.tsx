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
import logoAdventista from "@/assets/img/logoadventista.webp";
import LogoJA from "@/assets/img/JA.webp";

interface AdminLayoutProps {
  children: ReactNode;
  adminName?: string;
  activeTab: "puntos" | "usuarios";
}

export default function AdminLayout({ children, adminName, activeTab }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row font-sans">
      
      {/* Barra superior móvil con más aire */}
      <div className="md:hidden bg-slate-900 text-white p-5 flex justify-between items-center sticky top-0 z-[60] shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-[#003366] p-1.5 rounded-lg text-white">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-bold italic text-sm tracking-tight">Panel de Control</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 bg-white/10 rounded-lg active:scale-90 transition-transform"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar con padding superior corregido para móvil */}
      <aside className={`
        fixed inset-0 z-50 md:relative md:flex w-full md:w-64 bg-slate-900 text-white p-8 flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0 pt-20" : "-translate-x-full md:translate-x-0 md:pt-8"}
      `}>
        <div className="space-y-10">
          <div className="hidden md:flex items-center gap-3 px-2">
            <div className="bg-[#003366] p-2 rounded-xl shadow-lg shadow-blue-900/20">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="font-black tracking-tighter text-xl italic text-white uppercase">Admin</h1>
          </div>
          
          <nav className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-5">Sistemas</p>
            
            <Link href="/admin/puntos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "puntos" ? "bg-white/10 text-white border border-white/5" : "text-slate-400 hover:bg-white/5"
              }`}>
              <Activity size={18} className={activeTab === "puntos" ? "text-blue-400" : ""} /> 
              Gestión de puntos
            </Link>
            
            <Link href="/admin/usuarios" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "usuarios" ? "bg-white/10 text-white border border-white/5" : "text-slate-400 hover:bg-white/5"
              }`}>
              <Users size={18} className={activeTab === "usuarios" ? "text-blue-400" : ""} /> 
              Control de usuarios
            </Link>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-5">Navegación</p>
              <Link href="/" 
                className="flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-[#003366] hover:text-white transition-all group">
                <ExternalLink size={18} /> 
                Página principal
              </Link>
            </div>
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-800 space-y-5">
          <div className="bg-white/5 p-5 rounded-xl">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Operador</p>
            <p className="text-sm font-bold text-slate-200 truncate">{adminName}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all w-full">
              <LogOut size={14} /> Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Área principal */}
      <main className="flex-1 p-5 md:p-10 space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <Image src={logoAdventista} alt="IASD" width={28} height={28} className="object-contain" priority />
            <div className="h-5 w-[1px] bg-slate-200" />
            <Image src={LogoJA} alt="JA" width={28} height={28} className="object-contain" priority />
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