/**
 * Verificador de contraste da paleta (WCAG 2.1).
 *
 * Por que existe: o site usa superfícies escuras inteiras (brand-800/900) e uma
 * cor de sinalização (signal-500). Cada troca de token pode reprovar um par
 * texto/fundo sem que ninguém perceba — foi exatamente o que aconteceu com o
 * `ink-muted` antigo (#6a7791), que reprovava sobre `paper-soft` justamente onde
 * era usado.
 *
 * Uso: `node scripts/contrast.mjs`. Sai com código 1 se algum par reprovar,
 * então serve direto em CI.
 *
 * Regra aplicada: AA. 4.5:1 para texto normal, 3:1 para texto grande (>=24px,
 * ou >=18.66px em negrito) e para bordas/ícones que carregam informação.
 */

const cores = {
  "paper": "#ffffff",
  "paper-soft": "#f2f3f5",
  "paper-dark": "#e3e5e9",
  "ink": "#0b0e11",
  "ink-soft": "#333a44",
  "ink-muted": "#525c6b",
  "brand-100": "#dce6fb",
  "brand-200": "#b9ccf6",
  "brand-700": "#1b3578",
  "brand-800": "#14275a",
  "brand-900": "#0e1b3d",
  "signal-400": "#ffd43b",
  "signal-500": "#ffc400",
};

/** Pares texto/fundo realmente usados no site, com o mínimo exigido. */
const pares = [
  // Superfícies claras
  ["ink", "paper", 4.5, "corpo sobre branco"],
  ["ink-soft", "paper", 4.5, "texto secundario sobre branco"],
  ["ink-muted", "paper", 4.5, "texto terciario sobre branco"],
  ["ink", "paper-soft", 4.5, "corpo sobre cinza claro"],
  ["ink-soft", "paper-soft", 4.5, "texto secundario sobre cinza claro"],
  ["ink-muted", "paper-soft", 4.5, "texto terciario sobre cinza claro (era o par que reprovava)"],
  ["brand-700", "paper", 4.5, "link sobre branco"],
  ["brand-700", "paper-soft", 4.5, "link sobre cinza claro"],

  // Superfícies escuras comprometidas com a marca
  ["paper", "brand-800", 4.5, "corpo sobre azul escuro"],
  ["paper", "brand-900", 4.5, "corpo sobre azul mais escuro"],
  ["brand-100", "brand-900", 4.5, "texto de apoio sobre azul mais escuro"],
  ["brand-100", "brand-800", 4.5, "texto de apoio sobre azul escuro"],
  ["brand-200", "brand-900", 4.5, "texto de apoio claro sobre azul mais escuro"],

  // Sinalização: e a superficie do CTA, texto preto por cima
  ["ink", "signal-500", 4.5, "texto do botao primario"],
  ["ink", "signal-400", 4.5, "texto do botao primario em hover"],
  ["signal-500", "brand-900", 3, "filete de sinalizacao sobre azul (nao-texto)"],
  ["signal-500", "ink", 3, "anel de foco sobre tinta (nao-texto)"],
];

/** Canal sRGB -> luminância linear (WCAG 2.1, 1.4.3). */
function linearizar(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminancia(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = linearizar((n >> 16) & 255);
  const g = linearizar((n >> 8) & 255);
  const b = linearizar(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function razao(hexA, hexB) {
  const a = luminancia(hexA);
  const b = luminancia(hexB);
  const [claro, escuro] = a > b ? [a, b] : [b, a];
  return (claro + 0.05) / (escuro + 0.05);
}

let reprovados = 0;
let minimo = Infinity;

console.log("Contraste dos pares em uso (WCAG 2.1 AA)\n");

for (const [frente, fundo, exigido, nota] of pares) {
  const r = razao(cores[frente], cores[fundo]);
  const ok = r >= exigido;
  if (!ok) reprovados++;
  minimo = Math.min(minimo, r);
  const marca = ok ? "ok  " : "FALHA";
  console.log(
    `${marca} ${r.toFixed(2).padStart(5)}:1  (min ${exigido})  ${frente} sobre ${fundo}  — ${nota}`
  );
}

console.log(`\nMenor razao entre os pares em uso: ${minimo.toFixed(2)}:1`);

if (reprovados > 0) {
  console.error(`\n${reprovados} par(es) reprovando. Ajuste os tokens em tailwind.config.ts.`);
  process.exit(1);
}

console.log("Todos os pares passam.");
