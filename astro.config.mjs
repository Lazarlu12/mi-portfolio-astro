// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// 1. IMPORTANTE: Importamos el adaptador oficial de Netlify
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://portfolio-devlucalazarte.netlify.app/',
  output: 'static',
  adapter: netlify(), // 3. SEGURIDAD Y CONFIGURACIÓN: Añadimos el adaptador al flujo de Astro
  integrations: [
    react(),
    // Nota: @astrojs/tailwind NO va acá porque ya lo desinstalamos.
    // En v4/v5/v6, Tailwind vive en vite.plugins, no en integrations.
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
