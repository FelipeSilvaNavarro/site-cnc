import type { Metadata } from "next";
import TopoPagina from "@/components/TopoPagina";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacidade | CNC Sistemas",
  description:
    "Como a CNC Sistemas trata os dados de quem fala com ela pelo site: o que guarda, com que base na LGPD, onde fica, por quanto tempo e como pedir para apagar.",
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
      titulo: "Quem é responsável",
      texto: `A controladora dos dados coletados por este site é a ${site.nomeCompleto}, CNPJ ${site.cnpj}, com sede em ${site.cidade}/${site.uf}. Como agente de tratamento de pequeno porte, a CNC não indica encarregado e atende os titulares diretamente pelo WhatsApp ${site.whatsapp.exibicao}, que é o canal oficial para qualquer assunto desta página.`,
    },
    {
      titulo: "O que o chat guarda",
      texto:
        "Seu nome, o nome do seu comércio, o ramo, a cidade, se você já usa sistema, o seu WhatsApp e a página do site em que a conversa começou, além do endereço IP da requisição, usado só para barrar abuso. Nada além do que você mesmo responde.",
    },
    {
      titulo: "Para que serve, e com que base",
      texto:
        "Os dados servem para a CNC te chamar e apresentar o sistema que você pediu, e o tratamento se apoia no artigo 7º, inciso V, da Lei 13.709/2018 (LGPD), que permite usar o dado para os procedimentos anteriores a um contrato quando é o próprio titular quem pede. Os dados não são vendidos, não são repassados para outra empresa e não entram em lista de disparo.",
    },
    {
      titulo: "Onde fica, inclusive fora do Brasil",
      texto:
        "No sistema interno de atendimento da CNC, com acesso restrito por senha a quem atende você. O site e esse sistema rodam em fornecedores de hospedagem e banco de dados que processam os dados em nome da CNC e ficam nos Estados Unidos, o que é uma transferência internacional de dados feita com conexão criptografada e com fornecedores que mantêm compromissos contratuais de proteção de dados, nos termos do artigo 33 da LGPD.",
    },
    {
      titulo: "Por quanto tempo",
      texto:
        "Se a conversa não virar contratação, os dados são apagados em até 12 meses depois do último contato. Se você virar cliente, eles passam a seguir o contrato de prestação de serviço, e o que a lei fiscal ou contábil obriga a guardar fica guardado pelo prazo que ela exige.",
    },
    {
      titulo: "Cookies e medição do site",
      texto:
        "O site conta visitas e cliques de contato pelo Google Analytics e pelo Google Ads, que gravam cookie, só depois que você aceita no aviso de cookies, e a escolha pode ser refeita a qualquer momento em Preferências de cookies, no rodapé. A contagem de visitas da própria hospedagem não grava cookie. O que você digita no chat não vai para nenhuma dessas medições.",
    },
    {
      titulo: "Seus direitos",
      texto: `Você pode pedir confirmação de que a CNC trata dados seus, acesso, correção, anonimização, bloqueio ou eliminação do que for desnecessário, informação sobre com quem os dados são compartilhados e a eliminação dos dados, pelo WhatsApp ${site.whatsapp.exibicao}. A resposta completa sai em até 15 dias, e se ela não resolver, você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD), em gov.br/anpd.`,
    },
    {
      titulo: "Mudanças nesta página",
      texto:
        "Quando o que o site coleta ou a forma de tratar mudar, esta página muda junto, com a data da última versão logo abaixo.",
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
        <p className="mt-14 text-sm text-ink-muted">Última atualização em 29 de setembro de 2026.</p>
      </div>
    </TopoPagina>
  );
}
