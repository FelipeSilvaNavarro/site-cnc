import type { MetadataRoute } from "next";

const base = "https://www.cnc-maceio.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/sistemas", "/suporte", "/sobre", "/contato", "/seja-parceiro"];
  const agora = new Date();
  return rotas.map((rota) => ({
    url: `${base}${rota}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.7,
  }));
}
