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
      "Controla vendas, frente de caixa (PDV), estoque, emissão fiscal e financeiro em uma única ferramenta, integrando o dia a dia da loja com as obrigações fiscais.",
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
      "Unifica vendas, retaguarda, estoque e emissão fiscal, com módulos para acompanhar o desempenho da loja e organizar as rotinas administrativas.",
    indicadoPara:
      "Lojas que buscam automação comercial completa e relatórios para tomada de decisão.",
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
      "Sistema de gestão voltado à operação prática do comércio do dia a dia.",
    paraQueServe:
      "Apoia o controle de vendas, caixa e estoque com uma operação direta, pensada para quem precisa de praticidade no balcão.",
    indicadoPara:
      "Comércios que priorizam simplicidade e agilidade no caixa sem abrir mão de controle.",
    destaques: [
      "Operação de caixa simplificada",
      "Controle de vendas e estoque",
      "{{PREENCHER: confirmar para que segmento o PRODO é mais indicado}}",
      "{{PREENCHER: confirmar principais módulos reais do PRODO}}",
    ],
    logo: "/sistemas/prodo.svg",
  },
  {
    slug: "digisat",
    nome: "DigiSat",
    resumo:
      "Sistema de gestão consolidado, com linha de produtos para diferentes portes de comércio e serviço.",
    paraQueServe:
      "Atende gestão comercial, fiscal, financeira e de serviços, com versões que acompanham o crescimento do negócio.",
    indicadoPara:
      "Do pequeno comércio à empresa em expansão que quer um sistema para escalar com segurança fiscal.",
    destaques: [
      "Gestão comercial e fiscal",
      "Módulo financeiro",
      "Versões por porte de empresa",
      "{{PREENCHER: confirmar principais módulos reais do DigiSat}}",
    ],
    logo: "/sistemas/digisat.svg",
  },
];

/** Texto da CNC como consultora que ajuda a escolher o sistema certo. */
export const sistemasIntro = {
  titulo: "A gente indica o sistema ideal para o seu comércio",
  texto:
    "Cada negócio tem uma rotina. Antes de vender, a CNC entende como funciona o seu comércio e recomenda, entre os sistemas que representamos, o que melhor se encaixa na sua operação, no seu porte e no seu orçamento. Você não compra um software no escuro: compra a solução certa, com quem dá suporte de verdade aqui em Maceió.",
};
