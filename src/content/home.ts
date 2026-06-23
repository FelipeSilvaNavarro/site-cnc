/**
 * Conteúdo das seções da Home: diferenciais, etapas, depoimentos e segmentos.
 * Textos de chamada/benefício são livres; dados factuais usam {{PREENCHER}}.
 */

export const hero = {
  // Reforça o diferencial central: suporte local e presencial em Maceió.
  sobrelinha: "Sistema de gestão e PDV em Maceió",
  titulo: "Suporte local, presencial e na hora. O sistema certo para o seu comércio.",
  subtitulo:
    "A CNC representa e dá suporte aos principais sistemas de gestão do mercado. Aqui o lojista não fica na mão de central distante: tem atendimento humano, próximo e rápido de quem resolve em Maceió.",
  ctaPrimario: "Falar no WhatsApp",
  ctaSecundario: "Pedir orçamento",
  // Slot de imagem: foto real do atendimento/equipe da CNC.
  imagem: {
    src: "/fotos/hero.jpg",
    alt: "{{PREENCHER: descrição da foto do hero (ex.: técnico da CNC atendendo cliente no balcão da loja)}}",
  },
};

export const diferenciais = {
  titulo: "Por que o comércio de Maceió escolhe a CNC",
  texto:
    "A diferença não está só no software. Está em ter alguém perto quando o caixa não pode parar.",
  blocos: [
    {
      titulo: "Suporte local e presencial",
      texto:
        "Quando o problema exige presença, a CNC vai até a sua loja. Atendimento em Maceió, sem fila de protocolo em central distante.",
    },
    {
      titulo: "Atendimento humano",
      texto:
        "Você fala com pessoas que conhecem o seu negócio e respondem rápido. Sem robô, sem empurrar para o próximo setor.",
    },
    {
      titulo: "Proximidade que resolve",
      texto:
        "Implantação, treinamento e suporte contínuo com quem entende a rotina do comércio pequeno e médio da região.",
    },
  ],
};

export const comoFunciona = {
  titulo: "Como a CNC trabalha",
  texto:
    "Do primeiro contato ao dia a dia da loja, um processo simples e acompanhado de perto.",
  etapas: [
    {
      numero: "01",
      titulo: "Diagnóstico do comércio",
      texto:
        "Entendemos como funciona a sua operação, o seu segmento e o seu porte para indicar o sistema certo, sem vender o que você não precisa.",
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
        "Depois da implantação, a CNC continua por perto: suporte presencial e remoto para manter o caixa rodando sem sustos.",
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
 * DEPOIMENTOS REAIS APENAS. Não inventar. Cada slot abaixo espera nome, empresa
 * e texto reais autorizados pelo cliente. Remova os slots que não usar.
 */
export const depoimentos: Depoimento[] = [
  {
    nome: "{{PREENCHER: nome do cliente 1}}",
    empresa: "{{PREENCHER: nome do comércio do cliente 1}}",
    texto: "{{PREENCHER: depoimento real autorizado do cliente 1}}",
    foto: "/fotos/depoimentos/cliente-1.jpg",
  },
  {
    nome: "{{PREENCHER: nome do cliente 2}}",
    empresa: "{{PREENCHER: nome do comércio do cliente 2}}",
    texto: "{{PREENCHER: depoimento real autorizado do cliente 2}}",
    foto: "/fotos/depoimentos/cliente-2.jpg",
  },
  {
    nome: "{{PREENCHER: nome do cliente 3}}",
    empresa: "{{PREENCHER: nome do comércio do cliente 3}}",
    texto: "{{PREENCHER: depoimento real autorizado do cliente 3}}",
    foto: "/fotos/depoimentos/cliente-3.jpg",
  },
];

export const segmentos = {
  titulo: "Segmentos que a CNC atende",
  texto:
    "Sistemas e suporte ajustados à realidade de cada tipo de comércio.",
  lista: [
    { nome: "Mercados e mercearias", icone: "mercado" },
    { nome: "Restaurantes e lanchonetes", icone: "restaurante" },
    { nome: "Lojas de roupa e calçados", icone: "moda" },
    { nome: "Farmácias e drogarias", icone: "farmacia" },
    { nome: "Materiais de construção", icone: "construcao" },
    { nome: "Padarias e conveniências", icone: "padaria" },
    { nome: "Autopeças e oficinas", icone: "autopecas" },
    { nome: "Comércio em geral", icone: "comercio" },
  ],
};

export const ctaFinal = {
  titulo: "Fale com um especialista da CNC",
  texto:
    "Conte como funciona o seu comércio. A gente indica o sistema certo e cuida do suporte para você focar em vender.",
  ctaPrimario: "Falar no WhatsApp",
  ctaSecundario: "Pedir orçamento",
};
