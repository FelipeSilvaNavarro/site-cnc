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
