import Link from "next/link";

/**
 * Layout ISOLADO da futura área logada do cliente.
 *
 * Propositalmente separado do site institucional (route group próprio): aqui NÃO
 * entram o header/footer públicos. Esta casca minimalista é o ponto de partida
 * para a evolução futura.
 *
 * // FUTURO: aqui entrará a verificação de sessão/autenticação (ex.: middleware
 * //         de auth, provider de sessão, redirect para /area-do-cliente/login).
 * // FUTURO: layout autenticado com navegação da área do cliente (segunda via de
 * //         boleto, dados cadastrais, chamados de suporte).
 */
export default function AreaClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-ink/10">
        <div className="container-cnc flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-semibold text-brand-800"
          >
            CNC
          </Link>
          <Link
            href="/"
            className="text-sm text-ink-muted hover:text-brand-700"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        {children}
      </main>
    </div>
  );
}
