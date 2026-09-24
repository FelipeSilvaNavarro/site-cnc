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
    "Quando a nota trava no meio do movimento, você fala direto com quem conhece a sua operação, e o técnico vai até a loja quando o caso pede. A partir de R$ 100 por mês, com instalação, migração dos seus dados e treinamento da equipe inclusos.",
  // No celular o subtítulo inteiro empurra o botão para fora da primeira tela,
  // então lá entra só a frase do preço, que é o que filtra quem chega.
  subtituloCurto:
    "A partir de R$ 100 por mês, com instalação, migração dos dados e treinamento inclusos.",
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
    "A CNC acompanha a escolha, a implantação e o uso do sistema no dia a dia da loja, e quem vende é quem atende depois.",
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
 * TELAS DO SISTEMA — capturas reais, uma por porte.
 *
 * A seção da home e o bloco de cada porte em /sistemas só aparecem quando o
 * arquivo existe em /public (conferido no build por `fotoExiste`). Enquanto
 * não houver captura, nada é mostrado: tela desenhada imitando o sistema seria
 * conteúdo inventado. Gerar com `npm run foto tela-pro <captura.png>`.
 */
export const telas = {
  titulo: "O sistema por dentro",
  texto:
    "Telas reais dos sistemas que a CNC instala e atende, do jeito que aparecem no caixa da loja.",
  itens: [
    { slug: "pro", src: "/fotos/telas/pro.jpg" },
    { slug: "medio", src: "/fotos/telas/medio.jpg" },
    { slug: "simples", src: "/fotos/telas/simples.jpg" },
  ],
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
 * O valor de entrada é o Simples (PRODO), R$ 100,00 por mês desde 23/09/2026. Se o piso mudar
 * lá, muda aqui, porque página que promete um número e proposta que entrega
 * outro queima a conversa que o anúncio pagou para acontecer.
 */
export const preco = {
  titulo: "Quanto custa",
  valor: "R$ 100",
  periodo: "por mês",
  texto:
    "É o valor de entrada do Simples, para quem tem um caixa e precisa emitir nota. O preço final depende do porte da operação, do número de caixas e do que a sua rotina fiscal exige, e a gente fecha isso na conversa, sem enrolação.",
  inclui: [
    "Instalação e configuração do sistema na sua loja",
    "Migração dos dados que você já tem hoje",
    "Treinamento da equipe até o caixa rodar sozinho",
    "Suporte durante todo o mês, sem custo por chamado",
  ],
  cta: "Falar no WhatsApp",
};

export const ctaFinal = {
  titulo: "Conte como é a sua loja",
  texto:
    "Quantos caixas, que nota você emite e o que mais trava hoje. Com isso a CNC indica o porte certo e diz o valor na mesma conversa.",
  ctaPrimario: "Falar no WhatsApp",
  ctaSecundario: "Pedir orçamento",
};

/**
 * ONDE O TÉCNICO VAI — as cidades vêm de `site.cidadesAtendidas`, que é onde a
 * CNC já tem cliente. A lista é o argumento: concorrente nacional não tem placa
 * nenhuma para mostrar aqui.
 */
export const cobertura = {
  texto:
    "Cidades onde a CNC já tem cliente e já foi até a loja. A sua não está na placa? Chama no WhatsApp que a gente vê o deslocamento.",
};

/**
 * PERGUNTAS FREQUENTES — respostas montadas só com dado que já está no site
 * (preço, o que inclui, horário, cidades, portes e notas fiscais). Alimentam a
 * seção visível e o JSON-LD `FAQPage`, que é o formato que o Google e as IAs de
 * busca usam para citar resposta direta.
 */
export function perguntasFrequentes(dados: {
  horario: string;
  cidades: readonly string[];
  portes: { nome: string; resumo: string }[];
  notas: string;
}) {
  return [
    {
      pergunta: "Quanto custa o sistema de gestão da CNC?",
      resposta: `A partir de ${preco.valor} ${preco.periodo}, para o comércio de um caixa. ${preco.texto.split(". ").slice(1).join(". ")}`,
    },
    {
      pergunta: "O que está incluso na mensalidade?",
      resposta: `${preco.inclui.join(", ")}.`,
    },
    {
      pergunta: "Preciso abrir chamado para ter suporte?",
      resposta:
        "Não. Você fala direto com quem conhece o seu sistema e o seu negócio, pelo WhatsApp ou por telefone, sem central, sem protocolo e sem ficar pulando de setor.",
    },
    {
      pergunta: "Qual o horário de atendimento?",
      resposta: `${dados.horario}, inclusive sábado, domingo e feriado.`,
    },
    {
      pergunta: "O técnico vai até a minha loja?",
      resposta: `Vai, quando o caso pede. A CNC já atende clientes em ${dados.cidades.join(", ")}, todas em Alagoas.`,
    },
    {
      pergunta: "Qual sistema serve para o meu comércio?",
      resposta: `Depende do porte da operação. ${dados.portes
        .map((p) => `${p.nome}: ${p.resumo}`)
        .join(" ")} A CNC olha a sua rotina e indica o porte certo antes de você fechar.`,
    },
    {
      pergunta: "O sistema emite nota fiscal?",
      resposta: dados.notas,
    },
  ];
}

/**
 * MANIFESTO — a frase que acende com a rolagem logo abaixo do topo. É a
 * promessa da CNC dita como o dono diria, e cada parte dela está no site:
 * sem central (suporte.ts), técnico na loja (cidadesAtendidas).
 */
export const manifesto =
  "Quando a nota trava no meio do movimento, você não abre chamado nem espera fila. Você fala com quem conhece a sua loja, e quando o caso pede, o técnico vai até o balcão.";

/**
 * CUPOM — a cena travada em que o cupom fiscal sai da impressora enquanto os
 * quatro passos acendem. Cada passo é um destaque real dos sistemas
 * (sistemas.ts): frente de caixa, estoque, emissão fiscal e financeiro. O
 * cupom é ilustração de um objeto do comércio, não tela de sistema, e por isso
 * a loja dele se chama "Seu comércio".
 */
export const cupom = {
  titulo: "Uma venda, e o resto se resolve sozinho",
  texto:
    "Do bipe no caixa ao dinheiro no financeiro, o sistema faz o caminho inteiro enquanto a fila anda.",
  passos: [
    {
      titulo: "Passou no caixa",
      texto: "A frente de caixa registra a venda rápido, sem travar a fila do movimento.",
    },
    {
      titulo: "Saiu do estoque",
      texto: "Cada item vendido baixa do estoque na hora, sem planilha paralela e sem surpresa no balanço.",
    },
    {
      titulo: "Nota autorizada",
      texto: "A NFC-e é emitida junto com a venda, do jeito que a Sefaz pede, e o cupom sai pronto.",
    },
    {
      titulo: "Entrou no financeiro",
      texto: "O valor cai no caixa do dia, com contas a pagar e a receber no mesmo sistema.",
    },
  ],
  // Itens do cupom ilustrativo. A soma bate com o total (105,31).
  itens: [
    { cod: "001", desc: "ARROZ TIPO 1 5KG", qtd: "1", valor: "28,90" },
    { cod: "002", desc: "FEIJAO CARIOCA 1KG", qtd: "2", valor: "15,80" },
    { cod: "003", desc: "CAFE TORRADO 500G", qtd: "1", valor: "17,49" },
    { cod: "004", desc: "LEITE INTEGRAL 1L", qtd: "6", valor: "35,94" },
    { cod: "005", desc: "PAO FRANCES KG", qtd: "0,480", valor: "7,18" },
  ],
  total: "105,31",
};
