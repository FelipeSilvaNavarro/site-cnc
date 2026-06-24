/**
 * suporte.ts — Conteúdo da página de Suporte (o diferencial central da CNC).
 *
 * Exporta o objeto `suporte`, consumido por `app/(site)/suporte/page.tsx`:
 * cabeçalho + imagem, "como funciona o atendimento" e o bloco de canais. Os
 * horários exibidos na tabela de canais vêm de `site.horario` (24/7).
 */

export const suporte = {
  sobrelinha: "O diferencial da CNC",
  titulo: "Suporte humanizado, direto e contínuo",
  intro:
    "Quando algo trava no meio do expediente, você precisa de resposta, não de protocolo. Na CNC o suporte é com gente que conhece o seu sistema e o seu negócio, do primeiro contato ao dia a dia.",

  // Imagem real do atendimento/equipe.
  imagem: {
    src: "/fotos/suporte.jpg",
    alt: "Equipe de suporte da CNC em atendimento",
  },

  comoFunciona: {
    titulo: "Como funciona o atendimento",
    itens: [
      {
        titulo: "Sem central de chamados",
        texto:
          "Você fala direto com quem resolve. Nada de abrir ticket, esperar fila ou repetir o problema para três setores diferentes.",
      },
      {
        titulo: "Atendimento humanizado",
        texto:
          "Pessoas reais que conhecem o seu sistema e a sua operação acompanham o seu negócio e respondem rápido.",
      },
      {
        titulo: "Suporte contínuo",
        texto:
          "O acompanhamento não termina na implantação. A CNC segue presente para resolver o que aparecer no uso diário.",
      },
    ],
  },

  canais: {
    titulo: "Canais de atendimento",
    // Detalhes de horário vêm do arquivo site.ts (24/7).
    observacao:
      "Atendimento 24 horas por dia, 7 dias por semana, sem parar. O suporte é feito por pessoas que conhecem o seu sistema, com resposta rápida e acompanhamento até a solução.",
  },
};
