import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * robots — gera o /robots.txt (App Router Metadata API).
 *
 * Libera todo o site para indexação, exceto /area-do-cliente (página "em breve"),
 * e aponta o sitemap. A URL base vem de `site.url`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/area-do-cliente"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
