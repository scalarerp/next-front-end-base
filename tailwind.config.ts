import type { Config } from "tailwindcss";
import { shadcnPreset } from "./lib/tailwind";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  presets: [shadcnPreset],
} satisfies Config;
