/**
 * Conteúdo da página de Suporte — o diferencial central da CNC.
 */

export const suporte = {
  sobrelinha: "O diferencial da CNC",
  titulo: "Suporte que atende de verdade, aqui em Maceió",
  intro:
    "O sistema é só metade da solução. A outra metade é ter quem responda quando algo trava no meio do expediente. A CNC foi construída para isso: ser o suporte local que o comércio de Maceió pode contar.",

  // Imagem real do atendimento/equipe.
  imagem: {
    src: "/fotos/suporte.jpg",
    alt: "{{PREENCHER: descrição da foto da equipe de suporte da CNC}}",
  },

  comoFunciona: {
    titulo: "Como funciona o atendimento",
    itens: [
      {
        titulo: "Atendimento remoto rápido",
        texto:
          "Acesso remoto para resolver a maioria das situações na hora, sem você sair do balcão.",
      },
      {
        titulo: "Suporte presencial em Maceió",
        texto:
          "Quando o caso exige presença, a CNC vai até a sua loja. Esse é o diferencial de comprar com revenda local.",
      },
      {
        titulo: "Quem atende conhece o seu negócio",
        texto:
          "Sem repetir o problema para três setores. Você fala com quem entende a sua operação.",
      },
    ],
  },

  canais: {
    titulo: "Canais de atendimento",
    // Detalhes de horário e SLA vêm do arquivo site.ts e do marcador abaixo.
    observacao:
      "{{PREENCHER: descrever política de atendimento real (horários, tempo médio de resposta, suporte emergencial, se houver)}}",
  },
};
