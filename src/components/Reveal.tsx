"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revelação de entrada — que MELHORA um estado já visível, nunca o controla.
 *
 * A versão anterior tinha um bug real: nascia em `opacity-0` e só saía dali se
 * o IntersectionObserver disparasse e a transição CSS rodasse. Em aba oculta,
 * em impressão ou em renderer headless nada disso acontece e a seção era
 * publicada EM BRANCO. Conteúdo não pode depender de animação para existir.
 *
 * Três garantias agora:
 *
 * 1. O HTML do servidor sai visível. Sem JS, o site aparece inteiro.
 * 2. Só esconde o que está abaixo da dobra no momento da montagem. O que já
 *    está na tela nunca pisca: não há nada a revelar em algo que já foi visto.
 * 3. Timeout de segurança revela mesmo que o observer nunca dispare.
 *
 * O CSS global (`[data-reveal]`) ainda força o estado final em impressão e
 * para quem pede menos movimento.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  id,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Nasce visível de propósito. Ver garantia 1 acima.
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Quem pede menos movimento recebe o conteúdo direto, sem ciclo de animação.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Já está na tela (ou quase): não há revelação a fazer. Evita o flash.
    const acimaDaDobra =
      el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (acimaDaDobra) return;

    setOculto(true);

    let revelado = false;
    const revelar = () => {
      if (revelado) return;
      revelado = true;
      setOculto(false);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revelar();
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);

    // Garantia 3: se o observer não disparar, o conteúdo aparece assim mesmo.
    const failsafe = window.setTimeout(() => {
      revelar();
      obs.disconnect();
    }, 2000);

    return () => {
      window.clearTimeout(failsafe);
      obs.disconnect();
    };
  }, []);

  return (
    <Tag
      id={id}
      data-reveal=""
      // @ts-expect-error ref polimórfico simples
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        oculto ? "translate-y-2.5 opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ transitionDelay: oculto ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
