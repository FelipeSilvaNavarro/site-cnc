"use client";

import { useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";

/**
 * O preço de entrada numa etiqueta amarela de gôndola, pendurada por um fio,
 * que balança um pouco com a rolagem. É o objeto que o cliente da CNC tem na
 * prateleira dele, e o preço ali não tem letra miúda.
 *
 * O valor é texto de verdade (lido pelo Google e por leitor de tela); o fio e
 * o furo são decoração.
 */
export default function EtiquetaPreco({
  valor,
  periodo,
}: {
  valor: string;
  periodo: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.movimento, () => {
      gsap.fromTo(
        "[data-etiqueta]",
        { rotate: -9 },
        {
          rotate: 5,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
        },
      );
    });
  });

  return (
    <div ref={ref} className="relative flex justify-center pt-16">
      {/* fio */}
      <span aria-hidden="true" className="absolute left-1/2 top-0 h-[5.2rem] w-px -translate-x-1/2 bg-ink/40" />
      <div
        data-etiqueta=""
        className="relative origin-[50%_-3rem] -rotate-3 rounded-[1.6rem] bg-signal-500 px-9 pb-9 pt-12 text-ink shadow-[0_40px_70px_-30px_rgba(7,11,24,0.55)] sm:px-12"
      >
        {/* furo */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full bg-papel ring-2 ring-ink/25"
        />
        <p className="text-base font-semibold">A partir de</p>
        <p className="larga mt-1 whitespace-nowrap text-[clamp(3.2rem,14vw,8rem)] leading-[0.9] tabular-nums">
          {valor}
        </p>
        <p className="mt-2 text-right text-xl font-bold">{periodo}</p>
      </div>
    </div>
  );
}
