import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import CtaButtons from "@/components/CtaButtons";
import { suporte } from "@/content/suporte";
import { site } from "@/content/site";
import LinkContato from "@/components/LinkContato";

export const metadata: Metadata = {
  title: "Suporte humanizado de sistema de gestão",
  description:
    "O diferencial da CNC: suporte humanizado, direto e contínuo, sem central de chamados. Você fala com quem conhece o seu sistema e resolve.",
  alternates: { canonical: "/suporte" },
};

/**
 * SuportePage — rota "/suporte".
 *
 * Apresenta o diferencial central (suporte humanizado, 24/7, sem central de
 * chamados): cabeçalho + imagem, "como funciona o atendimento" e a tabela de
 * canais (WhatsApp/telefone e horário 24/7). Conteúdo de `content/suporte.ts` e
 * contatos/horário de `content/site.ts`.
 */
export default function SuportePage() {
  return (
    <>
      {/* Cabeçalho com imagem */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-cnc grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
              {suporte.titulo}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {suporte.intro}
            </p>
            <CtaButtons
              origem="suporte"
              primario="Falar com o suporte"
              secundario="Pedir orçamento"
              className="mt-8"
            />
          </div>
          <ImageSlot
            src={suporte.imagem.src}
            alt={suporte.imagem.alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full"
          />
        </div>
      </section>

      {/* Como funciona o atendimento — médio, denso.
          Único momento de movimento da página: os 3 itens escalonados. */}
      <section className="bg-paper-soft py-16 lg:py-20">
        <div className="container-cnc">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
            {suporte.comoFunciona.titulo}
          </h2>
          <div className="mt-10 grid gap-px bg-ink/15 md:grid-cols-3">
            {suporte.comoFunciona.itens.map((item, i) => (
              <Reveal
                key={item.titulo}
                delay={i * 90}
                className="bg-paper-soft p-7"
              >
                <h3 className="text-xl font-bold tracking-tightest text-ink">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {item.texto}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Canais e horários — generoso */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
              {suporte.canais.titulo}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {suporte.canais.observacao}
            </p>
          </div>
          <div>
            <dl className="divide-y divide-ink/15 border-t-2 border-ink">
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="label-dado text-ink">WhatsApp</dt>
                <dd>
                  <LinkContato
                    origem="suporte"
                    className="dado text-brand-700 hover:underline"
                  >
                    {site.whatsapp.exibicao}
                  </LinkContato>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="label-dado text-ink">Telefone</dt>
                <dd>
                  <LinkContato
                    origem="suporte"
                    canal="telefone"
                    className="dado text-brand-700 hover:underline"
                  >
                    {site.telefone.exibicao}
                  </LinkContato>
                </dd>
              </div>
              {/* E-mail OCULTO por enquanto (conta contato@ a criar no Zoho).
                  Para reativar, descomente este bloco. */}
              {/* <div className="flex items-center justify-between gap-4 p-5">
                <dt className="text-sm font-semibold text-ink">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-brand-700 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div> */}
              {/* Atendimento 24/7 (valores em site.horario). */}
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="label-dado text-ink">Atendimento</dt>
                <dd className="dado text-ink-soft">{site.horario.semana}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="label-dado text-ink">Disponibilidade</dt>
                <dd className="dado text-ink-soft">{site.horario.sabado}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
