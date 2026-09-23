import Link from "next/link";
import { navPrincipal, site } from "@/content/site";
import LinkContato from "./LinkContato";
import { BotaoCookies } from "./AvisoCookies";
import { medicaoAtiva } from "@/lib/analytics";

/**
 * Footer — rodapé global do site institucional (renderizado pelo layout de
 * `(site)`). Quatro colunas: identidade, navegação (de `navPrincipal` + Área do
 * cliente), contato (WhatsApp/telefone, e-mail oculto) e endereço mais o
 * horário de atendimento. A barra inferior mostra razão social, CNPJ e o ano.
 */
export default function Footer() {
  const ano = new Date().getFullYear();
  const e = site.endereco;

  return (
    <footer className="bg-brand-900 text-paper/80">
      {/* O número em escala de placa: é o único dado do rodapé que alguém
          procura, então ele abre o rodapé em vez de ficar numa coluna. */}
      <div className="border-b border-paper/15">
        <div className="container-cnc py-12 lg:py-16">
          <p className="text-sm font-semibold text-brand-200">
            WhatsApp e telefone, {site.horario.semana.toLowerCase()}
          </p>
          <LinkContato
            origem="rodape"
            className="mt-3 block w-fit text-[clamp(2.2rem,8.5vw,7.5rem)] font-extrabold leading-none tracking-tightest text-paper transition-colors hover:text-signal-500"
          >
            {site.whatsapp.exibicao}
          </LinkContato>
        </div>
      </div>
      <div className="container-cnc grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Identidade */}
        <div className="lg:col-span-1">
          <span className="text-2xl font-extrabold tracking-tightest text-paper">
            CNC
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
            {site.descricaoCurta}
          </p>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé">
          <h2 className="label-dado text-paper">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navPrincipal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-paper/70 transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/area-do-cliente"
                className="text-paper/70 transition-colors hover:text-paper"
              >
                Área do cliente
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contato */}
        <div>
          <h2 className="label-dado text-paper">Contato</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-200">
            <li>
              <LinkContato
                origem="rodape"
                className="transition-colors hover:text-paper"
              >
                WhatsApp: {site.whatsapp.exibicao}
              </LinkContato>
            </li>
            <li>
              <LinkContato
                origem="rodape"
                canal="telefone"
                className="transition-colors hover:text-paper"
              >
                Telefone: {site.telefone.exibicao}
              </LinkContato>
            </li>
            <li>
              <a
                href={site.googleAvaliacao}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                Avaliar a CNC no Google
              </a>
            </li>
            {/* E-mail OCULTO por enquanto (conta contato@ a criar no Zoho).
                Para reativar, descomente este bloco. */}
            {/* <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-paper"
              >
                {site.email}
              </a>
            </li> */}
          </ul>
        </div>

        {/* Endereço */}
        <div>
          <h2 className="label-dado text-paper">Endereço</h2>
          <address className="mt-4 space-y-1 text-sm not-italic text-brand-200">
            <p>{e.logradouro}</p>
            <p>
              {e.bairro} — {e.cidade}/{e.uf}
            </p>
            {/* Dado real: CEP e horário em mono. */}
            <p className="dado">CEP {e.cep}</p>
            <p className="dado pt-2">{site.horario.semana}</p>
          </address>
        </div>
      </div>

      {/* Barra inferior: dados legais + link discreto de parceria */}
      <div className="border-t border-paper/15">
        <div className="container-cnc flex flex-col gap-3 py-6 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.nomeCompleto} — CNPJ <span className="dado">{site.cnpj}</span>
          </p>
          <div className="flex items-center gap-4">
            {medicaoAtiva && <BotaoCookies />}
            <span>© {ano} CNC. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
