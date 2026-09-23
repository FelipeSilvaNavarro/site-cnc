import type { Metadata } from "next";
import Image from "next/image";
import TopoPagina from "@/components/TopoPagina";
import FaixaContato from "@/components/FaixaContato";
import TextoAcende from "@/components/rolagem/TextoAcende";
import { fotoExiste } from "@/lib/fotos";
import { sobre } from "@/content/sobre";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre a CNC Sistemas, empresa de Maceió desde 2020",
  // Esta página existe para quem está conferindo se a empresa é real antes de
  // fechar, então a descrição adianta tempo de casa, base e CNPJ aberto.
  description:
    "A CNC Sistemas atende o comércio de Maceió e do interior de Alagoas desde 2020, com CNPJ aberto, endereço na cidade e nota 5,0 no Google. Quem atende é quem conhece a sua operação.",
  alternates: { canonical: "/sobre" },
};

/**
 * SobrePage — rota "/sobre".
 *
 * Quem abre esta página está conferindo se a empresa existe antes de fechar.
 * A história de abertura acende com a rolagem; embaixo, a ficha da empresa
 * junta tudo o que se confere (desde quando, quantos clientes, nota no Google
 * com link, razão social, CNPJ e endereço) em cartões, com o dado grande.
 */
export default function SobrePage() {
  const e = site.endereco;
  const temFoto = fotoExiste("/fotos/sobre.jpg");
  const [abertura, ...resto] = sobre.historia.paragrafos;

  const ficha: { rotulo: string; valor: React.ReactNode; destaque?: boolean }[] = [
    { rotulo: "Em atividade desde", valor: "2020", destaque: true },
    { rotulo: "Comércios atendidos hoje", valor: site.numeros.clientesAtivos, destaque: true },
    {
      rotulo: `Nota no Google, em ${site.numeros.avaliacoesGoogle} avaliações`,
      valor: (
        <a
          href={site.googleAvaliacao}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-signal-500 decoration-[4px] underline-offset-[10px] hover:decoration-ink"
        >
          {site.numeros.notaGoogle}
        </a>
      ),
      destaque: true,
    },
    { rotulo: "Razão social", valor: site.nomeCompleto },
    { rotulo: "CNPJ", valor: <span className="dado text-[1.05rem]">{site.cnpj}</span> },
    {
      rotulo: "Endereço",
      valor: (
        <>
          {e.logradouro}, {e.bairro}, {e.cidade}/{e.uf}, CEP{" "}
          <span className="dado text-[1.05rem]">{e.cep}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TopoPagina titulo={sobre.titulo} texto={<p>{sobre.intro}</p>}>
        <div className="container-cnc pb-20 pt-20 lg:pb-28 lg:pt-32">
          <p className="rotulo text-brand-600">{sobre.historia.titulo}</p>
          <TextoAcende
            texto={abertura}
            className="semilarga mt-8 max-w-[28ch] text-[clamp(1.7rem,3.8vw,3.6rem)] leading-[1.1] text-ink"
          />
          <div className={`mt-14 grid gap-10 ${temFoto ? "lg:grid-cols-2 lg:items-center" : ""}`}>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
              {resto.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {temFoto && (
              <figure className="relative aspect-[4/3] overflow-hidden rounded-cartao">
                <Image
                  src="/fotos/sobre.jpg"
                  alt="CNC, atendimento e suporte a sistemas de gestão em Maceió"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </figure>
            )}
          </div>
        </div>

        {/* Ficha da empresa: o que se confere antes de fechar, num lugar só. */}
        <section className="border-t border-ink/10 pb-24 pt-20 lg:pb-36 lg:pt-28" aria-labelledby="ficha-titulo">
          <div className="container-cnc">
            <h2 id="ficha-titulo" className="larga text-[clamp(2.3rem,5vw,4.6rem)] text-ink">
              Ficha da empresa
            </h2>
            <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ficha.map((f) => (
                <div
                  key={f.rotulo}
                  className={`flex flex-col justify-between gap-8 rounded-cartao p-7 sm:p-8 ${
                    f.destaque ? "bg-noite text-papel" : "bg-papel-claro text-ink ring-1 ring-ink/10"
                  }`}
                >
                  <dt className={`text-sm font-semibold ${f.destaque ? "text-papel/60" : "text-ink-muted"}`}>
                    {f.rotulo}
                  </dt>
                  <dd
                    className={
                      f.destaque
                        ? "larga text-[clamp(3rem,6vw,5rem)] leading-none tabular-nums"
                        : "text-lg font-semibold leading-snug"
                    }
                  >
                    {f.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Equipe (oculta enquanto não houver membros cadastrados) */}
        {sobre.equipe.membros.length > 0 && (
          <section className="border-t border-ink/10 pb-24 pt-20 lg:pb-36 lg:pt-28">
            <div className="container-cnc">
              <h2 className="larga text-[clamp(2.3rem,5vw,4.6rem)] text-ink">{sobre.equipe.titulo}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{sobre.equipe.texto}</p>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sobre.equipe.membros.map((m) => (
                  <figure key={m.nome}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-cartao">
                      <Image src={m.foto} alt={`Foto de ${m.nome}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-4">
                      <p className="semilarga text-xl text-ink">{m.nome}</p>
                      <p className="text-ink-muted">{m.cargo}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}
      </TopoPagina>

      <FaixaContato
        titulo="Quem vende é quem atende depois"
        texto="Conte como funciona a sua loja e fale direto com quem vai cuidar do seu sistema no dia a dia."
        origem="sobre"
      />
    </>
  );
}
