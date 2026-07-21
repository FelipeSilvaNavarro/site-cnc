import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaButtons from "@/components/CtaButtons";
import { sistemas, sistemasIntro, recursosComuns } from "@/content/sistemas";

export const metadata: Metadata = {
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  title: "Soluções de gestão e PDV",
  description:
    "Conheça as soluções de gestão e PDV da CNC, em três portes (PRO, MÉDIO e SIMPLES). Ajudamos a escolher a ideal para o seu negócio.",
  alternates: { canonical: "/sistemas" },
};

/**
 * SistemasPage — rota "/sistemas".
 *
 * Renderiza: cabeçalho (`sistemasIntro`), o bloco de recursos comuns a todas as
 * soluções (`recursosComuns` — controle financeiro, emissão de todas as notas,
 * configuração por segmento) e a lista detalhada de `sistemas` (PRO/MÉDIO/
 * SIMPLES). Cada solução vira uma âncora (`id={s.slug}`) para deep-link.
 */
export default function SistemasPage() {
  return (
    <>
      {/* Cabeçalho da página — apertado, é só entrada */}
      <section className="border-b border-ink/10 bg-paper py-14 lg:py-16">
        <div className="container-cnc max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
            {sistemasIntro.titulo}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {sistemasIntro.texto}
          </p>
        </div>
      </section>

      {/* Recursos comuns a TODAS as soluções (financeiro, notas, modelagem).
          Faixa escura: separa o que vale para tudo do detalhe de cada porte. */}
      <section className="bg-brand-900 py-14 text-paper lg:py-16">
        <div className="container-cnc">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tightest text-paper sm:text-3xl">
              {recursosComuns.titulo}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              {recursosComuns.texto}
            </p>
          </div>
          <ul className="mt-8 grid gap-px bg-paper/15 sm:grid-cols-3">
            {recursosComuns.itens.map((item) => (
              <li
                key={item}
                className="bg-brand-900 p-5 text-sm leading-relaxed text-brand-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lista de sistemas */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-cnc space-y-16">
          {sistemas.map((s, i) => (
            <Reveal
              as="article"
              key={s.slug}
              id={s.slug}
              className="scroll-mt-24 border-t border-ink/10 pt-12 first:border-t-0 first:pt-0"
            >
              <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
                <div>
                  {/* Número de referência de catálogo (dado, não decoração). */}
                  <span className="dado text-ink-muted">0{i + 1}</span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tightest text-ink">
                    {s.nome}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {s.resumo}
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="label-dado text-ink">Para que serve</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.paraQueServe}
                    </p>
                  </div>
                  <div>
                    <h3 className="label-dado text-ink">Indicado para</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.indicadoPara}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="label-dado text-ink">Destaques</h3>
                    <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {s.destaques.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 border-t border-ink/10 pt-2 text-sm text-ink-soft"
                        >
                          <span
                            className="mt-1.5 h-0.5 w-3 flex-none bg-signal-500"
                            aria-hidden="true"
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA: CNC como consultora */}
      <section className="bg-brand-800 py-16 text-paper lg:py-20">
        <div className="container-cnc flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tightest text-paper sm:text-4xl">
              Não sabe qual sistema escolher?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">
              Conte como funciona o seu negócio. A CNC analisa a sua operação,
              indica o sistema certo e cuida do suporte no dia a dia.
            </p>
          </div>
          <CtaButtons
            primario="Falar no WhatsApp"
            secundario="Pedir orçamento"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
