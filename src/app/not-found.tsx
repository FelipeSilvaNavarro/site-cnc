import Link from "next/link";
import { navPrincipal } from "@/content/site";

/**
 * NotFound — página 404 global (App Router). Fica fora do layout do site, então
 * traz ela mesma o caminho de volta: a home em destaque e as outras páginas
 * listadas, no mesmo catálogo em linhas do resto do site.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-paper">
      <div className="container-cnc py-16">
        <p className="dado text-sm text-ink-soft">Erro 404</p>
        <h1 className="mt-3 max-w-[16ch] text-[clamp(2.1rem,5vw,4.4rem)] font-extrabold leading-[1] tracking-tightest text-ink">
          Esta página não existe ou mudou de endereço
        </h1>
        <Link href="/" className="btn-primary mt-8 min-h-[48px] px-8">
          Voltar para o início
        </Link>
        <ul className="mt-12 max-w-xl border-t-2 border-ink">
          {navPrincipal
            .filter((item) => item.href !== "/")
            .map((item) => (
              <li key={item.href} className="border-b border-ink/15">
                <Link
                  href={item.href}
                  className="flex justify-between py-4 text-lg font-bold text-ink hover:text-brand-700"
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
