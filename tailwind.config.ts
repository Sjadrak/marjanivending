import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "marjani-red": {
          DEFAULT: "#A62621",
          dark: "#7E1D19",
          light: "#C33F39",
        },
        "vending-yellow": {
          DEFAULT: "#E8C547",
          dark: "#CBA82F",
          light: "#F2DA85",
        },
        "service-green": {
          DEFAULT: "#1E4D2B",
          dark: "#123018",
          light: "#2E6E40",
        },
        "off-white": "#F2F0E6",
        // Premium palette scoped to the redesigned hero + header only.
        "mv-green": {
          DEFAULT: "#083B27",
          secondary: "#0D4A31",
          deep: "#031E14",
        },
        "mv-gold": {
          DEFAULT: "#E8BE3F",
          bright: "#F2CA4A",
        },
        "mv-cream": "#F6F3E9",
        "mv-charcoal": "#121614",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-open-sans)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(30, 77, 43, 0.25)",
        "card-lg": "0 20px 45px -15px rgba(30, 77, 43, 0.35)",
      },
      backgroundImage: {
        "vending-radial":
          "radial-gradient(circle at 30% 20%, rgba(232,197,71,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(166,38,33,0.15), transparent 50%)",
      },
      animation: {
        "bounce-slow": "bounce 2.5s infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
