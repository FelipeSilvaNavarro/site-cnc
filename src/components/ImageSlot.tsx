import { fotoExiste } from "@/lib/fotos";
import PainelMarca from "./PainelMarca";
import ImageSlotFoto from "./ImageSlotFoto";

/**
 * Slot de imagem com proporção fixa reservada.
 *
 * Confere no build se a foto real já existe em /public: existindo, entrega o
 * next/image otimizado; faltando, mostra só o painel de marca e não chega a
 * pedir nada ao otimizador, que é o que evitava o `400
 * INVALID_IMAGE_OPTIMIZE_REQUEST` a cada visita enquanto a pasta estava vazia.
 *
 * Para ativar a foto real basta salvar o arquivo em /public no caminho `src` e
 * publicar; a checagem roda no build seguinte e não é preciso editar código.
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
  const descricao = alt.startsWith("{{PREENCHER")
    ? alt.replace(/^\{\{PREENCHER:\s*/, "").replace(/\}\}$/, "")
    : alt;

  return (
    <div
      className={`relative overflow-hidden bg-paper-dark ${className}`}
      role="img"
      aria-label={descricao}
    >
      {fotoExiste(src) ? (
        <ImageSlotFoto src={src} alt={descricao} priority={priority} sizes={sizes} />
      ) : (
        <PainelMarca />
      )}
    </div>
  );
}
