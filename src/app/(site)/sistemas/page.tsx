import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaButtons from "@/components/CtaButtons";
import { sistemas, sistemasIntro } from "@/content/sistemas";

export const metadata: Metadata = {
  title: "Sistemas: AVANTE, SGBR, PRODO e DigiSat",
  description:
    "Conheça os sistemas de gestão e PDV que a CNC representa em Maceió. A gente ajuda a escolher o ideal para o seu comércio: AVANTE, SGBR, PRODO e DigiSat.",
  alternates: { canonical: "/sistemas" },
};

export default function SistemasPage() {
  return (
    <>
      {/* Cabeçalho da página */}
      <section className="border-b border-ink/10 bg-paper-soft py-16 lg:py-20">
        <div className="container-cnc max-w-3xl">
          <p className="eyebrow mb-4">Sistemas e soluções</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {sistemasIntro.titulo}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {sistemasIntro.texto}
          </p>
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
                  <span className="font-serif text-sm font-semibold text-accent-600">
                    0{i + 1}
                  </span>
                  <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-800">
                    {s.nome}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {s.resumo}
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                      Para que serve
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {s.paraQueServe}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                      Indicado para
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {s.indicadoPara}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                      Destaques
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {s.destaques.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-sm text-ink-soft"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-400"
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
            <h2 className="text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              Não sabe qual sistema escolher?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/75">
              Conte como funciona o seu comércio. A CNC analisa sua operação e
              indica a solução certa, com suporte local de quem está por perto.
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
