/**
 * sobre.ts — Conteúdo da página "Sobre a CNC".
 *
 * Exporta o objeto `sobre`, consumido por `app/(site)/sobre/page.tsx`: cabeçalho
 * (sobrelinha/título/intro), história, números de prova social e equipe.
 *
 * - `numeros.clientesAtivos` é DINÂMICO: vem de `metrics.json` (sincronizado do
 *   Obsidian via `npm run sync:obsidian`).
 * - `equipe.membros` vazio = a seção de equipe não é renderizada (ver a
 *   condicional na página). Sem citar marcas de fornecedores (ver sistemas.ts).
 */

import metrics from "./metrics.json";

export const sobre = {
  sobrelinha: "Sobre a CNC",
  titulo: "Revenda e suporte de sistemas de gestão para o seu negócio",
  // Sem citar marcas — "oferece" no lugar de "representa os sistemas X, Y, Z".
  intro:
    "A CNC oferece e dá suporte a sistemas de gestão e PDV sob medida para o seu negócio. O cliente compra o sistema e o suporte em um só lugar, com atendimento humanizado e acompanhamento contínuo.",

  historia: {
    titulo: "Nossa história",
    paragrafos: [
      "A CNC nasceu em Maceió em 2020 com um objetivo claro: aproximar o comércio da região de sistemas de gestão confiáveis e de um suporte que realmente acompanha o dia a dia de quem está no balcão.",
      // Sem citar marcas de fornecedores (decisão de negócio — ver sistemas.ts).
      "Desde então, a empresa cresceu junto com seus clientes e hoje atende cerca de 90 negócios ativos em segmentos variados — de mercados e restaurantes a óticas, confecções, materiais de construção e distribuidoras. Com soluções para diferentes portes de operação, a CNC reúne a escolha do software e o suporte humanizado em um só lugar, mantendo o atendimento próximo como marca registrada.",
    ],
  },

  // Prova social. `clientesAtivos` vem do Obsidian; demais são fixos.
  numeros: [
    { valor: "6", label: "anos de mercado" },
    { valor: String(metrics.clientesAtivos), label: "clientes ativos" },
    { valor: "3", label: "soluções disponíveis" },
  ],

  // Seção de equipe oculta por enquanto (membros vazio = seção não renderiza).
  equipe: {
    titulo: "Quem atende você",
    texto:
      "Pessoas reais que conhecem os sistemas e a rotina de cada operação. Conheça parte da equipe da CNC.",
    membros: [] as { nome: string; cargo: string; foto: string }[],
  },
};
