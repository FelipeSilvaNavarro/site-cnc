import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Identidade visual da CNC — "balcão de Maceió à noite" (desde 23/09/2026).
 *
 * Direção inteira, referências e regras em PRODUCT.md. Resumo dos papéis:
 *
 * - `noite`   fundo das cenas escuras (topo, portes, preço, rodapé)
 * - `papel`   a folha clara que sobe por cima, cinza de croma zero
 * - `ink`     texto sobre papel
 * - `brand`   azul do logo
 * - `signal`  amarelo de etiqueta de preço: ação, preço e o cartão de destaque
 *
 * Contraste de todos os pares em uso: `npm run check:contrast`.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noite: {
          DEFAULT: "#070b18",
          900: "#0b1224",
          800: "#111a33",
          700: "#1a2547",
        },
        papel: {
          DEFAULT: "#f4f5f7",
          claro: "#ffffff",
          escuro: "#e6e8ec",
        },
        brand: {
          50: "#eef3fd",
          100: "#dce6fb",
          200: "#b9ccf6",
          300: "#86a6ee",
          400: "#4e7ae0",
          500: "#2b57c4",
          600: "#22459b",
          700: "#1b3578",
          800: "#14275a",
          900: "#0e1b3d",
          950: "#060b1a",
        },
        signal: {
          300: "#ffe066",
          400: "#ffd43b",
          500: "#ffc400",
          600: "#e0a800",
          700: "#b88900",
        },
        // Mantidos para as páginas e componentes que ainda usam os nomes
        // antigos: `paper` é o branco, `ink` a tinta.
        paper: {
          DEFAULT: "#ffffff",
          soft: "#f4f5f7",
          dark: "#e6e8ec",
        },
        ink: {
          DEFAULT: "#0b0e11",
          soft: "#333a44",
          muted: "#525c6b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1320px",
      },
      letterSpacing: {
        tightest: "-0.035em",
        widest: "0.14em",
      },
      borderRadius: {
        folha: "2rem",
        cartao: "1.375rem",
      },
      transitionTimingFunction: {
        // ease-out-expo: saída longa e macia, sem quique.
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Linha de título subindo por trás de uma máscara (overflow hidden).
        "linha-sobe": {
          "0%": { transform: "translateY(105%)" },
          "100%": { transform: "translateY(0)" },
        },
        "some-entra": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "linha-sobe": "linha-sobe 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "some-entra": "some-entra 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [
    // `cenas:` só vale quando as cenas de rolagem vão rodar de verdade: o
    // <html> ganha `data-cenas` num script antes da primeira pintura (layout
    // raiz), e não ganha sem JavaScript nem para quem pede menos movimento.
    // Layout que só faz sentido com a cena rodando (a esteira horizontal dos
    // portes) usa esta variante, senão o conteúdo fica fora da tela.
    plugin(({ addVariant }) => addVariant("cenas", "html[data-cenas] &")),
  ],
};

export default config;
