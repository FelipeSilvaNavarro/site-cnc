"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navPrincipal, site } from "@/content/site";
import Logo from "./Logo";
import LinkContato from "./LinkContato";

/**
 * Header — cabeçalho fixo (sticky) do site institucional.
 *
 * Client Component (precisa de estado e de `usePathname`):
 * - `aberto`: controla a abertura do menu mobile (hambúrguer → X).
 * - `usePathname()`: destaca o item de navegação da rota atual.
 *
 * Os itens do menu vêm de `navPrincipal` (content/site.ts) e o botão de WhatsApp
 * usa o link padrão `whatsappLink()`. Some o menu desktop em telas < lg e mostra
 * o botão hambúrguer; o menu mobile abre abaixo do cabeçalho.
 */
export default function Header() {
  // Estado do menu mobile (true = aberto).
  const [aberto, setAberto] = useState(false);
  // Rota atual, para marcar o link ativo na navegação.
  const pathname = usePathname();

  return (
    // Fundo sólido e filete de 2px. O par "translúcido + backdrop-blur" é a
    // assinatura de header de template, e ainda deixa o texto da página passar
    // por trás dos links. Opaco resolve os dois.
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="container-cnc flex h-16 items-center justify-between lg:h-20">
        {/* Logo da CNC (componente com fallback de texto). */}
        <Link href="/" aria-label="CNC — página inicial">
          <Logo />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navPrincipal.map((item) => {
            const ativo =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                // Item ativo marcado por filete de sinalização, não só por cor:
                // cor sozinha falha para daltônicos e some na impressão.
                className={`border-b-2 py-1 text-sm font-semibold transition-colors ${
                  ativo
                    ? "border-signal-500 text-ink"
                    : "border-transparent text-ink-soft hover:border-ink/20 hover:text-ink"
                }`}
                aria-current={ativo ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LinkContato
            origem="header"
            className="btn-primary hidden sm:inline-flex"
          >
            Falar no WhatsApp
          </LinkContato>

          {/* Botão do menu mobile */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink text-ink lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  aberto ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  aberto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  aberto ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {aberto && (
        <nav
          id="menu-mobile"
          className="border-t border-ink/10 bg-paper lg:hidden"
          aria-label="Principal (mobile)"
        >
          <div className="container-cnc flex flex-col py-4">
            {navPrincipal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/5 py-3 text-base text-ink-soft"
                onClick={() => setAberto(false)}
              >
                {item.label}
              </Link>
            ))}
            <LinkContato
              origem="menu-mobile"
              className="btn-primary mt-4"
              onClick={() => setAberto(false)}
            >
              Falar no WhatsApp
            </LinkContato>
            <LinkContato
              origem="menu-mobile"
              canal="telefone"
              className="mt-2 py-2 text-center text-sm text-ink-muted"
            >
              {site.telefone.exibicao}
            </LinkContato>
          </div>
        </nav>
      )}
    </header>
  );
}
