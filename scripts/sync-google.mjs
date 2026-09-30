// Atualiza src/content/google.json com a nota e o total de avaliações do perfil
// da CNC no Google, pela Places API (New). Roda uma vez por dia pela action
// .github/workflows/sync-google.yml, com a chave no secret GOOGLE_PLACES_KEY.
//
// Custo: rating e userRatingCount são SKU Place Details Enterprise, com 1.000
// chamadas grátis por mês (conferido em 29/09/2026). A trava abaixo impede mais
// de uma chamada de detalhe por dia, então o teto é 31 por mês. A busca do
// placeId já vem fixo no google.json, tirado do link de avaliação do perfil
// (site.googleAvaliacao), porque a busca por texto não achou a CNC.
import { readFileSync, writeFileSync } from "node:fs";

const ARQ = new URL("../src/content/google.json", import.meta.url);
const KEY = process.env.GOOGLE_PLACES_KEY;
if (!KEY) throw new Error("GOOGLE_PLACES_KEY ausente");

const atual = JSON.parse(readFileSync(ARQ, "utf8"));
const hoje = new Date().toISOString().slice(0, 10);
if (atual.atualizadoEm?.slice(0, 10) === hoje && atual.placeId) {
  console.log("Já consultado hoje, nada a fazer.");
  process.exit(0);
}

async function places(url, mask, body) {
  const r = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": KEY, "X-Goog-FieldMask": mask },
    body: body && JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Places ${r.status}: ${await r.text()}`);
  return r.json();
}

let placeId = atual.placeId;
if (!placeId) {
  const busca = await places("https://places.googleapis.com/v1/places:searchText", "places.id", {
    textQuery: "CNC Sistemas Maceió",
  });
  placeId = busca.places?.[0]?.id;
  if (!placeId) throw new Error("Perfil da CNC não encontrado na busca");
}

const d = await places(`https://places.googleapis.com/v1/places/${placeId}`, "displayName,rating,userRatingCount");
// Trava contra perfil errado: sem "CNC" no nome, não publica número de outra empresa.
if (!/cnc/i.test(d.displayName?.text ?? "")) throw new Error(`Perfil inesperado: ${d.displayName?.text}`);
if (typeof d.rating !== "number" || typeof d.userRatingCount !== "number") throw new Error("Resposta sem nota");

writeFileSync(
  ARQ,
  JSON.stringify(
    { nota: d.rating, avaliacoes: d.userRatingCount, placeId, atualizadoEm: new Date().toISOString(), fonte: "places api, action sync-google" },
    null,
    2,
  ) + "\n",
);
console.log(`${d.displayName.text}: ${d.rating} em ${d.userRatingCount} avaliações`);
