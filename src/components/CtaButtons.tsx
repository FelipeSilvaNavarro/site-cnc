import Link from "next/link";
import LinkContato from "./LinkContato";
import type { OrigemContato } from "@/lib/analytics";

/**
 * Par de CTAs padrão: primário "Falar no WhatsApp" (abre WhatsApp e registra a
 * conversão) e secundário "Pedir orçamento" (vai para /contato).
 *
 * `origem` é obrigatória porque é ela que separa, no relatório, a conversa que
 * nasceu no topo da página da que nasceu no fim: as duas custam o mesmo clique
 * de anúncio e ensinam coisas diferentes.
 */
export default function CtaButtons({
  primario,
  secundario,
  origem,
  variant = "light",
  className = "",
}: {
  primario: string;
  secundario: string;
  origem: OrigemContato;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <LinkContato
        origem={origem}
        // O primário é amarelo nas duas variantes: a ação é a mesma, e o
        // amarelo de sinalização funciona sobre fundo claro e escuro.
        className="btn-primary"
      >
        {primario}
      </LinkContato>
      <Link
        href="/contato"
        className={variant === "dark" ? "btn-ghost-dark" : "btn-secondary"}
      >
        {secundario}
      </Link>
    </div>
  );
}
