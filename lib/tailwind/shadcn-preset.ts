import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import tailwindAnimate from "tailwindcss-animate";
import { shadcnPlugin } from "./shadcn-plugin";

export const shadcnPreset = {
  darkMode: ["class"],
  content: [],
  plugins: [tailwindAnimate, shadcnPlugin, tailwindTypography],
} satisfies Config;
