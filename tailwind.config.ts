import type { Config } from "tailwindcss";

/**
 * Identidade visual da CNC — direção "direto e utilitário".
 *
 * Referência física: catálogo técnico e sinalização industrial, não SaaS.
 * Três papéis de cor, cada um com função declarada:
 *
 * - `ink`     preto/tinta. Carrega texto e superfícies de máxima ênfase.
 * - `brand`   azul CNC saturado (derivado do logo). Carrega superfícies inteiras.
 * - `signal`  amarelo de sinalização. SÓ para chamada de ação e dado crítico.
 *             Área pequena, contraste alto. Não é decoração: se está amarelo,
 *             é porque exige ação ou atenção.
 *
 * Contraste de todos os pares texto/fundo em uso verificado por
 * `npm run check:contrast` (menor razão hoje: 6.10:1, contra 4.5:1 exigido).
 * Ao mexer em qualquer token abaixo, rode de novo — o `ink.muted` anterior
 * (#6a7791) reprovava AA exatamente na superfície onde era usado.
 *
 * Para trocar a identidade, edite SOMENTE daqui.
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
        // Azul CNC saturado. Identidade do logo, levada a sério: em vez de
        // aparecer em duas faixas, comete superfícies inteiras.
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
        // Amarelo de sinalização. Uso restrito: CTA e dado que exige atenção.
        signal: {
          300: "#ffe066",
          400: "#ffd43b",
          500: "#ffc400",
          600: "#e0a800",
          700: "#b88900",
        },
        // Superfícies neutras de verdade (croma ~0). O branco-azulado anterior
        // era o reflexo "empresa de software"; cinza neutro é papel de catálogo.
        paper: {
          DEFAULT: "#ffffff",
          soft: "#f2f3f5",
          dark: "#e3e5e9",
        },
        // Tinta. `muted` escurecido: o valor anterior (#6a7791) reprovava
        // WCAG AA sobre `paper.soft`, exatamente onde era usado.
        ink: {
          DEFAULT: "#0b0e11",
          soft: "#333a44",
          muted: "#525c6b",
        },
      },
      fontFamily: {
        // Uma família só, em pesos extremos. O contraste vem do peso (800 vs
        // 400), não de duas fontes que brigam. Archivo é grotesca de alta
        // legibilidade desenhada para uso em destaque/sinalização.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        // Mono APENAS para dado real: telefone, CNPJ, CEP, horário, versão.
        // Nunca como decoração "técnica" (era o que fazia o eyebrow antigo).
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        // Títulos utilitários fecham; nunca abaixo de -0.04em (letras colam).
        tightest: "-0.035em",
        widest: "0.14em",
      },
      borderRadius: {
        // Direção utilitária: cantos retos. O raio é a assinatura do card de
        // template; a ausência dele é uma decisão, não um esquecimento.
        none: "0",
        sm: "2px",
        DEFAULT: "2px",
        md: "2px",
      },
      keyframes: {
        // Entrada curta e seca. Sem bounce, sem elástico.
        "rise": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
