"use client";

import { useEffect, useState } from "react";
import { CHAVE_CONSENTIMENTO } from "@/lib/analytics";

/**
 * Aviso de cookies (LGPD), decidido em 23/09/2026.
 *
 * O site usa GA4 e a tag do Google Ads, que gravam cookie no navegador, e até
 * aqui não havia aviso nenhum. O `Analytics.tsx` sobe o Consent Mode v2 com
 * tudo negado, então quem não responde ou recusa só manda sinal sem cookie, e
 * o cookie só existe depois do "Aceitar".
 *
 * "Recusar" tem o mesmo tamanho e o mesmo peso do "Aceitar": botão de recusa
 * escondido ou menor é o padrão enganoso que a ANPD aponta no guia de cookies.
 * A Vercel Analytics não entra aqui porque não grava cookie.
 *
 * A escolha fica em localStorage e pode ser refeita pelo botão do rodapé, que
 * dispara o evento `cnc:cookies` para reabrir este aviso.
 */
const EVENTO_REABRIR = "cnc:cookies";

type Escolha = "aceito" | "recusado";

function aplicar(escolha: Escolha) {
  const valor = escolha === "aceito" ? "granted" : "denied";
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, escolha);
  } catch {}
  window.gtag?.("consent", "update", {
    ad_storage: valor,
    analytics_storage: valor,
    ad_user_data: valor,
    ad_personalization: valor,
  });
}

export default function AvisoCookies() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    let salvo: string | null = null;
    try {
      salvo = localStorage.getItem(CHAVE_CONSENTIMENTO);
    } catch {}
    if (!salvo) setAberto(true);

    const reabrir = () => setAberto(true);
    window.addEventListener(EVENTO_REABRIR, reabrir);
    return () => window.removeEventListener(EVENTO_REABRIR, reabrir);
  }, []);

  if (!aberto) return null;

  const escolher = (escolha: Escolha) => {
    aplicar(escolha);
    setAberto(false);
  };

  return (
    <section
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-cartao bg-noite p-5 text-papel ring-1 ring-papel/10 shadow-[0_30px_60px_-20px_rgba(7,11,24,0.6)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-6"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-papel/80">
          Este site usa cookies do Google Analytics e do Google Ads para medir
          quantas pessoas visitam e de qual anúncio vieram. Recusar não muda
          nada no uso do site.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => escolher("recusado")}
            className="btn-ghost-dark min-h-[46px] px-5"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => escolher("aceito")}
            className="btn-ghost-dark min-h-[46px] px-5"
          >
            Aceitar
          </button>
        </div>
      </div>
    </section>
  );
}

/** Botão do rodapé que reabre o aviso para a pessoa mudar a escolha. */
export function BotaoCookies() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_REABRIR))}
      className="underline-offset-4 transition-colors hover:text-paper hover:underline"
    >
      Preferências de cookies
    </button>
  );
}
