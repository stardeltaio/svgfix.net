import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    tailwind({
      // Disable injecting a basic base.css import
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  site: 'https://svgfix.net',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@lib': '/lib',
      },
    },
  },
});
