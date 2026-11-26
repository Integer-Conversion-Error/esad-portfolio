// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://esadkaya.ca',
  output: 'static',
  redirects: { '/directions': '/' },
  integrations: [mdx(), sitemap({ filter: (page) => !new URL(page).pathname.startsWith("/directions") })],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4321,
    host: true,
  },
});
