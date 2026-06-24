import Link from "next/link";
import { navPrincipal, site, whatsappLink } from "@/content/site";

export default function Footer() {
  const ano = new Date().getFullYear();
  const e = site.endereco;

  return (
    <footer className="border-t border-ink/10 bg-brand-900 text-paper/80">
      <div className="container-cnc grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Identidade */}
        <div className="lg:col-span-1">
          <span className="font-display text-2xl font-semibold text-paper">
            CNC
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            {site.descricaoCurta}
          </p>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Navegação
          </h2>
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
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Contato
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-paper/70">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                WhatsApp: {site.whatsapp.exibicao}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.telefone.numero}`}
                className="transition-colors hover:text-paper"
              >
                Telefone: {site.telefone.exibicao}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-paper"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Endereço */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Endereço
          </h2>
          <address className="mt-4 space-y-1 text-sm not-italic text-paper/70">
            <p>{e.logradouro}</p>
            <p>
              {e.bairro} — {e.cidade}/{e.uf}
            </p>
            <p>CEP {e.cep}</p>
            <p className="pt-2">{site.horario.semana}</p>
          </address>
        </div>
      </div>

      {/* Barra inferior: dados legais + link discreto de parceria */}
      <div className="border-t border-paper/10">
        <div className="container-cnc flex flex-col gap-3 py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.nomeCompleto} — CNPJ {site.cnpj}
          </p>
          <div className="flex items-center gap-4">
            <span>© {ano} CNC. Todos os direitos reservados.</span>
            {/* Parceria é secundária: link discreto apenas aqui. */}
            <Link
              href="/seja-parceiro"
              className="text-paper/40 underline-offset-2 transition-colors hover:text-paper/80 hover:underline"
            >
              Seja parceiro
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
