"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Diz se tem gente atendendo agora, pelo relógio de Maceió e não do visitante.
 *
 * O servidor e o primeiro render do navegador mostram o horário fixo, que é
 * sempre verdade, e só depois de montar o componente troca pelo estado do
 * momento. Assim não há diferença de hidratação e, sem JavaScript, a pessoa
 * continua lendo o horário.
 *
 * As horas (6 e 22) são as mesmas de `site.horario` e do JSON-LD do layout.
 * Mudou lá, muda aqui.
 */
const ABRE = 6;
const FECHA = 22;

function atendendoAgora(): boolean {
  const hora = Number(
    new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "America/Maceio",
    }).format(new Date()),
  );
  return hora >= ABRE && hora < FECHA;
}

export default function StatusAtendimento({
  tom = "claro",
  className = "",
}: {
  tom?: "claro" | "escuro";
  className?: string;
}) {
  const [aberto, setAberto] = useState<boolean | null>(null);

  useEffect(() => {
    const atualizar = () => setAberto(atendendoAgora());
    atualizar();
    const id = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const texto =
    aberto === null
      ? site.horario.semana
      : aberto
        ? "Atendendo agora, até as 22h"
        : "Fora do horário, a partir das 6h. Mande a mensagem que ela abre a fila";

  // Ponto amarelo só quando há gente atendendo: é dado que pede ação agora.
  // Fora do horário o ponto vira anel vazio, sem cor de sinal.
  const ponto =
    aberto === false
      ? tom === "escuro"
        ? "border-2 border-paper/50"
        : "border-2 border-ink-muted"
      : "bg-signal-500";

  return (
    <p
      className={`flex items-center gap-2.5 text-sm font-semibold ${
        tom === "escuro" ? "text-paper" : "text-ink"
      } ${className}`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 flex-none ${ponto}`} />
      {texto}
    </p>
  );
}
