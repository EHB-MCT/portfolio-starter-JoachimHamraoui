/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
    colors: {
      'orange': '#579434',
      'white': '#EBEBEB',
      'black': '#111111',
      'grey': '#606060'
    },
    screens: {
      'sm': '360px',

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '3000px'
    },
    fontFamily: {
      display: ['Sora', 'sans-serif'],
      mont: ['Montserret', 'sans-serif']
    },
  },
  plugins: [],
}

