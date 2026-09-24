import type { Metadata } from "next";
import Image from "next/image";
import TopoPagina from "@/components/TopoPagina";
import FaixaContato from "@/components/FaixaContato";
import TextoAcende from "@/components/rolagem/TextoAcende";
import { fotoExiste } from "@/lib/fotos";
import { site } from "@/content/site";
import { sistemas, sistemasIntro, recursosComuns } from "@/content/sistemas";

export const metadata: Metadata = {
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  title: "Sistema de gestão e PDV para mercadinho, açougue e padaria",
  // Descrição escrita para a lista de resultados: cita o ramo, a cidade e o
  // preço de entrada, que filtra quem não tem orçamento antes do clique.
  description:
    "Três portes de sistema de gestão e PDV para mercadinho, açougue, padaria, loja e distribuidora em Maceió e no interior de Alagoas, a partir de R$ 100 por mês. A CNC indica o porte que serve à sua operação.",
  alternates: { canonical: "/sistemas" },
};

/** Cor de identificação de cada porte, a mesma da esteira da home. */
const MARCA: Record<string, string> = {
  pro: "bg-brand-600 text-papel",
  medio: "bg-noite text-papel",
  simples: "bg-signal-500 text-ink",
};

/**
 * SistemasPage — rota "/sistemas", o catálogo.
 *
 * Direção "balcão de Maceió à noite" (PRODUCT.md). Cada porte é uma cena: o
 * nome em letra de letreiro fica preso à esquerda enquanto a ficha dele rola à
 * direita, e cada porte é âncora (`#pro`, `#medio`, `#simples`) para o link da
 * home. Com a captura real em /public/fotos/telas/<slug>.jpg, a tela entra na
 * ficha do porte.
 */
export default function SistemasPage() {
  return (
    <>
      <TopoPagina
        titulo={sistemasIntro.titulo}
        texto={
          <p>
            Começa em {site.precos.pisoMensalPorExtenso} e o porte depende do tamanho da operação,
            não do tamanho do discurso.
          </p>
        }
        acoes={sistemas.map((s) => (
          <a key={s.slug} href={`#${s.slug}`} className="btn-ghost-dark min-h-[48px] px-6 font-bold">
            {s.nome}
          </a>
        ))}
      >
        <div className="container-cnc pb-10 pt-20 lg:pt-32">
          <TextoAcende
            texto={sistemasIntro.texto}
            className="semilarga max-w-[34ch] text-[clamp(1.5rem,2.9vw,2.7rem)] leading-[1.15] text-ink"
          />
        </div>

        {sistemas.map((s) => {
          const tela = `/fotos/telas/${s.slug}.jpg`;
          return (
            <article
              key={s.slug}
              id={s.slug}
              className="scroll-mt-24 border-t border-ink/10 py-20 first-of-type:border-t-0 lg:py-28"
            >
              <div className="container-cnc grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h2 className="larga text-[clamp(3rem,6.2vw,5.8rem)] text-ink">{s.nome}</h2>
                  <p className="semilarga mt-6 max-w-md text-[clamp(1.3rem,2vw,1.7rem)] leading-snug text-ink">
                    {s.resumo}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {fotoExiste(tela) && (
                    <figure className="relative aspect-[16/9] overflow-hidden rounded-cartao ring-1 ring-ink/10">
                      <Image
                        src={tela}
                        alt={`Tela real do sistema ${s.nome}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </figure>
                  )}
                  <div className="rounded-cartao bg-papel-claro p-7 ring-1 ring-ink/10 sm:p-9">
                    <h3 className="text-sm font-semibold text-ink-muted">Para que serve</h3>
                    <p className="mt-3 text-lg leading-relaxed text-ink">{s.paraQueServe}</p>
                  </div>
                  <div className="rounded-cartao bg-papel-claro p-7 ring-1 ring-ink/10 sm:p-9">
                    <h3 className="text-sm font-semibold text-ink-muted">Indicado para</h3>
                    <p className="mt-3 text-lg leading-relaxed text-ink">{s.indicadoPara}</p>
                  </div>
                  <div className={`rounded-cartao p-7 sm:p-9 ${MARCA[s.slug]}`}>
                    <h3 className="text-sm font-semibold opacity-75">Destaques</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {s.destaques.map((d) => (
                        <li key={d} className="semilarga flex gap-3 text-lg leading-snug">
                          <span aria-hidden="true" className="opacity-60">
                            +
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </TopoPagina>

      {/* O que vale para todos os portes. */}
      <section className="grao relative bg-noite py-24 text-papel lg:py-36" aria-labelledby="comum-titulo">
        <div className="container-cnc relative z-[2] grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <h2 id="comum-titulo" className="larga text-[clamp(2.3rem,5vw,4.6rem)]">
              {recursosComuns.titulo}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-papel/70">{recursosComuns.texto}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {recursosComuns.itens.map((item) => (
              <li
                key={item}
                className="semilarga flex items-start gap-5 rounded-cartao bg-noite-800 p-7 text-[clamp(1.2rem,1.8vw,1.55rem)] leading-snug ring-1 ring-papel/10"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-signal-500 text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaixaContato
        titulo="Não sabe qual porte escolher?"
        texto={`Diga quantos caixas a loja tem e que nota você emite. A CNC indica o porte e passa o valor na mesma conversa, a partir de ${site.precos.pisoMensalPorExtenso}.`}
        origem="sistemas"
      />
    </>
  );
}
