import type { Metadata } from "next";
import { Archivo, Azeret_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Tipografia — direção "direto e utilitário".
 *
 * UMA família (Archivo) em pesos extremos, não duas fontes disputando. O
 * contraste tipográfico vem do peso (800 no título, 400 no corpo) e do
 * tamanho, que é mais robusto e mais rápido que um par display+corpo.
 *
 * Archivo é grotesca de alta legibilidade desenhada para uso em destaque e
 * sinalização — o oposto da sans geométrica de startup que estava aqui antes
 * (Space Grotesk + Inter + JetBrains Mono eram, as três, escolha por reflexo).
 *
 * Azeret Mono entra SÓ para dado real: telefone, CNPJ, CEP, horário. Nunca
 * como decoração "técnica".
 */
const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // `default`: título da aba quando a página não define o seu (ex.: a Home).
  // `template`: demais páginas viram "<título> | CNC Sistemas".
  title: {
    default: "CNC Sistemas — Sistemas de gestão e PDV com suporte humanizado",
    template: "%s | CNC Sistemas",
  },
  description:
    "Revenda e suporte de sistemas de gestão e PDV. Suporte humanizado, direto e contínuo, sem central de chamados. A CNC indica o sistema certo para o seu negócio.",
  // Palavras-chave genéricas (sem marcas de fornecedores — ver sistemas.ts).
  keywords: [
    "sistema de gestão",
    "PDV",
    "ERP",
    "automação comercial",
    "revenda de software de gestão",
    "suporte de sistema",
    "software para indústria",
    "emissão de nota fiscal",
    "controle de estoque",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "CNC Sistemas & Representações",
    title: "CNC — Revenda de sistemas de gestão e PDV com suporte humanizado",
    description:
      "Revenda e suporte de sistemas de gestão e PDV. Suporte humanizado, direto e contínuo, sem central de chamados.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CNC Sistemas & Representações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CNC — Revenda de sistemas de gestão e PDV com suporte humanizado",
    description:
      "Revenda e suporte de sistemas de gestão e PDV. Suporte humanizado, direto e contínuo, sem central de chamados.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

/**
 * RootLayout — layout raiz de TODO o site (App Router).
 *
 * Define `<html lang="pt-BR">` com as variáveis CSS das três fontes e renderiza
 * o `<body>`. Os route groups `(site)` e `(area-cliente)` têm seus próprios
 * layouts internos (header/footer ou casca isolada). Os metadados/Open Graph
 * acima valem como padrão para todas as páginas (cada página pode sobrescrever).
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
