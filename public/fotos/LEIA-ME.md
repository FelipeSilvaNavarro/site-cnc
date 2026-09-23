# Fotos do site da CNC

Coloque aqui as fotos REAIS. Os nomes abaixo já estão referenciados no código;
basta salvar o arquivo com o nome exato que a imagem aparece automaticamente
(sem editar código). Use JPG ou WEBP, otimizadas.

## Onde cada foto entra (mapa conferido em 23/09/2026, depois do redesenho)

Toda foto é opcional: sem o arquivo, o lugar dela simplesmente não aparece (nada
de painel vazio). Soltou o arquivo pelo `npm run foto` e publicou, ela entra sozinha.

| Slot do `npm run foto` | Arquivo | Onde aparece | O que fotografar |
| --- | --- | --- | --- |
| `tela-pro` | `telas/pro.jpg` | Home, painel do PRO na esteira de portes; `/sistemas`, ficha do PRO | Captura da tela do sistema PRO (PDV ou retaguarda) |
| `tela-medio` | `telas/medio.jpg` | Home, painel do MÉDIO; `/sistemas`, ficha do MÉDIO | Captura da tela do MÉDIO |
| `tela-simples` | `telas/simples.jpg` | Home, painel do SIMPLES; `/sistemas`, ficha do SIMPLES | Captura da tela do SIMPLES |
| `suporte` | `suporte.jpg` | `/suporte`, faixa larga logo abaixo do texto que acende | Atendimento real: técnico no balcão, instalação na loja |
| `sobre` | `sobre.jpg` | `/sobre`, ao lado da história | Fachada, escritório ou o dono atendendo |
| `equipe-1` a `equipe-3` | `equipe/membro-N.jpg` | `/sobre`, seção de equipe (precisa também do nome e cargo em `src/content/sobre.ts`) | Retrato de cada pessoa |
| `cliente-1` a `cliente-3` | `depoimentos/cliente-N.jpg` | Reservado para depoimento real (a seção ainda não existe no layout novo) | Foto do cliente que autorizou o depoimento |
| `hero` | `hero.jpg` | **Não aparece mais.** Desde 23/09/2026 o topo da home é o pégaso em traço; foto de balcão vai para `suporte` ou `sobre` | — |

Captura de tela com nome, CPF ou valor de cliente real precisa ser borrada antes,
porque vai para o site público.

## Logo

- `public/logo.svg` (ou `.png`): logo da CNC para o cabeçalho. Enquanto não
  existir, o cabeçalho mostra a marca "CNC" em texto. A paleta atual é
  provisória; ao enviar o logo, ajustamos as cores em `tailwind.config.ts`.

## Logos dos sistemas (opcional)

- `public/sistemas/avante.svg`, `sgbr.svg`, `prodo.svg`, `digisat.svg`.
  Atualmente a barra de prova social usa os nomes em texto.

## Proporções usadas (para enquadrar o corte)

- Hero: retrato 4:5
- Suporte / Sobre (história): paisagem 4:3
- Equipe: retrato 4:5

## Como soltar a foto aqui sem cortar errado

Não salve a foto do celular direto nesta pasta, porque ela chega em 3:4 ou 9:16 e
com uns 4 MB, o que estica o hero, corta cabeça no retrato e leva peso morto para
toda visita. Passe pelo `npm run foto`, que corta na proporção do slot,
redimensiona, tira o EXIF (inclusive a coordenada de GPS que o celular grava) e
grava com o nome exato:

```
npm run foto hero ~/Imagens/balcao.jpg
npm run foto sobre ~/Imagens/fachada.jpg --foco north
npm run foto suporte ~/Imagens/atendimento.jpg
```

`npm run foto` sem argumento lista os slots. O corte é central; `--foco north`,
`south`, `east` ou `west` move a janela quando o assunto não está no meio, que é o
caso do balcão fotografado de lado. Foto menor que o slot é recusada em vez de
ampliada, porque ampliar borra na tela grande. Trocar foto que já está no ar exige
`--forcar`, para não sobrescrever sem querer.

Depois de gerar, `npm run dev` e olhar a página no Firefox antes de commitar, já
que a foto entra no build sem passo nenhum de aprovação.

## Tamanho mínimo por slot

| Slot | Saída | Mínimo da foto original |
| --- | --- | --- |
| `hero` | 1200x1500 | 1200x1500 |
| `sobre`, `suporte` | 1600x1200 | 1600x1200 |
| `equipe-1` a `equipe-3` | 800x1000 | 800x1000 |
| `cliente-1` a `cliente-3` | 400x400 | 400x400 |
| `tela-pro`, `tela-medio`, `tela-simples` | 1600x900 | 1600x900 |

Celular atual passa disso com folga na horizontal e na vertical, então o que
importa é fotografar em paisagem o que vai para `sobre` e `suporte`, e em retrato
o que vai para `hero` e `equipe`.
