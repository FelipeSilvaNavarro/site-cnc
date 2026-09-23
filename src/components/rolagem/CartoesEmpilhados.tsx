"use client";

import { useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";

/**
 * Cartões que se empilham ao rolar: cada um prende no alto da tela e o
 * seguinte sobe por cima, enquanto o de baixo recua. Sem escurecer: o
 * cartão amarelo escurecido vira oliva.
 *
 * O empilhamento é CSS (`sticky` com topo crescente), então existe mesmo sem
 * JavaScript. O GSAP só acrescenta o recuo do cartão coberto.
 *
 * Cada cartão tem uma cor da marca, na ordem de `CORES`, para a pilha se ler
 * como camadas diferentes e não como a mesma caixa repetida.
 */
const CORES = [
  { fundo: "bg-noite", titulo: "text-papel", texto: "text-papel/70" },
  { fundo: "bg-brand-600", titulo: "text-papel", texto: "text-brand-100" },
  { fundo: "bg-signal-500", titulo: "text-ink", texto: "text-ink/75" },
  { fundo: "bg-papel-claro ring-1 ring-inset ring-ink/10", titulo: "text-ink", texto: "text-ink-soft" },
];

export default function CartoesEmpilhados({
  titulo,
  texto,
  cartoes,
}: {
  titulo: string;
  texto: string;
  cartoes: { titulo: string; texto: string }[];
}) {
  const ref = useRef<HTMLElement>(null);

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.movimento, () => {
      const lista = gsap.utils.toArray<HTMLElement>("[data-cartao]", el);
      lista.forEach((cartao, i) => {
        const proximo = lista[i + 1];
        if (!proximo) return;
        gsap.to(cartao, {
          scale: 0.93,
          y: -12,
          ease: "none",
          scrollTrigger: { trigger: proximo, start: "top bottom", end: "top 20%", scrub: true },
        });
      });
    });
  });

  return (
    <section ref={ref} className="bg-papel py-24 lg:py-36" aria-labelledby="empilhados-titulo">
      <div className="container-cnc grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="empilhados-titulo" className="larga text-[clamp(2.1rem,3.7vw,3.6rem)] text-ink">
            {titulo}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{texto}</p>
        </div>

        <ul className="flex flex-col gap-6">
          {cartoes.map((c, i) => {
            const cor = CORES[i % CORES.length];
            return (
              <li
                key={c.titulo}
                data-cartao=""
                className={`sticky flex min-h-[19rem] origin-top flex-col justify-end rounded-cartao p-8 sm:min-h-[22rem] sm:p-11 ${cor.fundo}`}
                style={{ top: `${6.5 + i * 1.4}rem` }}
              >
                <div>
                  <h3 className={`semilarga text-[clamp(1.9rem,3.4vw,3rem)] ${cor.titulo}`}>{c.titulo}</h3>
                  <p className={`mt-4 max-w-lg text-lg leading-relaxed ${cor.texto}`}>{c.texto}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
