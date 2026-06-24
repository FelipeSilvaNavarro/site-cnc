/**
 * Dados globais da CNC: razão social, contatos, endereço e navegação.
 *
 * Edite SOMENTE este arquivo para alterar contatos em todo o site.
 * Marcadores {{PREENCHER:...}} indicam dados reais que faltam ser fornecidos.
 */

export const site = {
  nome: "CNC",
  // Domínio oficial. Usado em metadados, sitemap e robots. Trocar aqui só se
  // mudar o domínio.
  url: "https://cncsistemas.com.br",
  nomeCompleto: "C.N.C Sistemas e Representações",
  cnpj: "39.866.982/0001-34",
  descricaoCurta:
    "Revenda e suporte de sistemas de gestão e PDV, com atendimento humanizado e contínuo.",

  // Usados apenas no endereço cadastral (não como argumento de venda).
  cidade: "Maceió",
  uf: "AL",

  // Contatos — substituir pelos números/e-mails reais.
  whatsapp: {
    // Apenas dígitos, com DDI 55. Ex.: 5582999999999
    numero: "5582993660508",
    exibicao: "(82) 99366-0508",
    mensagemPadrao:
      "Olá! Vim pelo site da CNC e gostaria de falar sobre um sistema de gestão para o meu comércio.",
  },
  telefone: {
    numero: "+5582993660508",
    exibicao: "(82) 99366-0508",
  },
  email: "contato@cncsistemas.com.br",

  endereco: {
    logradouro: "Condomínio Recanto das Estrelas",
    bairro: "Cidade Universitária",
    cidade: "Maceió",
    uf: "AL",
    cep: "57074-215",
    // Mapa genérico (Brasil) — não expõe o ponto exato do endereço.
    mapsEmbedUrl: "https://www.google.com/maps?q=Brasil&z=4&output=embed",
    mapsLinkUrl: "https://www.google.com/maps/place/Brasil",
  },

  horario: {
    semana: "Todos os dias, das 06h às 23h30",
    sabado: "06h às 23h30",
  },

  // Redes sociais — deixe a string vazia para ocultar o link.
  redes: {
    instagram: "https://www.instagram.com/cncsistemas/",
    facebook: "https://www.facebook.com/cncsistemas/?locale=pt_BR",
  },

  // Provas de credibilidade exibidas na barra de prova social.
  numeros: {
    clientesAtivos: "90",
    anosMercado: "6",
  },
} as const;

/** Monta o link de WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(mensagem?: string): string {
  const texto = encodeURIComponent(mensagem ?? site.whatsapp.mensagemPadrao);
  return `https://wa.me/${site.whatsapp.numero}?text=${texto}`;
}

export const navPrincipal = [
  { label: "Início", href: "/" },
  { label: "Sistemas", href: "/sistemas" },
  { label: "Suporte", href: "/suporte" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;
