import LinkContato from "./LinkContato";
import StatusAtendimento from "./StatusAtendimento";
import IconeWhatsApp from "./IconeWhatsApp";
import { site } from "@/content/site";
import type { OrigemContato } from "@/lib/analytics";

/**
 * Fechamento das páginas: faixa amarela de etiqueta, inteira, com o convite
 * ao WhatsApp em letra de letreiro. O convite é o próprio link, o maior alvo
 * de clique do site, e a seta corre no hover.
 *
 * `titulo` é o h2 da seção (o assunto da página); o texto grande é a ação.
 */
export default function FaixaContato({
  titulo,
  texto,
  origem,
}: {
  titulo: string;
  texto: string;
  origem: OrigemContato;
}) {
  return (
    <section data-sem-flutuante="" className="relative z-10 bg-signal-500 py-20 text-ink lg:py-32">
      <div className="container-cnc">
        <h2 className="text-lg font-semibold sm:text-xl">{titulo}</h2>
        <LinkContato
          origem={origem}
          className="larga group mt-4 block text-[clamp(2.6rem,8.2vw,7.8rem)]"
        >
          Chama no WhatsApp
          <span
            aria-hidden="true"
            className="ml-[0.25em] inline-flex h-[0.8em] w-[0.8em] translate-y-[0.08em] items-center justify-center rounded-full bg-ink align-baseline text-signal-500 transition-transform duration-500 ease-expo group-hover:translate-x-3 group-hover:-rotate-45"
          >
            <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </LinkContato>

        <div className="mt-12 grid gap-8 border-t border-ink/20 pt-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-ink/80">{texto}</p>
          <div className="flex flex-col gap-3 md:items-end">
            <StatusAtendimento tom="sinal" />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold">
              <LinkContato origem={origem} className="inline-flex items-center gap-2 tabular-nums underline-offset-4 hover:underline">
                <IconeWhatsApp className="h-4 w-4" />
                {site.whatsapp.exibicao}
              </LinkContato>
              <LinkContato origem={origem} canal="telefone" className="tabular-nums underline-offset-4 hover:underline">
                Ligar agora
              </LinkContato>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
