"use client";

import { useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";

/**
 * Etapas numa linha vertical que se enche de amarelo com a rolagem, acendendo
 * o marcador de cada etapa quando a linha chega nele. A ordem aqui é
 * informação (primeiro o diagnóstico, depois a implantação, depois o
 * suporte), e é por isso que esta é a única lista numerada da home.
 */
export default function LinhaEtapas({
  titulo,
  texto,
  etapas,
}: {
  titulo: string;
  texto: string;
  etapas: { numero: string; titulo: string; texto: string }[];
}) {
  const ref = useRef<HTMLElement>(null);

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.movimento, () => {
      gsap.fromTo(
        "[data-enchimento]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-trilha]", start: "top 65%", end: "bottom 60%", scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-etapa]", el).forEach((etapa) => {
        gsap.fromTo(
          etapa,
          { opacity: 0.3 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: etapa, start: "top 68%", end: "top 52%", scrub: true },
          },
        );
        gsap.fromTo(
          etapa.querySelector("[data-marco]"),
          { backgroundColor: "#e6e8ec", color: "#525c6b" },
          {
            backgroundColor: "#ffc400",
            color: "#0b0e11",
            ease: "none",
            scrollTrigger: { trigger: etapa, start: "top 62%", end: "top 55%", scrub: true },
          },
        );
      });
    });
  });

  return (
    <section ref={ref} className="bg-papel pb-24 lg:pb-36" aria-labelledby="etapas-titulo">
      <div className="container-cnc grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <h2 id="etapas-titulo" className="larga text-[clamp(2.1rem,3.7vw,3.6rem)] text-ink">
            {titulo}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{texto}</p>
        </div>

        <ol data-trilha="" className="relative">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-[3px] rounded-full bg-ink/10">
            <span data-enchimento="" className="absolute inset-0 origin-top rounded-full bg-signal-500" />
          </span>
          {etapas.map((e) => (
            <li key={e.numero} data-etapa="" className="relative flex gap-7 pb-14 last:pb-0">
              <span
                data-marco=""
                className="relative z-[1] flex h-12 w-12 flex-none items-center justify-center rounded-full bg-signal-500 text-lg font-extrabold tabular-nums text-ink"
              >
                {Number(e.numero)}
              </span>
              <div className="pt-1.5">
                <h3 className="semilarga text-[clamp(1.6rem,2.6vw,2.3rem)] text-ink">{e.titulo}</h3>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink-soft">{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
