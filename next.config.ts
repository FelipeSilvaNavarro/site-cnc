import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * Notas de segurança:
 * - As fontes (Space Grotesk, Inter, JetBrains Mono) são auto-hospedadas pelo
 *   `next/font` em build time, então NÃO há origem externa de fontes em runtime
 *   (font-src 'self' basta).
 * - `frame-src https://www.google.com` libera só o embed do Google Maps na página
 *   de contato. Se trocar o provedor de mapa, ajuste aqui.
 * - `script-src`/`style-src` usam 'unsafe-inline' porque o site é 100% estático
 *   (sem middleware), e o Next injeta scripts/estilos inline de hidratação sem
 *   nonce. Para CSP por nonce seria preciso renderização dinâmica (middleware),
 *   o que anularia o ganho de performance do prerender. As demais diretivas
 *   (frame-ancestors, object-src, base-uri, form-action) ficam travadas.
 * - Se adicionar imagens remotas, inclua a origem em `img-src` e em
 *   `next.config` images.remotePatterns.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove o header X-Powered-By: Next.js (evita disclosure de stack).
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
