import Link from "next/link";
import { whatsappLink } from "@/content/site";

/**
 * Par de CTAs padrão: primário "Falar no WhatsApp" (abre WhatsApp) e secundário
 * "Pedir orçamento" (vai para /contato). Usado no hero e no CTA final.
 */
export default function CtaButtons({
  primario,
  secundario,
  variant = "light",
  className = "",
}: {
  primario: string;
  secundario: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={variant === "dark" ? "btn-accent" : "btn-primary"}
      >
        {primario}
      </a>
      <Link
        href="/contato"
        className={
          variant === "dark"
            ? "btn border border-paper/40 text-paper hover:bg-paper/10"
            : "btn-secondary"
        }
      >
        {secundario}
      </Link>
    </div>
  );
}
