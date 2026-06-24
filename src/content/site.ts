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
   * Atendimento 24/7. `semana`/`sabado` mantêm a mesma mensagem porque o suporte
   * não para — exibidos no Footer, em Contato e em Suporte.
   */
  horario: {
    semana: "24 horas por dia, 7 dias por semana",
    sabado: "Todos os dias, inclusive sábados, domingos e feriados",
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
   */
  numeros: {
    clientesAtivos: String(metrics.clientesAtivos),
    anosMercado: "6",
  },
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
