import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopoPagina from "@/components/TopoPagina";
import FaixaContato from "@/components/FaixaContato";
import LinkContato from "@/components/LinkContato";
import IconeWhatsApp from "@/components/IconeWhatsApp";
import TextoAcende from "@/components/rolagem/TextoAcende";
import { site } from "@/content/site";
import { segmentos } from "@/content/segmentos";
import { sistemas } from "@/content/sistemas";

/**
 * Rota "/<slug do ramo>", uma página por item de `content/segmentos.ts`
 * (ex.: /sistema-para-mercadinho).
 *
 * Fica na raiz do grupo (site) para o endereço repetir o termo pesquisado. As
 * rotas fixas (/sistemas, /suporte...) têm prioridade sobre esta no Next, e
 * `dynamicParams = false` faz qualquer slug fora da lista cair no 404, então
 * esta rota não engole endereço errado.
 *
 * Ordem da página, a mesma da skill do site: promessa com botão, dores do ramo,
 * como a CNC resolve, porte indicado com preço, fechamento com o mesmo botão.
 */

export const dynamicParams = false;

/** Gera uma página estática por ramo no build. */
export function generateStaticParams() {
  return segmentos.map((s) => ({ segmento: s.slug }));
}

type Props = { params: Promise<{ segmento: string }> };

/** Acha o ramo pelo slug da URL, ou devolve undefined. */
function buscar(slug: string) {
  return segmentos.find((s) => s.slug === slug);
}

/** Título, descrição e canonical de cada ramo. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = buscar((await params).segmento);
  if (!s) return {};
  return {
    title: s.titulo,
    description: s.descricao,
    alternates: { canonical: `/${s.slug}` },
  };
}

/** Página de um ramo. Conteúdo vem todo de `segmentos.ts`. */
export default async function SegmentoPage({ params }: Props) {
  const s = buscar((await params).segmento);
  if (!s) notFound();
  const porte = sistemas.find((p) => p.slug === s.porte)!;

  return (
    <>
      <TopoPagina
        titulo={s.titulo}
        texto={<p>{s.promessa}</p>}
        acoes={
          <LinkContato origem="segmento" mensagem={s.mensagem} className="btn-primary pr-3">
            Falar no WhatsApp
            <span className="btn-seta" aria-hidden="true">
              <IconeWhatsApp className="h-3.5 w-3.5" />
            </span>
          </LinkContato>
        }
      >
        <div className="container-cnc pb-10 pt-20 lg:pt-32">
          <TextoAcende
            texto={s.comoResolve}
            className="semilarga max-w-[34ch] text-[clamp(1.5rem,2.9vw,2.7rem)] leading-[1.15] text-ink"
          />
        </div>

        <section className="py-16 lg:py-24" aria-labelledby="dores-titulo">
          <div className="container-cnc grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <h2 id="dores-titulo" className="larga text-[clamp(2rem,4.4vw,4rem)] text-ink">
              O que trava o dia de quem tem {s.ramo}
            </h2>
            <ul className="flex flex-col gap-3">
              {s.dores.map((d) => (
                <li
                  key={d}
                  className="semilarga rounded-cartao bg-papel-claro p-7 text-[clamp(1.15rem,1.7vw,1.45rem)] leading-snug text-ink ring-1 ring-ink/10"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </TopoPagina>

      <section className="grao relative bg-noite py-24 text-papel lg:py-36" aria-labelledby="porte-titulo">
        <div className="container-cnc relative z-[2] grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <p className="text-lg font-semibold text-papel/70">Porte indicado</p>
            <h2 id="porte-titulo" className="larga mt-2 text-[clamp(3rem,6.2vw,5.8rem)]">
              {porte.nome}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-papel/80">{s.porQuePorte}</p>
            <p className="text-lg leading-relaxed text-papel/80">
              A partir de {site.precos.pisoMensalPorExtenso}, com instalação, migração dos dados e
              treinamento da equipe incluídos, e o valor fechado depende do número de caixas e da
              rotina fiscal da loja.
            </p>
            <Link
              href={`/sistemas#${porte.slug}`}
              className="btn-ghost-dark min-h-[48px] self-start px-6 font-bold"
            >
              Ver o {porte.nome}
            </Link>
          </div>
        </div>
      </section>

      <FaixaContato
        titulo="Conte como é a sua operação"
        texto={`Quantos caixas, que nota você emite e o que mais trava hoje. A CNC indica o porte e passa o valor na mesma conversa, a partir de ${site.precos.pisoMensalPorExtenso}.`}
        origem="segmento"
        mensagem={s.mensagem}
      />
    </>
  );
}
