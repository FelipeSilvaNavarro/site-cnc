/**
 * Dados globais da CNC: razão social, contatos, endereço e navegação.
 *
 * Edite SOMENTE este arquivo para alterar contatos em todo o site.
 * Marcadores {{PREENCHER:...}} indicam dados reais que faltam ser fornecidos.
 */

export const site = {
  nome: "CNC",
  nomeCompleto: "{{PREENCHER: razão social completa da CNC}}",
  cnpj: "{{PREENCHER: CNPJ da CNC}}",
  descricaoCurta:
    "Revenda e suporte local de sistemas de gestão e PDV em Maceió/AL.",

  cidade: "Maceió",
  uf: "AL",

  // Contatos — substituir pelos números/e-mails reais.
  whatsapp: {
    // Apenas dígitos, com DDI 55. Ex.: 5582999999999
    numero: "{{PREENCHER: número de WhatsApp com DDI, ex 5582999999999}}",
    exibicao: "{{PREENCHER: telefone de exibição, ex (82) 99999-9999}}",
    mensagemPadrao:
      "Olá! Vim pelo site da CNC e gostaria de falar sobre um sistema de gestão para o meu comércio.",
  },
  telefone: {
    numero: "{{PREENCHER: telefone fixo/celular com DDD}}",
    exibicao: "{{PREENCHER: telefone de exibição, ex (82) 3333-3333}}",
  },
  email: "{{PREENCHER: e-mail de contato da CNC}}",

  endereco: {
    logradouro: "{{PREENCHER: rua e número}}",
    bairro: "{{PREENCHER: bairro}}",
    cidade: "Maceió",
    uf: "AL",
    cep: "{{PREENCHER: CEP}}",
    // Link do Google Maps (embed) — colar URL do local real.
    mapsEmbedUrl: "{{PREENCHER: URL de embed do Google Maps do endereço}}",
    mapsLinkUrl: "{{PREENCHER: URL do Google Maps (abrir no app) do endereço}}",
  },

  horario: {
    semana: "{{PREENCHER: horário seg–sex, ex 08h às 18h}}",
    sabado: "{{PREENCHER: horário sábado, se houver}}",
  },

  // Redes sociais — deixe a string vazia para ocultar o link.
  redes: {
    instagram: "{{PREENCHER: URL do Instagram (ou vazio)}}",
    facebook: "{{PREENCHER: URL do Facebook (ou vazio)}}",
  },

  // Provas de credibilidade exibidas na barra de prova social.
  numeros: {
    clientesAtivos: "{{PREENCHER: nº de clientes ativos, ex 90}}",
    anosMercado: "{{PREENCHER: anos de mercado}}",
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
