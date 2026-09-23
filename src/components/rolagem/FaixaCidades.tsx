"use client";

import { useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";
import { site } from "@/content/site";

/**
 * As cidades onde a CNC já tem cliente em duas linhas gigantes que correm em
 * sentidos opostos, presas à rolagem (referência: mindrobotics.com, título
 * atravessando a tela). A linha de cima é cheia, a de baixo em contorno.
 *
 * A lista vem de `site.cidadesAtendidas`, a mesma do JSON-LD de área atendida.
 * Para leitor de tela a faixa é uma lista comum, lida uma vez; as cópias que
 * enchem a largura ficam escondidas dele.
 */
export default function FaixaCidades() {
  const ref = useRef<HTMLElement>(null);
  const [base, ...outras] = site.cidadesAtendidas;
  const metade = Math.ceil(site.cidadesAtendidas.length / 2);
  const linhaA = site.cidadesAtendidas.slice(0, metade);
  const linhaB = site.cidadesAtendidas.slice(metade);

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.movimento, () => {
      const gatilho = { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo("[data-linha-a]", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: gatilho });
      gsap.fromTo("[data-linha-b]", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: gatilho });
    });
  });

  const Linha = ({ cidades, contorno }: { cidades: string[]; contorno?: boolean }) => (
    <p
      className={`larga flex w-max gap-[0.35em] whitespace-nowrap text-[clamp(3.2rem,9vw,8.5rem)] leading-[1.05] ${
        contorno ? "text-transparent [-webkit-text-stroke:1.5px_rgba(244,245,247,0.55)]" : "text-papel"
      }`}
    >
      {[...cidades, ...cidades, ...cidades].map((c, i) => (
        <span key={i} className="flex items-center gap-[0.35em]">
          {c}
          <span aria-hidden="true" className="inline-block h-[0.14em] w-[0.14em] rounded-full bg-signal-500" />
        </span>
      ))}
    </p>
  );

  return (
    <section ref={ref} className="grao relative overflow-hidden bg-noite py-24 text-papel lg:py-36" aria-labelledby="cidades-titulo">
      <div className="container-cnc relative z-[2]">
        <h2 id="cidades-titulo" className="semilarga max-w-[20ch] text-[clamp(1.9rem,3.6vw,3.2rem)]">
          Técnico na loja em {base} e em mais {outras.length} cidades de Alagoas
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-papel/70">
          São as cidades onde a CNC já tem cliente e já foi até o balcão. A sua não está aqui? Chama no
          WhatsApp que a gente vê o deslocamento.
        </p>
        <ul className="sr-only">
          {site.cidadesAtendidas.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="relative z-[2] mt-14 flex flex-col gap-2 lg:mt-20">
        <div data-linha-a="">
          <Linha cidades={linhaA} />
        </div>
        <div data-linha-b="">
          <Linha cidades={linhaB} contorno />
        </div>
      </div>
    </section>
  );
}
