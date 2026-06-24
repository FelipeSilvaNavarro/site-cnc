import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * sitemap — gera o /sitemap.xml (App Router Metadata API).
 *
 * Lista apenas as rotas públicas indexáveis (a home tem prioridade 1; as demais
 * 0.7). Páginas ocultas/noindex (/area-do-cliente, /seja-parceiro) ficam de fora
 * de propósito. URLs montadas a partir de `site.url`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/sistemas", "/suporte", "/sobre", "/contato"];
  const agora = new Date();
  return rotas.map((rota) => ({
    url: `${site.url}${rota}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.7,
  }));
}
