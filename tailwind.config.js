// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
  themes: {
    light: {
      colors: {
        background: "#f5f5f5",
        foreground: "#1a1a1a",

        primary: "#ffffff",
        secondary: "#fad201",

        primaryHover: "#F5F5F5",

      },
    },

    dark: {
      colors: {
        background: "#0f0f0f",
        foreground: "#ffffff",

        primary: "#1a1a1a",
        secondary: "#fad201",

        primaryHover: "#333333",

      },
    },
  },
}),

  ],
};