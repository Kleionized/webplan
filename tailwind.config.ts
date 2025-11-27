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
        pastel: {
          pink: '#FFD1DC',
          blue: '#AEC6CF',
          lavender: '#E6E6FA',
          mint: '#B5EAD7',
          peach: '#FFDAB9',
          yellow: '#FFF9C4',
          purple: '#D4C5F9',
          green: '#C7EFCF',
        },
      },
    },
  },
  plugins: [],
};
export default config;
