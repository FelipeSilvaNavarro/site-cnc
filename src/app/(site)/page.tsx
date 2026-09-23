import Link from "next/link";
import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButtons from "@/components/CtaButtons";
import StatusAtendimento from "@/components/StatusAtendimento";
import FichaAtendimento from "@/components/FichaAtendimento";
import PlacasCidades from "@/components/PlacasCidades";
import FaixaContato from "@/components/FaixaContato";
import { site } from "@/content/site";
import { sistemas, sistemasIntro, recursosComuns } from "@/content/sistemas";
import LinkContato from "@/components/LinkContato";
import { fotoExiste } from "@/lib/fotos";
import {
  hero,
  diferenciais,
  comoFunciona,
  depoimentos,
  segmentos,
  preco,
  ctaFinal,
  telas,
  cobertura,
  perguntasFrequentes,
} from "@/content/home";

export const metadata: Metadata = {
  // Sem `title` aqui de propósito: a Home usa o `title.default` do layout raiz
  // ("CNC Sistemas — ..."), que é o que aparece na aba do navegador.
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  description:
    "Sistema de gestão e PDV para mercadinho, açougue, padaria, loja e distribuidora em Maceió e no interior de Alagoas. A partir de R$ 150 por mês, com instalação, migração e treinamento inclusos.",
  alternates: { canonical: "/" },
};

const [baseCidade, ...outrasCidades] = site.cidadesAtendidas;

const faq = perguntasFrequentes({
  horario: site.horario.semana,
  cidades: site.cidadesAtendidas,
  portes: sistemas.map((s) => ({ nome: s.nome, resumo: s.resumo })),
  notas: recursosComuns.texto,
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.pergunta,
    acceptedAnswer: { "@type": "Answer", text: f.resposta },
  })),
};

/**
 * HomePage — página inicial do site (rota "/").
 *
 * Rodada de 23/09/2026: a direção do PRODUCT.md continua a mesma (catálogo
 * técnico e sinalização), só que levada ao extremo em vez de contida. Três
 * peças de assinatura, todas carregando dado real:
 *
 *   ficha de atendimento   placa escura no hero, com o status ao vivo
 *   placas de cidade       cobertura como placa de estrada, cidade por cidade
 *   cartaz de preço        o "R$ 150" no tamanho do cartaz de oferta do cliente
 *
 * Ritmo deliberado, não uniforme:
 *
 *   hero           generoso   abre a página, título em escala de cartaz
 *   números        apertado   faixa de tinta colada no hero
 *   soluções       generoso   catálogo em linhas que invertem no hover
 *   por que a CNC  máximo     bloco azul, o peso da página
 *   telas          generoso   só existe com captura real
 *   como funciona  médio      três passos
 *   cobertura      médio      placas de cidade
 *   segmentos      apertado   lista de nomes
 *   preço          generoso   cartaz
 *   perguntas      médio      FAQ nativo, sem JavaScript
 *   CTA final      generoso   fecha
 *
 * Movimento: dois momentos na página inteira, a ficha do hero entrando e os
 * três passos escalonados. Todo o resto entra estático.
 */
export default function HomePage() {
  const telasReais = telas.itens.filter((t) => fotoExiste(t.src));
  const fotoHero = fotoExiste(hero.imagem.src);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. HERO — título em escala de cartaz, ocupando a largura inteira. */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="container-cnc pb-12 pt-10 lg:pb-20 lg:pt-16">
          {/* Único rótulo superior do site, e só aqui. */}
          <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-brand-700">
            <span aria-hidden="true" className="h-0.5 w-8 bg-signal-500" />
            {hero.sobrelinha}
          </p>
          {/* Título todo em tinta: pintar metade da frase na cor da marca é o
              tique mais batido de landing gerada, e o peso já faz o trabalho. */}
          <h1 className="max-w-[22ch] text-[clamp(2.1rem,5.2vw,4.6rem)] font-extrabold leading-[1] tracking-tightest text-ink">
            {hero.titulo}
          </h1>

          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-16">
            {/* No celular o CTA vem antes do texto longo, para aparecer sem
                rolar. Do tablet para cima volta à ordem de leitura. */}
            <div className="flex flex-col">
              <p className="order-2 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:order-1 sm:mt-0">
                {hero.subtitulo}
              </p>
              <CtaButtons
                primario={hero.ctaPrimario}
                secundario={hero.ctaSecundario}
                origem="hero"
                className="order-1 sm:order-2 sm:mt-8"
              />
              <StatusAtendimento className="order-3 mt-6 lg:hidden" />
            </div>

            <div className="animate-rise">
              {fotoHero && (
                <ImageSlot
                  src={hero.imagem.src}
                  alt={hero.imagem.alt}
                  priority
                  sizes="(max-width: 1024px) 100vw, 27rem"
                  className="aspect-[4/3] w-full"
                />
              )}
              <FichaAtendimento origem="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROVA — uma frase só, com os números correndo dentro dela.
          Número grande com rótulo pequeno em três colunas é o molde de
          métrica de SaaS; aqui a prova é dita como o dono diria. */}
      <section className="bg-ink text-paper">
        <div className="container-cnc py-10 lg:py-14">
          <p className="max-w-5xl text-2xl font-bold leading-snug tracking-tightest text-paper/60 sm:text-3xl lg:text-[2.6rem] lg:leading-[1.15]">
            <span className="text-paper">
              {site.numeros.clientesAtivos} comércios
            </span>{" "}
            rodam hoje com sistema e suporte da CNC, que tem{" "}
            <a
              href={site.googleAvaliacao}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-signal-500 decoration-2 underline-offset-[6px] hover:text-signal-500"
            >
              nota {site.numeros.notaGoogle} no Google
            </a>{" "}
            em{" "}
            {site.numeros.avaliacoesGoogle} avaliações e atende o comércio de Alagoas há{" "}
            <span className="text-paper">{site.numeros.anosMercado} anos</span>.
          </p>
        </div>
      </section>

      {/* 3. SOLUÇÕES — catálogo em linhas. A linha inteira inverte para tinta
          no hover: é a entrada de catálogo sendo apontada, não um card. */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc">
          <SectionHeading titulo={sistemasIntro.titulo} texto={sistemasIntro.texto} />
          <ul className="mt-12 border-t-2 border-ink">
            {sistemas.map((s) => (
              <li key={s.slug} className="border-b-2 border-ink">
                <Link
                  href={`/sistemas#${s.slug}`}
                  className="group grid gap-3 px-1 py-7 transition-colors duration-150 hover:bg-ink sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:items-center sm:gap-10 sm:px-4 lg:py-9"
                >
                  <h3 className="text-4xl font-extrabold tracking-tightest text-ink transition-colors group-hover:text-paper lg:text-6xl">
                    {s.nome}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-ink-soft transition-colors group-hover:text-paper/80">
                    {s.resumo}
                  </p>
                  <span className="flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors group-hover:text-signal-500">
                    Ver detalhes
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. POR QUE A CNC — respiro máximo, o bloco de maior peso. */}
      <section className="bg-brand-900 py-24 text-paper lg:py-32">
        <div className="container-cnc">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold tracking-tightest text-paper sm:text-5xl lg:text-6xl">
              {diferenciais.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-200">
              {diferenciais.texto}
            </p>
          </div>
          {/* Duas colunas de texto corrido separadas por filete, e não quatro
              caixinhas iguais com traço colorido em cima, que é grade de
              template. Sem numeração: estes blocos não são sequência. */}
          <div className="mt-16 grid gap-x-16 border-t-2 border-paper/30 sm:grid-cols-2">
            {diferenciais.blocos.map((b) => (
              <div key={b.titulo} className="border-b border-paper/15 py-8 lg:py-10">
                <h3 className="text-2xl font-bold tracking-tightest text-paper lg:text-3xl">
                  {b.titulo}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-brand-200">
                  {b.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TELAS — só renderiza com captura real em /public/fotos/telas. */}
      {telasReais.length > 0 && (
        <section className="bg-paper py-20 lg:py-28">
          <div className="container-cnc">
            <SectionHeading titulo={telas.titulo} texto={telas.texto} />
            <div
              className={`mt-12 grid gap-8 ${
                telasReais.length > 1 ? "lg:grid-cols-2" : ""
              }`}
            >
              {telasReais.map((t, i) => {
                const porte = sistemas.find((s) => s.slug === t.slug);
                return (
                  <figure
                    key={t.slug}
                    className={`border-2 border-ink ${
                      telasReais.length === 3 && i === 0 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <ImageSlot
                      src={t.src}
                      alt={`Tela real do sistema ${porte?.nome ?? ""}`}
                      sizes="(max-width: 1024px) 100vw, 1240px"
                      className="aspect-[16/9] w-full"
                    />
                    <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t-2 border-ink px-5 py-4">
                      <span className="text-lg font-bold tracking-tightest text-ink">
                        {porte?.nome}
                      </span>
                      <span className="text-sm text-ink-soft">{porte?.resumo}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. COMO FUNCIONA — três passos sobre um trilho de 2px.
          MOMENTO DE MOVIMENTO 2 de 2: os passos entram escalonados. */}
      <section className="border-t-2 border-ink bg-paper-soft py-16 lg:py-24">
        <div className="container-cnc">
          <SectionHeading titulo={comoFunciona.titulo} texto={comoFunciona.texto} />
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:border-t-2 md:border-ink">
            {comoFunciona.etapas.map((e, i) => (
              <Reveal
                as="li"
                key={e.numero}
                delay={i * 90}
                className="border-t-2 border-ink pt-6 md:border-t-0 md:pr-10 md:pt-8"
              >
                {/* A ordem fica no <ol> e na seta, sem o "01 02 03" gigante,
                    que é o andaime de landing gerada mesmo quando a sequência
                    é real. */}
                <h3 className="flex items-baseline justify-between gap-4 text-2xl font-extrabold tracking-tightest text-ink lg:text-3xl">
                  {e.titulo}
                  {i < comoFunciona.etapas.length - 1 && (
                    <span aria-hidden="true" className="hidden font-normal text-brand-600 md:inline">
                      →
                    </span>
                  )}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">{e.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. DEPOIMENTOS (oculto enquanto não houver depoimentos reais) */}
      {depoimentos.length > 0 && (
        <section className="border-t border-ink/10 bg-paper py-20 lg:py-24">
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

      {/* 8. COBERTURA — placas de cidade. Placa de estrada azul com filete
          branco por dentro, uma por cidade onde já existe cliente. */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-cnc">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl lg:text-5xl">
            Técnico na loja em {baseCidade} e em mais {outrasCidades.length} cidades
            de Alagoas
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {cobertura.texto}
          </p>
          <PlacasCidades className="mt-10" />
        </div>
      </section>

      {/* 9. SEGMENTOS — apertado, uma lista de nomes em escala de título. */}
      <section className="border-t-2 border-ink bg-paper py-14 lg:py-16">
        <div className="container-cnc">
          <h2 className="text-lg font-bold text-ink-soft">{segmentos.titulo}</h2>
          <ul className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {segmentos.lista.map((seg, i) => (
              <li
                key={seg.nome}
                className="flex items-baseline gap-4 text-2xl font-extrabold tracking-tightest text-ink sm:text-3xl lg:text-4xl"
              >
                {i > 0 && (
                  <span aria-hidden="true" className="font-normal text-brand-400">
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

      {/* 10. PREÇO — cartaz. O mesmo cartaz de oferta que o cliente pendura
          na loja dele: número enorme, sem letra miúda escondida. O amarelo
          aqui é dado crítico (o preço) e ação (o botão), nada além. */}
      <section id="preco" className="border-t-2 border-ink bg-paper-soft py-16 lg:py-24">
        <div className="container-cnc grid gap-12 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-20">
          <div className="self-start bg-ink p-8 text-paper sm:p-10">
            <h2 className="text-lg font-bold text-paper">{preco.titulo}</h2>
            <p className="mt-8 text-sm font-semibold text-paper/70">A partir de</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
              <span className="whitespace-nowrap text-[clamp(4rem,17vw,6.75rem)] font-extrabold leading-[0.9] tracking-tightest text-signal-500">
                {preco.valor}
              </span>
              <span className="text-xl font-bold text-paper">{preco.periodo}</span>
            </p>
            <LinkContato origem="preco" className="btn-primary mt-10 w-full sm:w-auto">
              {preco.cta}
            </LinkContato>
          </div>

          <div className="lg:pt-4">
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{preco.texto}</p>
            <ul className="mt-8 border-t-2 border-ink">
              {preco.inclui.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-ink/15 py-4 text-lg font-semibold text-ink"
                >
                  <span aria-hidden="true" className="font-bold text-brand-600">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 11. PERGUNTAS — <details> nativo: abre sem JavaScript, e o texto
          está no HTML para o robô de busca e para a IA lerem. */}
      <section className="border-t-2 border-ink bg-paper py-16 lg:py-24">
        <div className="container-cnc grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <h2 className="text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
            Perguntas que todo dono de loja faz
          </h2>
          <div className="border-t-2 border-ink">
            {faq.map((f) => (
              <details key={f.pergunta} className="group border-b border-ink/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {f.pergunta}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-colors group-open:bg-ink group-open:text-paper"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-base leading-relaxed text-ink-soft">
                  {f.resposta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA FINAL */}
      <FaixaContato titulo={ctaFinal.titulo} texto={ctaFinal.texto} origem="cta-final" />
    </>
  );
}
