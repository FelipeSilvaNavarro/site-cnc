/**
 * Conteúdo da página Sobre a CNC. História, mercado e equipe.
 * Dados factuais (anos, fundação, nomes) usam {{PREENCHER}}.
 */

export const sobre = {
  sobrelinha: "Sobre a CNC",
  titulo: "Uma revenda local que o comércio de Maceió confia",
  intro:
    "A CNC representa e dá suporte aos principais sistemas de gestão e PDV do mercado, atendendo o comércio pequeno e médio de Maceió e região. O lojista compra o sistema e o suporte em um só lugar, com quem está perto para resolver.",

  historia: {
    titulo: "Nossa história",
    // Texto factual de história: confirmar dados reais.
    paragrafos: [
      "{{PREENCHER: parágrafo de história real da CNC (quando começou, como surgiu, fundadores)}}",
      "{{PREENCHER: parágrafo sobre evolução e mercado atendido (nº de clientes, região, foco)}}",
    ],
  },

  numeros: [
    { valor: "{{PREENCHER: anos de mercado}}", label: "anos de mercado" },
    { valor: "{{PREENCHER: nº de clientes ativos}}", label: "clientes ativos" },
    { valor: "4", label: "sistemas representados" },
  ],

  equipe: {
    titulo: "Quem atende você",
    texto:
      "Pessoas reais, próximas, que conhecem a rotina do comércio. Conheça parte da equipe da CNC.",
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
