import type { Config } from "tailwindcss";
import { colors } from "./constants/Color";


const config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./Onboarding.tsx", 
    "./**/*.tsx", 
  ],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors,
    },
  },

  plugins: [],
} satisfies Config;

export default config;
