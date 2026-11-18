import Link from "next/link";
import type { Metadata } from "next";
import LinkContato from "@/components/LinkContato";
import StatusAtendimento from "@/components/StatusAtendimento";
import FaixaContato from "@/components/FaixaContato";
import IconeWhatsApp from "@/components/IconeWhatsApp";
import TopoComFolha from "@/components/rolagem/TopoComFolha";
import TituloMascara from "@/components/rolagem/TituloMascara";
import PegasoTraco from "@/components/rolagem/PegasoTraco";
import TextoAcende from "@/components/rolagem/TextoAcende";
import CenaCupom from "@/components/rolagem/CenaCupom";
import CenaPortes from "@/components/rolagem/CenaPortes";
import CartoesEmpilhados from "@/components/rolagem/CartoesEmpilhados";
import LinhaEtapas from "@/components/rolagem/LinhaEtapas";
import FaixaCidades from "@/components/rolagem/FaixaCidades";
import EtiquetaPreco from "@/components/rolagem/EtiquetaPreco";
import { fotoExiste } from "@/lib/fotos";
import { site } from "@/content/site";
import { sistemas, recursosComuns } from "@/content/sistemas";
import {
  hero,
  manifesto,
  diferenciais,
  comoFunciona,
  segmentos,
  preco,
  ctaFinal,
  telas,
  perguntasFrequentes,
} from "@/content/home";

export const metadata: Metadata = {
  // Sem `title` aqui de propósito: a Home usa o `title.default` do layout raiz.
  // Sem citar marcas de fornecedores (ver sistemas.ts).
  description:
    "Sistema de gestão e PDV para mercadinho, açougue, padaria, loja e distribuidora em Maceió e no interior de Alagoas. A partir de R$ 150 por mês, com instalação, migração e treinamento inclusos.",
  alternates: { canonical: "/" },
};

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
 * HomePage — rota "/". Direção "balcão de Maceió à noite" (PRODUCT.md).
 *
 * A página é uma sequência de cenas, cada uma com um movimento que conta
 * alguma coisa:
 *
 *   topo        noite   título sobe por trás da máscara, pégaso se desenha
 *   folha       papel   sobe por cima do topo; manifesto acende com a rolagem
 *   cupom       papel   trava; o cupom sai da impressora em quatro passos
 *   portes      noite   trava; a esteira anda de lado, um porte por painel
 *   por quê     papel   cartões se empilham
 *   etapas      papel   a linha se enche de amarelo e acende cada etapa
 *   cidades     noite   as cidades atravessam a tela em sentidos opostos
 *   preço       papel   etiqueta de gôndola balança
 *   perguntas   papel   parado, é leitura
 *   fechamento  sinal   convite gigante ao WhatsApp
 *
 * Tudo sai completo no HTML do servidor; sem JavaScript ou com movimento
 * reduzido, a página é a mesma, parada.
 */
export default function HomePage() {
  const temTela = Object.fromEntries(telas.itens.map((t) => [t.slug, fotoExiste(t.src)]));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TopoComFolha
        topo={
          <>
            {/* Luz do logo atrás do pégaso: um halo azul, a única luz da página. */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(55% 60% at 72% 42%, rgba(43,87,196,0.38) 0%, rgba(43,87,196,0.08) 45%, transparent 70%)",
              }}
            />
            <div
              data-topo-fundo=""
              className="absolute -right-[30%] top-[14%] w-[120vw] opacity-90 sm:-right-[12%] sm:w-[80vw] lg:-right-[4%] lg:top-[9%] lg:w-[58vw] lg:max-w-[980px]"
            >
              <PegasoTraco className="h-auto w-full" />
            </div>

            <div
              data-topo-conteudo=""
              className="container-cnc relative z-[2] flex h-full origin-bottom flex-col justify-end pb-9 pt-28 lg:pb-16"
            >
              <div
                className="w-fit animate-some-entra rounded-full bg-papel/10 px-4 py-2 ring-1 ring-papel/15"
                style={{ animationDelay: "0.1s" }}
              >
                <StatusAtendimento tom="escuro" />
              </div>
              <TituloMascara
                texto={hero.titulo}
                className="larga mt-6 max-w-[19ch] text-[clamp(2.05rem,5.4vw,5.4rem)] text-papel"
              />
              <div className="mt-7 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                <p
                  className="max-w-md animate-some-entra text-base leading-relaxed text-papel/70 lg:text-lg"
                  style={{ animationDelay: "0.8s" }}
                >
                  <span className="lg:hidden">{hero.subtituloCurto}</span>
                  <span className="hidden lg:inline">{hero.subtitulo}</span>
                </p>
                <div
                  className="flex flex-none animate-some-entra flex-col gap-3 sm:flex-row"
                  style={{ animationDelay: "0.95s" }}
                >
                  <LinkContato origem="hero" className="btn-primary pr-3">
                    {hero.ctaPrimario}
                    <span className="btn-seta" aria-hidden="true">
                      <IconeWhatsApp className="h-3.5 w-3.5" />
                    </span>
                  </LinkContato>
                  <Link href="/sistemas" className="btn-ghost-dark">
                    Ver os sistemas
                  </Link>
                </div>
              </div>
            </div>
          </>
        }
      >
        {/* A folha: manifesto que acende com a rolagem. */}
        <div className="container-cnc pb-24 pt-20 lg:pb-32 lg:pt-32">
          <p className="rotulo text-brand-600">{hero.sobrelinha}</p>
          <TextoAcende
            texto={manifesto}
            className="semilarga mt-8 max-w-[24ch] text-[clamp(1.85rem,4.3vw,4.1rem)] leading-[1.08] text-ink"
          />
          <p className="mt-12 max-w-2xl text-lg leading-relaxed text-ink-soft lg:mt-16">
            Hoje são <strong className="font-semibold text-ink">{site.numeros.clientesAtivos} comércios</strong>{" "}
            com sistema e suporte da CNC, com{" "}
            <a
              href={site.googleAvaliacao}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-signal-500 decoration-[3px] underline-offset-4 hover:decoration-ink"
            >
              nota {site.numeros.notaGoogle} no Google
            </a>{" "}
            em {site.numeros.avaliacoesGoogle} avaliações, atendendo o comércio de Alagoas há{" "}
            {site.numeros.anosMercado} anos.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2.5" aria-label={segmentos.titulo}>
            {segmentos.lista.map((s) => (
              <li
                key={s.nome}
                className="rounded-full border border-ink/15 bg-papel-claro px-4 py-2 text-[0.95rem] font-medium text-ink"
              >
                {s.nome}
              </li>
            ))}
          </ul>
        </div>
      </TopoComFolha>

      <CenaCupom />

      <CenaPortes telas={temTela} />

      <CartoesEmpilhados
        titulo={diferenciais.titulo}
        texto={diferenciais.texto}
        cartoes={diferenciais.blocos}
      />

      <LinhaEtapas titulo={comoFunciona.titulo} texto={comoFunciona.texto} etapas={comoFunciona.etapas} />

      <FaixaCidades />

      {/* Preço: a etiqueta de gôndola e o que entra no valor. */}
      <section id="preco" className="scroll-mt-24 bg-papel py-24 lg:py-36" aria-labelledby="preco-titulo">
        <div className="container-cnc grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <EtiquetaPreco valor={preco.valor} periodo={preco.periodo} />
          <div>
            <h2 id="preco-titulo" className="larga text-[clamp(2.3rem,5vw,4.6rem)] text-ink">
              {preco.titulo}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{preco.texto}</p>
            <ul className="mt-9 space-y-3">
              {preco.inclui.map((item) => (
                <li key={item} className="flex items-start gap-4 text-lg font-medium text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink text-signal-500"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <LinkContato origem="preco" className="btn-primary mt-10 pr-3">
              {preco.cta}
              <span className="btn-seta" aria-hidden="true">
                <IconeWhatsApp className="h-3.5 w-3.5" />
              </span>
            </LinkContato>
          </div>
        </div>
      </section>

      {/* Perguntas: parado, é leitura. <details> nativo, abre sem JavaScript. */}
      <section className="border-t border-ink/10 bg-papel py-24 lg:py-36" aria-labelledby="faq-titulo">
        <div className="container-cnc grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 id="faq-titulo" className="larga text-[clamp(2.3rem,5vw,4.6rem)] text-ink">
            Perguntas de dono de loja
          </h2>
          <div className="flex flex-col gap-3">
            {faq.map((f) => (
              <details
                key={f.pergunta}
                className="group rounded-cartao bg-papel-claro px-6 ring-1 ring-ink/10 transition-colors open:ring-ink/25 sm:px-8"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.pergunta}
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-papel ring-1 ring-ink/15 transition-[transform,background-color] duration-300 ease-expo group-open:rotate-45 group-open:bg-signal-500 group-open:ring-0"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-relaxed text-ink-soft">{f.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FaixaContato titulo={ctaFinal.titulo} texto={ctaFinal.texto} origem="cta-final" />
    </>
  );
}
