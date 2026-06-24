/**
 * home.ts — Conteúdo das seções da página inicial.
 *
 * Exporta os blocos consumidos por `app/(site)/page.tsx`: `hero` (chamada
 * principal), `diferenciais`, `comoFunciona` (etapas), `depoimentos` (oculto
 * enquanto vazio), `segmentos` e `ctaFinal`. Editar texto aqui altera a Home
 * sem mexer no JSX.
 */

export const hero = {
  sobrelinha: "Sistemas de gestão e PDV",
  titulo: "O sistema de gestão certo para o seu negócio.",
  // Texto sem citar marcas de fornecedores (decisão de negócio — ver sistemas.ts).
  // Original: "A CNC representa e dá suporte aos principais sistemas de gestão e PDV do mercado. ..."
  subtitulo:
    "A CNC oferece e dá suporte a sistemas de gestão e PDV sob medida para o seu negócio. Atendimento humanizado, direto e contínuo: você fala com quem resolve.",
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

export const ctaFinal = {
  titulo: "Fale com um especialista da CNC",
  texto:
    "Conte como funciona o seu negócio. Indicamos o sistema certo e cuidamos do suporte para você focar no que importa.",
  ctaPrimario: "Falar no WhatsApp",
  ctaSecundario: "Pedir orçamento",
};
