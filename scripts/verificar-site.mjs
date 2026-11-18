/**
 * @file Bateria do site da CNC contra o build local, chamada pelo verificar-tudo.sh.
 *
 * Criado em 21/10/2026, depois do podcast do Akita (Flow #663): cada regra que já
 * quebrou ou que protege o lead vira uma linha aqui, para mexer no site sem medo de
 * derrubar o que funcionava. Fala com o `next start` local, nunca com o site no ar,
 * e o servidor sobe com uma FILA_DATABASE_URL falsa, então nenhum lead de teste chega
 * na fila de produção: o celular certo para no 502 da falha de rede, depois de passar
 * por todas as travas que interessam.
 *
 * Uso: node scripts/verificar-site.mjs [endereço]   (padrão http://localhost:3101)
 */
const BASE = process.argv[2] ?? "http://localhost:3101";
if (/cncsistemas\.com\.br|vercel\.app/.test(BASE)) {
  console.error("recusado: esta bateria só roda contra servidor local.");
  process.exit(1);
}
let falhas = 0;
/** Imprime ok/FALHA e conta a falha. */
function conferir(nome, ok, detalhe = "") {
  console.log(`${ok ? "ok   " : "FALHA"} ${nome}${ok ? "" : ` (${detalhe})`}`);
  if (!ok) falhas++;
}

// Páginas que o Google e os anúncios usam: home, as cinco por ramo de 21/10/2026 e os arquivos de SEO.
for (const rota of ["/", "/sistema-para-mercadinho", "/sistema-para-acougue", "/sistema-para-loja-de-roupas",
  "/sistema-para-material-de-construcao", "/sistema-para-distribuidora", "/sitemap.xml", "/robots.txt", "/favicon.ico"]) {
  const r = await fetch(BASE + rota);
  conferir(`${rota} responde 200`, r.status === 200, String(r.status));
}
const inexistente = await fetch(BASE + "/pagina-que-nao-existe");
conferir("rota inexistente responde 404", inexistente.status === 404, String(inexistente.status));

const html = await (await fetch(BASE + "/")).text();
// <!--$-->, <!-- --> e o build id (<!--WU_So...-->) sao marcadores do Next; comentario com frase e vazamento.
const comentarios = [...html.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]).filter((c) => /[a-zA-ZÀ-ú]{3,}\s+[a-zA-ZÀ-ú]{3,}/.test(c));
conferir("home sem comentário HTML com texto", comentarios.length === 0, comentarios.slice(0, 2).join(" | "));
// Piso subiu para R$ 150 em 18/11/2026: nenhuma página pode prometer o valor antigo.
for (const rota of ["/", "/sistemas"]) {
  const pagina = await (await fetch(BASE + rota)).text();
  conferir(`${rota} sem o piso antigo de R$ 100`, !/R\$\s?100\b/.test(pagina));
  conferir(`${rota} com o piso de R$ 150`, /R\$\s?150\b/.test(pagina));
}

// Rota do lead: cada trava devolve o status que o chat espera. O IP muda por caso
// para o teto de 5 envios em 10 minutos só ser testado onde é o assunto.
const ORIGEM = "https://cncsistemas.com.br";
const humano = { ms: 30000, nome: "Teste", comercio: "Teste", whatsapp: "82999990000" };
let ip = 1;
/** POST no /api/lead com origem, tipo e corpo controlados. */
async function lead(corpo, { origem = ORIGEM, tipo = "application/json", fixo } = {}) {
  const r = await fetch(BASE + "/api/lead", {
    method: "POST",
    headers: { origin: origem, "content-type": tipo, "x-forwarded-for": fixo ?? `10.0.0.${ip++}` },
    body: typeof corpo === "string" ? corpo : JSON.stringify(corpo),
  });
  return r.status;
}
conferir("lead de outro domínio é recusado", (await lead(humano, { origem: "https://golpe.com" })) === 403);
conferir("lead sem JSON é recusado", (await lead("x", { tipo: "text/plain" })) === 415);
conferir("lead gigante é recusado", (await lead({ ...humano, nome: "a".repeat(3000) })) === 413);
conferir("JSON quebrado é recusado", (await lead("{quebrado")) === 400);
conferir("robô no campo isca recebe 200 falso", (await lead({ ...humano, site: "x" })) === 200);
conferir("conversa em menos de 4 s recebe 200 falso", (await lead({ ...humano, ms: 1000 })) === 200);
conferir("celular inválido devolve 422", (await lead({ ...humano, whatsapp: "8299999" })) === 422);
conferir("celular de dígito repetido devolve 422", (await lead({ ...humano, whatsapp: "82999999999" })) === 422);
const valido = await lead(humano);
conferir("lead válido passa pelas travas e só falha na fila falsa", valido === 502, String(valido));
const seguidos = [];
for (let i = 0; i < 6; i++) seguidos.push(await lead({ ...humano, whatsapp: "8299" }, { fixo: "10.9.9.9" }));
conferir("sexto envio do mesmo IP em 10 min recebe 429", seguidos[5] === 429, seguidos.join(","));

console.log(falhas ? `\n${falhas} falha(s)` : "\ntudo certo");
process.exit(falhas ? 1 : 0);
