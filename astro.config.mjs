// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.llma.dev",
  base: "/",
  trailingSlash: "ignore",

  //悬停预加载
  prefetch: true,

  vite: {},

  env: {
    schema: {
      PATH_MODULE: envField.enum({
        values: ["no_change", "pinyin", "pinyin_with_tones"],
        default: "pinyin",
        optional: false,
        context: "server",
        access: "secret",
      }),
      ENABLE_REQUEST: envField.boolean({
        default: false,
        optional: false,
        context: "server",
        access: "secret",
      }),
    },
  },

  markdown: {
    shikiConfig: {
      // 从 Shiki 的内置主题中选择 (或者添加你自己的)
      // https://shiki.style/themes
      theme: "one-light",
    },
  },

  integrations: [
    sitemap({
      // sitemap配置
    }),
  ],
});
