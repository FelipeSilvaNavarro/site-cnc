"use client";

import { rastrearContato, type OrigemContato } from "@/lib/analytics";
import { site, whatsappLink, mensagemPorOrigem } from "@/content/site";

/**
 * Único caminho do site para WhatsApp e telefone.
 *
 * Existe por dois motivos que não são estéticos. O primeiro é medição: todo
 * clique de contato dispara a conversão do Google Ads e o `generate_lead` do
 * GA4, e enquanto os botões eram `<a>` soltos não havia como saber qual
 * campanha gerou conversa. O segundo é atendimento: a mensagem que chega no
 * celular do Felipe já diz de onde a pessoa saiu, então ele abre a conversa
 * sabendo se veio da página de suporte ou do anúncio de mercadinho.
 *
 * Quem for adicionar um botão de contato novo usa este componente. Um `<a>`
 * direto para o wa.me volta a cegar o relatório.
 */
export default function LinkContato({
  origem,
  canal = "whatsapp",
  className = "",
  children,
  mensagem,
  onClick,
  "aria-label": ariaLabel,
}: {
  origem: OrigemContato;
  canal?: "whatsapp" | "telefone";
  className?: string;
  children: React.ReactNode;
  /** Sobrescreve o texto pré-preenchido. Sem isso usa o texto da origem. */
  mensagem?: string;
  /** Ação extra do chamador, por exemplo fechar o menu mobile. */
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const href =
    canal === "telefone"
      ? `tel:${site.telefone.numero}`
      : whatsappLink(mensagem ?? mensagemPorOrigem(origem));

  return (
    <a
      href={href}
      {...(canal === "whatsapp"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        rastrearContato(origem, canal);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
