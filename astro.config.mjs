import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import deno from "@deno/astro-adapter";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";

const { ASTRO_DEV, ASTRO_HMR } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

export default defineConfig({
  outDir: "./dist",
  vite: {
    plugins: [tailwindcss()],
    server: { port: ASTRO_DEV, hmr: { port: ASTRO_HMR } },
  },
  adapter: deno({ start: false }),
});
