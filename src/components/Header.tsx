"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navPrincipal, site, whatsappLink } from "@/content/site";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="container-cnc flex h-16 items-center justify-between lg:h-20">
        {/* Logo da CNC. Slot: coloque /public/logo.svg para substituir o texto. */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="CNC — página inicial"
        >
          <span className="font-serif text-2xl font-semibold tracking-tight text-brand-800">
            CNC
          </span>
          <span className="hidden text-[11px] uppercase tracking-widest text-ink-muted sm:block">
            Gestão e suporte
          </span>
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
                className={`text-sm font-medium transition-colors ${
                  ativo
                    ? "text-brand-700"
                    : "text-ink-soft hover:text-brand-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex"
          >
            Falar no WhatsApp
          </a>

          {/* Botão do menu mobile */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-ink/15 text-ink-soft lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-current transition-transform ${
                  aberto ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-opacity ${
                  aberto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform ${
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
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4"
              onClick={() => setAberto(false)}
            >
              Falar no WhatsApp
            </a>
            <a
              href={`tel:${site.telefone.numero}`}
              className="mt-2 py-2 text-center text-sm text-ink-muted"
            >
              {site.telefone.exibicao}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
