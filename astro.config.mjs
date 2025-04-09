// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://linglambda.github.io",
  base: "/",

  //悬停预加载
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      PATH_MODULE: envField.enum({
        values:['no_change','pinyin','pinyin_with_tones'],
        default: 'pinyin',
        optional: false,
        context: "server",
        access: "secret",
      }), 
    },
  },
});
