import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  // Integra Tailwind y React aquí
  integrations: [
    react(),
    tailwind({
      // Aquí adentro pegamos la configuración que te dio la IA
      applyBaseStyles: false,
      config: {
        theme: {
          extend: {
            colors: {
              'bg-main': '#121212',
              'text-main': '#E0E0E0',
              'text-secondary': '#B0B0B0',
              'border-color': '#444444',
              'accent-color': '#888888',
            },
            fontFamily: {
              heading: ['Raleway', 'sans-serif'],
              body: ['Merriweather', 'serif'],
            },
          },
        },
      },
    }),
  ],
});
