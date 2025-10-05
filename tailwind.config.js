/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["'DM Sans'", "sans-serif"],
        moontime: ["'Moontime'", "cursive"],
        belleza: ["'Belleza'", "sans-serif"],
      },
    },
  },
  plugins: [],
}