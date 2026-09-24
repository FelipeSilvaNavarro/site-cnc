import type { Metadata } from "next";
import { Archivo, Azeret_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Tipografia — direção "balcão de Maceió à noite" (PRODUCT.md, 23/09/2026).
 *
 * Uma família, Archivo, em dois registros: larga e pesada no título (letreiro
 * de fachada), normal e 400 no corpo. Azeret Mono entra só no cupom fiscal e
 * em dado real (telefone, CNPJ, CEP).
 */
const display = Archivo({
  subsets: ["latin"],
  // Fonte variável com o eixo de largura: o título usa Archivo larga
  // (font-stretch 115% a 125%), que é a letra de letreiro de fachada da
  // direção de 23/09/2026. Um arquivo só serve peso e largura.
  axes: ["wdth"],
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
  // Título com cidade e estado de propósito. A disputa que a CNC ganha é
  // "em Maceió" e "em Alagoas", não a palavra genérica, onde ela compete com
  // fornecedor nacional que gasta em mídia o faturamento dela de um ano.
  // Cuidado permanente: "CNC" sozinho é usinagem, então o par que identifica
  // é sempre "CNC Sistemas" mais Maceió ou Alagoas.
  title: {
    default:
      "CNC Sistemas — Sistema de gestão e PDV em Maceió e no interior de Alagoas",
    template: "%s | CNC Sistemas Maceió",
  },
  description:
    "Sistema de gestão e PDV para o comércio de Maceió e do interior de Alagoas, com técnico que vai na sua loja. A partir de R$ 100 por mês, com instalação, migração e treinamento inclusos.",
  /**
   * `keywords` não move ranqueamento: o Google ignora essa meta desde 2009, e
   * quem decide por qual termo a página entra é o texto visível dela (título,
   * H1 e corpo). Fica aqui porque alguns agregadores e buscadores menores
   * ainda leem, e porque não custa nada. Otimizar por esta lista é perder
   * tempo com o campo errado.
   *
   * Os termos são de intenção de compra e de socorro, os mesmos que valem em
   * anúncio, nunca os institucionais tipo "ERP" e "gestão empresarial", que
   * atraem quem está estudando o assunto e não quem está com a loja parada.
   */
  keywords: [
    "sistema de gestão Maceió",
    "sistema PDV Maceió",
    "sistema para mercadinho",
    "sistema para açougue",
    "sistema para padaria",
    "automação comercial Alagoas",
    "emissão de NFC-e",
    "programa de caixa para comércio",
    "controle de estoque",
    "sistema para mercearia",
    "sistema para distribuidora",
    "sistema para material de construção",
    "automação comercial Maceió",
    "sistema de gestão Rio Largo",
    "suporte de sistema de gestão em Maceió",
  ],
  // Open Graph é o cartão que aparece quando o link é colado no WhatsApp, e
  // WhatsApp é por onde a conversa desta empresa acontece, então o cartão
  // conta a mesma história do título da busca: o que é, onde é e a partir de
  // quanto. Antes ele repetia "suporte humanizado" sem citar Maceió, e quem
  // recebia o link não sabia que era empresa da cidade dele.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "CNC Sistemas & Representações",
    title: "CNC Sistemas — Sistema de gestão e PDV em Maceió e no interior de Alagoas",
    description:
      "Técnico que vai na sua loja, sem central de chamados. A partir de R$ 100 por mês, com instalação, migração e treinamento inclusos.",
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
    title: "CNC Sistemas — Sistema de gestão e PDV em Maceió e no interior de Alagoas",
    description:
      "Técnico que vai na sua loja, sem central de chamados. A partir de R$ 100 por mês, com instalação, migração e treinamento inclusos.",
    images: ["/og.png"],
  },
  /**
   * Verificação de propriedade do Google Search Console pela meta tag.
   *
   * Vazia em desenvolvimento e enquanto a variável não estiver cadastrada na
   * Vercel, e nesse caso o Next simplesmente não emite a tag. O valor é só o
   * conteúdo do content= que o Search Console mostra na opção "tag HTML", sem
   * a marcação em volta.
   *
   * A verificação por DNS TXT no registro.br cobre o domínio inteiro de uma
   * vez, inclusive subdomínio e http, e é a que vale a pena fazer depois. Esta
   * aqui existe porque não depende de esperar propagação de DNS.
   */
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    // Diz ao Google que ele pode mostrar trecho longo, imagem grande e prévia
    // de vídeo. Sem isso ele escolhe conservador, e trecho curto em resultado
    // local rende menos clique.
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
      // `data-cenas` é posto pelo script abaixo antes do React hidratar.
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-cenas','')",
          }}
        />
      </head>
      <body>
        {children}
        {/* Medição de conversa iniciada. Sem os IDs em variável de ambiente,
            não injeta nada. Ver src/lib/analytics.ts. */}
        <Analytics />
        {/* Medição da Vercel: visita e origem no painel Analytics, Core Web
            Vitals de gente real no painel Speed Insights. Só coleta em
            produção, então em desenvolvimento não polui o dado. */}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
