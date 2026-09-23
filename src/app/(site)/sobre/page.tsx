import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import FaixaContato from "@/components/FaixaContato";
import { fotoExiste } from "@/lib/fotos";
import { sobre } from "@/content/sobre";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre a CNC Sistemas, empresa de Maceió desde 2020",
  // Esta página existe para quem está conferindo se a empresa é real antes de
  // fechar, então a descrição adianta o que ele procura: tempo de casa,
  // tamanho da base e CNPJ aberto.
  description:
    "A CNC Sistemas atende o comércio de Maceió e do interior de Alagoas desde 2020, com CNPJ aberto, endereço na cidade e nota 5,0 no Google. Quem atende é quem conhece a sua operação.",
  alternates: { canonical: "/sobre" },
};

/**
 * SobrePage — rota "/sobre".
 *
 * Quem abre esta página está conferindo se a empresa existe antes de fechar.
 * Rodada de 23/09/2026: a faixa de três números em caixas (o molde de métrica
 * de SaaS) e o bloco de dados legais escondido no fim viraram uma ficha só,
 * a "ficha da empresa", com tudo o que se confere: desde quando, quantos
 * clientes, nota no Google com link, razão social, CNPJ e endereço.
 *
 * Sem movimento: é página de conferência, o conteúdo entra parado.
 */
export default function SobrePage() {
  const e = site.endereco;
  const temFoto = fotoExiste("/fotos/sobre.jpg");
  const [abertura, ...resto] = sobre.historia.paragrafos;

  const ficha: [string, React.ReactNode][] = [
    ["Em atividade desde", <span key="a" className="tabular-nums">2020, em Maceió</span>],
    [
      "Clientes ativos",
      <span key="c" className="tabular-nums">{site.numeros.clientesAtivos} comércios</span>,
    ],
    [
      "Nota no Google",
      <a
        key="g"
        href={site.googleAvaliacao}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-brand-400 decoration-2 underline-offset-4 hover:text-brand-700"
      >
        {site.numeros.notaGoogle} em {site.numeros.avaliacoesGoogle} avaliações
      </a>,
    ],
    ["Razão social", site.nomeCompleto],
    ["CNPJ", <span key="j" className="dado text-base">{site.cnpj}</span>],
    [
      "Endereço",
      <span key="e">
        {e.logradouro}, {e.bairro}, {e.cidade}/{e.uf}, CEP{" "}
        <span className="dado text-base">{e.cep}</span>
      </span>,
    ],
  ];

  return (
    <>
      <section className="border-b-2 border-ink bg-paper">
        <div className="container-cnc pb-12 pt-10 lg:pb-16 lg:pt-16">
          <h1 className="max-w-[20ch] text-[clamp(2.1rem,5vw,4.4rem)] font-extrabold leading-[1] tracking-tightest text-ink">
            {sobre.titulo}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft">{sobre.intro}</p>
        </div>
      </section>

      {/* História: o primeiro parágrafo em escala de abertura, o resto corrido. */}
      <section className="bg-paper py-16 lg:py-24">
        <div
          className={`container-cnc grid gap-12 ${
            temFoto ? "lg:grid-cols-2 lg:gap-16" : ""
          }`}
        >
          <div className="max-w-4xl">
            <h2 className="text-lg font-bold text-ink-soft">{sobre.historia.titulo}</h2>
            <p className="mt-5 text-2xl font-bold leading-snug tracking-tightest text-ink sm:text-3xl lg:text-4xl lg:leading-[1.2]">
              {abertura}
            </p>
            {resto.map((p, i) => (
              <p key={i} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          {temFoto && (
            <ImageSlot
              src="/fotos/sobre.jpg"
              alt="CNC, atendimento e suporte a sistemas de gestão em Maceió"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full"
            />
          )}
        </div>
      </section>

      {/* Ficha da empresa: tudo o que se confere antes de fechar, num lugar só. */}
      <section className="border-t-2 border-ink bg-paper-soft py-16 lg:py-24">
        <div className="container-cnc grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <h2 className="text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
            Ficha da empresa
          </h2>
          <dl className="border-t-2 border-ink">
            {ficha.map(([rotulo, valor]) => (
              <div
                key={rotulo}
                className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8"
              >
                <dt className="text-sm font-semibold text-ink-soft">{rotulo}</dt>
                <dd className="text-lg font-semibold text-ink">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Equipe (oculta enquanto não houver membros cadastrados) */}
      {sobre.equipe.membros.length > 0 && (
        <section className="bg-paper py-16 lg:py-24">
          <div className="container-cnc">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
                {sobre.equipe.titulo}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{sobre.equipe.texto}</p>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sobre.equipe.membros.map((m, i) => (
                <article key={i}>
                  <ImageSlot
                    src={m.foto}
                    alt={`Foto de ${m.nome}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-[4/5] w-full"
                  />
                  <h3 className="mt-3 text-lg font-bold tracking-tightest text-ink">{m.nome}</h3>
                  <p className="text-sm text-ink-muted">{m.cargo}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaixaContato
        titulo="Quem vende é quem atende depois"
        texto="Conte como funciona a sua loja e fale direto com quem vai cuidar do seu sistema no dia a dia."
        origem="sobre"
      />
    </>
  );
}
