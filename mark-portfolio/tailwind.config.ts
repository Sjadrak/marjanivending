import type { Config } from "tailwindcss";

/*
  THE NIGHTSHADE DEPTHS — design tokens (style guide v2.0)
  Volledige uitleg: STYLEGUIDE.md

  Kleurverhouding op de pagina:
  void 60–70% · cream 20% · abyss 15% (diepte en panelen) · ember 3–5% (alleen accent en hover)
*/
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nightshade Void — de dominante achtergrond. Zo diep paars dat het bijna zwart oogt.
        void: "#20002A",
        // Abyssal Blue — diepte: sectiepanelen, videovlakken, radiale gloed achter beeld.
        abyss: {
          DEFAULT: "#0B1D2E",
          soft: "rgba(11, 29, 46, 0.5)",
        },
        // Bone Cream — primaire tekst en titels. Nooit puur wit.
        cream: {
          DEFAULT: "#F0E6D2",
          dim: "rgba(240, 230, 210, 0.55)",
        },
        // Ember Copper — uitsluitend accent, hover, links en eyebrow-labels.
        ember: {
          DEFAULT: "#B5723A",
          dim: "rgba(181, 114, 58, 0.35)",
        },
      },
      fontFamily: {
        // Jumpscares en brute titels. Anton is de Google-Fonts-vertaling van Impact.
        impact: ["var(--font-anton)", "Anton", "Impact", '"Arial Narrow Bold"', "sans-serif"],
        // Aftiteling, dossiers en lopende tekst
        hahmlet: ["var(--font-hahmlet)", "Hahmlet", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.14em", // Eyebrow-labels boven een titel
        reel: "0.12em", // Metadata, credits en knoppen
        meta: "0.08em", // Kleinste metadata-regels
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px", // Scherpe hoeken, overal
      },
      transitionTimingFunction: {
        haunt: "cubic-bezier(0.16, 1, 0.3, 1)", // Traag op gang, zacht uitdovend
      },
      transitionDuration: {
        "1400": "1400ms",
        "1800": "1800ms",
      },
      keyframes: {
        flicker: {
          "0%": { opacity: "0" },
          "8%": { opacity: "0.9" },
          "12%": { opacity: "0.1" },
          "18%": { opacity: "1" },
          "24%": { opacity: "0.3" },
          "30%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "flicker-in": "flicker 2.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
