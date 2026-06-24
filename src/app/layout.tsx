import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Tipografia centralizada (perfil técnico, de empresa de software).
 * - Títulos: Space Grotesk (sans geométrica com personalidade).
 * - Corpo: Inter (sans neutra e legível).
 * - Detalhes: JetBrains Mono (rótulos, números, sensação técnica).
 * Para trocar a tipografia, altere apenas estes imports e as variáveis.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "CNC — Revenda de sistemas de gestão e PDV com suporte humanizado",
    template: "%s | CNC Sistemas",
  },
  description:
    "Revenda e suporte de sistemas de gestão e PDV. Suporte humanizado, direto e contínuo, sem central de chamados. A CNC indica o sistema certo para o seu negócio.",
  keywords: [
    "sistema de gestão",
    "PDV",
    "ERP",
    "automação comercial",
    "revenda de software de gestão",
    "suporte de sistema",
    "software para indústria",
    "AVANTE",
    "SGBR",
    "PRODO",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
