import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#FF6B00",
        ochre: "#8B4513",
        cream: "#FFF8E7",
        charcoal: "#1A1A1A",
        gold: "#C9A84C",
        "gold-light": "#E8C46A",
        "charcoal-80": "rgba(26,26,26,0.8)",
      },
      fontFamily: {
        heading: ["var(--font-baloo)", "cursive"],
        body: ["var(--font-lato)", "sans-serif"],
      },
      backgroundImage: {
        "maratha-gradient":
          "linear-gradient(135deg, #1A1A1A 0%, #2D1500 50%, #1A1A1A 100%)",
      },
      animation: {
        "ember-drift": "emberDrift 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        emberDrift: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "translateY(-20px) rotate(180deg)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(201,168,76,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
