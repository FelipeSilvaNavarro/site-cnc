"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Logo da CNC no cabeçalho.
 *
 * Usa o arquivo em /public/logo.png (ou .svg). Enquanto o arquivo não existir,
 * exibe a marca em texto como fallback. Para ativar: salve o logo em
 * `public/logo.png` (sem precisar editar código).
 */
export default function Logo({ className = "" }: { className?: string }) {
  const [erro, setErro] = useState(false);

  if (erro) {
    return (
      <span className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold tracking-tight text-brand-700">
          CNC
        </span>
        <span className="hidden text-[11px] font-medium uppercase tracking-widest text-ink-muted sm:block">
          Sistemas &amp; Representações
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/logo.svg"
      alt="CNC Sistemas & Representações"
      width={771}
      height={686}
      priority
      className={`h-11 w-auto lg:h-14 ${className}`}
      onError={() => setErro(true)}
    />
  );
}
