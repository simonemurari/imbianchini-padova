/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./blog/**/*.html",
    "./js/**/*.js",
    "./privacy-policy/**/*.html",
    "./cookie-policy/**/*.html",
    "./contatti/**/*.html",
    "./imbiancature-interne-padova/**/*.html",
    "./tinteggiature-esterne-padova/**/*.html",
    "./verniciatura-legno-padova/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          500: '#1e6865',
          600: '#134a47',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
