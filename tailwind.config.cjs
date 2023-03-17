/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'light-black': '#2E2B2B',
      'mid-black': '#1E1E1E',
      'black': '#17161A',
      'red' : '#A22E20',
      'white' : '#FFFFFF',
      'grey': '#F3E7E7',
      'mid-grey': '#CCCCCC',
      'dark-grey': '#5B5858',
      'hover-grey': 'rgba(91, 88, 88, 0.2)'
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      poppins: ['Poppins', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
