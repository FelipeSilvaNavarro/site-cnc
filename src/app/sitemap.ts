import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * sitemap — gera o /sitemap.xml (App Router Metadata API).
 *
 * Lista apenas as rotas públicas indexáveis. Páginas ocultas/noindex
 * (/area-do-cliente, /seja-parceiro) ficam de fora de propósito.
 *
 * POR QUE A DATA É FIXA E NÃO `new Date()`
 * ----------------------------------------
 * A versão anterior carimbava a hora do build em todas as URLs, então cada
 * deploy anunciava ao Google que o site inteiro tinha mudado, inclusive quando
 * o commit só trocava o número de clientes. Rastreador que confere o `lastmod`
 * e encontra a mesma página de sempre aprende a ignorar o campo, e aí quando
 * uma página muda de verdade o aviso não vale mais nada. A data abaixo é
 * editada à mão quando o conteúdo daquela rota muda, e é isso que o campo
 * significa.
 *
 * `priority` e `changefreq` o Google declara que ignora; ficam porque outros
 * rastreadores ainda leem e não atrapalham.
 */
const rotas: { caminho: string; atualizadoEm: string; prioridade: number }[] = [
  { caminho: "", atualizadoEm: "2026-09-20", prioridade: 1 },
  { caminho: "/sistemas", atualizadoEm: "2026-09-20", prioridade: 0.8 },
  { caminho: "/suporte", atualizadoEm: "2026-09-20", prioridade: 0.8 },
  { caminho: "/sobre", atualizadoEm: "2026-09-20", prioridade: 0.5 },
  { caminho: "/contato", atualizadoEm: "2026-09-20", prioridade: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.map(({ caminho, atualizadoEm, prioridade }) => ({
    url: `${site.url}${caminho}`,
    lastModified: new Date(`${atualizadoEm}T12:00:00-03:00`),
    changeFrequency: "monthly",
    priority: prioridade,
  }));
}
