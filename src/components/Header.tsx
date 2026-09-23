"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navPrincipal, site } from "@/content/site";
import LinkContato from "./LinkContato";
import IconeWhatsApp from "./IconeWhatsApp";

/**
 * Cabeçalho — barra flutuante em pílula, cor da noite, logo branco.
 *
 * Some ao descer e volta ao subir, para a cena ocupar a tela inteira enquanto a
 * pessoa lê, e reaparece no primeiro gesto de volta. No celular vira um botão
 * redondo que abre o menu em tela cheia, com os links em letra de letreiro.
 *
 * Menu aberto: Esc fecha, a rolagem por baixo trava (inclusive a do Lenis) e o
 * foco não fica preso atrás do painel.
 */
export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const ultimoY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const y = window.scrollY;
        const desceu = y > ultimoY.current + 4;
        const subiu = y < ultimoY.current - 4;
        if (desceu && y > 240) setEscondido(true);
        else if (subiu || y < 240) setEscondido(false);
        ultimoY.current = y;
      });
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", fechar);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", fechar);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [aberto]);

  const ativo = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-3 z-50 transition-transform duration-500 ease-expo sm:top-4 ${
          escondido && !aberto ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="container-cnc">
          <div className="flex h-[60px] items-center justify-between gap-4 rounded-full bg-noite/95 pl-5 pr-2 ring-1 ring-papel/10 sm:h-16 sm:pl-6">
            <Link href="/" aria-label="CNC Sistemas, página inicial" className="flex-none">
              <Image
                src="/logo-branco.svg"
                alt="CNC Sistemas & Representações"
                width={771}
                height={686}
                priority
                className="h-10 w-auto sm:h-11"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
              {navPrincipal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={ativo(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300 ${
                    ativo(item.href)
                      ? "text-papel"
                      : "text-papel/60 hover:bg-papel/10 hover:text-papel"
                  }`}
                >
                  {item.label}
                  {ativo(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal-500"
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LinkContato
                origem="header"
                className="hidden h-12 items-center gap-2.5 rounded-full bg-signal-500 pl-4 pr-5 text-[0.9rem] font-semibold text-ink transition-colors duration-300 hover:bg-signal-400 sm:inline-flex"
              >
                <IconeWhatsApp className="h-4 w-4" />
                Falar no WhatsApp
              </LinkContato>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-papel/10 text-papel lg:hidden"
                aria-expanded={aberto}
                aria-controls="menu-mobile"
                aria-label={aberto ? "Fechar menu" : "Abrir menu"}
                onClick={() => setAberto((v) => !v)}
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 top-0 block h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                      aberto ? "translate-y-[5px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 block h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                      aberto ? "-translate-y-[5px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu do celular em tela cheia. */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col bg-noite pb-8 pt-28 text-papel transition-[opacity,visibility] duration-500 ease-expo lg:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!aberto}
      >
        <nav aria-label="Principal (celular)" className="container-cnc flex-1">
          <ul>
            {navPrincipal.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-papel/10">
                <Link
                  href={item.href}
                  tabIndex={aberto ? 0 : -1}
                  onClick={() => setAberto(false)}
                  className={`larga block py-4 text-[2.4rem] transition-transform duration-700 ease-expo ${
                    aberto ? "translate-y-0" : "translate-y-full"
                  } ${ativo(item.href) ? "text-signal-500" : "text-papel"}`}
                  style={{ transitionDelay: aberto ? `${80 + i * 55}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-cnc flex flex-col gap-3">
          <LinkContato
            origem="menu-mobile"
            className="btn-primary w-full"
            onClick={() => setAberto(false)}
          >
            <IconeWhatsApp className="h-4 w-4" />
            Falar no WhatsApp
          </LinkContato>
          <LinkContato
            origem="menu-mobile"
            canal="telefone"
            className="btn-ghost-dark w-full tabular-nums"
          >
            Ligar {site.telefone.exibicao}
          </LinkContato>
        </div>
      </div>
    </>
  );
}
