import LinkContato from "./LinkContato";
import StatusAtendimento from "./StatusAtendimento";
import { site } from "@/content/site";
import type { OrigemContato } from "@/lib/analytics";

/**
 * Ficha de atendimento — a placa escura de rótulo e dado.
 *
 * Nasceu no hero da home para ocupar o lugar da foto que ainda não existe, e
 * serve também ao topo de Suporte e de Contato. Em vez de esperar a foto, mostra
 * o que a pessoa vai perguntar no WhatsApp: se tem alguém atendendo, em que
 * horário, até onde o técnico vai e quanto custa. Tudo vem de `site.ts`.
 *
 * `origem` separa no relatório o clique no número desta ficha de cada página.
 */
export default function FichaAtendimento({
  titulo = "Atendimento CNC",
  origem,
  preco = true,
  className = "",
}: {
  titulo?: string;
  origem: OrigemContato;
  preco?: boolean;
  className?: string;
}) {
  const linhas: [string, React.ReactNode][] = [
    ["Horário", "Todos os dias, 6h às 22h"],
    [
      "WhatsApp",
      <LinkContato
        key="w"
        origem={origem}
        className="font-semibold tabular-nums underline-offset-4 hover:underline"
      >
        {site.whatsapp.exibicao}
      </LinkContato>,
    ],
    [
      "Telefone",
      <LinkContato
        key="t"
        origem={origem}
        canal="telefone"
        className="font-semibold tabular-nums underline-offset-4 hover:underline"
      >
        {site.telefone.exibicao}
      </LinkContato>,
    ],
    [
      "Técnico na loja",
      `${site.cidadesAtendidas[0]} e mais ${site.cidadesAtendidas.length - 1} cidades`,
    ],
  ];
  if (preco) {
    linhas.push([
      "A partir de",
      <span key="p" className="font-bold text-signal-500">
        {site.precos.pisoMensalPorExtenso}
      </span>,
    ]);
  }

  return (
    <div className={`bg-ink text-paper ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-paper/15 px-6 py-5">
        <p className="text-lg font-extrabold tracking-tightest">{titulo}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pegaso-branco.svg"
          alt=""
          aria-hidden="true"
          width={32}
          height={28}
          className="h-7 w-auto opacity-80"
        />
      </div>
      <dl className="divide-y divide-paper/15 px-6">
        {linhas.map(([rotulo, valor]) => (
          <div key={rotulo} className="flex items-baseline justify-between gap-6 py-4">
            <dt className="text-sm text-paper/70">{rotulo}</dt>
            <dd className="text-right text-sm text-paper">{valor}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t-2 border-signal-500 px-6 py-5">
        <StatusAtendimento tom="escuro" />
      </div>
    </div>
  );
}
