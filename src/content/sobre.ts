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
    // Texto factual de história: confirmar dados reais.
    paragrafos: [
      "{{PREENCHER: parágrafo de história real da CNC (quando começou, como surgiu, fundadores)}}",
      "{{PREENCHER: parágrafo sobre evolução e mercado atendido (nº de clientes, segmentos, foco)}}",
    ],
  },

  numeros: [
    { valor: "6", label: "anos de mercado" },
    { valor: "90", label: "clientes ativos" },
    { valor: "3", label: "sistemas representados" },
  ],

  equipe: {
    titulo: "Quem atende você",
    texto:
      "Pessoas reais que conhecem os sistemas e a rotina de cada operação. Conheça parte da equipe da CNC.",
    // Slots de fotos reais da equipe.
    membros: [
      {
        nome: "{{PREENCHER: nome do membro 1}}",
        cargo: "{{PREENCHER: cargo/função do membro 1}}",
        foto: "/fotos/equipe/membro-1.jpg",
      },
      {
        nome: "{{PREENCHER: nome do membro 2}}",
        cargo: "{{PREENCHER: cargo/função do membro 2}}",
        foto: "/fotos/equipe/membro-2.jpg",
      },
      {
        nome: "{{PREENCHER: nome do membro 3}}",
        cargo: "{{PREENCHER: cargo/função do membro 3}}",
        foto: "/fotos/equipe/membro-3.jpg",
      },
    ],
  },
};
