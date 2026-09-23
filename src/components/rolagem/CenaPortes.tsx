"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";
import { sistemas, sistemasIntro } from "@/content/sistemas";
import { site } from "@/content/site";

/**
 * Os três portes numa esteira horizontal: no desktop a cena trava e a rolagem
 * vertical anda a esteira para o lado, painel por painel. No celular e sem
 * movimento, os painéis empilham na vertical.
 *
 * `telas` diz, por slug, se a captura real do sistema existe (a conferência de
 * arquivo é do servidor, por isso vem de fora). Com captura, ela entra no
 * painel do porte.
 */
const ESTILO: Record<string, { fundo: string; texto: string; suave: string; linha: string; link: string }> = {
  pro: {
    fundo: "bg-brand-600",
    texto: "text-papel",
    suave: "text-brand-100",
    linha: "border-papel/20",
    link: "bg-papel text-ink hover:bg-signal-500",
  },
  medio: {
    fundo: "bg-noite-800 ring-1 ring-inset ring-papel/10",
    texto: "text-papel",
    suave: "text-papel/70",
    linha: "border-papel/15",
    link: "bg-papel text-ink hover:bg-signal-500",
  },
  simples: {
    fundo: "bg-signal-500",
    texto: "text-ink",
    suave: "text-ink/75",
    linha: "border-ink/15",
    link: "bg-ink text-papel hover:bg-noite-700",
  },
};

export default function CenaPortes({ telas }: { telas: Record<string, boolean> }) {
  const ref = useRef<HTMLElement>(null);

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.desktop, () => {
      const trilho = el.querySelector<HTMLElement>("[data-trilho]");
      if (!trilho) return;
      const distancia = () => trilho.scrollWidth - window.innerWidth;
      gsap.to(trilho, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distancia()}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  return (
    <section ref={ref} className="grao relative overflow-hidden bg-noite text-papel" aria-labelledby="portes-titulo">
      <div
        data-trilho=""
        className="relative z-[2] flex flex-col gap-5 px-5 py-20 sm:px-8 lg:px-12 lg:py-28 lg:cenas:h-screen lg:cenas:w-max lg:cenas:flex-row lg:cenas:items-center lg:cenas:gap-6 lg:cenas:py-0"
      >
        {/* Painel de abertura */}
        <div className="flex flex-col justify-center lg:mb-8 lg:max-w-3xl lg:cenas:mb-0 lg:cenas:h-[78vh] lg:cenas:w-[36vw] lg:cenas:min-w-[26rem] lg:cenas:pr-10">
          <h2 id="portes-titulo" className="larga text-[clamp(2.3rem,4.6vw,4.4rem)]">
            {sistemasIntro.titulo}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-papel/70">
            Começa em {site.precos.pisoMensalPorExtenso} e depende do tamanho da operação, com
            instalação, migração dos dados e treinamento da equipe inclusos em qualquer porte.
          </p>
          <p className="mt-8 hidden items-center gap-3 text-sm font-semibold text-papel/60 lg:cenas:flex">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-papel/40" />
            Role para ver os três
          </p>
        </div>

        {sistemas.map((s) => {
          const e = ESTILO[s.slug];
          const temTela = telas[s.slug];
          return (
            <article
              key={s.slug}
              className={`relative flex flex-col overflow-hidden rounded-cartao p-7 sm:p-10 lg:min-h-[34rem] lg:cenas:h-[78vh] lg:cenas:min-h-0 lg:cenas:w-[min(68vw,58rem)] lg:cenas:flex-none ${e.fundo} ${e.texto}`}
            >
              <h3
                className="larga whitespace-nowrap text-[clamp(2.9rem,10.5vw,9.5rem)] leading-[0.85]"
              >
                {s.nome}
              </h3>
              <p className="semilarga mt-6 max-w-xl text-[clamp(1.25rem,2vw,1.75rem)] leading-snug">
                {s.resumo}
              </p>

              <div className={`mt-auto grid gap-6 border-t pt-6 lg:grid-cols-2 lg:gap-10 ${e.linha}`}>
                <div>
                  <h4 className="text-sm font-semibold">Indicado para</h4>
                  <p className={`mt-2 text-[0.95rem] leading-relaxed ${e.suave}`}>{s.indicadoPara}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold">Destaques</h4>
                  <ul className={`mt-2 space-y-1 text-[0.95rem] ${e.suave}`}>
                    {s.destaques.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span aria-hidden="true">+</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/sistemas#${s.slug}`}
                    className={`mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-300 ${e.link}`}
                  >
                    Ver o {s.nome} em detalhe
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {temTela && (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl lg:absolute lg:right-10 lg:top-10 lg:mt-0 lg:w-[42%]">
                  <Image
                    src={`/fotos/telas/${s.slug}.jpg`}
                    alt={`Tela real do sistema ${s.nome}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              )}
            </article>
          );
        })}
        <div aria-hidden="true" className="hidden lg:cenas:block lg:cenas:w-[6vw]" />
      </div>
    </section>
  );
}
