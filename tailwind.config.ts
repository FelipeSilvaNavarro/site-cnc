import type { Config } from "tailwindcss";

/**
 * Identidade visual da CNC centralizada.
 *
 * Paleta provisória (NÃO derivada do logo ainda — arquivo do logo não foi
 * fornecido). É sóbria e profissional: petróleo/azul-esverdeado como cor de
 * autoridade, bronze/dourado como acento elegante, marfim quente de fundo e
 * grafite para texto. Para trocar a identidade depois, edite SOMENTE os tokens
 * abaixo; todo o site referencia estas cores por nome.
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
        // Cor de marca (petróleo / azul-esverdeado profundo)
        brand: {
          50: "#eef5f5",
          100: "#d3e4e4",
          200: "#a7c9c9",
          300: "#6fa3a4",
          400: "#3f7d80",
          500: "#1f5e62",
          600: "#164b4f",
          700: "#103c40",
          800: "#0c2e31",
          900: "#0a2426",
          950: "#051517",
        },
        // Acento (bronze / dourado discreto)
        accent: {
          50: "#faf5ea",
          100: "#f1e4c6",
          200: "#e4c98c",
          300: "#d3ab57",
          400: "#c2922f",
          500: "#a8791f",
          600: "#8a6019",
          700: "#6c4a16",
          800: "#503716",
          900: "#3c2a14",
        },
        // Fundo (marfim quente)
        paper: {
          DEFAULT: "#f7f4ef",
          soft: "#efe9e0",
          dark: "#e7e0d4",
        },
        // Texto (grafite)
        ink: {
          DEFAULT: "#1a2226",
          soft: "#3c474d",
          muted: "#6b767c",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      letterSpacing: {
        widest: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
