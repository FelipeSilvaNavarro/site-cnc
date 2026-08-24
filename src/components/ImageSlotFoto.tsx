"use client";

import Image from "next/image";
import { useState } from "react";
import PainelMarca from "./PainelMarca";

/**
 * ImageSlotFoto — a metade cliente do slot, usada só quando o arquivo da foto
 * existe em /public (o ImageSlot confere isso no build).
 *
 * Mantém o painel de marca por baixo até a foto pintar, para não haver flash de
 * espaço vazio, e mantém o onError como rede de segurança caso o arquivo exista
 * no disco mas falhe na entrega.
 */
export default function ImageSlotFoto({
  src,
  alt,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [erro, setErro] = useState(false);
  const [carregada, setCarregada] = useState(false);

  return (
    <>
      {!carregada && <PainelMarca />}
      {!erro && (
        <Image
          src={src}
          alt={alt}
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
    </>
  );
}
