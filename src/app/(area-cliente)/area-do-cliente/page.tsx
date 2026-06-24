import type { Metadata } from "next";
import Link from "next/link";
import { whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Área do cliente — em breve",
  description:
    "A área do cliente da CNC estará disponível em breve: segunda via de boleto e seus dados em um só lugar.",
  // Página em construção: não indexar enquanto não tiver função real.
  robots: { index: false, follow: false },
};

/**
 * Página "Em breve" da futura área do cliente.
 *
 * // FUTURO: substituir por tela de login + dashboard autenticado.
 * // FUTURO: segunda via de boleto (integração com gateway/financeiro).
 * // FUTURO: painel com dados do cliente (cadastro, contratos, chamados).
 */
export default function AreaDoClientePage() {
  return (
    <div className="mx-auto max-w-md text-center">
      <p className="eyebrow mb-4">Área do cliente</p>
      <h1 className="font-display text-4xl font-semibold text-brand-800">
        Em breve
      </h1>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">
        Estamos preparando a área do cliente da CNC. Em breve você poderá emitir
        a segunda via do seu boleto e acessar seus dados por aqui.
      </p>
      <p className="mt-4 text-sm text-ink-muted">
        Por enquanto, para segunda via de boleto ou qualquer atendimento, fale
        com a gente.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <a
          // Link padrão unificado do WhatsApp (mesma mensagem em todo o site).
          // Original: whatsappLink("Olá! Preciso de atendimento da CNC (ex.: segunda via de boleto).")
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto"
        >
          Falar no WhatsApp
        </a>
        <Link href="/contato" className="text-sm text-brand-700 hover:underline">
          Ver todos os canais de contato
        </Link>
      </div>
    </div>
  );
}
