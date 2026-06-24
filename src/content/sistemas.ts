/**
 * Sistemas revendidos e suportados pela CNC.
 *
 * As descrições abaixo são textos de marketing genéricos sobre o tipo de
 * software. Onde há afirmação factual sobre o produto específico (recursos
 * exclusivos, módulos), use o marcador para confirmar com dado real.
 */

export type Sistema = {
  slug: string;
  nome: string;
  resumo: string;
  paraQueServe: string;
  indicadoPara: string;
  destaques: string[];
  // Logo do sistema em /public/sistemas/<slug>.svg (ou png). Slot reservado.
  logo: string;
};

export const sistemas: Sistema[] = [
  {
    slug: "avante",
    nome: "AVANTE",
    resumo:
      "Sistema de gestão e PDV para o comércio que precisa de controle completo do balcão ao estoque.",
    paraQueServe:
      "Controla vendas, frente de caixa (PDV), estoque, emissão fiscal e financeiro em uma única ferramenta, integrando o dia a dia da operação com as obrigações fiscais.",
    indicadoPara:
      "Comércios de varejo que querem um sistema robusto para organizar caixa, estoque e notas sem depender de planilhas.",
    destaques: [
      "Frente de caixa (PDV) ágil",
      "Controle de estoque e produtos",
      "Emissão de documentos fiscais",
      "{{PREENCHER: confirmar principais módulos reais do AVANTE}}",
    ],
    logo: "/sistemas/avante.svg",
  },
  {
    slug: "sgbr",
    nome: "SGBR",
    resumo:
      "Plataforma de gestão para o varejo, com foco em automação comercial e retaguarda.",
    paraQueServe:
      "Unifica vendas, retaguarda, estoque e emissão fiscal, com módulos para acompanhar o desempenho do negócio e organizar as rotinas administrativas.",
    indicadoPara:
      "Empresas que buscam automação comercial completa e relatórios para tomada de decisão.",
    destaques: [
      "Automação comercial",
      "Gestão de retaguarda",
      "Relatórios gerenciais",
      "{{PREENCHER: confirmar principais módulos reais do SGBR}}",
    ],
    logo: "/sistemas/sgbr.svg",
  },
  {
    slug: "prodo",
    nome: "PRODO",
    resumo:
      "Sistema de gestão voltado à operação prática do negócio no dia a dia.",
    paraQueServe:
      "Apoia o controle de vendas, caixa e estoque com uma operação direta, pensada para quem precisa de praticidade.",
    indicadoPara:
      "{{PREENCHER: confirmar para que tipo de negócio o PRODO é mais indicado}}",
    destaques: [
      "Operação de caixa simplificada",
      "Controle de vendas e estoque",
      "{{PREENCHER: confirmar principais módulos reais do PRODO}}",
    ],
    logo: "/sistemas/prodo.svg",
  },
];

/** Texto da CNC como consultora que ajuda a escolher o sistema certo. */
export const sistemasIntro = {
  titulo: "Indicamos o sistema ideal para o seu negócio",
  texto:
    "Cada operação tem uma rotina. A CNC entende como o seu negócio funciona e recomenda, entre os sistemas que representa, o que melhor se encaixa no seu porte, no seu segmento e no seu orçamento. A escolha vem acompanhada de implantação, treinamento e suporte humanizado e contínuo.",
};
