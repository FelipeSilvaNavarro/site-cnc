/**
 * analytics.ts — medição de conversa iniciada (a única conversão que importa aqui).
 *
 * O QUE É
 * -------
 * A CNC não vende pelo site, vende na conversa. Então o evento que vale dinheiro
 * não é pageview nem clique em botão qualquer: é o momento em que a pessoa sai
 * daqui para o WhatsApp ou para o telefone. Este arquivo dispara esse evento no
 * GA4 e, ao mesmo tempo, a conversão do Google Ads, para o painel de anúncio
 * conseguir dizer qual palavra-chave gerou conversa e qual só gerou clique.
 *
 * IDs
 * ---
 * Nada é escrito no código. Os três valores vêm de variável de ambiente pública,
 * definida na Vercel (Settings, Environment Variables) e em `.env.local` para
 * rodar na máquina:
 *
 *   NEXT_PUBLIC_GA_ID                 medida do GA4, formato G-XXXXXXXXXX
 *   NEXT_PUBLIC_ADS_ID                conversão do Google Ads, formato AW-000000000
 *   NEXT_PUBLIC_ADS_CONVERSION_LABEL  rótulo da ação de conversão, formato abcDEFghi
 *
 * Faltando os dois primeiros, nenhum script carrega e o site continua normal,
 * o que permite publicar isto antes de a conta de anúncio estar pronta.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID ?? "";
export const ADS_LABEL = process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL ?? "";

export const medicaoAtiva = Boolean(GA_ID || ADS_ID);

/** Onde a pessoa estava quando pediu contato. Vira parâmetro do evento. */
export type OrigemContato =
  | "hero"
  | "cta-final"
  | "header"
  | "menu-mobile"
  | "flutuante"
  | "rodape"
  | "contato"
  | "suporte"
  | "sistemas"
  | "sobre"
  | "parceiro"
  | "area-do-cliente"
  | "preco";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * Dispara o evento de conversa iniciada.
 *
 * No GA4 sai como `generate_lead`, que é o nome recomendado e já entra nos
 * relatórios padrão sem configuração. No Google Ads sai como `conversion` com
 * `send_to`, que é o que a coluna de conversões da campanha lê.
 *
 * A chamada é best-effort de propósito: se o bloqueador de anúncio do visitante
 * matou o gtag, o clique não pode falhar, porque perder a conversa é pior que
 * perder o dado.
 */
export function rastrearContato(
  origem: OrigemContato,
  canal: "whatsapp" | "telefone",
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  try {
    window.gtag("event", "generate_lead", {
      metodo: canal,
      origem,
      // Valor estimado de uma conversa, não de uma venda: o lucro mensal médio
      // de um cliente (R$ 123,40) dividido pela taxa de fechamento assumida.
      // ASSUMIDO, não medido. Trocar quando a taxa real do CRM estiver fechada.
      value: 25,
      currency: "BRL",
    });

    if (ADS_ID && ADS_LABEL) {
      window.gtag("event", "conversion", {
        send_to: `${ADS_ID}/${ADS_LABEL}`,
        value: 25,
        currency: "BRL",
      });
    }
  } catch {
    // Silencioso por decisão: medição nunca pode atrapalhar o contato.
  }
}
