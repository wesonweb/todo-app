/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lime': {
          500: '#D9F99D',
          400: '#CFEAB8',
        },
        'ocean': {
          500: '#2AC9E8',
        },
        'white': '#FFFFFF',
      },
      container: {
        center: true,
        screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
