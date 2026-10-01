"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LinkContato from "./LinkContato";
import IconeWhatsApp from "./IconeWhatsApp";
import { site } from "@/content/site";
import { rastrearContato } from "@/lib/analytics";

/**
 * Chat de captura de lead, no molde do Leadster que o Felipe viu no site da
 * Laikos: conversa roteirizada, uma pergunta por vez, e o lead cai no CRM com
 * tarefa para o dia.
 *
 * Substitui o botão flutuante do WhatsApp (WhatsAppFloat, que fica no repositório
 * desligado) porque dois flutuantes no mesmo canto dividem o clique. O WhatsApp
 * direto continua a um toque, no cabeçalho do chat e na primeira resposta, para
 * quem já chegou decidido.
 *
 * Segurança: nada do que a pessoa digita vai para localStorage, URL ou medição.
 * O texto é renderizado como texto pelo React, nunca como HTML, e o envio passa
 * por /api/lead, que é quem conhece o token do CRM.
 */

/**
 * Origem da visita, lida na primeira página e guardada na aba até o envio, porque
 * quem chega por anúncio na home e abre o chat no /suporte perderia a UTM da URL.
 * Prioridade: UTM, gclid (Google Ads com marcação automática, que não manda UTM),
 * site de onde veio, e "direto" quando não há nada. Não guarda nada digitado.
 */
const CHAVE_ORIGEM = "cnc-origem";
function origemDaVisita(): string {
  const p = new URLSearchParams(window.location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term"]
    .map((k) => p.get(k))
    .filter(Boolean)
    .join(" / ");
  if (utm) return utm;
  if (p.get("gclid") || p.get("gbraid") || p.get("wbraid")) return "google ads";
  try {
    const ref = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (ref && ref !== window.location.hostname.replace(/^www\./, "")) return ref;
  } catch {}
  return "direto";
}
function lerOrigem(): string {
  try {
    const salva = sessionStorage.getItem(CHAVE_ORIGEM);
    if (salva) return salva;
    const nova = origemDaVisita();
    sessionStorage.setItem(CHAVE_ORIGEM, nova);
    return nova;
  } catch {
    return origemDaVisita();
  }
}

type Momento = "TROCAR" | "PRIMEIRO" | "SO_NOTA";
type Respostas = {
  nome: string;
  comercio: string;
  segmento: string;
  cidade: string;
  momento: Momento | "";
  whatsapp: string;
};
type Opcao = { rotulo: string; valor: string };
type Mensagem = { de: "bot" | "eu"; texto: string };
type Etapa =
  | "inicio"
  | "nome"
  | "comercio"
  | "segmento"
  | "cidade"
  | "momento"
  | "whatsapp"
  | "espera"
  | "pronto"
  | "falhou";

const RAMOS: Opcao[] = [
  { rotulo: "Mercadinho", valor: "Mercearia / mercadinho" },
  { rotulo: "Supermercado", valor: "Supermercado" },
  { rotulo: "Padaria", valor: "Padaria / panificadora" },
  { rotulo: "Açougue", valor: "Açougue / casa de carnes" },
  { rotulo: "Restaurante ou lanchonete", valor: "Restaurante" },
  { rotulo: "Distribuidora", valor: "Distribuidora (geral)" },
  { rotulo: "Loja", valor: "Loja de varejo" },
  { rotulo: "Outro ramo", valor: "Outro" },
];
const CIDADES: Opcao[] = [
  { rotulo: "Maceió", valor: "Maceió" },
  { rotulo: "Outra cidade de Alagoas", valor: "Interior de Alagoas" },
  { rotulo: "Fora de Alagoas", valor: "Fora de Alagoas" },
];
const MOMENTOS: Opcao[] = [
  { rotulo: "Já uso e quero trocar", valor: "TROCAR" },
  { rotulo: "Não uso nenhum", valor: "PRIMEIRO" },
  { rotulo: "Só preciso emitir nota", valor: "SO_NOTA" },
];

const VAZIO: Respostas = {
  nome: "",
  comercio: "",
  segmento: "",
  cidade: "",
  momento: "",
  whatsapp: "",
};

/** (82) 99999-9999 enquanto digita. Só formata, quem valida é o CRM. */
function mascararCelular(bruto: string): string {
  const d = bruto.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
const celularValido = (v: string) => {
  const d = v.replace(/\D/g, "");
  return d.length === 11 && d[2] === "9";
};
const primeiroNome = (n: string) => n.trim().split(/\s+/)[0] ?? "";

function resumoParaWhatsApp(r: Respostas): string {
  const momento = MOMENTOS.find((m) => m.valor === r.momento)?.rotulo.toLowerCase();
  const onde = [r.segmento, r.cidade].filter(Boolean).join(", ");
  return (
    `Oi! Aqui é ${r.nome.trim()}, do comércio ${r.comercio.trim()}${onde ? ` (${onde})` : ""}` +
    `${momento ? `, ${momento}` : ""}, e vim pelo chat do site saber qual sistema serve e quanto fica`
  );
}

function PegasoAvatar({ tamanho = "h-10 w-10" }: { tamanho?: string }) {
  return (
    <span
      className={`relative flex ${tamanho} flex-none items-center justify-center rounded-full bg-noite ring-1 ring-papel/15`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pegaso-branco.svg" alt="" className="h-[55%] w-[55%] object-contain" />
    </span>
  );
}

export default function ChatLead() {
  // Grava a origem já na página de chegada, antes de qualquer navegação interna.
  useEffect(() => {
    lerOrigem();
  }, []);
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [convite, setConvite] = useState(false);
  const [etapa, setEtapa] = useState<Etapa>("inicio");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [digitando, setDigitando] = useState(false);
  const [campo, setCampo] = useState("");
  const [erroCampo, setErroCampo] = useState("");
  const [isca, setIsca] = useState("");
  const respostas = useRef<Respostas>({ ...VAZIO });
  const inicioConversa = useRef(0);
  const fila = useRef<Promise<void>>(Promise.resolve());
  const lista = useRef<HTMLDivElement>(null);
  const entrada = useRef<HTMLInputElement>(null);
  const reduzido = useRef(false);

  // Bot fala em fila, com o "digitando" entre as mensagens, que é o que faz o
  // roteiro parecer conversa. Movimento reduzido tira a espera.
  const falar = useCallback((textos: string[], depois?: Etapa) => {
    fila.current = fila.current.then(async () => {
      for (const texto of textos) {
        if (!reduzido.current) {
          setDigitando(true);
          await new Promise((r) => setTimeout(r, Math.min(1400, 450 + texto.length * 14)));
        }
        setDigitando(false);
        setMensagens((m) => [...m, { de: "bot", texto }]);
      }
      if (depois) setEtapa(depois);
    });
  }, []);

  const abrir = useCallback(() => {
    setAberto(true);
    setConvite(false);
    try {
      sessionStorage.setItem("cnc-chat-visto", "1");
    } catch {}
    if (!inicioConversa.current) {
      inicioConversa.current = Date.now();
      falar(
        [
          "Oi, tudo bem?",
          "Quer descobrir qual sistema serve para o seu comércio e quanto fica por mês? Leva menos de um minuto",
        ],
        "inicio",
      );
    }
  }, [falar]);

  // Mesmo gatilho do flutuante antigo: aparece depois da primeira tela e some
  // sobre a faixa amarela do fechamento, onde o convite gigante já é o botão.
  useEffect(() => {
    reduzido.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sobreFaixa = false;
    const decidir = () => setVisivel(window.scrollY > window.innerHeight * 0.6 && !sobreFaixa);
    const obs = new IntersectionObserver(
      (e) => {
        sobreFaixa = e.some((x) => x.isIntersecting);
        decidir();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    document.querySelectorAll("[data-sem-flutuante]").forEach((el) => obs.observe(el));
    decidir();
    window.addEventListener("scroll", decidir, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", decidir);
    };
  }, [pathname]);

  // Convite ao lado do botão, uma vez por sessão. No computador o chat abre
  // sozinho como no Leadster; no celular só o balão, porque painel abrindo
  // sozinho por cima da página é o que faz a pessoa fechar a aba.
  useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem("cnc-chat-visto") === "1";
    } catch {}
    if (visto) return;
    // Com o aviso de cookies aberto (só existe em produção, com o GA ligado) o
    // convite nasceria escondido atrás dele no celular, então os dois gatilhos
    // esperam a pessoa decidir o aviso. Achado na conferência no ar, 29/09/2026.
    const avisoAberto = () => Boolean(document.querySelector('[aria-label="Aviso de cookies"]'));
    const inicio = Date.now();
    let convidou = false;
    const relogio = setInterval(() => {
      if (avisoAberto()) return;
      const passou = Date.now() - inicio;
      if (!convidou && passou >= 9000) {
        convidou = true;
        setConvite(true);
      }
      if (passou >= 20000) {
        clearInterval(relogio);
        if (window.matchMedia("(min-width: 1024px)").matches && window.scrollY > 200) abrir();
      }
    }, 1000);
    return () => clearInterval(relogio);
  }, [abrir]);

  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: "smooth" });
  }, [mensagens, digitando, etapa]);

  useEffect(() => {
    if (aberto && ["nome", "comercio", "whatsapp"].includes(etapa)) entrada.current?.focus();
  }, [aberto, etapa]);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  const eu = (texto: string) => setMensagens((m) => [...m, { de: "eu", texto }]);

  async function enviar() {
    setEtapa("espera");
    const utm = lerOrigem().slice(0, 200);
    let status = 0;
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...respostas.current,
          pagina: window.location.pathname,
          utm: utm || undefined,
          site: isca,
          ms: Date.now() - inicioConversa.current,
        }),
      });
      status = r.status;
    } catch {}

    const nome = primeiroNome(respostas.current.nome);
    if (status === 200) {
      rastrearContato("chat", "chat");
      falar(
        [
          `Pronto, ${nome}! Recebi tudo por aqui`,
          `O Felipe vai te chamar no WhatsApp com o valor certo para o seu caso, e o atendimento vai das 6h às 22h, todos os dias`,
          "Se quiser adiantar a conversa, é só tocar no botão abaixo",
        ],
        "pronto",
      );
    } else if (status === 422) {
      falar(["Esse número não parece um celular com DDD, confere para mim?"], "whatsapp");
    } else {
      falar(
        [
          `${nome}, não consegui registrar por aqui, mas nada se perde`,
          "Toque no botão abaixo que a conversa já abre no WhatsApp com o que você me contou",
        ],
        "falhou",
      );
    }
  }

  function escolher(o: Opcao) {
    eu(o.rotulo);
    const r = respostas.current;
    if (etapa === "inicio") {
      falar(["Para isso preciso de umas informações rápidas", "Qual é o seu nome?"], "nome");
    } else if (etapa === "segmento") {
      r.segmento = o.valor;
      falar(["Em qual cidade fica a loja?"], "cidade");
    } else if (etapa === "cidade") {
      r.cidade = o.valor;
      falar(["E hoje, você já usa algum sistema?"], "momento");
    } else if (etapa === "momento") {
      r.momento = o.valor as Momento;
      falar(
        [
          `Os planos começam em ${site.precos.pisoMensalPorExtenso}, e o que muda o valor é o tamanho da operação`,
          "Última pergunta: qual é o seu WhatsApp com DDD? É por ele que a gente irá te chamar",
        ],
        "whatsapp",
      );
    }
    setEtapa("espera");
  }

  function responder(e: React.FormEvent) {
    e.preventDefault();
    const valor = campo.trim();
    const r = respostas.current;
    if (etapa === "nome" || etapa === "comercio") {
      if (valor.length < 2) return setErroCampo("Escreve pelo menos duas letras");
    }
    if (etapa === "whatsapp" && !celularValido(valor)) {
      return setErroCampo("Coloca o celular com DDD, assim: (82) 99999-9999");
    }
    setErroCampo("");
    setCampo("");
    eu(valor);
    if (etapa === "nome") {
      r.nome = valor.slice(0, 80);
      falar([`Prazer, ${primeiroNome(r.nome)}! Qual é o nome do seu comércio?`], "comercio");
      setEtapa("espera");
    } else if (etapa === "comercio") {
      r.comercio = valor.slice(0, 120);
      falar(["Qual é o ramo?"], "segmento");
      setEtapa("espera");
    } else if (etapa === "whatsapp") {
      r.whatsapp = valor;
      void enviar();
    }
  }

  const opcoes: Opcao[] | null =
    digitando
      ? null
      : etapa === "inicio" && mensagens.length >= 2
        ? [{ rotulo: "Sim, vamos lá", valor: "sim" }]
        : etapa === "segmento"
          ? RAMOS
          : etapa === "cidade"
            ? CIDADES
            : etapa === "momento"
              ? MOMENTOS
              : null;

  const pedeTexto = !digitando && ["nome", "comercio", "whatsapp"].includes(etapa);

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 z-40 flex items-end gap-3 transition-[transform,opacity] duration-500 ease-expo sm:bottom-6 sm:right-6 ${
          visivel && !aberto ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {convite && (
          <div className="relative mb-1 max-w-[15.5rem] rounded-[20px] rounded-br-md bg-papel-claro py-3 pl-4 pr-9 text-[0.9rem] leading-snug text-ink shadow-[0_18px_40px_-18px_rgba(7,11,24,0.55)] ring-1 ring-ink/10">
            <button
              type="button"
              onClick={abrir}
              className="text-left after:absolute after:inset-0 after:content-['']"
            >
              Quer saber quanto fica o sistema para a sua loja?
            </button>
            <button
              type="button"
              onClick={() => setConvite(false)}
              aria-label="Fechar convite"
              className="absolute right-1 top-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={abrir}
          aria-label="Abrir conversa com a CNC"
          aria-expanded={aberto}
          className="group relative inline-flex h-14 items-center gap-3 rounded-full bg-noite pl-1.5 pr-1.5 text-papel ring-4 ring-noite/10 transition-colors duration-300 hover:bg-noite-800 sm:pr-6"
        >
          <PegasoAvatar tamanho="h-11 w-11" />
          <span className="absolute left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-signal-500 ring-2 ring-noite" aria-hidden="true" />
          <span className="hidden text-[0.95rem] font-semibold sm:inline">Quanto fica pra minha loja?</span>
        </button>
      </div>

      <section
        role="dialog"
        aria-modal="false"
        aria-label="Conversa com a CNC Sistemas"
        className={`fixed inset-x-2 bottom-2 z-50 flex h-[min(620px,calc(100dvh-1rem))] flex-col overflow-hidden rounded-[28px] bg-papel shadow-[0_40px_80px_-30px_rgba(7,11,24,0.65)] ring-1 ring-ink/10 transition-[transform,opacity] duration-500 ease-expo sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[390px] ${
          aberto ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
        }`}
        inert={!aberto}
      >
        <header className="grao flex items-center gap-3 bg-noite px-4 py-3.5 text-papel">
          <PegasoAvatar tamanho="h-11 w-11" />
          <div className="relative z-10 min-w-0 flex-1">
            <p className="semilarga truncate text-[1.02rem]">CNC Sistemas</p>
            <p className="flex items-center gap-1.5 text-[0.8rem] text-papel/70">
              <span className="h-2 w-2 rounded-full bg-signal-500" aria-hidden="true" />
              Atendimento das 6h às 22h
            </p>
          </div>
          <LinkContato
            origem="chat"
            aria-label="Ir direto para o WhatsApp"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-papel/80 hover:bg-papel/10 hover:text-papel"
          >
            <IconeWhatsApp className="h-5 w-5" />
          </LinkContato>
          <button
            type="button"
            onClick={() => setAberto(false)}
            aria-label="Fechar conversa"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-papel/80 hover:bg-papel/10 hover:text-papel"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div
          ref={lista}
          data-lenis-prevent
          className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-4 py-5"
          aria-live="polite"
        >
          {mensagens.map((m, i) =>
            m.de === "bot" ? (
              <div key={i} className="chat-entra flex items-end gap-2 pr-10">
                <span className={mensagens[i + 1]?.de === "bot" ? "invisible" : ""}>
                  <PegasoAvatar tamanho="h-7 w-7" />
                </span>
                <p className="rounded-[20px] rounded-bl-md bg-papel-claro px-4 py-2.5 text-[0.95rem] leading-snug text-ink ring-1 ring-ink/[0.07]">
                  {m.texto}
                </p>
              </div>
            ) : (
              <div key={i} className="chat-entra flex justify-end pl-12">
                <p className="rounded-[20px] rounded-br-md bg-signal-500 px-4 py-2.5 text-[0.95rem] font-semibold leading-snug text-ink">
                  {m.texto}
                </p>
              </div>
            ),
          )}

          {digitando && (
            <div className="flex items-end gap-2">
              <PegasoAvatar tamanho="h-7 w-7" />
              <p className="flex gap-1 rounded-[20px] rounded-bl-md bg-papel-claro px-4 py-3.5 ring-1 ring-ink/[0.07]" aria-label="Digitando">
                {[0, 1, 2].map((n) => (
                  <span key={n} className="chat-ponto h-1.5 w-1.5 rounded-full bg-ink-muted" style={{ animationDelay: `${n * 160}ms` }} />
                ))}
              </p>
            </div>
          )}

          {opcoes && (
            <div className="chat-entra flex flex-wrap justify-end gap-2 pl-8 pt-1">
              {opcoes.map((o) => (
                <button
                  key={o.valor}
                  type="button"
                  onClick={() => escolher(o)}
                  className="min-h-[44px] rounded-full border border-ink/20 bg-transparent px-4 text-[0.92rem] font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-papel"
                >
                  {o.rotulo}
                </button>
              ))}
              {etapa === "inicio" && (
                <LinkContato
                  origem="chat"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-[0.92rem] font-semibold text-ink-soft underline-offset-4 hover:underline"
                >
                  <IconeWhatsApp className="h-4 w-4" /> Prefiro ir direto pro WhatsApp
                </LinkContato>
              )}
            </div>
          )}

          {(etapa === "pronto" || etapa === "falhou") && !digitando && (
            <div className="chat-entra flex justify-end pt-1">
              <LinkContato
                origem="chat"
                mensagem={resumoParaWhatsApp(respostas.current)}
                className="btn-primary min-h-[48px] px-5"
              >
                <IconeWhatsApp className="h-5 w-5" />
                {etapa === "pronto" ? "Adiantar no WhatsApp" : "Abrir no WhatsApp"}
              </LinkContato>
            </div>
          )}
        </div>

        <form onSubmit={responder} className="border-t border-ink/10 bg-papel px-3 pb-2 pt-3">
          {/* Isca para robô: fora da tela, fora do tab e sem rótulo para leitor de tela. */}
          <input
            type="text"
            name="site"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={isca}
            onChange={(e) => setIsca(e.target.value)}
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />
          <div
            className={`flex items-center gap-2 rounded-full border bg-papel-claro pl-4 pr-1.5 transition-colors ${
              erroCampo ? "border-red-700" : pedeTexto ? "border-ink/40 focus-within:border-ink" : "border-ink/10"
            }`}
          >
            <label htmlFor="chat-campo" className="sr-only">
              Sua resposta
            </label>
            <input
              id="chat-campo"
              ref={entrada}
              value={campo}
              onChange={(e) =>
                setCampo(etapa === "whatsapp" ? mascararCelular(e.target.value) : e.target.value)
              }
              disabled={!pedeTexto}
              maxLength={etapa === "whatsapp" ? 15 : etapa === "comercio" ? 120 : 80}
              type={etapa === "whatsapp" ? "tel" : "text"}
              inputMode={etapa === "whatsapp" ? "numeric" : "text"}
              autoComplete={etapa === "whatsapp" ? "tel-national" : etapa === "nome" ? "given-name" : "organization"}
              placeholder={
                etapa === "whatsapp" ? "(82) 99999-9999" : pedeTexto
                    ? "Sua resposta..."
                    : etapa === "pronto" || etapa === "falhou"
                      ? "Conversa concluída"
                      : "Escolha uma opção acima"
              }
              aria-invalid={Boolean(erroCampo)}
              aria-describedby={erroCampo ? "chat-erro" : undefined}
              className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted disabled:cursor-not-allowed"
              style={{ outline: "none", boxShadow: "none" }}
            />
            <button
              type="submit"
              disabled={!pedeTexto || !campo.trim()}
              aria-label="Enviar resposta"
              className="btn-seta h-10 w-10 disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <p id="chat-erro" role="alert" className="min-h-[1.1rem] px-4 pt-1 text-[0.78rem] font-semibold text-red-700">
            {erroCampo}
          </p>
          <p className="px-4 pb-1 text-[0.72rem] leading-snug text-ink-muted">
            Seus dados ficam só com a CNC, para o retorno sobre o sistema.{" "}
            <a href="/privacidade" className="underline underline-offset-2 hover:text-ink">
              Privacidade
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
