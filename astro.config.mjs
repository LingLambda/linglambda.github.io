// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://linglambda.github.io',
  base: '/',
  
  //悬停预加载
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },
});