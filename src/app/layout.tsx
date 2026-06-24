import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Tipografia centralizada.
 * - Títulos: Fraunces (serifada, com personalidade e autoridade).
 * - Corpo: Inter (sans-serif limpa e legível).
 * Para trocar a tipografia, altere apenas estes dois imports e as variáveis.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "CNC — Sistema de gestão e PDV em Maceió com suporte local",
    template: "%s | CNC Maceió",
  },
  description:
    "Revenda e suporte local de sistemas de gestão e PDV em Maceió/AL. Atendimento humano, presencial e rápido para o seu comércio.",
  keywords: [
    "sistema de gestão Maceió",
    "PDV Maceió",
    "ERP Maceió",
    "automação comercial Maceió",
    "suporte de sistema Maceió",
    "AVANTE",
    "SGBR",
    "PRODO",
    "DigiSat",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "CNC Maceió",
    title: "CNC — Sistema de gestão e PDV em Maceió com suporte local",
    description:
      "Revenda e suporte local de sistemas de gestão e PDV em Maceió/AL. Atendimento humano, presencial e rápido.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
