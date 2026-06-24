// @ts-check
/**
 * sync-obsidian.mjs — sincroniza métricas do site a partir do Obsidian.
 *
 * O QUE FAZ
 * ---------
 * Lê o vault do Obsidian da CNC (fonte da verdade ATUAL dos clientes), conta as
 * fichas de cliente e grava o resultado em `src/content/metrics.json`, que é
 * versionado no repositório e lido pelo site em build time.
 *
 * POR QUE ASSIM (e não ler o Obsidian direto no build)
 * ----------------------------------------------------
 * O site é estático e builda na Vercel, onde o vault do Obsidian (que vive na
 * máquina do Felipe) NÃO existe. Se o site lesse o vault direto, o build na
 * nuvem quebraria. Então o fluxo é:
 *
 *   1. Felipe roda `npm run sync:obsidian` localmente (quando a base muda).
 *   2. O script atualiza `src/content/metrics.json` (que entra no git).
 *   3. `git push` → a Vercel builda lendo o JSON já versionado.
 *
 * // FUTURO: quando existir uma API de clientes, trocar a leitura de arquivos por
 * //         um fetch à API e manter o mesmo `metrics.json` como saída.
 *
 * COMO RODAR
 * ----------
 *   npm run sync:obsidian
 *
 * A pasta do vault pode ser sobrescrita pela variável de ambiente OBSIDIAN_VAULT.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Caminho deste arquivo → raiz do projeto (../ a partir de /scripts).
const __dirname = dirname(fileURLToPath(import.meta.url));
const raizProjeto = join(__dirname, "..");

// Pasta das fichas de cliente no Obsidian. Uma ficha .md = um cliente.
// Sobrescrevível por env para outras máquinas/ambientes.
const PASTA_FICHAS =
  process.env.OBSIDIAN_VAULT ??
  "/home/felipe/Documentos/Obsidian Vault/CNC/Clientes/Fichas";

// Arquivo de saída lido pelo site (versionado no git).
const SAIDA = join(raizProjeto, "src", "content", "metrics.json");

/**
 * Conta as fichas de cliente: arquivos .md que contenham a tag `#cliente`.
 * @returns {number} quantidade de clientes
 */
function contarClientes() {
  let arquivos;
  try {
    arquivos = readdirSync(PASTA_FICHAS).filter((f) => f.endsWith(".md"));
  } catch {
    // Vault indisponível (ex.: build na Vercel): não derruba nada, retorna -1
    // para sinalizar "sem leitura" e preservar o valor anterior do JSON.
    return -1;
  }
  return arquivos.filter((nome) => {
    try {
      return readFileSync(join(PASTA_FICHAS, nome), "utf8").includes("#cliente");
    } catch {
      return false;
    }
  }).length;
}

const clientes = contarClientes();

if (clientes < 0) {
  console.error(
    `[sync-obsidian] Vault não encontrado em "${PASTA_FICHAS}". ` +
      "metrics.json mantido como está."
  );
  process.exit(0);
}

const metrics = {
  // Quantidade de clientes ativos exibida no site (barra de prova social etc.).
  clientesAtivos: clientes,
  // Data/hora da última sincronização (ISO).
  atualizadoEm: new Date().toISOString(),
  // De onde veio o número (rastreabilidade).
  fonte: "obsidian:CNC/Clientes/Fichas",
};

writeFileSync(SAIDA, JSON.stringify(metrics, null, 2) + "\n");
console.log(
  `[sync-obsidian] ${clientes} clientes → ${SAIDA.replace(raizProjeto + "/", "")}`
);
