"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ponto único de entrada do GSAP no site.
 *
 * Registra o ScrollTrigger uma vez e expõe `useCena`, que é como toda cena de
 * rolagem se monta. Ela usa `gsap.matchMedia`, então cada cena declara o que
 * faz no desktop e no celular, e nenhuma roda para quem pede menos movimento:
 * nesse caso o HTML do servidor fica como está, completo e parado.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const MIDIA = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  celular: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  movimento: "(prefers-reduced-motion: no-preference)",
} as const;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Monta uma cena no elemento `ref`. `montar` recebe o matchMedia já escopado
 * no elemento (seletor de texto procura só dentro dele) e o próprio elemento.
 * Tudo que for criado lá dentro é desfeito ao desmontar.
 */
export function useCena(
  ref: RefObject<HTMLElement | null>,
  montar: (mm: gsap.MatchMedia, el: HTMLElement) => void,
) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    montar(mm, el);
    return () => mm.revert();
    // A cena monta uma vez por página; `montar` é declarada inline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
