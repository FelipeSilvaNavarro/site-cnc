// @ts-check
/**
 * publish-clientes.mjs — atualiza a contagem de clientes do site em UM comando.
 *
 * Faz o ciclo completo:
 *   1. roda o sync do Obsidian (atualiza src/content/metrics.json);
 *   2. se o número mudou, commita só o metrics.json e dá push;
 *   3. se não mudou, não faz nada (evita commit vazio).
 *
 * O push dispara o deploy automático na Vercel, então em ~1 min o site mostra o
 * número novo. Uso:
 *
 *   npm run clientes:publish
 *
 * // FUTURO: quando existir a API de clientes, este passo some — o site lê a API
 * //         direto e a contagem fica ao vivo, sem rodar nada à mão.
 */

import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) =>
  execFileSync("git", args, { cwd: raiz, encoding: "utf8" }).trim();

// 1. Sincroniza a contagem a partir do Obsidian.
execFileSync("node", [join(raiz, "scripts", "sync-obsidian.mjs")], {
  cwd: raiz,
  stdio: "inherit",
});

// 2. Há mudança no metrics.json? (git diff retorna vazio se nada mudou.)
const mudou = git("diff", "--name-only", "src/content/metrics.json") !== "";
if (!mudou) {
  console.log("[publish-clientes] contagem já está atualizada, nada a publicar.");
  process.exit(0);
}

// 3. Commita só o metrics.json e publica.
git("add", "src/content/metrics.json");
git("commit", "-m", "chore: atualiza contagem de clientes (sync Obsidian)");
git("push", "origin", "main");
console.log("[publish-clientes] contagem publicada. Deploy na Vercel em instantes.");
