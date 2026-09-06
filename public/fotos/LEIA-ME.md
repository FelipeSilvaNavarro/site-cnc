# Fotos do site da CNC

Coloque aqui as fotos REAIS. Os nomes abaixo já estão referenciados no código;
basta salvar o arquivo com o nome exato que a imagem aparece automaticamente
(sem editar código). Use JPG ou WEBP, otimizadas.

## Onde cada foto entra

| Arquivo                              | Onde aparece                          | Sugestão de conteúdo                                  |
| ------------------------------------ | ------------------------------------- | ---------------------------------------------------- |
| `hero.jpg`                           | Home — primeira dobra (hero)          | Técnico/atendente da CNC atendendo cliente no balcão |
| `suporte.jpg`                        | Página Suporte — topo                 | Equipe de suporte em atendimento                     |
| `sobre.jpg`                          | Página Sobre — bloco de história      | Fachada ou escritório da CNC em Maceió               |
| `equipe/membro-1.jpg` (2, 3)         | Página Sobre — equipe                 | Retrato de cada membro da equipe                     |
| `depoimentos/cliente-1.jpg` (2, 3)   | Home — depoimentos (opcional)         | Foto do cliente que deu o depoimento                 |

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

Celular atual passa disso com folga na horizontal e na vertical, então o que
importa é fotografar em paisagem o que vai para `sobre` e `suporte`, e em retrato
o que vai para `hero` e `equipe`.
