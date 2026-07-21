# PRODUCT.md — direção de marca do site da CNC

Documento curto e travado. Existe porque a direção visual já se perdeu uma vez:
a decisão original era "serif nos títulos", e sem registro virou Space Grotesk +
Inter + JetBrains Mono (o trio que um modelo escolhe quando não escolhe nada).

**Antes de mexer em tipografia, cor ou espaçamento, leia este arquivo.**
Se uma mudança contraria o que está aqui, o certo é discutir e editar este
arquivo primeiro, não abrir exceção silenciosa no componente.

## O que a CNC é

Revenda e suporte de sistemas de gestão e PDV, com base em Maceió/AL e
posicionamento nacional. Cerca de 90 clientes ativos. O dono atende.
O diferencial declarado é suporte humanizado, direto e contínuo — sem central de
chamados, sem fila.

**O que a CNC não é:** não é SaaS, não é dev tool, não é startup. O site não
deve vestir a roupa de nenhum dos três.

## Direção: direto e utilitário

Referência física: **catálogo técnico e sinalização industrial**.
Não moodboard de produto digital.

A promessa é "a gente resolve, e você fala com gente". O visual correspondente é
o de quem trabalha: legível, sem enfeite, sem ornamento que não carregue função.
Sóbrio sem ser corporativo genérico, direto sem ser tosco.

Teste rápido para qualquer decisão: **isto informa ou só decora?**
Se só decora, sai.

## Tipografia

- **Uma família: Archivo.** O contraste vem do peso (800 no título, 400 no
  corpo) e do tamanho, não de duas fontes disputando.
- Títulos fecham o tracking (`tracking-tightest`, -0.035em). Nunca abaixo disso.
- **Azeret Mono só para dado real**: telefone, CNPJ, CEP, horário, versão,
  número de etapa. Nunca como decoração "técnica".
- **Proibido:** Space Grotesk, Inter, JetBrains Mono, Poppins, Montserrat.
  Não por serem ruins, mas por serem a escolha-reflexo.

## Cor

Três papéis, cada um com função declarada. Definidos em `tailwind.config.ts` —
edite SOMENTE lá.

| Papel | Token | Função |
|---|---|---|
| Tinta | `ink` | Texto e superfícies de máxima ênfase |
| Marca | `brand` | Azul CNC saturado. **Comete superfícies inteiras**, não faixas decorativas |
| Sinal | `signal` | Amarelo. **Só CTA e dado crítico.** Se está amarelo, é ação |

Regras:

- O amarelo é a única superfície de ação do site. Não usar amarelo para "dar um
  charme" — isso queima o sinal.
- Neutros são cinza de croma ~0 (papel de catálogo), não branco-azulado. O
  branco-azulado era o reflexo "empresa de software".
- Contraste é verificado, não estimado: `npm run check:contrast`. Rode ao mexer
  em qualquer token. Menor razão aceitável: 4.5:1 para texto.

## Forma

- **Cantos retos.** `borderRadius` está travado em 2px no config. O raio grande
  é a assinatura do card de template; a ausência dele é decisão, não descuido.
- **Sem sombra, sem gradiente, sem `backdrop-blur`.** Separação vem de filete
  (border) e de superfície chapada.
- Filetes de ênfase são 2px, não 1px. Peso de placa.
- Grades densas usam `gap-px` sobre fundo contrastante (as células se separam
  pela linha, não por moldura individual).

## Movimento

- O conteúdo **nunca** depende de animação para existir. O HTML do servidor sai
  visível; a revelação melhora um estado já visível. Ver `Reveal.tsx`.
- **No máximo dois momentos de movimento por página**, escolhidos. Animar toda
  seção é preenchimento, não intenção.
- Escalonar os itens de UMA lista é legítimo. Escalonar seções inteiras não.
- Entrada curta e seca (~450ms, sem bounce, sem elástico).
- `prefers-reduced-motion` sempre respeitado.

## Anti-padrões — já removidos, não reintroduzir

Estes eram os "tells" de página gerada que a auditoria de 21/jul/2026 encontrou:

- **Eyebrow/kicker versalete espaçado acima de cada seção.** Havia 15. O site
  tem no máximo um rótulo superior, no hero, com tratamento próprio. As seções
  se separam por espaçamento e peso tipográfico.
- **Numeração decorativa 01/02/03** em blocos que não são sequência. Só numerar
  quando a ordem carrega informação (ex.: "Como funciona").
- **Ritmo uniforme** (`py-20 lg:py-28` em toda seção). Espaçamento igual elimina
  hierarquia. Ver a régua de respiro documentada no topo de `(site)/page.tsx`.
- **Grades de cards repetidas.** Uma lista de nomes é uma lista, não oito caixas
  emolduradas. Um sistema é entrada de catálogo, não cartão de marketing.
- **Malha de fundo "tech-grid"**, gradiente diagonal, botão flutuante redondo
  com sombra e `hover:scale`.

## Restrições permanentes

- **Nunca usar imagem ou vídeo gerado por IA no site.** Piora credibilidade.
  Só foto real da operação e telas dos sistemas. Enquanto a foto real não
  existir, `ImageSlot` mostra painel de marca — o que é honesto.
- **Nunca inventar** depoimentos, números, nomes de clientes ou fatos. Usar
  `{{PREENCHER:...}}`. Seção sem conteúdo real fica oculta (ver depoimentos em
  `(site)/page.tsx`), não recebe conteúdo fabricado.
- **Não citar marcas de fornecedores** (decisão de negócio — ver `sistemas.ts`).
  As soluções são referidas por porte: PRO, MÉDIO, SIMPLES.
- Conteúdo mora em `src/content/*.ts`. Trocar copy não deve tocar layout.
