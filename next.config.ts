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
 * - Em DEV o `next dev` usa `eval` (HMR/React Refresh) e WebSocket; por isso
 *   'unsafe-eval' e `ws:` entram SOMENTE em desenvolvimento. Em produção a CSP
 *   permanece estrita (sem eval).
 * - Se adicionar imagens remotas, inclua a origem em `img-src` e em
 *   `next.config` images.remotePatterns.
 * - Medição da Vercel (Analytics e Speed Insights) é servida same-origin, em
 *   caminho ofuscado sob o próprio domínio, e cabe em 'self' sem exceção.
 */
const isDev = process.env.NODE_ENV !== "production";

/**
 * Origens do Google usadas pela medição (GA4 e Google Ads).
 *
 * Sem estas exceções o navegador bloqueia o gtag e o GA4 não registra nada,
 * que foi exatamente o que aconteceu entre 16/08/2026 e 24/08/2026: a tag
 * estava no HTML e o console respondia "The action has been blocked".
 *
 * Separado por diretiva porque o fluxo do GA4 usa três canais distintos: o
 * script vem do googletagmanager, o beacon de evento sai por fetch para o
 * google-analytics regionalizado, e a conversão do Ads ainda cai em pixel de
 * imagem no doubleclick.
 */
const googleScript = [
  "https://www.googletagmanager.com",
  "https://www.googleadservices.com",
  "https://googleads.g.doubleclick.net",
];

const googleConnect = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://analytics.google.com",
  "https://*.analytics.google.com",
  "https://stats.g.doubleclick.net",
  "https://*.g.doubleclick.net",
];

const googleImg = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://www.google.com",
  "https://www.google.com.br",
  "https://googleads.g.doubleclick.net",
  "https://stats.g.doubleclick.net",
];

const googleFrame = ["https://td.doubleclick.net", "https://www.googletagmanager.com"];

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `img-src 'self' data: blob: ${googleImg.join(" ")}`,
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' ${googleScript.join(" ")}${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' ${googleConnect.join(" ")}${isDev ? " ws:" : ""}`,
  `frame-src https://www.google.com ${googleFrame.join(" ")}`,
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
