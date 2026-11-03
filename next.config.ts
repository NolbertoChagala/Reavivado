import { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa"
import withBundleAnalyzer from "@next/bundle-analyzer";

// Configutación base de Next.js
const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
};

// 1. Envolver la configuración de PWA
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
})

// 2. Envolver la configuración de Bundle Analyzer
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(withPWA(nextConfig));

