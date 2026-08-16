/**
 * home.ts — Conteúdo das seções da página inicial.
 *
 * Exporta os blocos consumidos por `app/(site)/page.tsx`: `hero` (chamada
 * principal), `diferenciais`, `comoFunciona` (etapas), `depoimentos` (oculto
 * enquanto vazio), `segmentos` e `ctaFinal`. Editar texto aqui altera a Home
 * sem mexer no JSX.
 */

/**
 * HERO — a única parte da página que a maioria vê.
 *
 * A versão anterior dizia "O sistema de gestão certo para o seu negócio", que
 * serve para qualquer empresa do Brasil e não respondia nenhuma das três
 * perguntas de quem chega de uma busca: o que é, para quem é e onde é. Quem
 * pesquisou "sistema para mercadinho em Maceió" caía numa página que não
 * repetia nem "mercadinho" nem "Maceió", e incoerência entre o termo buscado e
 * a primeira linha é a causa mais comum de clique caro sem conversa.
 *
 * O que sustenta a promessa é presença física em Alagoas, porque o concorrente
 * nacional que aparece no mesmo anúncio não consegue prometer técnico na loja.
 */
export const hero = {
  sobrelinha: "Mercadinho, açougue, padaria, loja, distribuidora",
  titulo: "Sistema de gestão e PDV para o comércio de Maceió e do interior de Alagoas.",
  // Texto sem citar marcas de fornecedores (decisão de negócio — ver sistemas.ts).
  // Original: "A CNC representa e dá suporte aos principais sistemas de gestão e PDV do mercado. ..."
  subtitulo:
    "Quando a nota trava no meio do movimento, você fala direto com quem conhece a sua operação, e o técnico vai até a loja quando o caso pede. A partir de R$ 150 por mês, com instalação, migração dos seus dados e treinamento da equipe inclusos.",
  ctaPrimario: "Falar no WhatsApp",
  ctaSecundario: "Pedir orçamento",
  // Slot de imagem: foto real do atendimento/equipe/operação da CNC.
  imagem: {
    src: "/fotos/hero.jpg",
    alt: "CNC — sistemas de gestão e suporte para o comércio",
  },
};

export const diferenciais = {
  titulo: "Por que trabalhar com a CNC",
  texto:
    "Mais do que vender licença: a CNC acompanha a escolha, a implantação e o uso do sistema no seu dia a dia.",
  blocos: [
    {
      titulo: "Suporte humanizado",
      texto:
        "Você fala com gente que conhece o seu sistema e o seu negócio. Atendimento direto, sem central, sem abrir chamado e sem ficar pulando de setor.",
    },
    {
      titulo: "Consultoria na escolha",
      texto:
        "A CNC analisa a sua operação e indica o sistema que faz sentido para o seu porte e segmento, com o que você precisa e sem o que não vai usar.",
    },
    {
      titulo: "Implantação e treinamento",
      texto:
        "Instalação, configuração e treinamento da equipe para o sistema entrar em produção com segurança desde o primeiro dia.",
    },
    {
      titulo: "Acompanhamento contínuo",
      texto:
        "Depois de implantar, a CNC continua presente: suporte contínuo para manter a operação rodando sem travar o seu faturamento.",
    },
  ],
};

export const comoFunciona = {
  titulo: "Como a CNC trabalha",
  texto:
    "Do primeiro contato ao uso diário do sistema, um processo simples e acompanhado de perto.",
  etapas: [
    {
      numero: "01",
      titulo: "Diagnóstico do negócio",
      texto:
        "Entendemos a sua operação, o seu segmento e o seu porte para indicar o sistema certo, com o que a sua rotina realmente exige.",
    },
    {
      numero: "02",
      titulo: "Implantação e treinamento",
      texto:
        "Instalamos, configuramos e treinamos a sua equipe para usar o sistema com segurança desde o primeiro dia.",
    },
    {
      numero: "03",
      titulo: "Suporte contínuo",
      texto:
        "Depois da implantação, a CNC segue por perto: suporte humanizado e direto para resolver o que aparecer no dia a dia.",
    },
  ],
};

export type Depoimento = {
  nome: string;
  empresa: string;
  texto: string;
  // Foto opcional do cliente em /public/fotos/depoimentos/. Slot reservado.
  foto?: string;
};

/**
 * DEPOIMENTOS REAIS APENAS. Não inventar. Cada item espera nome, empresa e texto
 * reais autorizados pelo cliente. Enquanto vazio, a seção de depoimentos fica
 * oculta na home (ver condicional em app/(site)/page.tsx).
 */
export const depoimentos: Depoimento[] = [];

export const segmentos = {
  titulo: "Segmentos que a CNC atende",
  texto: "Sistemas e suporte ajustados à realidade de cada tipo de operação.",
  lista: [
    { nome: "Indústrias e fábricas", icone: "industria" },
    { nome: "Mercados e mercearias", icone: "mercado" },
    { nome: "Restaurantes e lanchonetes", icone: "restaurante" },
    { nome: "Lojas de roupa e calçados", icone: "moda" },
    { nome: "Farmácias e drogarias", icone: "farmacia" },
    { nome: "Materiais de construção", icone: "construcao" },
    { nome: "Autopeças e oficinas", icone: "autopecas" },
    { nome: "Comércio em geral", icone: "comercio" },
  ],
};

/**
 * PREÇO — seção nova, e ela existe para filtrar antes de custar conversa.
 *
 * O valor de entrada é o mesmo do vault (R$ 150,00 por mês). Se o piso mudar
 * lá, muda aqui, porque página que promete um número e proposta que entrega
 * outro queima a conversa que o anúncio pagou para acontecer.
 */
export const preco = {
  titulo: "Quanto custa",
  valor: "R$ 150",
  periodo: "por mês",
  texto:
    "É o valor de entrada, para o comércio de um caixa. O preço final depende do porte da operação, do número de caixas e do que a sua rotina fiscal exige, e a gente fecha isso na conversa, sem enrolação.",
  inclui: [
    "Instalação e configuração do sistema na sua loja",
    "Migração dos dados que você já tem hoje",
    "Treinamento da equipe até o caixa rodar sozinho",
    "Suporte durante todo o mês, sem custo por chamado",
  ],
  cta: "Falar no WhatsApp",
};

export const ctaFinal = {
  titulo: "Fale com um especialista da CNC",
  texto:
    "Conte como funciona o seu negócio. Indicamos o sistema certo e cuidamos do suporte para você focar no que importa.",
  ctaPrimario: "Falar no WhatsApp",
  ctaSecundario: "Pedir orçamento",
};
