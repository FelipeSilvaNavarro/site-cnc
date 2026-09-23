# PRODUCT.md — direção de marca do site da CNC

Leia antes de mexer em tipografia, cor, espaçamento ou movimento. Mudança que
contraria o que está aqui começa editando este arquivo, não abrindo exceção
silenciosa num componente.

## Histórico da direção

- **Até 21/07/2026:** Space Grotesk + Inter + JetBrains Mono, azul sobre azul,
  eyebrow em toda seção. Auditoria da `impeccable` chamou de cara de template.
- **21/07 a 23/09/2026:** "direto e utilitário", catálogo técnico e
  sinalização industrial, cantos retos, sem sombra, sem gradiente, no máximo
  dois movimentos por página. Em 23/09/2026 o Felipe olhou o resultado
  publicado e chamou de "horrivelmente horrível", pedindo site bonito, fora da
  curva, sem cara de IA e com efeito de rolagem. As travas de movimento e de
  forma dessa fase eram exatamente o que impedia o pedido, então caíram.
- **Desde 23/09/2026:** a direção abaixo.

## O que a CNC é

Revenda e suporte de sistema de gestão e PDV em Maceió, 93 clientes ativos,
nota 5,0 no Google. O dono atende, sem central e sem fila. O cliente é dono de
mercadinho, açougue, padaria, loja e distribuidora de Alagoas, que abre o site
no celular, muitas vezes vindo do Google ou de um anúncio.

## Direção em uma frase

**Balcão de Maceió à noite:** azul-noite profundo, tipografia larga de
letreiro de fachada, amarelo de etiqueta de preço como único acento, o cupom
fiscal como objeto de assinatura, e uma rolagem que monta cenas em vez de
empilhar blocos.

## Referências (pesquisadas em 23/09/2026, Awwwards, abertas no Firefox)

| Site | O que empresta |
|---|---|
| daqconsulting.com | Texto grande que acende palavra por palavra conforme a rolagem |
| cerebrium.ai | Folha clara com canto arredondado subindo por cima do topo escuro |
| thirdway.com | Frase curta e enorme por cena, ritmo de uma ideia por tela |
| mindrobotics.com | Tipografia gigante que atravessa a tela e cena que trava |
| boonglobal.io | Fundo escuro com um único objeto visual forte, sem foto de banco |
| wama.com.br | Referência brasileira de acabamento: respiro, título centrado, faixa de marcas |

Nenhuma marca, texto ou imagem dessas referências entra no site. Elas emprestam
mecânica e ritmo.

## Cor

| Papel | Token | Uso |
|---|---|---|
| Noite | `noite` (#070b18) | Fundo das cenas escuras: topo, portes, preço, rodapé |
| Papel | `papel` (#f4f5f7) | A folha clara que sobe por cima. Cinza de croma zero, nunca creme |
| Tinta | `ink` | Texto sobre papel |
| Marca | `brand` | Azul do logo. Luz do topo, portes, detalhes |
| Sinal | `signal` | Amarelo de etiqueta. Ação e preço, e o cartão de destaque |

Sem roxo, sem gradiente em texto, sem vidro fosco decorativo. A única luz é um
halo azul do logo atrás do pégaso no topo.

## Tipografia

- **Archivo, com o eixo de largura.** Título em Archivo larga (font-stretch
  115% a 125%, peso 700 a 800), que é a letra de letreiro de fachada. Corpo em
  Archivo normal, 400. Uma família, dois registros.
- **Azeret Mono** só no cupom fiscal e em dado real (telefone, CNPJ, CEP).
- Proibidas: Space Grotesk, Inter, JetBrains Mono, Poppins, Montserrat e o
  resto da lista de reflexo da `impeccable`.

## Movimento

Movimento agora é parte da marca, com regra:

- **Cada cena tem um movimento, e ele conta alguma coisa.** O cupom imprime
  porque o sistema vende; o texto acende porque a promessa se lê; a folha sobe
  porque a página muda de assunto. Nada de fade igual em toda seção.
- **Stack:** Lenis (rolagem suave) + GSAP ScrollTrigger (cenas). Código em
  `src/components/rolagem/`.
- **O HTML do servidor sai completo e visível.** Animação melhora um estado
  que já existe; sem JavaScript o site aparece inteiro.
- **`prefers-reduced-motion` desliga tudo:** sem Lenis, sem pin, sem
  animação, conteúdo parado e legível.
- **Celular não é versão cortada:** as cenas travadas viram sequência vertical
  com a mesma animação disparada ao entrar.

## Forma

- Folha com canto de 28 a 36px no topo, cartões com 20 a 24px, botão em
  pílula. O raio agora é linguagem: a folha que sobe, o cupom, a etiqueta.
- Sombra só para dar peso físico ao cupom e à folha. Nunca sombra de card.

## Anti-padrões que continuam proibidos

- Eyebrow versalete espaçado acima de cada seção; numeração 01/02/03 de enfeite;
  grade de três cards iguais com ícone; métrica gigante com rótulo pequeno em
  três colunas; metade do título pintada em outra cor; gradiente roxo-azul.

## Restrições permanentes

- **Nunca imagem ou vídeo gerado por IA, nunca foto de banco.** Só foto real da
  operação e captura real dos sistemas (`npm run foto`). O cupom fiscal é
  ilustração declarada de um objeto do comércio, não tela do sistema.
- **Nunca inventar** depoimento, número, cliente ou fato.
- **Não citar marca de fornecedor.** Portes: PRO, MÉDIO, SIMPLES.
- Conteúdo mora em `src/content/*.ts`.

## Aprovação

Publicado em 23/09/2026 (commit `e0b66c5`) e aprovado pelo Felipe na hora:
"CARALHOOO TA MT FODAAAA, AGORA SIM". **Esta direção está travada.** Mudança de
cor, fonte, movimento ou estrutura de cena começa perguntando a ele se é mudança
de direção ou ajuste pontual.

## Como mexer depois (mapa de manutenção)

### Onde mora cada coisa

| O que | Onde |
|---|---|
| Texto de qualquer página | `src/content/*.ts` (home, sistemas, suporte, sobre, site). Trocar texto não toca layout |
| Telefone, horário, cidades, nota do Google, link de avaliação, preço | `src/content/site.ts` (fonte única, alimenta página, JSON-LD e llms.txt) |
| Número de clientes (93) | `src/content/metrics.json`, atualizado sozinho pela action do vault |
| Cores, raio, animações de CSS | `tailwind.config.ts` |
| Botões, título largo (`larga`, `semilarga`), grão, pégaso em traço | `src/app/globals.css` |
| Cenas de rolagem | `src/components/rolagem/` (uma cena por arquivo) |
| Topo das páginas internas | `src/components/TopoPagina.tsx` |
| Fechamento amarelo "Chama no WhatsApp" | `src/components/FaixaContato.tsx` |
| Cabeçalho, menu do celular, botão flutuante, rodapé | `src/components/Header.tsx`, `WhatsAppFloat.tsx`, `Footer.tsx` |
| Fotos e capturas | `public/fotos/`, sempre pelo `npm run foto <slot> <arquivo>`, mapa em `public/fotos/LEIA-ME.md` |

### As cenas e o que cada uma faz

| Cena | Arquivo | Desktop | Celular |
|---|---|---|---|
| Topo com folha | `TopoComFolha.tsx` | topo preso, folha sobe por cima, conteúdo recua | igual |
| Título | `TituloMascara.tsx` | palavras sobem por trás da máscara, só CSS | igual |
| Pégaso | `PegasoTraco.tsx` | traço se desenha e acende, só CSS | igual |
| Manifesto | `TextoAcende.tsx` | palavras acendem com a rolagem | igual |
| Cupom fiscal | `CenaCupom.tsx` | trava 3 telas, papel sai da impressora em 4 passos | sem travar, mesma sequência |
| Portes | `CenaPortes.tsx` | trava, esteira anda de lado | painéis empilhados |
| Diferenciais | `CartoesEmpilhados.tsx` | cartões presos se empilham | igual |
| Etapas | `LinhaEtapas.tsx` | linha amarela enche e acende cada etapa | igual |
| Cidades | `FaixaCidades.tsx` | duas linhas gigantes em sentidos opostos | igual |
| Preço | `EtiquetaPreco.tsx` | etiqueta balança | igual |

Toda cena se monta por `useCena` (`rolagem/gsap.ts`), que usa `gsap.matchMedia`
com `MIDIA.desktop`, `MIDIA.celular` e `MIDIA.movimento`. Cena nova segue o mesmo
molde, senão ela roda para quem pediu menos movimento.

### Como conferir antes de publicar

1. `npm run build` (com `nice`, a máquina é fraca) e `npx next start -p 3100`.
2. `node scripts/conferir-rolagem.mjs / 1440 700 40 home` e o mesmo em `390`, e
   olhar as fotos em `/tmp/rolagem/`. Screenshot de página inteira não serve:
   ele não mostra cena nenhuma.
3. Repetir com `reducedMotion: "reduce"` no roteiro: tudo tem que aparecer
   inteiro e parado.
4. `npm run check:contrast` se mexeu em cor.
5. Commit, e o push só com o aval do Felipe (deploy automático na Vercel).

### Armadilhas que já custaram retrabalho (23/09/2026)

- **Layout que só existe com a cena rodando usa a variante `cenas:`** (ex.:
  `lg:cenas:flex-row`). O `<html>` ganha `data-cenas` num script do layout raiz
  antes da primeira pintura. Sem isso, sem JavaScript ou com movimento reduzido,
  a esteira de portes ficava deitada e MÉDIO e SIMPLES sumiam para fora da tela.
- **Título largo estoura coluna.** Archivo a 125% de largura ocupa ~0,72 em por
  letra; calcular `letras × 0,72 × tamanho` contra a largura da coluna antes de
  escolher o `clamp`. Foi assim com "SIMPLES", "atendimento" e "R$ 150" no celular.
- **Nada fica fora de elemento com `mask`.** O papel do cupom usa máscara de
  serrilha e cortava as baixas de estoque; tudo que é do papel mora dentro dele.
- **Não escurecer cartão amarelo** (`brightness`) no empilhamento: vira oliva.
- **Cupom revela de cima para baixo com `clip-path`**, não com `translate`, senão
  aparece primeiro o rodapé do cupom.
- **Botão flutuante some sobre a faixa amarela** (`data-sem-flutuante`), senão
  some de verdade: amarelo sobre amarelo.
