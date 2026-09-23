import Link from "next/link";
import { navPrincipal, site } from "@/content/site";
import LinkContato from "./LinkContato";
import { BotaoCookies } from "./AvisoCookies";
import { medicaoAtiva } from "@/lib/analytics";

/**
 * Rodapé — cor da noite, quatro colunas (a marca, navegação, contato e
 * endereço) e o nome "CNC Sistemas" em letra de letreiro ocupando a largura
 * inteira, cortado pela borda de baixo como fachada vista da calçada.
 *
 * A barra inferior leva razão social, CNPJ, o ano gerado e as preferências de
 * cookies. O telefone gigante que abria o rodapé saiu em 23/09/2026, porque
 * a faixa amarela logo acima já faz esse papel.
 */
export default function Footer() {
  const ano = new Date().getFullYear();
  const e = site.endereco;

  return (
    <footer className="grao relative overflow-hidden bg-noite text-papel/70">
      <div className="container-cnc relative z-[2] grid gap-12 pb-16 pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <p className="semilarga text-2xl text-papel">CNC Sistemas</p>
          <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed">{site.descricaoCurta}</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-sm font-semibold text-papel">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {navPrincipal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-papel">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/area-do-cliente" className="transition-colors hover:text-papel">
                Área do cliente
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-papel">Contato</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li>
              <LinkContato origem="rodape" className="tabular-nums transition-colors hover:text-papel">
                WhatsApp {site.whatsapp.exibicao}
              </LinkContato>
            </li>
            <li>
              <LinkContato origem="rodape" canal="telefone" className="tabular-nums transition-colors hover:text-papel">
                Telefone {site.telefone.exibicao}
              </LinkContato>
            </li>
            <li>
              <a
                href={site.googleAvaliacao}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-papel"
              >
                Avaliar a CNC no Google
              </a>
            </li>
            {/* E-mail OCULTO por decisão do Felipe (23/09/2026): a conta
                contato@ ainda não existe. Valor em site.email. */}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-papel">Endereço</h2>
          <address className="mt-4 space-y-1 text-[0.95rem] not-italic leading-relaxed">
            <p>{e.logradouro}</p>
            <p>
              {e.bairro}, {e.cidade}/{e.uf}
            </p>
            <p>
              CEP <span className="dado text-[0.95rem]">{e.cep}</span>
            </p>
            <p className="pt-3 text-papel">{site.horario.semana}</p>
          </address>
        </div>
      </div>

      <div className="container-cnc relative z-[2]">
        <div className="flex flex-col gap-3 border-t border-papel/10 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.nomeCompleto}, CNPJ <span className="dado">{site.cnpj}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {medicaoAtiva && <BotaoCookies />}
            <span>© {ano} CNC Sistemas</span>
          </div>
        </div>
      </div>

      {/* A marca como fachada: letra de letreiro cortada pela borda de baixo. */}
      <p
        aria-hidden="true"
        className="larga relative z-[2] -mb-[0.2em] select-none whitespace-nowrap text-center text-[11vw] leading-[0.8] text-papel/[0.06]"
      >
        CNC Sistemas
      </p>
    </footer>
  );
}
