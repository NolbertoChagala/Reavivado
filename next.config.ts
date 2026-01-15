// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

import withPWAInit from "@ducanh2912/next-pwa"

// Configuración de Next.js con PWA
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
})

// Exportar la configuración de Next.js con PWA habilitado
export default withPWA({
  reactCompiler: true,
  turbopack: {},
})