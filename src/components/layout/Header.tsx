"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";

interface HeaderProps {
  scrolled?: boolean;
}

export default function Header({ scrolled: externalScrolled }: HeaderProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);

  useEffect(() => {
    if (externalScrolled !== undefined) return;
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [externalScrolled]);

  const isScrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  return (
    <header
      className={`fixed top-3 left-3.5 z-50 transition-all duration-300 select-none rounded-2xl px-3 py-1.5 flex items-center ${
        isScrolled
          ? "bg-white/95 backdrop-blur-2xl border border-slate-300/90 shadow-[0_12px_28px_rgba(13,43,86,0.16)] ring-1 ring-slate-900/10"
          : "bg-transparent border-transparent shadow-none ring-0"
      }`}
    >
      <BrandLogo size={28} isDark={!isScrolled} />
    </header>
  );
}