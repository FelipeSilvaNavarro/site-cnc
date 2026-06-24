/**
 * Conteúdo da página Sobre a CNC. História, mercado e equipe.
 * Dados factuais (anos, fundação, nomes) usam {{PREENCHER}}.
 */

export const sobre = {
  sobrelinha: "Sobre a CNC",
  titulo: "Revenda e suporte de sistemas de gestão para o seu negócio",
  intro:
    "A CNC representa e dá suporte aos principais sistemas de gestão e PDV do mercado. O cliente compra o sistema e o suporte em um só lugar, com atendimento humanizado e acompanhamento contínuo.",

  historia: {
    titulo: "Nossa história",
    paragrafos: [
      "A CNC nasceu em Maceió, há cerca de seis anos, com um objetivo claro: aproximar o comércio da região de sistemas de gestão confiáveis e de um suporte que realmente acompanha o dia a dia de quem está no balcão.",
      "Desde então, a empresa cresceu junto com seus clientes e hoje atende cerca de 90 negócios ativos em segmentos variados — de mercados e restaurantes a óticas, confecções, materiais de construção e distribuidoras. Representando os sistemas AVANTE, SGBR e PRODO, a CNC reúne a escolha do software e o suporte humanizado em um só lugar, mantendo o atendimento próximo como marca registrada.",
    ],
  },

  numeros: [
    { valor: "6", label: "anos de mercado" },
    { valor: "90", label: "clientes ativos" },
    { valor: "3", label: "sistemas representados" },
  ],

  // Seção de equipe oculta por enquanto (membros vazio = seção não renderiza).
  equipe: {
    titulo: "Quem atende você",
    texto:
      "Pessoas reais que conhecem os sistemas e a rotina de cada operação. Conheça parte da equipe da CNC.",
    membros: [] as { nome: string; cargo: string; foto: string }[],
  },
};
