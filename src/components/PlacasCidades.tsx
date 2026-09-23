import { site } from "@/content/site";

/**
 * Placas de cidade — a cobertura da CNC como placa de estrada azul com filete
 * branco por dentro, uma por cidade de `site.cidadesAtendidas`.
 *
 * A grade é de 4 colunas com a base (Maceió) ocupando 2x2, o que fecha 12
 * cidades em fileiras cheias. Mudando a quantidade de cidades, conferir se a
 * última fileira não fica com uma placa sozinha.
 */
export default function PlacasCidades({ className = "" }: { className?: string }) {
  const [base, ...outras] = site.cidadesAtendidas;
  return (
    <ul className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
      <li className="col-span-2 flex min-h-[7.5rem] flex-col justify-between bg-brand-700 p-5 text-paper outline outline-2 outline-offset-[-7px] outline-paper sm:col-span-3 lg:col-span-2 lg:row-span-2">
        <span className="text-xs font-semibold text-brand-100">Base</span>
        <span className="text-4xl font-extrabold tracking-tightest lg:text-6xl">{base}</span>
      </li>
      {outras.map((cidade) => (
        <li
          key={cidade}
          className="flex min-h-[4.5rem] items-end bg-brand-700 px-4 py-3.5 text-base font-bold leading-tight text-paper outline outline-2 outline-offset-[-6px] outline-paper/85"
        >
          {cidade}
        </li>
      ))}
    </ul>
  );
}
