import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato — fale com a CNC",
  description:
    "Fale com a CNC: WhatsApp, telefone, e-mail e endereço. Atendimento humanizado e direto para o seu negócio.",
  alternates: { canonical: "/contato" },
};

/**
 * ContatoPage — rota "/contato".
 *
 * Lista os canais de atendimento (WhatsApp e telefone; e-mail oculto), o
 * endereço cadastral e o horário 24/7, e mostra um mapa. Enquanto
 * `mapsEmbedUrl` estiver com placeholder `{{PREENCHER`, exibe um slot; caso
 * contrário renderiza o iframe (hoje um mapa genérico do Brasil, por privacidade).
 */
export default function ContatoPage() {
  const e = site.endereco;
  // Mostra o slot do mapa enquanto a URL de embed não estiver definida.
  const mapaInvalido = e.mapsEmbedUrl.startsWith("{{PREENCHER");

  return (
    <>
      <section className="border-b border-ink/10 bg-paper-soft py-16 lg:py-20">
        <div className="container-cnc max-w-3xl">
          <p className="eyebrow mb-4">Contato</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Fale com a CNC
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Atendimento humanizado e direto. Chame no WhatsApp, ligue ou mande
            um e-mail. A gente responde rápido.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-cnc grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Canais */}
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">
              Canais de atendimento
            </h2>
            <ul className="mt-6 space-y-5">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-sm border border-ink/10 p-5 transition-colors hover:border-brand-700/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                    WhatsApp
                  </span>
                  <span className="ml-auto text-base font-medium text-brand-700 group-hover:underline">
                    {site.whatsapp.exibicao}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.telefone.numero}`}
                  className="group flex items-start gap-4 rounded-sm border border-ink/10 p-5 transition-colors hover:border-brand-700/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                    Telefone
                  </span>
                  <span className="ml-auto text-base font-medium text-brand-700 group-hover:underline">
                    {site.telefone.exibicao}
                  </span>
                </a>
              </li>
              {/* E-mail OCULTO por enquanto (conta contato@ a criar no Zoho).
                  Para reativar, descomente este bloco. */}
              {/* <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-start gap-4 rounded-sm border border-ink/10 p-5 transition-colors hover:border-brand-700/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                    E-mail
                  </span>
                  <span className="ml-auto text-base font-medium text-brand-700 group-hover:underline">
                    {site.email}
                  </span>
                </a>
              </li> */}
            </ul>

            <h2 className="mt-10 text-2xl font-semibold text-ink">
              Endereço e horário
            </h2>
            <address className="mt-4 space-y-1 text-base not-italic leading-relaxed text-ink-soft">
              <p>{e.logradouro}</p>
              <p>
                {e.bairro} — {e.cidade}/{e.uf}
              </p>
              <p>CEP {e.cep}</p>
            </address>
            {/* Atendimento 24/7 (valores em site.horario). */}
            <dl className="mt-4 space-y-1 text-sm text-ink-soft">
              <div className="flex gap-2">
                <dt className="font-semibold text-ink">Atendimento:</dt>
                <dd>{site.horario.semana}</dd>
              </div>
              <div className="flex gap-2">
                <dd>{site.horario.sabado}</dd>
              </div>
            </dl>
          </Reveal>

          {/* Mapa */}
          <Reveal delay={100}>
            <div className="h-full min-h-[360px] overflow-hidden rounded-sm border border-ink/10 bg-paper-dark">
              {mapaInvalido ? (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center p-8 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                    Slot do mapa
                  </span>
                  <span className="mt-2 text-sm text-ink-muted">
                    {/* FUTURO/PREENCHER: definir site.endereco.mapsEmbedUrl */}
                    Definir a URL de embed do Google Maps em
                    <br />
                    <code className="text-xs">content/site.ts</code> →{" "}
                    <code className="text-xs">endereco.mapsEmbedUrl</code>
                  </span>
                  <a
                    href={
                      e.mapsLinkUrl.startsWith("{{PREENCHER")
                        ? "#"
                        : e.mapsLinkUrl
                    }
                    className="mt-4 text-sm font-semibold text-brand-700 hover:underline"
                  >
                    Abrir no Google Maps
                  </a>
                </div>
              ) : (
                <iframe
                  title={`Mapa da CNC em ${site.cidade}/${site.uf}`}
                  src={e.mapsEmbedUrl}
                  className="h-full min-h-[360px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
