/**
 * Cabeçalho de seção: título + texto de apoio.
 *
 * Sem rótulo superior ("eyebrow") de propósito: a separação entre seções vem do
 * espaçamento e do peso tipográfico, não de um rótulo repetido em toda seção.
 *
 * Também sem `Reveal`: cabeçalho de seção animado em toda seção era metade do
 * movimento reflexo do site. A entrada agora é escolhida caso a caso.
 */
export default function SectionHeading({
  titulo,
  texto,
  centered = false,
  className = "",
}: {
  titulo: string;
  texto?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
        {titulo}
      </h2>
      {texto && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{texto}</p>
      )}
    </div>
  );
}
