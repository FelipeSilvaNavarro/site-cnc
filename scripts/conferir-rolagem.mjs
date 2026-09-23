/**
 * Rola uma página do site como uma pessoa rola e tira foto de cada trecho,
 * para conferir as cenas de rolagem (Lenis + GSAP) depois de qualquer mudança.
 *
 * Por que existe: screenshot de página inteira não mostra cena nenhuma, porque
 * as cenas dependem da rolagem acontecer. Este roteiro usa a roda do mouse no
 * desktop (é ela que o Lenis escuta) e rolagem nativa no celular, espera a cena
 * assentar e fotografa. Também mede estouro de largura e erro de página.
 *
 * Navegador: SEMPRE Firefox (regra do Felipe). Usa o Playwright com o Firefox
 * instalado em ~/.cache/ms-playwright; se a versão do Playwright mudar, ajuste
 * os dois caminhos abaixo (`ls ~/.npm/_npx/*\/node_modules/playwright` e
 * `ls ~/.cache/ms-playwright`). O Firefox headless roda a ~36 quadros por
 * segundo aqui, o que basta para as cenas (medido em 23/09/2026).
 *
 * Uso, com o site rodando (`npm run build && npx next start -p 3100`):
 *   node scripts/conferir-rolagem.mjs /              1440 700 40 home
 *   node scripts/conferir-rolagem.mjs /sistemas      390  650 40 sistemas-cel
 * Argumentos: rota, largura, passo em px, máximo de passos, prefixo das fotos.
 * Fotos em /tmp/rolagem/. Para movimento reduzido, troque `reducedMotion`.
 */
import fs from "node:fs";

const PLAYWRIGHT = "/home/felipe/.npm/_npx/86170c4cd1c5da32/node_modules/playwright/index.mjs";
const FIREFOX = "/home/felipe/.cache/ms-playwright/firefox-1549/firefox/firefox";
const { firefox } = await import(PLAYWRIGHT);

const [, , rota = "/", largura = "1440", passo = "700", total = "40", pref = "pag"] = process.argv;
const destino = "/tmp/rolagem";
fs.mkdirSync(destino, { recursive: true });

const b = await firefox.launch({ executablePath: FIREFOX });
const w = Number(largura);
const p = await b.newPage({
  viewport: { width: w, height: w < 800 ? 844 : 900 },
  hasTouch: w < 800,
  reducedMotion: "no-preference",
});
const erros = [];
p.on("pageerror", (e) => erros.push(e.message));
await p.goto("http://localhost:3100" + rota, { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.screenshot({ path: `${destino}/${pref}-00.png` });
for (let i = 1; i <= Number(total); i++) {
  if (w < 800) await p.evaluate((d) => window.scrollBy(0, d), Number(passo));
  else for (let k = 0; k < 7; k++) { await p.mouse.wheel(0, Number(passo) / 7); await p.waitForTimeout(40); }
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `${destino}/${pref}-${String(i).padStart(2, "0")}.png` });
  const fim = await p.evaluate(() => innerHeight + scrollY >= document.documentElement.scrollHeight - 5);
  if (fim) break;
}
console.log("estouro de largura:", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), "px");
console.log("erros de página:", erros.length ? erros : "nenhum");
console.log("fotos em", destino);
await b.close();
