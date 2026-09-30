import type { Metadata } from "next";
import TopoPagina from "@/components/TopoPagina";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacidade | CNC Sistemas",
  description:
    "O que a CNC Sistemas guarda quando você fala com ela pelo site, para que usa e como pedir para apagar.",
  alternates: { canonical: "/privacidade" },
};

/**
 * PrivacidadePage — rota "/privacidade".
 *
 * Nasceu com o chat de lead (29/09/2026), que passou a coletar nome e celular.
 * Coleta de dado pessoal sem dizer para quê e sem caminho de exclusão é o que a
 * LGPD pune, então esta página diz só o que o site faz de verdade.
 */
export default function PrivacidadePage() {
  const blocos: { titulo: string; texto: string }[] = [
    {
      titulo: "Quem cuida dos dados",
      texto: `${site.nomeCompleto}, CNPJ ${site.cnpj}, de ${site.cidade}/${site.uf}.`,
    },
    {
      titulo: "O que o chat guarda",
      texto:
        "Seu nome, o nome do seu comércio, o ramo, a cidade, se você já usa sistema, o seu WhatsApp e a página do site em que a conversa começou. Nada além do que você mesmo responde.",
    },
    {
      titulo: "Para que serve",
      texto:
        "Só para a CNC te chamar e apresentar o sistema que você pediu. Os dados não são vendidos, não são repassados para outra empresa e não entram em lista de disparo.",
    },
    {
      titulo: "Onde fica",
      texto:
        "No sistema interno de atendimento da CNC, com acesso restrito por senha a quem atende você. Hospedagem e banco de dados são de fornecedores que processam os dados em nome da CNC, com conexão criptografada.",
    },
    {
      titulo: "Medição do site",
      texto:
        "O site conta visitas e cliques de contato pelo Google Analytics e pelo Google Ads só depois que você aceita no aviso de cookies. O que você digita no chat não vai para essa medição.",
    },
    {
      titulo: "Seus direitos",
      texto: `Você pode pedir a qualquer momento para ver, corrigir ou apagar o que a CNC tem sobre você, pelo WhatsApp ${site.whatsapp.exibicao}. O pedido de exclusão é atendido e confirmado pela mesma conversa.`,
    },
  ];

  return (
    <TopoPagina
      titulo="Privacidade"
      texto={<p>O que a CNC guarda quando você fala com ela pelo site, e como pedir para apagar.</p>}
    >
      <div className="container-cnc pb-24 pt-20 lg:pb-32 lg:pt-28">
        <dl className="grid max-w-3xl gap-10">
          {blocos.map((b) => (
            <div key={b.titulo}>
              <dt className="semilarga text-[1.5rem] text-ink">{b.titulo}</dt>
              <dd className="mt-3 text-lg leading-relaxed text-ink-soft">{b.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </TopoPagina>
  );
}
