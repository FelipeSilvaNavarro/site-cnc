import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/content/site";

/**
 * Recebe o lead do chat e grava na fila que o CRM puxa.
 *
 * Desde 01/10/2026 o CRM roda so na maquina do Felipe e nao recebe chamada de
 * fora, entao esta rota grava o lead na tabela lead_site de um banco Neon proprio
 * da fila (FILA_DATABASE_URL, criado em 21/10/2026, sem nenhum outro dado), e o
 * CRM local puxa de la a cada 5 minutos (crm-cnc/scripts/puxar-leads-site.ts),
 * apagando o que importou. Fala com o Neon pela API HTTP /sql com fetch, sem
 * dependencia. Nada do que a pessoa digitou vai para log, e a resposta nunca ecoa
 * o conteudo, porque o site e publico e o lead e dado pessoal (nome e celular).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILA_URL = process.env.FILA_DATABASE_URL ?? "";

const ORIGENS = new Set([
  site.url,
  site.url.replace("https://", "https://www."),
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:3000", "http://localhost:3100"] : []),
]);

// ponytail: memoria por instancia serverless, entao o teto real e este vezes o
// numero de instancias quentes. O teto global de verdade mora no CRM, contado no
// CRM, contado no banco quando ele puxa a fila (servicos/entrada-site.ts). Trocar por Upstash se robo passar pelos dois.
const JANELA_MS = 10 * 60_000;
const TETO_POR_IP = 5;
const envios = new Map<string, number[]>();

function estourou(ip: string): boolean {
  const agora = Date.now();
  const recentes = (envios.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  envios.set(ip, recentes);
  if (envios.size > 5000) envios.clear();
  return recentes.length > TETO_POR_IP;
}

/**
 * Celular brasileiro com DDD, a mesma regra de `normalizarCelular` do CRM. Fica
 * aqui tambem porque o CRM so le a fila depois, e o visitante precisa saber na
 * hora que digitou o numero errado.
 */
function celularValido(bruto: unknown): boolean {
  if (typeof bruto !== "string" || bruto.length > 25) return false;
  let d = bruto.replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  return d.length === 11 && d[2] === "9" && !/^(\d)\1+$/.test(d.slice(2));
}

/**
 * Grava uma linha na fila pela API HTTP do Neon.
 * @returns true quando o banco confirmou a gravacao.
 */
async function gravarNaFila(ip: string, dados: Record<string, unknown>): Promise<boolean> {
  const host = new URL(FILA_URL).host;
  const resposta = await fetch(`https://${host}/sql`, {
    method: "POST",
    headers: { "content-type": "application/json", "Neon-Connection-String": FILA_URL },
    body: JSON.stringify({
      query: "insert into lead_site (ip, dados) values ($1, $2)",
      params: [ip, JSON.stringify(dados)],
    }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  return resposta.ok;
}

const nada = (status: number) =>
  NextResponse.json({ ok: status === 200 }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  // Formulario de outro dominio postando aqui gastaria o teto do CRM em nome da CNC.
  const origem = request.headers.get("origin");
  if (!origem || !ORIGENS.has(origem)) return nada(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return nada(415);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "sem-ip";
  if (estourou(ip)) return nada(429);

  const bruto = await request.text();
  if (bruto.length > 2048) return nada(413);

  let corpo: Record<string, unknown>;
  try {
    corpo = JSON.parse(bruto);
  } catch {
    return nada(400);
  }

  // Isca: campo escondido que gente nao ve e robo preenche, e conversa respondida
  // em menos de 4 segundos. Responde 200 para o robo nao aprender o que o barrou.
  if (corpo.site || typeof corpo.ms !== "number" || corpo.ms < 4000) return nada(200);

  if (!FILA_URL) return nada(503);

  const { nome, comercio, segmento, cidade, momento, whatsapp, pagina, utm } = corpo;
  // 422 faz o chat pedir o numero de novo; o resto da validacao e do CRM.
  if (!celularValido(whatsapp)) return nada(422);
  try {
    // Falhando, a tela oferece o WhatsApp com o resumo para o lead nao se perder.
    const gravou = await gravarNaFila(ip, { nome, comercio, segmento, cidade, momento, whatsapp, pagina, utm });
    return nada(gravou ? 200 : 502);
  } catch {
    return nada(502);
  }
}
