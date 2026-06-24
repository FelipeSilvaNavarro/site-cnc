import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { whatsappLink, site } from "@/content/site";

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
          <p className="eyebrow mb-4">Parceria</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
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
            <a
              href={whatsappLink(
                "Olá! Tenho interesse em ser parceiro da CNC."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Falar sobre parceria
            </a>
          </div>

          <p className="mt-8 text-sm text-ink-muted">
            Ou envie um e-mail para{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brand-700 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
