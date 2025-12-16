import partytown from "@astrojs/partytown";
import solidJs from "@astrojs/solid-js";
import deno from "@deno/astro-adapter";
import { defineConfig } from "astro/config";
import process from "node:process";
import UnoCSS from "unocss/astro";
import { loadEnv } from "vite";

const { ASTRO_DEV, ASTRO_HMR } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

export default defineConfig({
  outDir: "./dist",
  adapter: deno({ start: false }),
  vite: { server: { port: ASTRO_DEV, hmr: { port: ASTRO_HMR } } },
  integrations: [partytown(), solidJs(), UnoCSS()],
});
