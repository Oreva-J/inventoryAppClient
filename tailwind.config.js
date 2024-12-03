/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' if you prefer
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}