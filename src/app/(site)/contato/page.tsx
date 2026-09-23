import type { Metadata } from "next";
import { site } from "@/content/site";
import LinkContato from "@/components/LinkContato";
import StatusAtendimento from "@/components/StatusAtendimento";
import PlacasCidades from "@/components/PlacasCidades";

export const metadata: Metadata = {
  title: "Contato da CNC Sistemas em Maceió, WhatsApp e telefone",
  // Busca por contato é intenção máxima, e quem pesquisa isso quer o número e
  // o horário na própria lista de resultados, sem abrir a página.
  description:
    "Fale com a CNC Sistemas no WhatsApp ou no telefone (82) 99366-0508, todos os dias das 6h às 22h. Atendimento para o comércio de Maceió e do interior de Alagoas.",
  alternates: { canonical: "/contato" },
};

/**
 * ContatoPage — rota "/contato".
 *
 * Quem abre esta página quer o número, então o número é o título: em escala de
 * placa, clicável, com o status de atendimento ao vivo embaixo. Endereço e
 * horário vão numa ficha ao lado.
 *
 * Rodada de 23/09/2026: saiu o iframe do Google Maps, que apontava para o
 * Brasil inteiro (o ponto exato não é exposto, por privacidade) e por isso não
 * informava nada e ainda pesava a página. Entraram as placas das cidades onde
 * a CNC já atende, que respondem o que o mapa deveria responder.
 * O texto antigo convidava a mandar e-mail, que está oculto no site.
 *
 * Sem movimento: é página de ação, o conteúdo entra parado.
 */
export default function ContatoPage() {
  const e = site.endereco;

  return (
    <>
      <section className="border-b-2 border-ink bg-paper">
        <div className="container-cnc grid gap-12 pb-12 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-16 lg:pb-20 lg:pt-16">
          <div>
            <h1 className="text-lg font-bold text-ink-soft">
              Fale com a CNC no WhatsApp ou por telefone
            </h1>
            <LinkContato
              origem="contato"
              className="mt-4 block w-fit whitespace-nowrap text-[clamp(2.2rem,8.5vw,5.25rem)] font-extrabold leading-none tracking-tightest tabular-nums text-ink transition-colors hover:text-brand-700"
            >
              {site.whatsapp.exibicao}
            </LinkContato>
            <StatusAtendimento className="mt-6" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkContato origem="contato" className="btn-primary min-h-[48px] px-8">
                Chamar no WhatsApp
              </LinkContato>
              <LinkContato
                origem="contato"
                canal="telefone"
                className="btn-secondary min-h-[48px] px-8"
              >
                Ligar agora
              </LinkContato>
            </div>
          </div>

          <dl className="border-t-2 border-ink">
            <div className="flex justify-between gap-6 border-b border-ink/15 py-4">
              <dt className="text-sm font-semibold text-ink-soft">Horário</dt>
              <dd className="text-right text-base text-ink">
                {site.horario.semana}
                <br />
                <span className="text-ink-soft">{site.horario.sabado}</span>
              </dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-ink/15 py-4">
              <dt className="text-sm font-semibold text-ink-soft">Endereço</dt>
              <dd className="text-right text-base text-ink">
                {e.logradouro}, {e.bairro}
                <br />
                {e.cidade}/{e.uf}, CEP <span className="dado text-base">{e.cep}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-cnc">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl lg:text-5xl">
            Onde a CNC já atende
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Cidades de Alagoas onde a CNC já tem cliente. A sua não está aqui? Chama no WhatsApp
            que a gente vê o deslocamento.
          </p>
          <PlacasCidades className="mt-10" />
        </div>
      </section>
    </>
  );
}
