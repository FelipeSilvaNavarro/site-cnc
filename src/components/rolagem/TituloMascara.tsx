import { Fragment, createElement } from "react";

/**
 * Título que sobe palavra por palavra de trás de uma máscara no carregamento.
 *
 * Só CSS (`animate-linha-sobe` com atraso por palavra), então roda no primeiro
 * quadro pintado, sem esperar o JavaScript hidratar, e o título continua
 * sendo texto de verdade para o Google e para leitor de tela. A máscara tem
 * folga embaixo para não cortar a perna do g e do ç.
 */
export default function TituloMascara({
  texto,
  as = "h1",
  className = "",
  atrasoInicial = 0.15,
  passo = 0.045,
}: {
  texto: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  atrasoInicial?: number;
  passo?: number;
}) {
  const palavras = texto.split(" ");
  return createElement(
    as,
    { className },
    palavras.map((p, i) => (
      <Fragment key={i}>
        <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          <span
            className="inline-block animate-linha-sobe"
            style={{ animationDelay: `${atrasoInicial + i * passo}s` }}
          >
            {p}
          </span>
        </span>
        {i < palavras.length - 1 ? " " : null}
      </Fragment>
    )),
  );
}
