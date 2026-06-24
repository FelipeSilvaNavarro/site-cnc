import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import CtaButtons from "@/components/CtaButtons";
import { sobre } from "@/content/sobre";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre a CNC — revenda e suporte de sistemas de gestão",
  description:
    "Conheça a CNC: revenda e suporte de sistemas de gestão e PDV. História, equipe, CNPJ e endereço.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  const e = site.endereco;
  return (
    <>
      {/* Cabeçalho */}
      <section className="border-b border-ink/10 bg-paper-soft py-16 lg:py-20">
        <div className="container-cnc max-w-3xl">
          <p className="eyebrow mb-4">{sobre.sobrelinha}</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {sobre.titulo}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {sobre.intro}
          </p>
        </div>
      </section>

      {/* História + números */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {sobre.historia.titulo}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              {sobre.historia.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ImageSlot
              src="/fotos/sobre.jpg"
              alt="{{PREENCHER: foto da fachada, do escritório ou da equipe da CNC}}"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full rounded-sm shadow-xl shadow-brand-900/10"
            />
          </Reveal>
        </div>

        <div className="container-cnc mt-16">
          <dl className="grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {sobre.numeros.map((n) => (
              <div key={n.label} className="bg-paper-soft p-8 text-center">
                <dt className="sr-only">{n.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold text-brand-800">
                    {n.valor}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {n.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Equipe */}
      <section className="bg-paper-soft py-20 lg:py-28">
        <div className="container-cnc">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-3">Equipe</p>
            <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {sobre.equipe.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {sobre.equipe.texto}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sobre.equipe.membros.map((m, i) => (
              <Reveal
                as="article"
                key={i}
                delay={i * 90}
                className="overflow-hidden rounded-sm border border-ink/10 bg-paper"
              >
                <ImageSlot
                  src={m.foto}
                  alt={`{{PREENCHER: foto de ${m.nome}}}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[4/5] w-full"
                />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-brand-800">
                    {m.nome}
                  </h3>
                  <p className="text-sm text-ink-muted">{m.cargo}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dados legais visíveis */}
      <section className="bg-paper py-16">
        <div className="container-cnc">
          <div className="rounded-sm border border-ink/10 bg-paper-soft/50 p-8">
            <h2 className="font-display text-xl font-semibold text-brand-800">
              Dados da empresa
            </h2>
            <dl className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  Razão social
                </dt>
                <dd className="mt-1 text-sm text-ink-soft">
                  {site.nomeCompleto}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  CNPJ
                </dt>
                <dd className="mt-1 text-sm text-ink-soft">{site.cnpj}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  Endereço
                </dt>
                <dd className="mt-1 text-sm text-ink-soft">
                  {e.logradouro}, {e.bairro} — {e.cidade}/{e.uf}, CEP {e.cep}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-16 text-paper lg:py-20">
        <div className="container-cnc flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-paper sm:text-4xl">
            Vamos conversar sobre o seu negócio?
          </h2>
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
