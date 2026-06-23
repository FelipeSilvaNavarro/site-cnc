"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Slot de imagem com next/image. Reserva um espaço claro de proporção fixa.
 *
 * Comportamento: enquanto a foto real não existir em /public (no caminho `src`),
 * exibe um placeholder editorial discreto com a descrição esperada — sem stock
 * art, sem ilustração genérica e SEM ícone de imagem quebrada.
 *
 * Para ativar a foto real: basta colocar o arquivo em /public no caminho `src`.
 * Não é preciso editar código: ao carregar com sucesso, a foto cobre o slot.
 */
export default function ImageSlot({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [erro, setErro] = useState(false);
  const [carregada, setCarregada] = useState(false);

  const descricao = alt.startsWith("{{PREENCHER")
    ? alt.replace(/^\{\{PREENCHER:\s*/, "").replace(/\}\}$/, "")
    : alt;

  return (
    <div
      className={`relative overflow-hidden bg-paper-dark ${className}`}
      role="img"
      aria-label={descricao}
    >
      {/* Placeholder editorial: visível até a foto real carregar. */}
      {!carregada && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#e7e0d4_0%,#efe9e0_100%)] p-6">
          <span className="max-w-[85%] text-center text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
            Slot de foto
            <span className="mt-2 block text-[11px] font-normal normal-case tracking-normal text-ink-muted/80">
              {descricao}
            </span>
          </span>
        </div>
      )}

      {/* next/image real: ocupa o slot quando o arquivo existir em /public. */}
      {!erro && (
        <Image
          src={src}
          alt={descricao}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className={`object-cover transition-opacity duration-500 ${
            carregada ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setCarregada(true)}
          onError={() => setErro(true)}
        />
      )}
    </div>
  );
}
