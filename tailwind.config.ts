import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "#f8fafc",
        "color-2": "#f1f5f9",
        "color-3": "#6b7280",
        "color-4": "#121212",
        "color-5": "#0a0a0a",
      },
    },
  },
  plugins: [],
};
export default config;
