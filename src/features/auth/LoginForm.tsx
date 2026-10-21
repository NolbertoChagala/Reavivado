"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuthHeroBanner, AuthCredentialsForm } from "./components";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#081528] lg:bg-[#f4f6fa] flex flex-col lg:grid lg:grid-cols-2 font-sans text-slate-800 select-none">
      <AuthHeroBanner />

      <div className="relative -mt-6 lg:mt-0 rounded-t-[28px] lg:rounded-none bg-white shadow-2xl lg:shadow-none z-10 flex-1 flex flex-col justify-between px-6 pt-5 pb-8 sm:px-10 lg:p-12 xl:p-16 min-h-[calc(100vh-14rem)] lg:min-h-screen">
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3 lg:hidden shrink-0" />

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

        <AuthCredentialsForm
          formAction={formAction}
          isPending={isPending}
          error={state?.error}
        />

        <div className="pt-4 text-center select-none border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400">
            Ministerio Juvenil JA
          </p>
        </div>
      </div>
    </div>
  );
}