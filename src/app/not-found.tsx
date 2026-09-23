import Link from "next/link";
import { navPrincipal } from "@/content/site";
import PegasoTraco from "@/components/rolagem/PegasoTraco";

/**
 * NotFound — página 404 global. Fica fora do layout do site (sem cabeçalho e
 * rodapé), então traz ela mesma o caminho de volta: a home em destaque e as
 * outras páginas em lista, na noite do topo com o pégaso em traço.
 */
export default function NotFound() {
  return (
    <main className="grao relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-noite text-papel">
      <div aria-hidden="true" className="absolute -right-[30%] top-[8%] w-[100vw] opacity-50 lg:-right-[6%] lg:w-[48vw]">
        <PegasoTraco className="h-auto w-full" />
      </div>
      <div className="container-cnc relative z-[2] py-20">
        <p className="dado text-papel/60">Erro 404</p>
        <h1 className="larga mt-4 max-w-[14ch] text-[clamp(2.2rem,5.6vw,5.2rem)]">
          Esta página não existe ou mudou de endereço
        </h1>
        <Link href="/" className="btn-primary mt-10">
          Voltar para o início
        </Link>
        <ul className="mt-14 max-w-xl">
          {navPrincipal
            .filter((item) => item.href !== "/")
            .map((item) => (
              <li key={item.href} className="border-t border-papel/10 last:border-b">
                <Link
                  href={item.href}
                  className="semilarga flex items-center justify-between py-4 text-xl transition-colors hover:text-signal-500"
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
