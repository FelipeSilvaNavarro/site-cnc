"use client";

import { useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";
import { cupom } from "@/content/home";

/**
 * A cena de assinatura do site: o cupom fiscal sai da impressora do caixa
 * enquanto os quatro passos acendem (venda, estoque, nota, financeiro).
 *
 * Desktop: a cena trava na tela por três telas de rolagem e o papel desce da
 * impressora conforme a pessoa rola. Celular: nada trava, a mesma sequência
 * acontece com o cupom entrando na tela. Sem movimento: o cupom aparece
 * inteiro, com carimbo e caixa do dia, e os passos todos acesos.
 *
 * O cupom é ilustração (loja "Seu comércio"), marcado como imagem para leitor
 * de tela, e o texto dele não é lido item por item.
 */
export default function CenaCupom() {
  const ref = useRef<HTMLElement>(null);

  useCena(ref, (mm, el) => {
    const montar = (travar: boolean) => {
      const passos = gsap.utils.toArray<HTMLElement>("[data-passo]", el);
      const barras = gsap.utils.toArray<HTMLElement>("[data-barra]", el);

      gsap.set("[data-papel]", { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set("[data-baixa]", { scale: 0, opacity: 0 });
      gsap.set("[data-carimbo]", { scale: 1.8, opacity: 0, rotate: -14 });
      gsap.set("[data-fin]", { y: 36, opacity: 0 });
      gsap.set(passos, { opacity: 0.28 });
      gsap.set(barras, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: travar
          ? { trigger: el, start: "top top", end: "+=300%", scrub: 0.8, pin: "[data-palco]" }
          : { trigger: "[data-maquina]", start: "top 80%", end: "bottom 30%", scrub: 0.8 },
      });

      const acender = (i: number, t: number) => {
        tl.to(passos[i], { opacity: 1, duration: 0.2 }, t);
        tl.to(barras[i], { scaleX: 1, duration: 1 }, t);
        if (i > 0) tl.to(passos[i - 1], { opacity: 0.55, duration: 0.2 }, t);
      };

      // 1. Venda: o papel sai da impressora, cabeçalho primeiro, até o fim
      //    dos itens (o recorte desce, o papel não se move).
      acender(0, 0);
      tl.to("[data-papel]", { clipPath: "inset(0% 0% 45% 0%)", duration: 1 }, 0);
      // 2. Estoque: cada item ganha a baixa.
      acender(1, 1);
      tl.to("[data-baixa]", { scale: 1, opacity: 1, stagger: 0.15, duration: 0.3, ease: "back.out(2)" }, 1.1);
      // 3. Nota: o resto do papel sai e o carimbo bate.
      acender(2, 2);
      tl.to("[data-papel]", { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 }, 2);
      tl.to("[data-carimbo]", { scale: 1, opacity: 1, rotate: -8, duration: 0.25, ease: "power4.in" }, 2.6);
      // 4. Financeiro: o caixa do dia entra.
      acender(3, 3);
      tl.to("[data-fin]", { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 3.1);
      tl.to({}, { duration: 0.4 });
    };

    mm.add(MIDIA.desktop, () => montar(true));
    mm.add(MIDIA.celular, () => montar(false));
  });

  return (
    <section ref={ref} className="relative bg-papel" aria-labelledby="cupom-titulo">
      <div
        data-palco=""
        className="container-cnc grid gap-12 py-20 lg:min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-center lg:gap-20 lg:py-24"
      >
        <div className="order-2 lg:order-1">
          <h2
            id="cupom-titulo"
            className="semilarga max-w-[16ch] text-[clamp(2rem,4.2vw,3.6rem)] text-ink"
          >
            {cupom.titulo}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">{cupom.texto}</p>
          <ol className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {cupom.passos.map((p, i) => (
              <li key={p.titulo} data-passo="">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                  <div data-barra="" className="h-full w-full origin-left rounded-full bg-signal-500" />
                </div>
                <p className="mt-4 text-sm font-semibold tabular-nums text-ink-muted">
                  Passo {i + 1} de {cupom.passos.length}
                </p>
                <h3 className="semilarga mt-1 text-2xl text-ink">{p.titulo}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-maquina="" className="order-1 mx-auto w-full max-w-[25rem] lg:order-2">
          <Cupom />
        </div>
      </div>
    </section>
  );
}

/** A impressora do caixa com o cupom saindo dela. */
function Cupom() {
  return (
    <div role="img" aria-label="Ilustração: cupom fiscal de uma venda saindo da impressora do caixa, com a nota autorizada">
      <div aria-hidden="true">
        {/* Impressora */}
        <div className="relative z-10 rounded-[1.1rem] bg-noite px-5 pb-4 pt-4 shadow-[0_24px_50px_-20px_rgba(7,11,24,0.6)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-papel/60">Caixa 01</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-papel/60">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />
              imprimindo
            </span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-black/70 ring-1 ring-papel/10" />
        </div>

        {/* Papel saindo da fenda */}
        <div className="relative -mt-3 px-3 pb-6">
          <div
            data-papel=""
            className="serrilha relative bg-white px-5 pb-8 pt-7 font-mono text-[0.72rem] leading-[1.55] text-ink shadow-[0_30px_60px_-25px_rgba(7,11,24,0.45)]"
          >
            <p className="text-center font-semibold">SEU COMÉRCIO</p>
            <p className="text-center text-ink-muted">Maceió - AL</p>
            <p className="mt-2 text-center text-[0.62rem] text-ink-muted">
              DOCUMENTO AUXILIAR DA NOTA FISCAL
              <br />
              DE CONSUMIDOR ELETRÔNICA
            </p>

            <div className="my-3 border-t border-dashed border-ink/30" />
            <div className="grid grid-cols-[1.9rem_1fr_2.4rem_3.1rem_2.5rem] gap-x-1 text-[0.62rem] text-ink-muted">
              <span>ITEM</span>
              <span>DESCRIÇÃO</span>
              <span className="text-right">QTD</span>
              <span className="text-right">VALOR</span>
              <span />
            </div>
            {cupom.itens.map((it) => (
              <div key={it.cod} className="grid grid-cols-[1.9rem_1fr_2.4rem_3.1rem_2.5rem] items-center gap-x-1">
                <span>{it.cod}</span>
                <span className="truncate">{it.desc}</span>
                <span className="text-right">{it.qtd}</span>
                <span className="text-right">{it.valor}</span>
                <span
                  data-baixa=""
                  className="justify-self-end whitespace-nowrap rounded-full bg-brand-600 px-1.5 py-px font-sans text-[0.58rem] font-bold tabular-nums text-papel"
                >
                  −{it.qtd === "0,480" ? "0,48" : it.qtd}
                </span>
              </div>
            ))}

            <div className="my-3 border-t border-dashed border-ink/30" />
            <div className="flex justify-between">
              <span>QTD. TOTAL DE ITENS</span>
              <span>{cupom.itens.length}</span>
            </div>
            <div className="flex justify-between text-[0.85rem] font-semibold">
              <span>VALOR A PAGAR R$</span>
              <span>{cupom.total}</span>
            </div>
            <div className="flex justify-between">
              <span>PIX</span>
              <span>{cupom.total}</span>
            </div>

            <div className="my-3 border-t border-dashed border-ink/30" />
            <div className="flex items-end justify-between gap-4">
              <p className="text-[0.62rem] text-ink-muted">
                Consulte pela chave
                <br />
                de acesso no portal
                <br />
                da Sefaz
              </p>
              <Qr />
            </div>

            {/* Carimbo da autorização */}
            <div
              data-carimbo=""
              className="absolute bottom-24 left-6 -rotate-[8deg] rounded-md border-[3px] border-brand-600 px-3 py-1.5 font-sans text-[0.8rem] font-extrabold uppercase leading-tight tracking-wide text-brand-600"
            >
              NFC-e
              <br />
              autorizada
            </div>
          </div>

          {/* Caixa do dia */}
          <div
            data-fin=""
            className="absolute -left-2 bottom-2 rounded-2xl bg-signal-500 px-4 py-3 font-sans text-ink shadow-[0_20px_40px_-18px_rgba(7,11,24,0.5)] sm:-left-10"
          >
            <p className="text-[0.7rem] font-semibold">Caixa de hoje</p>
            <p className="text-lg font-extrabold tabular-nums">+ R$ {cupom.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** QR code desenhado: padrão fixo, só visual. */
function Qr() {
  const n = 11;
  const cheio = (x: number, y: number) => {
    const canto = (a: number, b: number) => a < 3 && b < 3;
    if (canto(x, y) || canto(n - 1 - x, y) || canto(x, n - 1 - y)) return true;
    return (x * 7 + y * 13 + x * y) % 3 === 0;
  };
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="h-16 w-16 flex-none" shapeRendering="crispEdges">
      {Array.from({ length: n * n }, (_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        return cheio(x, y) ? <rect key={i} x={x} y={y} width="1" height="1" fill="#0b0e11" /> : null;
      })}
    </svg>
  );
}
