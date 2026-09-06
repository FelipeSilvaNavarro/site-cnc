/**
 * Prepara a foto real para o slot do site, no corte e no peso que o layout pede.
 *
 * Por que existe: o site já sabe esperar a foto — `src/lib/fotos.ts` confere no
 * build se o arquivo existe e só então pede o otimizador, o que resolveu o 400
 * em 24/08/2026 — então o que falta é o arquivo entrar com a proporção certa. Foto
 * de celular chega em 3:4 ou 9:16 e com 4 MB, e soltar isso direto em
 * `public/fotos/` estica o hero, corta cabeça no retrato e leva peso morto para
 * toda visita.
 *
 * Cada slot tem proporção fixa, tirada do `public/fotos/LEIA-ME.md`: hero e
 * equipe são retrato 4:5, sobre e suporte são paisagem 4:3. O corte é central por
 * padrão, e `--foco` move a janela quando o assunto não está no meio, que é o
 * caso do balcão fotografado de lado.
 *
 * Uso: node scripts/preparar-foto.mjs <slot> <foto.jpg> [--foco north|south|east|west] [--forcar]
 * Slots: hero, sobre, suporte, equipe-1, equipe-2, equipe-3, cliente-1, cliente-2, cliente-3
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const RAIZ = path.join(import.meta.dirname, "..");
const DESTINO = path.join(RAIZ, "public", "fotos");

// Largura e altura de saída por slot. O dobro do tamanho exibido, para a tela
// retina não mostrar borrado, e nunca mais que isso, porque peso de imagem é o
// que mais atrasa a primeira dobra no 4G do interior.
const SLOTS = {
  hero: { arquivo: "hero.jpg", largura: 1200, altura: 1500, onde: "Home, primeira dobra" },
  sobre: { arquivo: "sobre.jpg", largura: 1600, altura: 1200, onde: "Sobre, bloco de história" },
  suporte: { arquivo: "suporte.jpg", largura: 1600, altura: 1200, onde: "Suporte, topo" },
  "equipe-1": { arquivo: "equipe/membro-1.jpg", largura: 800, altura: 1000, onde: "Sobre, equipe" },
  "equipe-2": { arquivo: "equipe/membro-2.jpg", largura: 800, altura: 1000, onde: "Sobre, equipe" },
  "equipe-3": { arquivo: "equipe/membro-3.jpg", largura: 800, altura: 1000, onde: "Sobre, equipe" },
  "cliente-1": { arquivo: "depoimentos/cliente-1.jpg", largura: 400, altura: 400, onde: "Home, depoimento" },
  "cliente-2": { arquivo: "depoimentos/cliente-2.jpg", largura: 400, altura: 400, onde: "Home, depoimento" },
  "cliente-3": { arquivo: "depoimentos/cliente-3.jpg", largura: 400, altura: 400, onde: "Home, depoimento" },
};

const TETO_KB = 350;

function ajuda() {
  console.log("uso: node scripts/preparar-foto.mjs <slot> <foto> [--foco north|south|east|west] [--forcar]\n");
  console.log("slot         saida                        proporcao   onde aparece");
  for (const [slot, s] of Object.entries(SLOTS)) {
    const prop = s.largura > s.altura ? "4:3" : s.largura === s.altura ? "1:1" : "4:5";
    console.log(`${slot.padEnd(12)} ${s.arquivo.padEnd(28)} ${prop.padEnd(11)} ${s.onde}`);
  }
}

const args = process.argv.slice(2);
const foco = (() => {
  const i = args.indexOf("--foco");
  return i === -1 ? "center" : args[i + 1];
})();
const forcar = args.includes("--forcar");
const [slot, origem] = args.filter((a) => !a.startsWith("--") && a !== foco);

if (!slot || !origem) {
  ajuda();
  process.exit(1);
}

const alvo = SLOTS[slot];
if (!alvo) {
  console.error(`slot desconhecido: ${slot}\n`);
  ajuda();
  process.exit(1);
}

if (!fs.existsSync(origem)) {
  console.error(`foto nao encontrada: ${origem}`);
  process.exit(1);
}

const saida = path.join(DESTINO, alvo.arquivo);
if (fs.existsSync(saida) && !forcar) {
  console.error(`${alvo.arquivo} ja existe. Passe --forcar para trocar a foto que esta no ar.`);
  process.exit(1);
}

const dimensoes = execFileSync("magick", ["identify", "-format", "%w %h", origem], {
  encoding: "utf8",
})
  .trim()
  .split(" ")
  .map(Number);

const [larguraOrigem, alturaOrigem] = dimensoes;
if (larguraOrigem < alvo.largura || alturaOrigem < alvo.altura) {
  console.error(
    `a foto tem ${larguraOrigem}x${alturaOrigem} e o slot pede pelo menos ${alvo.largura}x${alvo.altura}: ampliar borra na tela grande, tire de novo mais perto ou em resolucao maior.`,
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(saida), { recursive: true });

// Redimensiona pela menor borda e recorta o excesso, que e o corte que preserva
// enquadramento; `-strip` tira EXIF, inclusive a coordenada de GPS que o celular
// grava e que nao tem por que ir para o site.
execFileSync("magick", [
  origem,
  "-auto-orient",
  "-resize", `${alvo.largura}x${alvo.altura}^`,
  "-gravity", foco,
  "-extent", `${alvo.largura}x${alvo.altura}`,
  "-strip",
  "-interlace", "Plane",
  "-sampling-factor", "4:2:0",
  "-quality", "82",
  saida,
]);

const kb = Math.round(fs.statSync(saida).size / 1024);
console.log(`${alvo.arquivo}: ${alvo.largura}x${alvo.altura}, ${kb} KB, foco ${foco}`);
console.log(`aparece em ${alvo.onde}`);

if (kb > TETO_KB) {
  console.log(`\nacima do teto de ${TETO_KB} KB. Rode de novo com foto menos ruidosa ou baixe a qualidade no script.`);
}

console.log("\nconferir antes de publicar:");
console.log(`  firefox --headless --screenshot /tmp/site.png --window-size=1280,900 http://localhost:3000`);
console.log("  npm run dev, olhar a pagina, e so entao commitar a foto");
