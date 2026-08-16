import Link from "next/link";
import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButtons from "@/components/CtaButtons";
import { site } from "@/content/site";
import { sistemas, sistemasIntro } from "@/content/sistemas";
import LinkContato from "@/components/LinkContato";
import {
  hero,
  diferenciais,
  comoFunciona,
  depoimentos,
  segmentos,
  preco,
  ctaFinal,
} from "@/content/home";

export const metadata: Metadata = {
  // Sem `title` aqui de propósito: a Home usa o `title.default` do layout raiz
  // ("CNC Sistemas — ..."), que é o que aparece na aba do navegador.
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  description:
    "Sistema de gestão e PDV para mercadinho, açougue, padaria, loja e distribuidora em Maceió e no interior de Alagoas. A partir de R$ 150 por mês, com instalação, migração e treinamento inclusos.",
  alternates: { canonical: "/" },
};

/**
 * HomePage — página inicial do site (rota "/").
 *
 * Ritmo deliberado, não uniforme. A régua de respiro por seção:
 *
 *   hero           generoso   py-20/28   abre a página
 *   prova social   apertado   py-8       faixa de dado, colada no hero
 *   soluções       generoso   py-20/28   catálogo em linhas, não em cards
 *   por que a CNC  máximo     py-24/32   bloco escuro, o peso da página
 *   como funciona  médio      py-16/20   sequência densa de 3 passos
 *   segmentos      apertado   py-14/16   é só uma lista de nomes
 *   CTA final      generoso   py-20/24   fecha
 *
 * Espaçamento uniforme elimina hierarquia; era o que acontecia antes, com as
 * quatro grades de blocos iguais em py-20 lg:py-28.
 *
 * Movimento: dois momentos escolhidos na página inteira (o bloco escuro e a
 * sequência de passos). Todo o resto entra estático.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. HERO — generoso */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-cnc grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            {/* Único rótulo superior do site, e só aqui: tratamento próprio
                (caixa normal, filete à esquerda), não o kicker versalete que
                aparecia em toda seção. */}
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-brand-700">
              <span aria-hidden="true" className="h-0.5 w-8 bg-signal-500" />
              {hero.sobrelinha}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-[3.4rem]">
              {hero.titulo}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {hero.subtitulo}
            </p>
            <CtaButtons
              primario={hero.ctaPrimario}
              secundario={hero.ctaSecundario}
              origem="hero"
              className="mt-8"
            />
          </div>

          <div className="relative">
            <ImageSlot
              src={hero.imagem.src}
              alt={hero.imagem.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] w-full"
            />
            {/* Selo de credibilidade: bloco chapado, sem sombra nem raio.
                Peso de placa aplicada sobre a foto. */}
            <div className="absolute -bottom-4 -left-4 hidden bg-ink px-5 py-4 sm:block">
              <p className="text-sm font-bold text-paper">Suporte humanizado</p>
              <p className="mt-0.5 text-xs text-paper/70">
                Sem central, sem fila de chamado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROVA SOCIAL — apertado, faixa de dado colada no hero.
          Superfície tinta: quebra a sequência branco-branco-branco e dá à
          página um ponto de contraste máximo logo no início. */}
      <section className="bg-ink text-paper">
        <div className="container-cnc grid gap-6 py-8 md:grid-cols-3 md:items-center md:gap-10">
          <div className="flex items-baseline gap-3">
            {/* Dado real: mono com algarismo tabular. */}
            <span className="dado text-4xl font-medium leading-none text-paper">
              {site.numeros.clientesAtivos}
            </span>
            <span className="text-sm leading-snug text-paper/70">
              clientes ativos usando nossos sistemas
            </span>
          </div>
          {/* Avaliação do Google: a prova mais forte que a CNC tem, e estava
              fora do site. Nota real do perfil, não adjetivo. */}
          <div className="flex items-baseline gap-3 md:border-x md:border-paper/15 md:px-10">
            <span className="dado text-4xl font-medium leading-none text-paper">
              {site.numeros.notaGoogle}
            </span>
            <span className="text-sm leading-snug text-paper/70">
              no Google, em {site.numeros.avaliacoesGoogle} avaliações de clientes
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="dado text-4xl font-medium leading-none text-paper">
              {site.numeros.anosMercado}
            </span>
            <span className="text-sm leading-snug text-paper/70">
              anos atendendo o comércio em Alagoas
            </span>
          </div>
        </div>
      </section>

      {/* 3. SOLUÇÕES — generoso.
          Era grade de 3 cards idênticos; virou catálogo em linhas. Um sistema
          é uma entrada de catálogo, não um cartão de marketing. */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc">
          <SectionHeading
            titulo={sistemasIntro.titulo}
            texto={sistemasIntro.texto}
          />
          <ul className="mt-10 border-t-2 border-ink">
            {sistemas.map((s) => (
              <li key={s.slug} className="border-b border-ink/15">
                <Link
                  href={`/sistemas#${s.slug}`}
                  className="group grid gap-2 py-6 transition-colors hover:bg-paper-soft sm:grid-cols-[minmax(0,13rem)_1fr_auto] sm:items-baseline sm:gap-8 sm:px-3"
                >
                  <h3 className="text-xl font-bold tracking-tightest text-ink">
                    {s.nome}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {s.resumo}
                  </p>
                  <span className="text-sm font-semibold text-brand-700 group-hover:underline">
                    Ver detalhes
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. POR QUE A CNC — respiro máximo. É o bloco de maior peso da página.
          MOMENTO DE MOVIMENTO 1 de 2: o bloco inteiro entra como uma unidade. */}
      <section className="bg-brand-900 py-24 text-paper lg:py-32">
        <div className="container-cnc">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tightest text-paper sm:text-4xl">
              {diferenciais.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-200">
              {diferenciais.texto}
            </p>
          </div>
          <Reveal className="mt-14 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.blocos.map((b) => (
              // Sem numeração: estes blocos não são sequência, a ordem não
              // carrega informação (diferente de "Como funciona").
              <div key={b.titulo} className="bg-brand-900 p-8">
                <h3 className="text-lg font-bold tracking-tightest text-paper">
                  {b.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-200">
                  {b.texto}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 5. COMO FUNCIONA — respiro médio, sequência densa.
          MOMENTO DE MOVIMENTO 2 de 2: os 3 passos entram escalonados. Escalonar
          os itens de UMA lista é legítimo; o tique era animar toda seção. */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="container-cnc">
          <SectionHeading
            titulo={comoFunciona.titulo}
            texto={comoFunciona.texto}
          />
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {comoFunciona.etapas.map((e, i) => (
              <Reveal as="li" key={e.numero} delay={i * 90}>
                <div className="rule-signal">
                  {/* Numeração mantida: aqui é etapa real, a ordem informa. */}
                  <span className="dado text-3xl font-medium text-ink-muted">
                    {e.numero}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tightest text-ink">
                  {e.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {e.texto}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. DEPOIMENTOS (oculto enquanto não houver depoimentos reais) */}
      {depoimentos.length > 0 && (
        <section className="border-t border-ink/10 bg-paper-soft py-20 lg:py-24">
          <div className="container-cnc">
            <SectionHeading
              titulo="Quem confia a operação à CNC"
              texto="Clientes que contam com os nossos sistemas e o nosso suporte no dia a dia."
            />
            <div className="mt-10 grid gap-px bg-ink/15 md:grid-cols-3">
              {depoimentos.map((d, i) => (
                <article key={i} className="flex flex-col bg-paper p-7">
                  <p className="flex-1 text-base leading-relaxed text-ink-soft">
                    “{d.texto}”
                  </p>
                  <footer className="mt-6 border-t border-ink/15 pt-4">
                    <p className="text-base font-bold text-ink">{d.nome}</p>
                    <p className="text-sm text-ink-muted">{d.empresa}</p>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. SEGMENTOS — apertado. Era grade emoldurada de 8 caixas; virou o que
          sempre foi: uma lista de nomes. Sem moldura, sem célula, sem card. */}
      <section className="border-t border-ink/10 bg-paper py-14 lg:py-16">
        <div className="container-cnc">
          <h2 className="max-w-2xl text-2xl font-bold tracking-tightest text-ink sm:text-3xl">
            {segmentos.titulo}
          </h2>
          <ul className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {segmentos.lista.map((seg, i) => (
              <li
                key={seg.nome}
                className="flex items-baseline gap-4 text-lg font-semibold text-ink sm:text-xl"
              >
                {i > 0 && (
                  <span aria-hidden="true" className="text-signal-600">
                    /
                  </span>
                )}
                {seg.nome}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
            {segmentos.texto}
          </p>
        </div>
      </section>

      {/* 8. PREÇO — respiro médio, duas colunas.
          Seção nova. O preço estava fora do site inteiro, o que empurrava toda
          a filtragem para a conversa do WhatsApp e encarecia justamente o
          contato que o anúncio paga. */}
      <section
        id="preco"
        className="border-t-2 border-ink bg-paper-soft py-16 lg:py-20"
      >
        <div className="container-cnc grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
              {preco.titulo}
            </h2>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="dado text-5xl font-medium leading-none text-ink">
                {preco.valor}
              </span>
              <span className="text-base font-semibold text-ink-soft">
                {preco.periodo}
              </span>
            </p>
            <LinkContato origem="preco" className="btn-primary mt-6">
              {preco.cta}
            </LinkContato>
          </div>

          <div>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              {preco.texto}
            </p>
            <ul className="mt-8 border-t border-ink/15">
              {preco.inclui.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-ink/15 py-3 text-base text-ink"
                >
                  <span aria-hidden="true" className="font-bold text-signal-600">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL — generoso */}
      <section className="bg-brand-800 py-20 text-paper lg:py-24">
        <div className="container-cnc flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tightest text-paper sm:text-4xl">
              {ctaFinal.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">
              {ctaFinal.texto}
            </p>
          </div>
          <CtaButtons
            primario={ctaFinal.ctaPrimario}
            secundario={ctaFinal.ctaSecundario}
            origem="cta-final"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
