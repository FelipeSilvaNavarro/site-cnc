/**
 * PainelMarca — o que ocupa um slot de imagem enquanto a foto real não existe.
 *
 * Pégaso branco sobre azul chapado, com opacidade baixa, para o espaço parecer
 * intencional em vez de buraco: sem stock art e sem ícone de imagem quebrada.
 * Azul chapado e não gradiente, porque o gradiente diagonal é da mesma família
 * de clichê que a auditoria mandou tirar do resto do site.
 *
 * Sem "use client" de propósito: é JSX puro, sem estado, e serve tanto ao
 * ImageSlot (server) quanto ao ImageSlotFoto (client).
 */
export default function PainelMarca() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pegaso-branco.svg"
        alt=""
        aria-hidden="true"
        className="w-2/5 max-w-[170px] opacity-20"
      />
    </div>
  );
}
