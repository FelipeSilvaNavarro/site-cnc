import Link from "next/link";
import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButtons from "@/components/CtaButtons";
import { site } from "@/content/site";
import { sistemas, sistemasIntro } from "@/content/sistemas";
import {
  hero,
  diferenciais,
  comoFunciona,
  depoimentos,
  segmentos,
  ctaFinal,
} from "@/content/home";

export const metadata: Metadata = {
  // Sem `title` aqui de propósito: a Home usa o `title.default` do layout raiz
  // ("CNC Sistemas — ..."), que é o que aparece na aba do navegador.
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  description:
    "A CNC oferece e dá suporte a sistemas de gestão e PDV. Suporte humanizado, direto e contínuo, sem central de chamados.",
  alternates: { canonical: "/" },
};

/**
 * HomePage — página inicial do site (rota "/").
 *
 * Monta as 8 seções na ordem: (1) hero, (2) barra de prova social
 * (clientes/anos/soluções), (3) cards das soluções, (4) "por que a CNC",
 * (5) como funciona, (6) depoimentos — oculto enquanto `depoimentos` vazio,
 * (7) segmentos e (8) CTA final. Todo o texto vem de `content/home.ts`,
 * `content/site.ts` e `content/sistemas.ts`.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
        <div className="container-cnc grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-4">{hero.sobrelinha}</p>
            <h1 className="text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              {hero.titulo}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {hero.subtitulo}
            </p>
            <CtaButtons
              primario={hero.ctaPrimario}
              secundario={hero.ctaSecundario}
              className="mt-8"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <ImageSlot
                src={hero.imagem.src}
                alt={hero.imagem.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] w-full rounded-sm shadow-xl shadow-brand-900/10"
              />
              {/* Selo de credibilidade: suporte direto */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-md border border-ink/10 bg-paper px-5 py-4 shadow-lg sm:block">
                <p className="font-display text-sm font-semibold text-brand-700">
                  Suporte humanizado
                </p>
                <p className="text-xs text-ink-muted">
                  Sem central, sem fila de chamado
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. BARRA DE PROVA SOCIAL */}
      <section className="border-b border-ink/10 bg-paper-soft">
        <div className="container-cnc grid gap-8 py-10 md:grid-cols-3 md:items-center md:gap-12">
          <div className="flex flex-col gap-1">
            <span className="font-display text-3xl font-semibold text-brand-800">
              {site.numeros.clientesAtivos}
            </span>
            <span className="text-sm text-ink-muted">
              clientes ativos usando nossos sistemas
            </span>
          </div>
          <div className="flex flex-col gap-1 md:border-x md:border-ink/10 md:px-8">
            <span className="font-display text-3xl font-semibold text-brand-800">
              {site.numeros.anosMercado}
            </span>
            <span className="text-sm text-ink-muted">anos de mercado</span>
          </div>
          <div className="flex flex-col gap-2">
            {/* Rótulos de porte (PRO/MÉDIO/SIMPLES), sem marcas — ver sistemas.ts */}
            <span className="text-sm text-ink-muted">Nossas soluções</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-base font-semibold text-ink-soft">
              {sistemas.map((s) => (
                <li key={s.slug}>{s.nome}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SISTEMAS OFERECIDOS */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc">
          <SectionHeading
            eyebrow="Sistemas"
            titulo={sistemasIntro.titulo}
            texto={sistemasIntro.texto}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sistemas.map((s, i) => (
              <Reveal as="article" key={s.slug} delay={i * 80}>
                <Link
                  href={`/sistemas#${s.slug}`}
                  className="group flex h-full flex-col rounded-sm border border-ink/10 bg-paper-soft/40 p-6 transition-colors hover:border-brand-700/40 hover:bg-paper-soft"
                >
                  <h3 className="font-display text-xl font-semibold text-brand-800">
                    {s.nome}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {s.resumo}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-accent-600 transition-transform group-hover:translate-x-1">
                    Ver detalhes →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POR QUE A CNC */}
      <section className="bg-brand-900 py-20 text-paper lg:py-28">
        <div className="container-cnc">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
              Por que a CNC
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              {diferenciais.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/70">
              {diferenciais.texto}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.blocos.map((b, i) => (
              <Reveal
                key={b.titulo}
                delay={i * 100}
                className="bg-brand-900 p-8"
              >
                <span className="font-display text-2xl font-semibold text-accent-300">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-paper">
                  {b.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {b.texto}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMO FUNCIONA */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc">
          <SectionHeading
            eyebrow="Como funciona"
            titulo={comoFunciona.titulo}
            texto={comoFunciona.texto}
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {comoFunciona.etapas.map((e, i) => (
              <Reveal as="li" key={e.numero} delay={i * 100}>
                <div className="rule-accent">
                  <span className="font-display text-5xl font-semibold text-paper-dark">
                    {e.numero}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-brand-800">
                  {e.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {e.texto}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. DEPOIMENTOS (oculto enquanto não houver depoimentos reais) */}
      {depoimentos.length > 0 && (
      <section className="bg-paper-soft py-20 lg:py-28">
        <div className="container-cnc">
          <SectionHeading
            eyebrow="Depoimentos"
            titulo="Quem confia a operação à CNC"
            texto="Clientes que contam com os nossos sistemas e o nosso suporte no dia a dia."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {depoimentos.map((d, i) => (
              <Reveal
                as="article"
                key={i}
                delay={i * 90}
                className="flex h-full flex-col rounded-sm border border-ink/10 bg-paper p-7"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-accent-300"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.5 7H5.5C4.7 7 4 7.7 4 8.5v4C4 13.3 4.7 14 5.5 14H8v.5C8 15.9 6.9 17 5.5 17H5v2h.5C8 19 10 17 10 14.5v-6C10 7.7 9.3 7 8.5 7h1zm9 0h-4c-.8 0-1.5.7-1.5 1.5v4c0 .8.7 1.5 1.5 1.5H17v.5c0 1.4-1.1 2.5-2.5 2.5H14v2h.5c2.5 0 4.5-2 4.5-4.5v-6c0-.8-.7-1.5-1.5-1.5h1z" />
                </svg>
                <p className="mt-4 flex-1 text-base italic leading-relaxed text-ink-soft">
                  “{d.texto}”
                </p>
                <footer className="mt-6 border-t border-ink/10 pt-4">
                  <p className="font-display text-base font-semibold text-brand-800">
                    {d.nome}
                  </p>
                  <p className="text-sm text-ink-muted">{d.empresa}</p>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 7. SEGMENTOS ATENDIDOS */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc">
          <SectionHeading
            eyebrow="Segmentos"
            titulo={segmentos.titulo}
            texto={segmentos.texto}
          />
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-4">
            {segmentos.lista.map((seg, i) => (
              <Reveal
                as="li"
                key={seg.nome}
                delay={i * 50}
                className="flex items-center bg-paper p-6 text-center"
              >
                <span className="w-full font-display text-lg font-medium text-ink-soft">
                  {seg.nome}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="bg-brand-800 py-20 text-paper lg:py-24">
        <div className="container-cnc flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              {ctaFinal.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/75">
              {ctaFinal.texto}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <CtaButtons
              primario={ctaFinal.ctaPrimario}
              secundario={ctaFinal.ctaSecundario}
              variant="dark"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
