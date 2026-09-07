import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#F8F4EE",
          200: "#EFE7D8",
          300: "#E4D8C1",
        },
        coffee: {
          light: "#8B6B52",
          DEFAULT: "#6F4E37",
          dark: "#4E342E",
          deep: "#36231E",
          black: "#1F1410",
        },
        onyx: "#222222",
        amberGold: "#C89D5C",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(78, 52, 46, 0.08)",
        "luxury-hover": "0 20px 40px -15px rgba(78, 52, 46, 0.15)",
        "luxury-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;