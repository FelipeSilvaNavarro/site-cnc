"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Rolagem suave (Lenis) ligada ao relógio do GSAP, para as cenas do
 * ScrollTrigger lerem a mesma posição que a tela mostra.
 *
 * Quem pede menos movimento fica com a rolagem nativa do navegador. A
 * instância fica em `window.__lenis` para o menu do celular poder travar a
 * página por baixo dele.
 */
export default function RolagemSuave() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      // Âncora interna (#preco, #pro) desliza em vez de pular, descontando o
      // cabeçalho fixo.
      anchors: { offset: -96 },
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (tempo: number) => lenis.raf(tempo * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // A fonte larga muda a altura dos títulos quando termina de carregar;
    // sem recalcular, as cenas travadas começam no ponto errado.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Troca de página: volta ao topo na hora e recalcula as cenas da página nova.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
