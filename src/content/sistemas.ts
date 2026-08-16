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
      "Para quem tem mais de um caixa, muita nota saindo e estoque que não pode furar.",
    paraQueServe:
      "Segura a operação inteira no mesmo lugar: frente de caixa, estoque, emissão fiscal e financeiro conversando entre si, sem a planilha paralela que ninguém atualiza e sem descobrir a diferença de estoque só no balanço.",
    indicadoPara:
      "Mercado com duas ou mais frentes de caixa, distribuidora, atacado, material de construção e autopeças, ou seja, quem já sente que perde dinheiro no que não consegue enxergar.",
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
      "Para o comércio que já cresceu do caderno, mas ainda não precisa de tudo.",
    paraQueServe:
      "Junta venda, retaguarda, estoque e nota fiscal com relatório que responde as perguntas que o dono faz de verdade, do tipo o que mais saiu no mês e quanto sobrou depois de pagar tudo.",
    indicadoPara:
      "Loja de roupa e calçados, farmácia, padaria e mercearia de bairro que querem organizar a retaguarda sem carregar recurso que não vão usar.",
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
      "A porta de entrada, a partir de R$ 150 por mês, para quem tem um caixa só.",
    paraQueServe:
      "Cobre o que o balcão pede todo dia, que é vender rápido, emitir a nota na hora e saber o que tem no estoque, sem tela cheia de coisa que você nunca vai abrir.",
    indicadoPara:
      "Mercadinho, açougue, quitanda, lanchonete e loja de bairro com um caixa, quem está saindo do caderno ou trocando um sistema que ninguém dá suporte.",
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
  // "Indicamos a solução ideal para o seu negócio" era o título antigo, e ele
  // não dizia porte, preço nem lugar. Quem chega de busca precisa saber em
  // dez segundos se cabe no bolso dele e se o atendimento chega até a loja.
  titulo: "Três portes, um preço de entrada, o mesmo atendimento",
  texto:
    "A escolha começa em R$ 150 por mês e depende do tamanho da operação, não do tamanho do discurso: um caixa e estoque simples pedem uma coisa, várias frentes de caixa e exigência fiscal pesada pedem outra. A CNC olha a sua rotina, indica o porte que serve e entrega instalação, migração dos seus dados e treinamento da equipe junto, com técnico que vai na loja em Maceió e no interior de Alagoas.",
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
