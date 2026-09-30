import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/content/site";

/**
 * Recebe o lead do chat e repassa para o CRM.
 *
 * Existe para o token do CRM nunca chegar ao navegador: o visitante fala com esta
 * rota, que roda na Vercel do site, e so ela conhece CRM_SITE_TOKEN. Nada do que
 * a pessoa digitou vai para log, e a resposta nunca ecoa o conteudo, porque o
 * site e publico e o lead e dado pessoal (nome e celular).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRM_URL = process.env.CRM_URL ?? "";
const CRM_TOKEN = process.env.CRM_SITE_TOKEN ?? "";

const ORIGENS = new Set([
  site.url,
  site.url.replace("https://", "https://www."),
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:3000", "http://localhost:3100"] : []),
]);

// ponytail: memoria por instancia serverless, entao o teto real e este vezes o
// numero de instancias quentes. O teto global de verdade mora no CRM, contado no
// banco (servicos/entrada-site.ts). Trocar por Upstash se robo passar pelos dois.
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

  if (!CRM_URL || !CRM_TOKEN) return nada(503);

  const { nome, comercio, segmento, cidade, momento, whatsapp, pagina, utm } = corpo;
  try {
    const resposta = await fetch(`${CRM_URL}/api/v1/sync/site`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-crm-token": CRM_TOKEN,
        "x-forwarded-for": ip,
      },
      body: JSON.stringify({ nome, comercio, segmento, cidade, momento, whatsapp, pagina, utm }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    // 400 e 409 sao do visitante (celular invalido); o resto e falha nossa, e a
    // tela oferece o WhatsApp com o resumo para o lead nao se perder.
    if (resposta.ok) return nada(200);
    return nada(resposta.status === 400 || resposta.status === 409 ? 422 : 502);
  } catch {
    return nada(502);
  }
}
