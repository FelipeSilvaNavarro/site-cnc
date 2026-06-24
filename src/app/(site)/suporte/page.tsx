import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import CtaButtons from "@/components/CtaButtons";
import { suporte } from "@/content/suporte";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Suporte humanizado de sistema de gestão",
  description:
    "O diferencial da CNC: suporte humanizado, direto e contínuo, sem central de chamados. Você fala com quem conhece o seu sistema e resolve.",
  alternates: { canonical: "/suporte" },
};

export default function SuportePage() {
  return (
    <>
      {/* Cabeçalho com imagem */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-cnc grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-4">{suporte.sobrelinha}</p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {suporte.titulo}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {suporte.intro}
            </p>
            <CtaButtons
              primario="Falar com o suporte"
              secundario="Pedir orçamento"
              className="mt-8"
            />
          </Reveal>
          <Reveal delay={120}>
            <ImageSlot
              src={suporte.imagem.src}
              alt={suporte.imagem.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full rounded-sm shadow-xl shadow-brand-900/10"
            />
          </Reveal>
        </div>
      </section>

      {/* Como funciona o atendimento */}
      <section className="bg-paper-soft py-20 lg:py-28">
        <div className="container-cnc">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-3">Atendimento</p>
            <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {suporte.comoFunciona.titulo}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {suporte.comoFunciona.itens.map((item, i) => (
              <Reveal
                key={item.titulo}
                delay={i * 100}
                className="rounded-sm border border-ink/10 bg-paper p-7"
              >
                <h3 className="font-display text-xl font-semibold text-brand-800">
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

      {/* Canais e horários */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Canais</p>
            <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {suporte.canais.titulo}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {suporte.canais.observacao}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <dl className="divide-y divide-ink/10 rounded-sm border border-ink/10">
              <div className="flex items-center justify-between gap-4 p-5">
                <dt className="text-sm font-semibold text-ink">WhatsApp</dt>
                <dd>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-700 hover:underline"
                  >
                    {site.whatsapp.exibicao}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <dt className="text-sm font-semibold text-ink">Telefone</dt>
                <dd>
                  <a
                    href={`tel:${site.telefone.numero}`}
                    className="text-sm text-brand-700 hover:underline"
                  >
                    {site.telefone.exibicao}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <dt className="text-sm font-semibold text-ink">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-brand-700 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <dt className="text-sm font-semibold text-ink">
                  Horário (seg–sex)
                </dt>
                <dd className="text-sm text-ink-soft">{site.horario.semana}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <dt className="text-sm font-semibold text-ink">Sábado</dt>
                <dd className="text-sm text-ink-soft">{site.horario.sabado}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
