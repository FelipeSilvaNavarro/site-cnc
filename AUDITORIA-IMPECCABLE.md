# Auditoria impeccable — tirar a "cara de IA" do site

> Briefing para o Claude Code executar. Auditoria feita em 21/jul/2026 lendo o código
> (`tailwind.config.ts`, `globals.css`, as 6 páginas, `Reveal.tsx`, `SectionHeading.tsx`).
> O detector automático do impeccable (`detect.mjs`) não lê `.tsx` e retornou vazio:
> os achados abaixo são leitura direta do código, não scan.
> Rodada em contexto único, sem os dois sub-agentes isolados que o `critique` exige.

## Instrução

Executar as correções abaixo na ordem. Ler a skill `impeccable` antes (`/impeccable <comando>`).
Não refazer a auditoria: os achados já estão levantados e validados pelo Felipe.

Alvo declarado pelo Felipe: **layout/cor** e **animações**. Copy e prova social não são o foco desta rodada.

## Veredito

O site não é feio, é *reconhecível*. Acumula quatro assinaturas simultâneas de template gerado.
Nenhuma isolada seria fatal; juntas, são.

## Achados

### [P0] Eyebrow em toda seção — 15 ocorrências
`globals.css:40` define `.eyebrow` (mono, uppercase, tracking-widest, azul) e ele aparece acima de
praticamente todo heading do site: "Sistemas", "Como funciona", "Segmentos", "Contato", "Parceria",
"Equipe", "Canais", "Atendimento", "Erro 404", "Área do cliente".

Tell número um de página gerada — aparece em 55–95% das gerações independente do briefing.
Um kicker nomeado e deliberado é voz; eyebrow em toda seção é gramática de IA.

**Correção:** eliminar `.eyebrow` como padrão. Manter no máximo em 1 lugar (o hero), e ali com
tratamento próprio. As demais seções se separam por espaçamento e peso tipográfico.
Remover também o prop `eyebrow` de `SectionHeading.tsx`.

### [P0] Trinca de fontes é a combinação default
`src/app/layout.tsx:2` — Space Grotesk + Inter + JetBrains Mono. **As três** estão na lista de
rejeição por reflexo do impeccable. Não é coincidência: é o que o modelo escolhe quando não escolhe.

**Contradiz decisão travada do projeto:** a decisão original era *serif nos títulos + sans no corpo*.
A implementação usou sans geométrica no display. A decisão se perdeu — restaurar.

**Correção:** trocar display e corpo. O mono só se justifica se for usado para dado real
(protocolo, versão de sistema), não como decoração "técnica". A CNC é revenda local com suporte
presencial em Maceió/AL, não é dev tool — a tipografia atual veste roupa de startup.

### [P1] Paleta é o reflexo de primeira ordem da categoria
`tailwind.config.ts` — `brand` azul royal + `accent` azul mais vivo. Duas rampas do mesmo matiz,
fundo branco-azulado (`paper.soft: #f4f6fb`), neutros slate. Se alguém adivinhasse a paleta só
sabendo "empresa de software de gestão", acertaria.

Estratégia atual é *restrained* (neutros + acento ≤10%), que é default de **produto**.
O site é **marca**, pede *committed*: uma cor saturada carregando 30–60% da superfície.

**Correção:** manter o azul do logo como identidade, mas parar de derivar tudo dele. Ou introduzir
uma segunda cor real com função (não um azul mais claro), ou comprometer superfícies inteiras com
o azul escuro em vez de espalhá-lo em duas faixas.

### [P1] `Reveal` aplicado por reflexo — 10 usos só na home
Fade + `translateY(16px)`, 700ms, stagger 50–120ms, em toda seção de todas as páginas.
Contagem por arquivo: home 10, suporte 6, sobre 4, sistemas 3, contato 2, seja-parceiro 1.
Todo elemento entra igual. Movimento sem intenção lê como preenchimento.

**Bug real junto:** `Reveal.tsx:47` inicia em `opacity-0` e depende de IntersectionObserver +
transição CSS. Em aba oculta, print, ou renderer headless a transição não dispara e a seção fica
em branco. Revelação deve *melhorar* um estado já visível, nunca controlar visibilidade.

**Correção:** remover `Reveal` de ~80% dos usos. Manter em no máximo dois momentos escolhidos.
Inverter o default para visível (o estado inicial do CSS deve ser o estado final).

### [P1] Numeração decorativa 01/02/03
`src/app/(site)/page.tsx:161-163` — `0{i + 1}` acima dos quatro blocos de "Por que a CNC".
Aqueles blocos não são sequência; a ordem não carrega informação. Numerar porque "landing page faz
assim" é o mesmo reflexo do eyebrow, um nível abaixo.

**Manter** a numeração de "Como funciona" (`page.tsx:186`) — ali é etapa real, a ordem informa.

**Correção:** tirar os números da seção 4 apenas.

### [P2] Quatro grades de cards seguidas, ritmo constante
Seções 3 (sistemas), 4 (diferenciais), 5 (como funciona) e 7 (segmentos) da home são todas grid de
blocos iguais. Toda seção usa `py-20 lg:py-28`. Espaçamento uniforme elimina hierarquia — nada
parece mais importante que o resto.

**Correção:** variar o respiro (agrupamentos apertados, separações generosas). Trocar pelo menos
duas dessas grades por outra estrutura. "Segmentos" em particular é uma lista de nomes; não precisa
de grade emoldurada.

### [P2] `tech-grid`
`globals.css:67` — malha de fundo azulada. Clichê de "empresa de software", mesmo grupo do
gradiente roxo de template.

### [P2] Contraste limítrofe
`ink-muted` (`#6a7791`) dá 4.52:1 sobre branco — passa por 0.02, sem margem.
Sobre `paper-soft` (`#f4f6fb`) **reprova** WCAG AA. E é usado exatamente sobre `paper-soft` na
barra de prova social (`page.tsx:87`). Escurecer o token.

## O que está bom — preservar

- Conteúdo separado em `src/content/*.ts`: troca de copy não toca layout.
- Seção de depoimentos escondida enquanto vazia (`page.tsx:205`) em vez de depoimento inventado.
- `prefers-reduced-motion` tratado em `globals.css:76`.
- Foco visível por teclado (`globals.css:28`).

## Plano de execução

| # | Ação | Comando | Depende do Felipe? |
|---|------|---------|--------------------|
| 1 | Matar eyebrow global + numeração decorativa | `/impeccable quieter src/app` | Não |
| 2 | Trocar tipografia (restaurar serif nos títulos) | `/impeccable typeset` | **Sim** — direção de marca |
| 3 | Repensar paleta e estratégia de cor | `/impeccable colorize` | **Sim** — direção de marca |
| 4 | Podar `Reveal` + corrigir gate de visibilidade | `/impeccable animate` | Não |
| 5 | Variar ritmo, quebrar grades repetidas | `/impeccable layout` | Não |
| 6 | Passe final | `/impeccable polish` | Não |

Itens 1, 4 e 5 resolvem a maior parte da sensação e podem rodar direto.

## Pendência que trava os itens 2 e 3

O projeto **não tem `PRODUCT.md`** — por isso a direção de marca se perde a cada sessão
(foi assim que "serif nos títulos" virou Space Grotesk).

Rodar `/impeccable init` antes dos itens 2 e 3. A pergunta a responder ali: qual é a personalidade
da CNC além de "software"? Revenda local, suporte presencial, dono atende — isso tem um visual que
não é o do SaaS genérico. Três direções possíveis: sóbrio/institucional, direto/utilitário,
ou local/pessoal.

## Restrições permanentes

- **Não usar imagem ou vídeo gerado por IA no site.** Piora credibilidade. Só foto real da operação
  e telas dos sistemas.
- Não inventar depoimentos, números, nomes de clientes ou fatos. Usar `{{PREENCHER:...}}`.
- Não citar marcas de fornecedores (decisão de negócio).
