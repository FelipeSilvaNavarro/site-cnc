import type { Metadata } from "next";
import LinkContato from "@/components/LinkContato";

export const metadata: Metadata = {
  title: "Seja parceiro da CNC",
  description:
    "Programa de parceria da CNC para revenda de sistemas de gestão. Página informativa secundária.",
  alternates: { canonical: "/seja-parceiro" },
  // Fora do menu/sitemap por enquanto: não indexar nos buscadores.
  robots: { index: false, follow: false },
};

/**
 * Página de parceria, fora do menu e fora do índice.
 *
 * Até 23/09/2026 ela mostrava ao visitante o texto provisório
 * "{{PREENCHER: descrição real do programa de parceria...}}". Saiu: enquanto
 * as condições (comissão, requisitos) não estiverem definidas pelo Felipe, a
 * página diz só o que é verdade e leva para a conversa.
 */
export default function SejaParceiroPage() {
  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="container-cnc pb-16 pt-10 lg:pb-24 lg:pt-16">
        <h1 className="max-w-[18ch] text-[clamp(2.1rem,5vw,4.4rem)] font-extrabold leading-[1] tracking-tightest text-ink">
          Seja parceiro da CNC
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Você atua com tecnologia, contabilidade ou atende o comércio e quer oferecer sistema de
          gestão com suporte de verdade para os seus clientes? A CNC trabalha com parceria para
          chegar mais longe, e as condições a gente conversa caso a caso.
        </p>
        <LinkContato origem="parceiro" className="btn-primary mt-8 min-h-[48px] px-8">
          Falar sobre parceria
        </LinkContato>
      </div>
    </section>
  );
}
