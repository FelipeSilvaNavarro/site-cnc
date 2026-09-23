import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import CtaButtons from "@/components/CtaButtons";
import FichaAtendimento from "@/components/FichaAtendimento";
import PlacasCidades from "@/components/PlacasCidades";
import { fotoExiste } from "@/lib/fotos";
import { suporte } from "@/content/suporte";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Suporte de sistema de gestão em Maceió, com técnico na loja",
  // A objeção que esta página responde é medo de ficar na mão com a loja
  // cheia, então a descrição precisa dizer o horário real e a ida à loja, que
  // é o que nenhum fornecedor nacional promete. "Suporte humanizado" sozinho
  // é adjetivo e não prova nada.
  description:
    "Suporte de sistema de gestão e PDV em Maceió e no interior de Alagoas, todos os dias das 6h às 22h, direto com quem conhece a sua operação e com técnico na loja quando o caso pede. Sem central e sem fila de chamado.",
  alternates: { canonical: "/suporte" },
};

/**
 * SuportePage — rota "/suporte".
 *
 * Quem chega aqui muitas vezes já é cliente e está com o caixa parado, então a
 * primeira dobra entrega o canal e diz se tem gente atendendo agora (ficha de
 * atendimento), no lugar do painel vazio que esperava a foto. Com a foto em
 * /public/fotos/suporte.jpg, ela entra acima da ficha sem mexer em código.
 *
 * Movimento: um momento só, os três itens do atendimento escalonados.
 */
export default function SuportePage() {
  const temFoto = fotoExiste(suporte.imagem.src);

  return (
    <>
      <section className="border-b-2 border-ink bg-paper">
        <div className="container-cnc grid gap-10 pb-12 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:pb-20 lg:pt-16">
          <div>
            <h1 className="max-w-[16ch] text-[clamp(2.1rem,5vw,4.4rem)] font-extrabold leading-[1] tracking-tightest text-ink">
              {suporte.titulo}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">{suporte.intro}</p>
            <CtaButtons
              origem="suporte"
              primario="Falar com o suporte"
              secundario="Pedir orçamento"
              className="mt-8"
            />
          </div>
          <div className="animate-rise">
            {temFoto && (
              <ImageSlot
                src={suporte.imagem.src}
                alt={suporte.imagem.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 26rem"
                className="aspect-[4/3] w-full"
              />
            )}
            <FichaAtendimento titulo="Suporte CNC" origem="suporte" preco={false} />
          </div>
        </div>
      </section>

      {/* Como funciona o atendimento: três linhas de título e texto, não três
          caixas iguais. */}
      <section className="bg-paper-soft py-16 lg:py-24">
        <div className="container-cnc">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl lg:text-5xl">
            {suporte.comoFunciona.titulo}
          </h2>
          <div className="mt-10 border-t-2 border-ink">
            {suporte.comoFunciona.itens.map((item, i) => (
              <Reveal
                key={item.titulo}
                delay={i * 90}
                className="grid gap-3 border-b border-ink/15 py-7 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12 lg:py-9"
              >
                <h3 className="text-2xl font-extrabold tracking-tightest text-ink lg:text-3xl">
                  {item.titulo}
                </h3>
                <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{item.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Até onde o técnico vai. */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-cnc">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl lg:text-5xl">
            Quando o caso pede, o técnico vai até a loja
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            O atendimento é {site.horario.semana.toLowerCase()},{" "}
            {site.horario.sabado.toLowerCase()}, e a ida à loja vale para as cidades onde a CNC
            já tem cliente.
          </p>
          <PlacasCidades className="mt-10" />
        </div>
      </section>
    </>
  );
}
