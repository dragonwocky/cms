import { defineConfig } from "astro/config";
import deno from "@deno/astro-adapter";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  outDir: "./dist",
  vite: { plugins: [tailwindcss()] },
  adapter: deno({ start: false }),
});
