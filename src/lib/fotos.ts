import fs from "node:fs";
import path from "node:path";

/**
 * fotos.ts — checagem, em build time, de quais fotos reais já existem.
 *
 * Por que existe: o site referencia fotos que ainda não foram tiradas
 * (`/fotos/hero.jpg`, `sobre.jpg`, `suporte.jpg`). Enquanto o arquivo não
 * existir, o `next/image` continuava pedindo o otimizador da Vercel e levando
 * `400 INVALID_IMAGE_OPTIMIZE_REQUEST` em toda visita, uma requisição perdida
 * por página. Conferir no build corta o pedido antes de ele sair.
 *
 * Como o site é prerenderizado por inteiro, esta função roda no build da
 * Vercel e não no navegador do visitante, então basta soltar o arquivo em
 * `public/fotos/` e publicar que a foto entra sozinha, sem editar código.
 */
const cache = new Map<string, boolean>();

export function fotoExiste(src: string): boolean {
  // Só caminho local absoluto do próprio site; URL externa passa direto.
  if (!src.startsWith("/")) return true;

  const memo = cache.get(src);
  if (memo !== undefined) return memo;

  const relativo = path.normalize(src).replace(/^(\.\.[/\\])+/, "");
  const absoluto = path.join(process.cwd(), "public", relativo);
  const existe = fs.existsSync(absoluto) && fs.statSync(absoluto).isFile();

  cache.set(src, existe);
  return existe;
}
