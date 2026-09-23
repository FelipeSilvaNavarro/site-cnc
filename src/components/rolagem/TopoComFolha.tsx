"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MIDIA, useCena } from "./gsap";

/**
 * Topo escuro preso na tela com a folha clara subindo por cima dele
 * (referência: cerebrium.ai).
 *
 * O "preso" é CSS puro (`sticky`), então funciona sem JavaScript: a folha
 * cobre o topo mesmo com a cena desligada. O GSAP só acrescenta o recuo do
 * conteúdo do topo (sobe, encolhe e apaga) e o pégaso subindo mais devagar,
 * enquanto a folha passa.
 *
 * Dentro de `topo`, marque o conteúdo com `data-topo-conteudo` e a peça de
 * fundo com `data-topo-fundo`.
 */
export default function TopoComFolha({
  topo,
  children,
  altura = "h-[100svh] min-h-[580px]",
  className = "",
}: {
  topo: ReactNode;
  children: ReactNode;
  /** Altura do topo preso. Tem que caber na tela, senão o fundo dele nunca aparece. */
  altura?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.movimento, () => {
      const folha = el.querySelector("[data-folha]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: folha, start: "top bottom", end: "top top", scrub: true },
      });
      tl.to("[data-topo-conteudo]", { yPercent: -10, scale: 0.94, opacity: 0.15, ease: "none" }, 0);
      tl.to("[data-topo-fundo]", { yPercent: -22, rotate: -5, ease: "none" }, 0);
    });
  });

  return (
    <div ref={ref} className="relative">
      <section
        className={`grao sticky top-0 overflow-hidden bg-noite text-papel ${altura} ${className}`}
      >
        {topo}
      </section>
      <div
        data-folha=""
        className="relative z-10 rounded-t-folha bg-papel shadow-[0_-40px_80px_-30px_rgba(0,0,0,0.55)]"
      >
        {children}
      </div>
    </div>
  );
}
