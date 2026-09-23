import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import FaixaContato from "@/components/FaixaContato";
import { fotoExiste } from "@/lib/fotos";
import { site } from "@/content/site";
import { sistemas, sistemasIntro, recursosComuns } from "@/content/sistemas";

export const metadata: Metadata = {
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  title: "Sistema de gestão e PDV para mercadinho, açougue e padaria",
  // Descrição escrita para a lista de resultados, não para a página: cita o
  // ramo (é por ele que a pessoa pesquisa), a cidade (é aí que a CNC ganha) e
  // o preço de entrada (filtra quem não tem orçamento antes do clique custar
  // uma conversa). "Conheça as soluções" não é motivo de clicar em nada.
  description:
    "Três portes de sistema de gestão e PDV para mercadinho, açougue, padaria, loja e distribuidora em Maceió e no interior de Alagoas, a partir de R$ 150 por mês. A CNC indica o porte que serve à sua operação.",
  alternates: { canonical: "/sistemas" },
};

/**
 * SistemasPage — rota "/sistemas", o catálogo.
 *
 * Rodada de 23/09/2026, mesma linguagem da home: cada porte é uma entrada de
 * catálogo com o nome em escala de placa e a ficha técnica embaixo (para que
 * serve, indicado para, destaques), separadas por filete de 2px. O "01 02 03"
 * de referência saiu, porque a ordem dos portes não é sequência.
 *
 * Movimento: um momento só, cada entrada do catálogo entrando ao rolar.
 * Cada porte é âncora (`id={s.slug}`) para o link da home.
 */
export default function SistemasPage() {
  return (
    <>
      {/* Cabeçalho */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="container-cnc pb-12 pt-10 lg:pb-16 lg:pt-16">
          <h1 className="max-w-[20ch] text-[clamp(2.1rem,5vw,4.4rem)] font-extrabold leading-[1] tracking-tightest text-ink">
            {sistemasIntro.titulo}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft">
            {sistemasIntro.texto}
          </p>
          {/* Índice do catálogo: os três portes à mão antes de rolar. */}
          <nav aria-label="Portes" className="mt-10 flex flex-wrap gap-3">
            {sistemas.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="btn-secondary min-h-[44px] px-5 text-base font-extrabold tracking-tightest"
              >
                {s.nome}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Catálogo */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-cnc">
          {sistemas.map((s) => {
            const tela = `/fotos/telas/${s.slug}.jpg`;
            return (
              <Reveal
                as="article"
                key={s.slug}
                id={s.slug}
                className="scroll-mt-28 border-t-2 border-ink pb-16 pt-8 last:pb-0 lg:pb-24 lg:pt-10"
              >
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end lg:gap-16">
                  <h2 className="text-[clamp(3.25rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-tightest text-ink">
                    {s.nome}
                  </h2>
                  <p className="text-xl font-semibold leading-snug text-ink lg:pb-3">{s.resumo}</p>
                </div>

                <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-3 md:gap-10">
                  <div>
                    <h3 className="label-dado text-ink">Para que serve</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">{s.paraQueServe}</p>
                  </div>
                  <div>
                    <h3 className="label-dado text-ink">Indicado para</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">{s.indicadoPara}</p>
                  </div>
                  <div>
                    <h3 className="label-dado text-ink">Destaques</h3>
                    <ul className="mt-2 border-t border-ink/15">
                      {s.destaques.map((d) => (
                        <li
                          key={d}
                          className="flex gap-3 border-b border-ink/15 py-2.5 text-base text-ink"
                        >
                          <span aria-hidden="true" className="font-bold text-brand-600">
                            +
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Captura real do porte, só quando o arquivo existe. Mesmo
                    arquivo da seção "O sistema por dentro" da home. */}
                {fotoExiste(tela) && (
                  <figure className="mt-10 border-2 border-ink">
                    <ImageSlot
                      src={tela}
                      alt={`Tela real do sistema ${s.nome}`}
                      sizes="(max-width: 1240px) 100vw, 1240px"
                      className="aspect-[16/9] w-full"
                    />
                  </figure>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* O que vale para todos os portes. Lista corrida em duas colunas, não
          três caixas iguais. */}
      <section className="bg-brand-900 py-20 text-paper lg:py-28">
        <div className="container-cnc grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tightest text-paper sm:text-4xl lg:text-5xl">
              {recursosComuns.titulo}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-200">{recursosComuns.texto}</p>
          </div>
          <ul className="border-t-2 border-paper/30">
            {recursosComuns.itens.map((item) => (
              <li
                key={item}
                className="border-b border-paper/15 py-6 text-xl font-bold leading-snug tracking-tightest text-paper lg:text-2xl"
              >
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
