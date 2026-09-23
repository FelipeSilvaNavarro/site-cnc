"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LinkContato from "./LinkContato";
import IconeWhatsApp from "./IconeWhatsApp";

/**
 * Botão flutuante do WhatsApp, o CTA mais visto do site.
 *
 * Entra depois da primeira tela, porque no topo o botão amarelo do título já
 * está à vista e dois botões iguais disputando o mesmo olhar só dividem o
 * clique. No celular é o círculo amarelo com o glifo; do tablet para cima
 * ganha o rótulo, porque ícone sozinho não diz o que acontece ao clicar.
 */
export default function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Some sobre a faixa amarela do fechamento (data-sem-flutuante): amarelo
    // sobre amarelo não se vê, e ali o convite gigante já é o botão.
    let sobreFaixa = false;
    const decidir = () =>
      setVisivel(window.scrollY > window.innerHeight * 0.6 && !sobreFaixa);
    const obs = new IntersectionObserver(
      (entradas) => {
        sobreFaixa = entradas.some((e) => e.isIntersecting);
        decidir();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    document.querySelectorAll("[data-sem-flutuante]").forEach((el) => obs.observe(el));
    decidir();
    window.addEventListener("scroll", decidir, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", decidir);
    };
  }, [pathname]);

  return (
    <LinkContato
      origem="flutuante"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-3 rounded-full bg-signal-500 px-[1.05rem] text-ink ring-4 ring-noite/10 transition-[transform,opacity,background-color] duration-500 ease-expo hover:bg-signal-400 sm:bottom-6 sm:right-6 sm:pl-5 sm:pr-6 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <IconeWhatsApp className="h-5 w-5" />
      <span className="hidden text-[0.95rem] font-semibold sm:inline">Falar no WhatsApp</span>
    </LinkContato>
  );
}
