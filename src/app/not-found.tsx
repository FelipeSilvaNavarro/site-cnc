import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="eyebrow mb-4">Erro 404</p>
      <h1 className="font-serif text-4xl font-semibold text-brand-800">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Voltar para o início
      </Link>
    </div>
  );
}
