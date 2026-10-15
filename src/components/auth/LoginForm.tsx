"use client";

import { useState, useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Lock, Eye, EyeOff, Mail, AlertCircle, Info } from "lucide-react";
import Image from "next/image";
import JA from "@/assets/img/JA.webp";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#081528] lg:bg-[#f4f6fa] flex flex-col lg:grid lg:grid-cols-2 font-sans text-slate-800 select-none">
      {/* ═════════ Vista Móvil: Banner con Imagen Superior (Solo en < lg) ═════════ */}
      <div className="lg:hidden relative h-64 sm:h-72 w-full overflow-hidden bg-[#081528] shrink-0 text-white flex flex-col justify-between p-5 pb-9">
        <Image
          src="/img/login_hero.jpg"
          alt="Ministerio Juvenil Reavivado JA"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Capas de degradado para excelente contraste y calidez */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081528] via-[#081528]/60 to-black/40" />

        {/* Barra superior móvil: Botón Volver y Versículo */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Volver</span>
          </button>
          <span className="text-[10px] font-bold text-amber-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            1 Timoteo 4:12
          </span>
        </div>

        {/* Identidad y Versículo en móvil */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 p-1.5 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-md shrink-0">
              <Image src={JA} alt="JA" width={24} height={24} className="w-6 h-6 object-contain" priority />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-tight">Reavivado JA</p>
              <p className="text-[10px] font-semibold text-amber-400">Ministerio Juvenil</p>
            </div>
          </div>
          <p className="text-xs text-slate-200/95 font-medium leading-relaxed italic line-clamp-2">
            Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.
          </p>
        </div>
      </div>

      {/* ═════════ Columna Izquierda Desktop (50% Exacto): Imagen y Versículo JA ═════════ */}
      <div className="hidden lg:flex relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-[#081528] text-white h-full">
        {/* Imagen de fondo */}
        <Image
          src="/img/login_hero.jpg"
          alt="Ministerio Juvenil Reavivado JA"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Capas de degradado para contraste y legibilidad óptima */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081528] via-[#081528]/50 to-[#081528]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#081528]/50" />

        {/* Cabecera superior: Logo JA */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 p-1.5 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Image
              src={JA}
              alt="JA"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-black text-white leading-tight tracking-tight">Reavivado JA</p>
            <p className="text-[11px] font-semibold text-brand-gold">Ministerio Juvenil</p>
          </div>
        </div>

        {/* Versículo de Jóvenes (1 Timoteo 4:12) */}
        <div className="relative z-10 space-y-3 max-w-md">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-brand-gold border border-white/15 backdrop-blur-md">
            1 Timoteo 4:12
          </span>
          <blockquote className="text-xl xl:text-2xl font-bold text-white leading-snug tracking-tight">
            Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.
          </blockquote>
          <p className="text-xs text-slate-300 font-medium">
            Reavivado JA • Ministerio Juvenil
          </p>
        </div>
      </div>

      {/* ═════════ Columna Derecha / Tarjeta de Acceso ═════════ */}
      <div className="relative -mt-6 lg:mt-0 rounded-t-[28px] lg:rounded-none bg-white shadow-2xl lg:shadow-none z-10 flex-1 flex flex-col justify-between px-6 pt-5 pb-8 sm:px-10 lg:p-12 xl:p-16 min-h-[calc(100vh-14rem)] lg:min-h-screen">
        {/* Píldora de agarre visual (Solo móvil) */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3 lg:hidden shrink-0" />

        {/* Botón Volver al inicio en desktop */}
        <div className="hidden lg:flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="group flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-lg shadow-2xs hover:shadow-xs transition-colors cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft size={14} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
            <span>Volver al inicio</span>
          </button>
        </div>

        {/* Contenido Central: Formulario */}
        <div className="w-full max-w-sm mx-auto my-2 lg:my-auto space-y-5">
          {/* Título */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Accede al panel de gestión con tus credenciales autorizadas
            </p>
          </div>

          {/* Mensaje de Error */}
          {state?.error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs font-semibold animate-in fade-in duration-200">
              <AlertCircle size={15} className="shrink-0 text-rose-600" />
              <span className="leading-tight">{state.error}</span>
            </div>
          )}

          {/* Formulario */}
          <form action={formAction} className="space-y-4">
            {/* Campo: Correo */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-700 block">
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@ejemplo.com"
                  required
                  className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-700 block">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={mostrarPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-slate-300 focus:border-[#0d2b56] focus:ring-2 focus:ring-[#0d2b56]/10 rounded-md py-2.5 pl-9 pr-10 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                  tabIndex={-1}
                  aria-label={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {mostrarPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Botón de Iniciar Sesión */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-[#0d2b56] hover:bg-[#091f3e] disabled:opacity-60 text-white py-2.5 rounded-md font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <Lock size={13} className="text-brand-gold" />
                  <span>Ingresar al Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Aviso informativo de acceso */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start gap-2.5 text-xs text-slate-600">
            <Info size={16} className="text-[#0d2b56] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800 text-[11px]">¿No tienes acceso al panel?</p>
              <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                El administrador del sistema debe agregarte para que puedas acceder.
              </p>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="pt-4 text-center select-none border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400">
            Ministerio Juvenil JA
          </p>
        </div>
      </div>
    </div>
  );
}