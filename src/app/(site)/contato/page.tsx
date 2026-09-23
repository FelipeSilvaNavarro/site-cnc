import type { Metadata } from "next";
import { site } from "@/content/site";
import { sistemas, recursosComuns } from "@/content/sistemas";
import { perguntasFrequentes } from "@/content/home";
import LinkContato from "@/components/LinkContato";
import StatusAtendimento from "@/components/StatusAtendimento";
import IconeWhatsApp from "@/components/IconeWhatsApp";
import TopoComFolha from "@/components/rolagem/TopoComFolha";
import TituloMascara from "@/components/rolagem/TituloMascara";
import PegasoTraco from "@/components/rolagem/PegasoTraco";
import FaixaCidades from "@/components/rolagem/FaixaCidades";

export const metadata: Metadata = {
  title: "Contato da CNC Sistemas em Maceió, WhatsApp e telefone",
  // Busca por contato é intenção máxima: o número e o horário já na lista de
  // resultados, sem precisar abrir a página.
  description:
    "Fale com a CNC Sistemas no WhatsApp ou no telefone (82) 99366-0508, todos os dias das 6h às 22h. Atendimento para o comércio de Maceió e do interior de Alagoas.",
  alternates: { canonical: "/contato" },
};

/** As perguntas que quem vai chamar faz antes de chamar. */
const PERGUNTAS_DO_CONTATO = [
  "Qual o horário de atendimento?",
  "Preciso abrir chamado para ter suporte?",
  "O técnico vai até a minha loja?",
];

/**
 * ContatoPage — rota "/contato".
 *
 * Quem abre esta página quer o número, então o número é o título do topo, em
 * letra de letreiro e clicável, com o status ao vivo e os dois botões. Na
 * folha, horário e endereço, e as três perguntas que se faz antes de chamar;
 * depois, as cidades onde a CNC já atende. O mapa do Google saiu em
 * 23/09/2026: apontava para o Brasil inteiro (o ponto exato não é exposto) e
 * não informava nada.
 */
export default function ContatoPage() {
  const e = site.endereco;
  const perguntas = perguntasFrequentes({
    horario: site.horario.semana,
    cidades: site.cidadesAtendidas,
    portes: sistemas.map((s) => ({ nome: s.nome, resumo: s.resumo })),
    notas: recursosComuns.texto,
  }).filter((f) => PERGUNTAS_DO_CONTATO.includes(f.pergunta));

  return (
    <>
      <TopoComFolha
        altura="h-[88svh] min-h-[560px]"
        topo={
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 85% 30%, rgba(43,87,196,0.34) 0%, rgba(43,87,196,0.06) 50%, transparent 72%)",
              }}
            />
            <div
              data-topo-fundo=""
              className="absolute -right-[38%] top-[10%] w-[110vw] opacity-60 sm:-right-[20%] sm:w-[70vw] lg:-right-[8%] lg:top-[4%] lg:w-[44vw] lg:max-w-[760px]"
            >
              <PegasoTraco className="h-auto w-full" />
            </div>
            <div
              data-topo-conteudo=""
              className="container-cnc relative z-[2] flex h-full origin-bottom flex-col justify-end pb-10 pt-28 lg:pb-16"
            >
              <h1 className="max-w-md text-lg font-semibold text-papel/70 sm:text-xl">
                Fale com a CNC no WhatsApp ou por telefone
              </h1>
              <LinkContato origem="contato" className="mt-3 block w-fit hover:text-signal-500">
                <TituloMascara
                  as="p"
                  texto={site.whatsapp.exibicao}
                  atrasoInicial={0.2}
                  passo={0.09}
                  className="larga whitespace-nowrap text-[clamp(2.3rem,8.4vw,7.4rem)] tabular-nums"
                />
              </LinkContato>
              <div
                className="mt-7 w-fit animate-some-entra rounded-full bg-papel/10 px-4 py-2 ring-1 ring-papel/15"
                style={{ animationDelay: "0.6s" }}
              >
                <StatusAtendimento tom="escuro" />
              </div>
              <div
                className="mt-8 flex animate-some-entra flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "0.75s" }}
              >
                <LinkContato origem="contato" className="btn-primary pr-3">
                  Chamar no WhatsApp
                  <span className="btn-seta" aria-hidden="true">
                    <IconeWhatsApp className="h-3.5 w-3.5" />
                  </span>
                </LinkContato>
                <LinkContato origem="contato" canal="telefone" className="btn-ghost-dark">
                  Ligar agora
                </LinkContato>
              </div>
            </div>
          </>
        }
      >
        <div className="container-cnc grid gap-12 pb-24 pt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:pb-36 lg:pt-28">
          <div className="flex flex-col gap-3">
            <div className="rounded-cartao bg-noite p-7 text-papel sm:p-8">
              <p className="text-sm font-semibold text-papel/60">Horário</p>
              <p className="semilarga mt-3 text-2xl">{site.horario.semana}</p>
              <p className="mt-1 text-papel/70">{site.horario.sabado}</p>
            </div>
            <div className="rounded-cartao bg-papel-claro p-7 ring-1 ring-ink/10 sm:p-8">
              <p className="text-sm font-semibold text-ink-muted">Endereço</p>
              <address className="mt-3 text-lg not-italic leading-relaxed text-ink">
                {e.logradouro}, {e.bairro}
                <br />
                {e.cidade}/{e.uf}, CEP <span className="dado text-[1.05rem]">{e.cep}</span>
              </address>
            </div>
          </div>

          <div>
            <h2 className="larga text-[clamp(2.1rem,4.4vw,4rem)] text-ink">Antes de chamar</h2>
            <dl className="mt-10 flex flex-col gap-8">
              {perguntas.map((f) => (
                <div key={f.pergunta} className="border-t border-ink/15 pt-6">
                  <dt className="semilarga text-[clamp(1.3rem,2vw,1.7rem)] text-ink">{f.pergunta}</dt>
                  <dd className="mt-3 max-w-xl text-lg leading-relaxed text-ink-soft">{f.resposta}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </TopoComFolha>

      <FaixaCidades />
    </>
  );
}
