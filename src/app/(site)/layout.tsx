import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site } from "@/content/site";

/**
 * Dados estruturados de negócio local.
 *
 * É o que alimenta o painel lateral e o pacote local da busca, que é onde essa
 * empresa disputa de verdade. Regra que não pode ser quebrada: nome, telefone,
 * endereço e horário aqui têm que bater exatamente com o perfil do Google Meu
 * Negócio, porque divergência entre os dois derruba confiança de ranqueamento
 * e nenhum texto compensa isso.
 *
 * O endereço vai sem número de propósito, seguindo a decisão de não expor o
 * ponto exato (ver o mapa genérico em content/site.ts), e a operação é
 * declarada como atendimento em área, que é o que ela é.
 */
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CNC Sistemas",
  legalName: site.nomeCompleto,
  description: site.descricaoCurta,
  url: site.url,
  telephone: site.telefone.numero,
  taxID: site.cnpj,
  image: `${site.url}/og.png`,
  priceRange: "R$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  areaServed: site.cidadesAtendidas.map((cidade) => ({
    "@type": "City",
    name: `${cidade}, AL`,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      // 06:00 às 22:00, todos os dias, confirmado pelo Felipe em 16/08/2026.
      // Estes dois valores, o texto em content/site.ts e o horário do perfil
      // do Google Meu Negócio contam a mesma história ou nenhum deles vale.
      opens: "06:00",
      closes: "22:00",
    },
  ],
  sameAs: [site.redes.instagram, site.redes.facebook],
};

/**
 * Layout do site institucional. Envolve todas as páginas públicas com header,
 * footer e o botão flutuante de WhatsApp.
 *
 * A futura área logada fica em outro route group — (area-cliente) — com layout
 * próprio e isolado, sem este header/footer. // FUTURO: ver (area-cliente).
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />
      {/* Link de pular para o conteúdo (acessibilidade / teclado). */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
