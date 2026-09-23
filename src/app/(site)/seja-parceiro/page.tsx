import type { Metadata } from "next";
import TopoPagina from "@/components/TopoPagina";
import FaixaContato from "@/components/FaixaContato";
import TextoAcende from "@/components/rolagem/TextoAcende";

export const metadata: Metadata = {
  title: "Seja parceiro da CNC",
  description:
    "Programa de parceria da CNC para revenda de sistemas de gestão. Página informativa secundária.",
  alternates: { canonical: "/seja-parceiro" },
  // Fora do menu e do sitemap por enquanto: não indexar nos buscadores.
  robots: { index: false, follow: false },
};

/**
 * Página de parceria, fora do menu e fora do índice.
 *
 * Diz só o que é verdade enquanto as condições (comissão, requisitos) não
 * estiverem definidas pelo Felipe, e leva para a conversa. Até 23/09/2026 ela
 * mostrava ao visitante o texto provisório "{{PREENCHER: ...}}".
 */
export default function SejaParceiroPage() {
  return (
    <>
      <TopoPagina
        titulo="Seja parceiro da CNC"
        texto={
          <p>
            Para quem atua com tecnologia, contabilidade ou atende o comércio e quer oferecer sistema
            de gestão com suporte de verdade.
          </p>
        }
      >
        <div className="container-cnc pb-24 pt-20 lg:pb-36 lg:pt-32">
          <TextoAcende
            texto="O seu cliente ganha um sistema que funciona e alguém que atende quando o caixa trava. Você indica, a CNC implanta e cuida do dia a dia, e as condições da parceria a gente conversa caso a caso."
            className="semilarga max-w-[28ch] text-[clamp(1.7rem,3.8vw,3.6rem)] leading-[1.1] text-ink"
          />
        </div>
      </TopoPagina>

      <FaixaContato
        titulo="Quer conversar sobre parceria?"
        texto="Conte o que você faz e quem você atende. A conversa começa pelo WhatsApp, direto com o dono da CNC."
        origem="parceiro"
      />
    </>
  );
}
