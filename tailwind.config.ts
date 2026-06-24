import type { Config } from "tailwindcss";

/**
 * Identidade visual da CNC centralizada.
 *
 * Paleta derivada do logo (pégaso azul / "CNC Sistemas & Representações"):
 * azul royal como cor de marca, um azul mais vivo como destaque e neutros
 * frios (slate) para texto e fundos. Visual de empresa de software: limpo,
 * técnico, sóbrio. Para trocar a identidade, edite SOMENTE os tokens abaixo.
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
        // Cor de marca: azul royal do logo.
        brand: {
          50: "#eef3fb",
          100: "#d8e4f6",
          200: "#b3c8ec",
          300: "#85a4de",
          400: "#5b80cf",
          500: "#3a5da8", // azul aproximado do logo
          600: "#314f93",
          700: "#293f77",
          800: "#22335f",
          900: "#1a2848",
          950: "#0f1830",
        },
        // Destaque: azul mais vivo para links, números e detalhes interativos.
        accent: {
          50: "#ecf2ff",
          100: "#dbe6ff",
          200: "#bcd0ff",
          300: "#8fb1ff",
          400: "#5e87fb",
          500: "#3b65f0",
          600: "#274ed6",
          700: "#1f3eb0",
          800: "#1d358c",
          900: "#1d306f",
        },
        // Fundos frios (cinza-azulado quase branco).
        paper: {
          DEFAULT: "#ffffff",
          soft: "#f4f6fb",
          dark: "#e7ecf5",
        },
        // Texto (slate frio, com leve viés azul).
        ink: {
          DEFAULT: "#0f1b2d",
          soft: "#3a4860",
          muted: "#6a7791",
        },
      },
      fontFamily: {
        // Títulos: sans geométrica com personalidade técnica.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        // Corpo: sans neutra e legível.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Detalhes técnicos (rótulos, números, código).
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      letterSpacing: {
        widest: "0.2em",
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
