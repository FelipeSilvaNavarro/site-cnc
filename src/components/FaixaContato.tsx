import CtaButtons from "./CtaButtons";
import StatusAtendimento from "./StatusAtendimento";
import type { OrigemContato } from "@/lib/analytics";

/**
 * Faixa azul que fecha as páginas: título, texto, status de atendimento ao vivo
 * e o par de botões. Uma só, para as páginas fecharem do mesmo jeito.
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
    <section className="bg-brand-800 py-20 text-paper lg:py-28">
      <div className="container-cnc flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tightest text-paper sm:text-5xl lg:text-6xl">
            {titulo}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">{texto}</p>
          <StatusAtendimento tom="escuro" className="mt-6" />
        </div>
        <CtaButtons
          primario="Falar no WhatsApp"
          secundario="Pedir orçamento"
          origem={origem}
          variant="dark"
        />
      </div>
    </section>
  );
}
