/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#24292f',
        'secondary': '#0587FF',
        'dark': '#262626',
        'light-dark': '#989898',
        'gradient': 'linear-gradient(89.89deg, #0056A6 -30.01%, #0587FF 125.65%);',
        'white': '#fff',
        'black': '#000',
        'jf-btn': 'rgba(27,31,36,0.08)',
      },
      fontSize: {
        'base': '1rem',
        'highlight': '1.125rem',
        'large': '1.5rem',
        'short': '0.875rem',
      },
    },
  },
  plugins: [],
}