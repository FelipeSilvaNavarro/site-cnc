import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/area-do-cliente"],
    },
    sitemap: "https://www.cnc-maceio.com.br/sitemap.xml",
  };
}
