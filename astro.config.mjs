// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  output: 'hybrid',

  integrations: [
    react(),
    // Nota: @astrojs/tailwind NO va acá porque ya lo desinstalamos.
    // En v4, Tailwind vive en vite.plugins, no en integrations.
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});