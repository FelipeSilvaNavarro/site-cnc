/**
 * sistemas.ts — Catálogo das soluções de gestão oferecidas pela CNC.
 *
 * IMPORTANTE (decisão de negócio)
 * -------------------------------
 * Os nomes comerciais dos sistemas de terceiros NÃO são expostos no site (não
 * divulgamos a marca dos fornecedores de graça). Cada solução é apresentada por
 * um rótulo próprio de porte:
 *
 *   PRO     ← (originalmente AVANTE)
 *   MÉDIO   ← (originalmente SGBR)
 *   SIMPLES ← (originalmente PRODO)
 *
 * Os nomes/slugs originais ficam em COMENTÁRIO ao lado de cada item, para
 * reverter fácil se um dia fizer sentido voltar a citá-los.
 *
 * COMO SE LIGA AO RESTO
 * --------------------
 * - A Home (`app/(site)/page.tsx`) usa `sistemas` na barra de prova social e nos
 *   cards "Nossas soluções".
 * - A página `app/(site)/sistemas/page.tsx` renderiza `sistemas`,
 *   `sistemasIntro` e `recursosComuns`.
 * - `slug` é usado nas âncoras de URL (ex.: /sistemas#pro).
 */

/** Estrutura de uma solução exibida no site. */
export type Sistema = {
  /** Identificador em URL/âncora (ex.: "pro" → /sistemas#pro). */
  slug: string;
  /** Rótulo público de porte (PRO / MÉDIO / SIMPLES). */
  nome: string;
  /** Frase curta de resumo (aparece nos cards da Home). */
  resumo: string;
  /** Para que serve (texto da página de Sistemas). */
  paraQueServe: string;
  /** Perfil de negócio mais indicado. */
  indicadoPara: string;
  /** Bullets de destaque exibidos na página de Sistemas. */
  destaques: string[];
  /** Logo da solução em /public/sistemas/<slug>.svg. Slot reservado. */
  logo: string;
};

export const sistemas: Sistema[] = [
  {
    slug: "pro", // originalmente: "avante"
    nome: "PRO", // originalmente: "AVANTE"
    resumo:
      "Solução completa de gestão e PDV para o comércio que precisa de controle total, do balcão ao estoque.",
    paraQueServe:
      "Controla vendas, frente de caixa (PDV), estoque, emissão fiscal e financeiro em uma única ferramenta, integrando o dia a dia da operação com as obrigações fiscais.",
    indicadoPara:
      "Comércios de varejo que querem um sistema para organizar caixa, estoque e notas sem depender de planilhas.",
    destaques: [
      "Frente de caixa (PDV) ágil",
      "Controle de estoque e produtos",
      "Emissão de documentos fiscais",
      "Controle financeiro (contas a pagar e a receber)",
    ],
    logo: "/sistemas/pro.svg",
  },
  {
    slug: "medio", // originalmente: "sgbr"
    nome: "MÉDIO", // originalmente: "SGBR"
    resumo:
      "Plataforma de gestão para o varejo, com foco em automação comercial e retaguarda.",
    paraQueServe:
      "Unifica vendas, retaguarda, estoque e emissão fiscal, com módulos para acompanhar o desempenho do negócio e organizar as rotinas administrativas.",
    indicadoPara:
      "Empresas que buscam automação comercial e relatórios para tomada de decisão.",
    destaques: [
      "Automação comercial",
      "Gestão de retaguarda",
      "Relatórios gerenciais",
      "Controle financeiro (contas a pagar e a receber)",
    ],
    logo: "/sistemas/medio.svg",
  },
  {
    slug: "simples", // originalmente: "prodo"
    nome: "SIMPLES", // originalmente: "PRODO"
    resumo:
      "Solução de gestão voltada à operação prática do negócio no dia a dia.",
    paraQueServe:
      "Apoia o controle de vendas, caixa e estoque com uma operação direta, pensada para quem precisa de praticidade.",
    indicadoPara:
      "Comércios de pequeno e médio porte que buscam um sistema prático e acessível para o dia a dia, com o essencial de vendas, caixa e estoque.",
    destaques: [
      "Operação de caixa simplificada",
      "Controle de vendas e estoque",
      "Controle financeiro (contas a pagar e a receber)",
    ],
    logo: "/sistemas/simples.svg",
  },
];

/** Texto da CNC como consultora que ajuda a escolher a solução certa. */
export const sistemasIntro = {
  titulo: "Indicamos a solução ideal para o seu negócio",
  texto:
    "Cada operação tem uma rotina. A CNC entende como o seu negócio funciona e recomenda, entre as soluções que oferece, a que melhor se encaixa no seu porte, no seu segmento e no seu orçamento. A escolha vem acompanhada de implantação, treinamento e suporte humanizado e contínuo.",
};

/**
 * Recursos COMUNS a todas as soluções. Exibido em destaque na página de
 * Sistemas para deixar claro que, independentemente do porte escolhido, o
 * cliente tem controle financeiro, emissão de todos os tipos de nota fiscal e
 * configuração sob medida para o seu segmento e a sua operação.
 */
export const recursosComuns = {
  titulo: "O que todas as soluções entregam",
  texto:
    "Independentemente do porte que você escolher, todas as soluções da CNC contam com controle financeiro completo, emitem todos os tipos de nota fiscal e são modeláveis conforme cada segmento e cada operação.",
  itens: [
    "Controle financeiro completo (contas a pagar e a receber, fluxo de caixa)",
    "Emissão de todos os tipos de nota fiscal (NF-e, NFC-e, NFS-e, CF-e e mais)",
    "Configuração sob medida para cada segmento e cada operação",
  ],
};
