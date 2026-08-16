/**
 * site.ts — Dados globais da CNC (fonte única de verdade do conteúdo fixo).
 *
 * O QUE É
 * -------
 * Centraliza tudo que é "dado da empresa" e aparece em várias páginas: razão
 * social, contatos, endereço, horário, redes sociais, números de prova social e
 * a navegação principal. Qualquer componente/página importa daqui em vez de
 * repetir o valor — então para mudar um telefone ou um link, edita-se SÓ este
 * arquivo e o site inteiro acompanha.
 *
 * COMO SE LIGA AO RESTO
 * --------------------
 * - `clientesAtivos` vem de `metrics.json`, gerado pelo script
 *   `scripts/sync-obsidian.mjs` a partir do vault do Obsidian (ver aquele
 *   arquivo). Assim o número de clientes do site reflete a base real.
 * - `whatsappLink()` monta o link padrão do WhatsApp usado em TODOS os botões.
 * - `navPrincipal` alimenta o menu do Header e a navegação do Footer.
 */

import metrics from "./metrics.json";

export const site = {
  nome: "CNC",

  /**
   * Domínio oficial. Usado em metadados, Open Graph, sitemap e robots
   * (ver `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`). Trocar aqui só
   * se o domínio mudar.
   */
  url: "https://cncsistemas.com.br",

  // Razão social e CNPJ — exibidos no rodapé e na página Sobre ("Dados da
  // empresa"). CNPJ é informação pública (consultável na Receita), exibi-lo é
  // normal e passa credibilidade.
  nomeCompleto: "C.N.C Sistemas e Representações",
  cnpj: "39.866.982/0001-34",

  descricaoCurta:
    "Revenda e suporte de sistemas de gestão e PDV, com atendimento humanizado e contínuo.",

  // Cidade/UF de origem (Maceió). O posicionamento é nacional, mas a CNC nasceu
  // e mantém base em Maceió — citada na história e no endereço cadastral.
  cidade: "Maceió",
  uf: "AL",

  /**
   * WhatsApp corporativo. `numero` é só dígitos com DDI 55 (formato exigido pelo
   * link wa.me); `exibicao` é como aparece para o usuário. `mensagemPadrao` é o
   * texto pré-preenchido na conversa — ver `whatsappLink()`.
   */
  whatsapp: {
    numero: "5582993660508",
    exibicao: "(82) 99366-0508",
    mensagemPadrao:
      "Oi! Tenho interesse no sistema, pode me passar mais informações?",
  },

  // Telefone/celular (mesmo número do WhatsApp). `numero` com +DDI para o link
  // `tel:`; `exibicao` para o texto visível.
  telefone: {
    numero: "+5582993660508",
    exibicao: "(82) 99366-0508",
  },

  // E-mail de contato. OCULTO no site por enquanto (a conta contato@ ainda será
  // criada no Zoho). As renderizações de e-mail estão comentadas nos componentes
  // (Footer, Contato, Suporte). Valor mantido aqui para descomentar fácil.
  email: "contato@cncsistemas.com.br",

  /**
   * Endereço cadastral. O ponto exato NÃO é exposto no mapa (o embed aponta para
   * o Brasil genérico — ver `mapsEmbedUrl`), por privacidade.
   */
  endereco: {
    logradouro: "Condomínio Recanto das Estrelas",
    bairro: "Cidade Universitária",
    cidade: "Maceió",
    uf: "AL",
    cep: "57074-215",
    // Mapa genérico (Brasil) — não revela a localização exata. Usado no iframe
    // da página de Contato.
    mapsEmbedUrl: "https://www.google.com/maps?q=Brasil&z=4&output=embed",
    mapsLinkUrl: "https://www.google.com/maps/place/Brasil",
  },

  /**
   * Horário de atendimento. Corrigido em 16/08/2026: o site anunciava 24 horas
   * por dia, o perfil do Google dizia que fechava 23:30 e a verdade é 22h.
   *
   * Os três precisam contar a mesma história, porque promessa de atendimento
   * que a operação não cumpre gera a ligação das 23h que ninguém atende, e
   * divergência entre site e Google Meu Negócio ainda derruba ranqueamento
   * local. Mudou aqui, muda no perfil do Google e no JSON-LD do layout.
   */
  horario: {
    semana: "Todos os dias, das 6h às 22h",
    sabado: "Inclusive sábado, domingo e feriado",
  },

  // Redes sociais — string vazia oculta o link (não usado hoje, reservado).
  redes: {
    instagram: "https://www.instagram.com/cncsistemas/",
    facebook: "https://www.facebook.com/cncsistemas/?locale=pt_BR",
  },

  /**
   * Números de prova social. `clientesAtivos` é DINÂMICO: vem do `metrics.json`
   * sincronizado do Obsidian (rode `npm run sync:obsidian` quando a base mudar).
   * `anosMercado` é fixo (a CNC nasceu em 2020).
   *
   * `avaliacoesGoogle` é a prova mais forte que a CNC tem e estava fora do site.
   * CONFERIR no perfil do Google Meu Negócio antes de cada publicação: número
   * exposto que não bate com o painel do Google destrói a confiança que ele
   * deveria construir.
   */
  numeros: {
    clientesAtivos: String(metrics.clientesAtivos),
    anosMercado: "6",
    avaliacoesGoogle: "39",
    notaGoogle: "5,0",
  },

  /**
   * Preço de entrada. Fica visível de propósito.
   *
   * Esconder preço faz o curioso gastar clique de anúncio e meia hora de
   * conversa para descobrir que não é para ele, e em mídia paga isso é o custo
   * que mais dói. Preço na página é o filtro mais barato que existe.
   *
   * O piso real da CNC é R$ 150,00 por mês (decisão registrada no vault). Mudar
   * aqui exige mudar lá também, senão a página promete o que a proposta desmente.
   */
  precos: {
    pisoMensal: "R$ 150",
    pisoMensalPorExtenso: "R$ 150 por mês",
  },

  /** Cidades onde a CNC já tem cliente. Alimenta o JSON-LD de área atendida. */
  cidadesAtendidas: [
    "Maceió",
    "Rio Largo",
    "Marechal Deodoro",
    "Messias",
    "Pilar",
    "União dos Palmares",
    "Satuba",
    "Atalaia",
    "Capela",
    "Maragogi",
    "Passo de Camaragibe",
    "Santa Luzia do Norte",
    "São Miguel dos Milagres",
  ],
} as const;

/**
 * Monta o link padrão do WhatsApp (wa.me) com a mensagem pré-preenchida.
 *
 * Por padrão usa `site.whatsapp.mensagemPadrao`, garantindo que TODOS os botões
 * de WhatsApp do site abram a mesma conversa. É possível passar uma mensagem
 * custom, mas hoje todos os chamadores usam o padrão (uniformidade pedida).
 *
 * @param mensagem Texto opcional pré-preenchido na conversa.
 * @returns URL `https://wa.me/<numero>?text=<mensagem-encodada>`.
 */
export function whatsappLink(mensagem?: string): string {
  const texto = encodeURIComponent(mensagem ?? site.whatsapp.mensagemPadrao);
  return `https://wa.me/${site.whatsapp.numero}?text=${texto}`;
}

/**
 * Texto pré-preenchido conforme o lugar de onde a pessoa clicou.
 *
 * Serve para o Felipe abrir o celular já sabendo o assunto, e serve como
 * segunda fonte de origem quando o bloqueador do visitante derrubar o gtag,
 * que é justamente o público mais difícil de medir.
 *
 * Mantém o tom de quem escreve, e não de formulário: quem manda a mensagem é
 * o cliente, então ela precisa soar como coisa que uma pessoa digitaria.
 */
export function mensagemPorOrigem(origem: string): string {
  const textos: Record<string, string> = {
    hero: "Oi! Vi o site da CNC e quero saber sobre o sistema para o meu comércio.",
    "cta-final":
      "Oi! Vi o site da CNC e quero conversar sobre qual sistema serve para o meu negócio.",
    preco: `Oi! Vi no site que começa em ${site.precos.pisoMensal} por mês e quero entender o que entra nesse valor.`,
    header: "Oi! Vim pelo site da CNC e quero falar sobre sistema de gestão.",
    "menu-mobile": "Oi! Vim pelo site da CNC e quero falar sobre sistema de gestão.",
    flutuante: "Oi! Vim pelo site da CNC e quero falar sobre sistema de gestão.",
    rodape: "Oi! Vim pelo site da CNC e quero falar sobre sistema de gestão.",
    contato: "Oi! Vim pela página de contato do site da CNC.",
    suporte: "Oi! Preciso de suporte no meu sistema.",
    parceiro: "Oi! Tenho interesse em ser parceiro da CNC.",
    "area-do-cliente":
      "Oi! Sou cliente da CNC e preciso de atendimento (segunda via, acesso, suporte).",
  };
  return textos[origem] ?? site.whatsapp.mensagemPadrao;
}

/**
 * Itens do menu principal (Header) e da navegação do rodapé (Footer).
 * A ordem aqui é a ordem exibida. `href` casa com as rotas em `app/(site)`.
 */
export const navPrincipal = [
  { label: "Início", href: "/" },
  { label: "Sistemas", href: "/sistemas" },
  { label: "Suporte", href: "/suporte" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;
