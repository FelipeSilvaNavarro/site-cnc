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
      {/* Cabeçalho — apertado */}
      <section className="border-b border-ink/10 bg-paper py-14 lg:py-16">
        <div className="container-cnc max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
            {sobre.titulo}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {sobre.intro}
          </p>
        </div>
      </section>

      {/* História + números — generoso */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-cnc grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
              {sobre.historia.titulo}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              {sobre.historia.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <ImageSlot
            src="/fotos/sobre.jpg"
            alt="CNC — atendimento e suporte a sistemas de gestão"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full"
          />
        </div>

        {/* Números: faixa tinta, mesma linguagem da prova social da home.
            Único momento de movimento da página. */}
        <div className="container-cnc mt-16">
          <Reveal>
            <dl className="grid gap-px bg-paper/20 sm:grid-cols-3">
              {sobre.numeros.map((n) => (
                <div key={n.label} className="bg-ink p-8">
                  <dt className="label-dado text-paper/60">{n.label}</dt>
                  <dd className="dado mt-2 text-4xl font-medium leading-none text-paper">
                    {n.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Equipe (oculta enquanto não houver membros cadastrados) */}
      {sobre.equipe.membros.length > 0 && (
      <section className="bg-paper-soft py-20 lg:py-28">
        <div className="container-cnc">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
              {sobre.equipe.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {sobre.equipe.texto}
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sobre.equipe.membros.map((m, i) => (
              <article key={i}>
                <ImageSlot
                  src={m.foto}
                  alt={`{{PREENCHER: foto de ${m.nome}}}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[4/5] w-full"
                />
                <h3 className="mt-3 text-lg font-bold tracking-tightest text-ink">
                  {m.nome}
                </h3>
                <p className="text-sm text-ink-muted">{m.cargo}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Dados legais — ficha técnica: rótulo em peso alto, valor em mono. */}
      <section className="border-t border-ink/10 bg-paper-soft py-14">
        <div className="container-cnc">
          <h2 className="text-xl font-bold tracking-tightest text-ink">
            Dados da empresa
          </h2>
          <dl className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-t-2 border-ink pt-3">
              <dt className="label-dado text-ink">Razão social</dt>
              <dd className="mt-1 text-sm text-ink-soft">
                {site.nomeCompleto}
              </dd>
            </div>
            <div className="border-t-2 border-ink pt-3">
              <dt className="label-dado text-ink">CNPJ</dt>
              <dd className="dado mt-1 text-ink-soft">{site.cnpj}</dd>
            </div>
            <div className="border-t-2 border-ink pt-3">
              <dt className="label-dado text-ink">Endereço</dt>
              <dd className="mt-1 text-sm text-ink-soft">
                {e.logradouro}, {e.bairro} — {e.cidade}/{e.uf}, CEP{" "}
                <span className="dado">{e.cep}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-16 text-paper lg:py-20">
        <div className="container-cnc flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tightest text-paper sm:text-4xl">
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
