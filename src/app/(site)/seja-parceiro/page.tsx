import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LinkContato from "@/components/LinkContato";

export const metadata: Metadata = {
  title: "Seja parceiro da CNC",
  description:
    "Programa de parceria da CNC para revenda de sistemas de gestão. Página informativa secundária.",
  alternates: { canonical: "/seja-parceiro" },
  // Fora do menu/sitemap por enquanto: não indexar nos buscadores.
  robots: { index: false, follow: false },
};

export default function SejaParceiroPage() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-cnc max-w-2xl">
        <Reveal>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
            Seja parceiro da CNC
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Você atua com tecnologia, contabilidade ou atende o comércio e quer
            oferecer sistemas de gestão com suporte humanizado? A CNC trabalha
            com parcerias para ampliar o atendimento.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {/* Texto institucional genérico; condições reais a definir. */}
            {"{{PREENCHER: descrição real do programa de parceria, se houver condições, comissões ou requisitos}}"}
          </p>

          <div className="mt-8">
            <LinkContato origem="parceiro" className="btn-primary">
              Falar sobre parceria
            </LinkContato>
          </div>

          {/* E-mail OCULTO por enquanto (conta contato@ a criar no Zoho).
              Para reativar, descomente este bloco. */}
          {/* <p className="mt-8 text-sm text-ink-muted">
            Ou envie um e-mail para{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brand-700 hover:underline"
            >
              {site.email}
            </a>
            .
          </p> */}
        </Reveal>
      </div>
    </section>
  );
}
