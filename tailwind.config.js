/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: {
        70: '280px',
      },
      maxWidth: {
        130: '520px',
      },
    },
  },
  plugins: [],
};
