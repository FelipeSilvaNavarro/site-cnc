import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/sistemas", "/suporte", "/sobre", "/contato", "/seja-parceiro"];
  const agora = new Date();
  return rotas.map((rota) => ({
    url: `${site.url}${rota}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.7,
  }));
}
