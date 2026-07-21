"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Slot de imagem com next/image. Reserva um espaço de proporção fixa.
 *
 * Comportamento: enquanto a foto real não existir em /public (no caminho `src`),
 * exibe um painel de marca (pégaso sobre azul chapado) que parece intencional,
 * sem stock art e sem ícone de imagem quebrada.
 *
 * Azul chapado, não gradiente: o gradiente diagonal é da mesma família de
 * clichê que a auditoria mandou tirar do resto do site.
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
      {/* Painel de marca: visível até a foto real carregar. */}
      {!carregada && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pegaso-branco.svg"
            alt=""
            aria-hidden="true"
            className="w-2/5 max-w-[170px] opacity-20"
          />
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
