/**
 * segmentos.ts — Páginas por ramo de comércio ("sistema para mercadinho" etc.).
 *
 * POR QUE EXISTE
 * --------------
 * Quem pesquisa "sistema para mercadinho em Maceió" cai hoje na home genérica,
 * e o Google prefere a página cujo título e H1 repetem o termo pesquisado. Cada
 * item daqui vira uma rota própria no topo do site, com o slug como endereço
 * (`/sistema-para-mercadinho`).
 *
 * COMO SE LIGA AO RESTO
 * --------------------
 * - `app/(site)/[segmento]/page.tsx` gera uma página estática por item, e slug
 *   fora desta lista dá 404.
 * - `app/sitemap.ts` lista todos os slugs daqui.
 * - `porte` aponta para o `slug` de `sistemas.ts` e vira link `/sistemas#<porte>`.
 *
 * PARA CRIAR UMA PÁGINA NOVA basta acrescentar um objeto, sem tocar em layout.
 * A dor de cada ramo vem do Playbook do Vendedor no vault. Nada de recurso que
 * o sistema não tem, nem número ou depoimento inventado. Técnico na loja e itens
 * inclusos ficam fora do topo (decisão de 29/09/2026, commit ad4ec78), e a CNC não
 * promete cadastro de produto, só a migração do sistema anterior (contrato, 05/10/2026).
 */

/** Uma página de ramo. */
export type Segmento = {
  /** Endereço da página, sem barra (ex.: "sistema-para-mercadinho"). */
  slug: string;
  /** Nome do ramo como entra na frase ("mercadinho e mercearia"). */
  ramo: string;
  /** H1 e título da aba. Repete o termo que a pessoa pesquisa. */
  titulo: string;
  /** Meta descrição para a lista de resultados do Google. */
  descricao: string;
  /** Primeira frase abaixo do título, acima da dobra. */
  promessa: string;
  /** O que dói no dia a dia desse ramo, um item por dor. */
  dores: string[];
  /** Como a CNC monta o sistema para esse ramo. */
  comoResolve: string;
  /** Slug do porte indicado em `sistemas.ts`. */
  porte: "pro" | "medio" | "simples";
  /** Por que esse porte, em uma frase. */
  porQuePorte: string;
  /** Texto pré-preenchido no WhatsApp, diz de qual página a pessoa veio. */
  mensagem: string;
};

export const segmentos: Segmento[] = [
  {
    slug: "sistema-para-mercadinho",
    ramo: "mercadinho e mercearia",
    titulo: "Sistema para mercadinho em Maceió",
    descricao:
      "Sistema de PDV e gestão para mercadinho e mercearia em Maceió e no interior de Alagoas, com nota fiscal no caixa, estoque e financeiro, a partir de R$ 100 por mês.",
    promessa:
      "Caixa rápido, nota fiscal na hora e estoque que avisa o que está acabando, para mercadinho em Maceió e no interior de Alagoas.",
    dores: [
      "Produto vencendo na prateleira sem ninguém perceber",
      "Falta do que mais vende e o cliente indo comprar no vizinho",
      "Fila no caixa enquanto a nota fiscal não sai",
      "Fechamento do dia que nunca bate com a gaveta",
    ],
    comoResolve:
      "A CNC traz os produtos do sistema que você já usa, configura a emissão da nota no caixa, treina quem opera e deixa o estoque baixando a cada venda, então você sabe o que repor antes do cliente perguntar e fecha o dia vendo quanto entrou em dinheiro, cartão e Pix.",
    porte: "simples",
    porQuePorte:
      "Com um caixa o Simples resolve, e quando o mercadinho passa para duas ou mais frentes de caixa o indicado é o PRO.",
    mensagem: "Oi! Vi no site a página de sistema para mercadinho e quero saber como funciona.",
  },
  {
    slug: "sistema-para-acougue",
    ramo: "açougue e peixaria",
    titulo: "Sistema para açougue em Maceió",
    descricao:
      "Sistema de PDV para açougue e peixaria em Maceió e Alagoas, com venda por peso, nota fiscal e controle de estoque, a partir de R$ 100 por mês.",
    promessa:
      "Venda por peso, nota fiscal no balcão e controle do que entra e do que sai, configurado para a rotina do seu açougue.",
    dores: [
      "Margem que some entre a peça que chega e o quilo que sai",
      "Perda do dia que ninguém anota",
      "Peso digitado na mão no caixa",
      "Nota fiscal que atrasa o atendimento no horário de pico",
    ],
    comoResolve:
      "A CNC configura a venda por quilo, liga a balança ao sistema quando o modelo permite e deixa a venda por corte configurada, de modo que a venda já sai com o peso certo e você enxerga quanto cada corte rendeu no fim do dia.",
    porte: "simples",
    porQuePorte:
      "O Simples cobre o açougue de um caixa, e com mais de uma frente de caixa ou venda no atacado o indicado é o PRO.",
    mensagem: "Oi! Vi no site a página de sistema para açougue e quero saber como funciona.",
  },
  {
    slug: "sistema-para-loja-de-roupas",
    ramo: "loja de roupas e calçados",
    titulo: "Sistema para loja de roupas em Maceió",
    descricao:
      "Sistema de gestão e PDV para loja de roupas, calçados e confecção em Maceió e Alagoas, com estoque por tamanho e cor, nota fiscal e financeiro.",
    promessa:
      "Estoque por tamanho e cor, venda com nota fiscal e o crediário no lugar certo, para loja em Maceió e no interior de Alagoas.",
    dores: [
      "Peça nova chegando sem controle de tamanho e cor",
      "Cliente pedindo um número que ninguém sabe se ainda tem",
      "Crediário anotado em caderno",
      "Troca que desfaz a venda e bagunça o estoque",
    ],
    comoResolve:
      "A CNC configura a grade de tamanho e cor que a sua loja usa, a nota e o financeiro, e treina a equipe do balcão, então a pergunta \"tem no 38?\" se responde na tela e o que o cliente deve fica registrado com data de vencimento.",
    porte: "pro",
    porQuePorte:
      "O PRO segura grade de produto, financeiro e mais de um vendedor no mesmo sistema, que é o que a loja de roupa costuma pedir.",
    mensagem: "Oi! Vi no site a página de sistema para loja de roupas e quero saber como funciona.",
  },
  {
    slug: "sistema-para-material-de-construcao",
    ramo: "material de construção e ferragem",
    titulo: "Sistema para material de construção em Maceió",
    descricao:
      "Sistema de gestão para loja de material de construção e ferragem em Maceió e Alagoas, com orçamento, estoque de milhares de itens, nota fiscal e financeiro.",
    promessa:
      "Orçamento que vira venda sem redigitar, estoque de milhares de itens no sistema e nota fiscal saindo do balcão.",
    dores: [
      "Orçamento feito no papel e redigitado na hora da venda",
      "Milhares de itens e nenhum controle de quanto tem de cada um",
      "Venda a prazo para cliente de obra sem acompanhamento",
      "Nota de entrada de fornecedor lançada item por item",
    ],
    comoResolve:
      "A CNC migra os produtos que você já tem e configura orçamento, venda, nota e contas a receber no mesmo sistema, de modo que o orçamento aprovado vira pedido sem digitar de novo e o fiado da obra tem dono e vencimento.",
    porte: "pro",
    porQuePorte:
      "O PRO aguenta cadastro grande, várias frentes de venda e exigência fiscal pesada, que é a rotina de quem vende material de construção.",
    mensagem:
      "Oi! Vi no site a página de sistema para material de construção e quero saber como funciona.",
  },
  {
    slug: "sistema-para-distribuidora",
    ramo: "distribuidora e atacado",
    titulo: "Sistema para distribuidora em Alagoas",
    descricao:
      "Sistema de gestão para distribuidora e atacado em Maceió e Alagoas, com pedido de vendedor externo, nota fiscal de saída, estoque e financeiro.",
    promessa:
      "Pedido do vendedor externo, nota de saída e estoque conversando no mesmo sistema, para distribuidora em qualquer cidade de Alagoas.",
    dores: [
      "Pedido do vendedor na rua chegando por mensagem e sendo redigitado",
      "Nota de saída que atrasa o carregamento",
      "Estoque que só confere no balanço",
      "Contas a receber de dezenas de clientes sem acompanhamento",
    ],
    comoResolve:
      "A CNC configura o fluxo do pedido até a nota, migra clientes e produtos e treina escritório e expedição, então o pedido que chega já sai faturado, o estoque baixa na saída e o financeiro mostra quem está devendo.",
    porte: "pro",
    porQuePorte:
      "O PRO foi feito para quem fatura muita nota, tem estoque grande e vende a prazo, que é o desenho de uma distribuidora.",
    mensagem: "Oi! Vi no site a página de sistema para distribuidora e quero saber como funciona.",
  },
];
