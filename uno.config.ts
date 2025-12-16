import presetWind4 from "@unocss/preset-wind4";
import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      cdn: "https://esm.sh/",
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
});
