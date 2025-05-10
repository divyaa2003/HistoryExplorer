/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6D00",
        'primary-dark': "#E56200",
        'primary-light': "#FFB380",
        secondary: "#5D1049",
        accent: "#FFC107",
        background: "#F5F5F5",
        dark: "#333333",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Poppins', 'serif'],
      },
    },
  },
  plugins: [],
}
