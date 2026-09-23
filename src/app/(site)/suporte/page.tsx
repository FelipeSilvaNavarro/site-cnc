import type { Metadata } from "next";
import Image from "next/image";
import TopoPagina from "@/components/TopoPagina";
import FichaAtendimento from "@/components/FichaAtendimento";
import FaixaContato from "@/components/FaixaContato";
import LinkContato from "@/components/LinkContato";
import IconeWhatsApp from "@/components/IconeWhatsApp";
import TextoAcende from "@/components/rolagem/TextoAcende";
import CartoesEmpilhados from "@/components/rolagem/CartoesEmpilhados";
import FaixaCidades from "@/components/rolagem/FaixaCidades";
import { fotoExiste } from "@/lib/fotos";
import { suporte } from "@/content/suporte";

export const metadata: Metadata = {
  title: "Suporte de sistema de gestão em Maceió, com técnico na loja",
  // A objeção que esta página responde é medo de ficar na mão com a loja
  // cheia, então a descrição diz o horário real e a ida à loja.
  description:
    "Suporte de sistema de gestão e PDV em Maceió e no interior de Alagoas, todos os dias das 6h às 22h, direto com quem conhece a sua operação e com técnico na loja quando o caso pede. Sem central e sem fila de chamado.",
  alternates: { canonical: "/suporte" },
};

/**
 * SuportePage — rota "/suporte".
 *
 * Quem chega aqui muitas vezes já é cliente e está com o caixa parado, então o
 * topo entrega o botão e, ao lado, a ficha de atendimento com o status ao vivo.
 * No celular a ficha desce para o começo da folha, porque o topo preso precisa
 * caber numa tela. Com a foto em /public/fotos/suporte.jpg, ela entra na folha.
 */
export default function SuportePage() {
  const temFoto = fotoExiste(suporte.imagem.src);

  return (
    <>
      <TopoPagina
        titulo={suporte.titulo}
        texto={<p>{suporte.intro}</p>}
        acoes={
          <LinkContato origem="suporte" className="btn-primary pr-3">
            Falar com o suporte
            <span className="btn-seta" aria-hidden="true">
              <IconeWhatsApp className="h-3.5 w-3.5" />
            </span>
          </LinkContato>
        }
        lado={<FichaAtendimento titulo="Suporte CNC" origem="suporte" preco={false} />}
      >
        <div className="container-cnc pb-8 pt-16 lg:pt-32">
          <FichaAtendimento
            titulo="Suporte CNC"
            origem="suporte"
            preco={false}
            className="mb-16 lg:hidden"
          />
          <TextoAcende
            texto={suporte.canais.observacao}
            className="semilarga max-w-[30ch] text-[clamp(1.6rem,3.4vw,3.2rem)] leading-[1.12] text-ink"
          />
          {temFoto && (
            <figure className="relative mt-16 aspect-[4/3] overflow-hidden rounded-cartao lg:aspect-[21/9]">
              <Image
                src={suporte.imagem.src}
                alt={suporte.imagem.alt}
                fill
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-cover"
              />
            </figure>
          )}
        </div>
        <CartoesEmpilhados
          titulo={suporte.comoFunciona.titulo}
          texto="Do primeiro chamado no WhatsApp até o caixa rodando de novo, com a mesma pessoa do outro lado."
          cartoes={suporte.comoFunciona.itens}
        />
      </TopoPagina>

      <FaixaCidades />

      <FaixaContato
        titulo="O caixa travou agora?"
        texto="Mande a mensagem dizendo o que aparece na tela. Quem responde conhece o seu sistema e resolve na conversa, ou vai até a loja quando o caso pede."
        origem="suporte"
      />
    </>
  );
}
