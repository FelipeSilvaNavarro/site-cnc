import type { ReactNode } from "react";
import TopoComFolha from "./rolagem/TopoComFolha";
import TituloMascara from "./rolagem/TituloMascara";
import PegasoTraco from "./rolagem/PegasoTraco";

/**
 * Topo das páginas internas: a mesma cena da home (noite, pégaso em traço,
 * título subindo por trás da máscara, folha clara subindo por cima), mais
 * curta e com o pégaso no canto.
 *
 * `lado` aparece à direita só do desktop para cima, porque no celular o topo
 * preso precisa caber numa tela; a página que usa `lado` repete o conteúdo
 * dele dentro da folha para o celular.
 */
export default function TopoPagina({
  titulo,
  texto,
  acoes,
  lado,
  children,
}: {
  titulo: string;
  texto?: ReactNode;
  acoes?: ReactNode;
  lado?: ReactNode;
  children: ReactNode;
}) {
  return (
    <TopoComFolha
      altura="h-[88svh] min-h-[560px]"
      topo={
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 55% at 85% 30%, rgba(43,87,196,0.34) 0%, rgba(43,87,196,0.06) 50%, transparent 72%)",
            }}
          />
          <div
            data-topo-fundo=""
            className="absolute -right-[38%] top-[10%] w-[110vw] opacity-60 sm:-right-[20%] sm:w-[70vw] lg:-right-[8%] lg:top-[4%] lg:w-[44vw] lg:max-w-[760px]"
          >
            <PegasoTraco className="h-auto w-full" />
          </div>

          <div
            data-topo-conteudo=""
            className="container-cnc relative z-[2] flex h-full origin-bottom flex-col justify-end pb-10 pt-28 lg:pb-16"
          >
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-16">
              <div>
                <TituloMascara
                  texto={titulo}
                  className="larga max-w-[16ch] text-[clamp(2.1rem,5.4vw,5rem)] text-papel"
                />
                {texto && (
                  <div
                    className="mt-7 max-w-xl animate-some-entra text-base leading-relaxed text-papel/70 lg:text-lg"
                    style={{ animationDelay: "0.7s" }}
                  >
                    {texto}
                  </div>
                )}
                {acoes && (
                  <div
                    className="mt-8 flex animate-some-entra flex-col gap-3 sm:flex-row"
                    style={{ animationDelay: "0.85s" }}
                  >
                    {acoes}
                  </div>
                )}
              </div>
              {lado && (
                <div className="hidden animate-rise lg:block" style={{ animationDelay: "0.6s" }}>
                  {lado}
                </div>
              )}
            </div>
          </div>
        </>
      }
    >
      {children}
    </TopoComFolha>
  );
}
