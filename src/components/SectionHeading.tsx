import Reveal from "./Reveal";

/** Cabeçalho de seção no estilo editorial: eyebrow + título serifado + apoio. */
export default function SectionHeading({
  eyebrow,
  titulo,
  texto,
  centered = false,
  className = "",
}: {
  eyebrow?: string;
  titulo: string;
  texto?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {titulo}
      </h2>
      {texto && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{texto}</p>
      )}
    </Reveal>
  );
}
