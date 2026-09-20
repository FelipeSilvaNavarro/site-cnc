import { site } from "@/content/site";
import { sistemas } from "@/content/sistemas";
import { segmentos } from "@/content/home";

/**
 * /llms.txt — ficha da empresa em texto puro, para quem lê por máquina.
 *
 * POR QUE EXISTE
 * --------------
 * O sitemap diz quais URLs existem e o JSON-LD descreve o negócio em campos
 * fechados, mas nenhum dos dois responde em uma leitura "o que essa empresa
 * vende, para quem, onde e a partir de quanto". Assistente de busca (ChatGPT,
 * Perplexity, o resumo do próprio Google) monta essa resposta raspando o HTML,
 * e HTML de página React chega cheio de marcação, script de hidratação e menu
 * repetido em toda rota, o que faz o modelo citar o rodapé em vez da proposta.
 * Este arquivo entrega o mesmo conteúdo já destilado, em markdown, na raiz do
 * domínio, que é a convenção que esses leitores procuram.
 *
 * REGRA DE MANUTENÇÃO
 * -------------------
 * Nada é escrito na mão aqui: preço, cidades, número de clientes e catálogo
 * saem de `content/site.ts`, `content/sistemas.ts` e `content/home.ts`. Se o
 * piso mudar em um lugar e não no outro, a página promete o que o arquivo
 * desmente, e é esse tipo de divergência que derruba confiança de citação.
 *
 * `force-static` porque o conteúdo só muda em build: o arquivo sai prerenderado
 * junto com as páginas, sem custo de função em cada leitura.
 */
export const dynamic = "force-static";

function corpo(): string {
  const cidades = site.cidadesAtendidas.join(", ");
  const catalogo = sistemas
    .map((s) => `- **${s.nome}**: ${s.resumo} ${s.indicadoPara}`)
    .join("\n");
  const ramos = segmentos.lista.map((s) => s.nome).join(", ");

  return `# CNC Sistemas

> Revenda e suporte de sistema de gestão e PDV para o comércio de ${site.cidade} e do interior de Alagoas, com técnico que vai até a loja. A partir de ${site.precos.pisoMensalPorExtenso}, com instalação, migração de dados e treinamento inclusos.

Razão social ${site.nomeCompleto}, CNPJ ${site.cnpj}, em atividade desde 2020 (${site.numeros.anosMercado} anos), com ${site.numeros.clientesAtivos} clientes ativos e nota ${site.numeros.notaGoogle} no Google em ${site.numeros.avaliacoesGoogle} avaliações.

## O que a CNC faz

Ela implanta e dá suporte a sistema de gestão e frente de caixa para micro e pequeno comércio, e o que a separa do fornecedor nacional é presença física: o atendimento é direto com quem conhece a operação do cliente, sem central de chamados e sem fila de protocolo, e o técnico vai na loja quando o caso pede.

## Soluções, por porte de operação

${catalogo}

## Segmentos atendidos

${ramos}.

## Onde atende

${cidades} (todas em Alagoas).

## Preço

Entrada em ${site.precos.pisoMensalPorExtenso}, com instalação, migração dos dados do sistema anterior e treinamento da equipe inclusos. O valor final depende do porte da operação e da quantidade de caixas.

## Atendimento

${site.horario.semana}, ${site.horario.sabado.toLowerCase()}. WhatsApp e telefone ${site.telefone.exibicao}.

## Páginas

- [Início](${site.url}/): promessa, preço de entrada e prova social
- [Soluções](${site.url}/sistemas): os três portes e o que cada um cobre
- [Suporte](${site.url}/suporte): como funciona o atendimento
- [Sobre](${site.url}/sobre): história, equipe e dados cadastrais
- [Contato](${site.url}/contato): canais, endereço e horário
`;
}

export function GET() {
  return new Response(corpo(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
