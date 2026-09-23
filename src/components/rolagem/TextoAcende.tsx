"use client";

import { Fragment, useRef } from "react";
import { gsap, MIDIA, useCena } from "./gsap";

/**
 * Texto que acende palavra por palavra conforme a rolagem (referência:
 * daqconsulting.com). A frase se lê no ritmo de quem rola, e termina de
 * acender quando chega perto do meio da tela.
 *
 * O servidor entrega o texto inteiro aceso; só depois de montar a cena as
 * palavras apagam para 14% e passam a acender com a rolagem.
 */
export default function TextoAcende({
  texto,
  className = "",
}: {
  texto: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const palavras = texto.split(" ");

  useCena(ref, (mm, el) => {
    mm.add(MIDIA.movimento, () => {
      gsap.fromTo(
        el.querySelectorAll("[data-palavra]"),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 50%", scrub: 0.5 },
        },
      );
    });
  });

  return (
    <p ref={ref} className={className}>
      {palavras.map((p, i) => (
        <Fragment key={i}>
          <span data-palavra="">{p}</span>
          {i < palavras.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
